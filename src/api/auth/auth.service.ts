import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import _ from 'lodash';

import * as model from './auth.model';
import { generatePasswordResetToken, generateToken } from './auth.utils';
import { SignUpInput } from './auth.schema';
import { ROLES } from '../../utils/constants';
import { getLogger } from '../../utils/logger';

const logger = getLogger('auth.service');

export const signIn = async (email: string, password: string) => {
  const user = await model.findUserByEmail(email);
  if (!user) {
    throw new createHttpError.Forbidden('Invalid credentials. Please check and try again');
  }

  const isPasswordMatch = bcrypt.compareSync(password, user.password);
  if (!isPasswordMatch) {
    throw new createHttpError.Forbidden('Invalid credentials. Please check and try again');
  }

  const payload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    roleId: user.role?.id,
    roleName: user.role?.name,
  };

  const token = generateToken(payload);

  return {
    token,
  };
};

export const signUp = async (data: SignUpInput) => {
  // Check if the user already exists
  const user = await model.findUserByEmail(data.email);
  if (user) {
    throw new createHttpError.Conflict('A user with this email already exists');
  }

  // Hash the password
  const password = bcrypt.hashSync(data.password, 10);

  // Create the user
  const newUser = await model.createUser({
    ...data,
    password,
    roleName: ROLES.USER,
  });

  // remove the password, updatedAt from the response
  const userWithoutPassword = _.omit(newUser, ['password', 'updatedAt']);
  return userWithoutPassword;
};

export const signOut = async (userId: string) => {
  return { userId, message: 'Sign out successfully' };
};

export const getUserProfile = async (userId: string) => {
  const user = await model.findUserById(userId);
  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }

  // remove the password, updatedAt from the response
  const userWithoutPassword = _.omit(user, ['password', 'roleId']);
  return userWithoutPassword;
};

export const changePassword = async (userId: string, oldPassword: string, newPassword: string) => {
  const user = await model.findUserById(userId);
  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }

  const isPasswordMatch = bcrypt.compareSync(oldPassword, user.password);
  if (!isPasswordMatch) {
    throw new createHttpError.Forbidden(
      'Invalid old password. Please enter current password to change password',
    );
  }

  const password = bcrypt.hashSync(newPassword, 10);
  await model.changePassword(userId, password);

  return { message: 'Password changed successfully' };
};

export const forgotPassword = async (email: string) => {
  const user = await model.findUserByEmail(email);
  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }

  // Generate a token
  const passwordResetToken = generatePasswordResetToken();
  await model.addPasswordResetToken(user.id, passwordResetToken);

  // TODO: Send the token to the user's email
  // await sendPasswordResetEmail(user.email, token);

  logger.info('Password reset token: ', { passwordResetToken });
  return { message: 'Password reset link sent to your email', passwordResetToken };
};

export const resetPassword = async (token: string, newPassword: string) => {
  const passwordResetToken = await model.findPasswordResetToken(token);
  if (!passwordResetToken) {
    throw new createHttpError.NotFound('Invalid or expired token');
  }

  const currentTime = new Date().getTime();
  const passwordResetTokenExpiryTime =
    new Date(passwordResetToken.createdAt).getTime() + 60 * 60 * 1000;

  if (currentTime > passwordResetTokenExpiryTime) {
    await model.expirePasswordResetToken(passwordResetToken.id);
    throw new createHttpError.NotFound('Invalid or expired token');
  }

  const userId = passwordResetToken.userId;
  const password = bcrypt.hashSync(newPassword, 10);
  await model.expirePasswordResetToken(passwordResetToken.id);
  await model.changePassword(userId, password);

  return { message: 'Password reset successfully' };
};
