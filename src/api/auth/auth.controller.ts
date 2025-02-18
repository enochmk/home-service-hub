import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import createHttpError from 'http-errors';
import {
  ChangeOwnPasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  SignInRequest,
  SignUpRequest,
} from './auth.schema';
import * as model from './auth.model';
import { getLogger } from '../../utils/logger';
import { generatePasswordResetToken, generateToken } from './auth.utils';
import { ROLES } from '../../utils/constants';
import { IUserSessionData } from './auth.interface';

const logger = getLogger('AuthController');

export const signIn: SignInRequest = async (req, res) => {
  const { email, password } = req.body;
  const user = await model.findUserByEmail(email);

  // ! Check if the user exists
  if (!user) {
    throw new createHttpError.Forbidden('Invalid credentials. Please check and try again');
  }

  const isPasswordMatch = bcrypt.compareSync(password, user.password);

  // ! Check if the password is correct
  if (!isPasswordMatch) {
    throw new createHttpError.Forbidden('Invalid credentials. Please check and try again');
  }

  // ! Check if the user is active
  if (!user.active) {
    throw new createHttpError.Forbidden('User is not active');
  }

  const userPermissions = await model.getPermissionsByRoleId(user.role?.id);

  const payload: IUserSessionData = {
    id: user.id,
    email: user.email,
    phoneNumber: user.phoneNumber,
    firstName: user.firstName,
    lastName: user.lastName,
    roleId: user.role?.id,
    roleName: user.role?.name,
    permissions: userPermissions,
    shouldUpdatePassword: user.shouldUpdatePassword,
  };

  const token = generateToken(payload);
  res.status(200).json({ token });
};

export const signUp: SignUpRequest = async (req, res) => {
  const data = req.body;
  logger.verbose('Creating new user', data);
  const user = await model.findUserByEmail(data.email);
  if (user) {
    throw new createHttpError.Conflict('A user with this email already exists');
  }

  // Hash the password
  const hashPassword = bcrypt.hashSync(data.password, 10);

  // Create the user
  const newUser = await model.createUser({
    ...data,
    password: hashPassword,
    roleName: ROLES.CLIENT,
  });

  // remove the password, updatedAt from the response
  const response = _.omit(newUser, ['password', 'updatedAt']);
  res.status(201).json(response);
};

export const signOut: RequestHandler = async (req, res) => {
  res.status(204).send();
};

export const forgotPassword: ForgotPasswordRequest = async (req, res) => {
  const { email } = req.body;
  const user = await model.findUserByEmail(email);
  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }

  // Generate a token
  const passwordResetToken = generatePasswordResetToken();
  await model.addPasswordResetToken(user.id, passwordResetToken);

  // TODO: Send the token to the user's email
  // await sendPasswordResetEmail(user.email, token);

  logger.info('Password reset token');
  res.status(200).json({ message: 'Password reset link sent to your email', passwordResetToken });
};

export const resetPassword: ResetPasswordRequest = async (req, res) => {
  const token = req.params.passwordResetToken;
  const password = req.body.password;
  const passwordResetToken = await model.findPasswordResetToken(token);

  // ! Check if the token is valid
  if (!passwordResetToken) {
    throw new createHttpError.NotFound('Invalid or expired token');
  }

  const currentTime = new Date().getTime();
  const passwordResetTokenExpiryTime =
    new Date(passwordResetToken.createdAt).getTime() + 60 * 60 * 1000;

  // ! Check if the token is expired
  if (currentTime > passwordResetTokenExpiryTime) {
    await model.expirePasswordResetToken(passwordResetToken.id);
    throw new createHttpError.NotFound('Invalid or expired token');
  }

  const userId = passwordResetToken.userId;
  const hashPassword = bcrypt.hashSync(password, 10);

  // Change the password
  await model.expirePasswordResetToken(passwordResetToken.id);
  await model.changePassword(userId, hashPassword);

  res.status(204).send();
};

export const changeOwnPassword: ChangeOwnPasswordRequest = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = res.locals.user!.id;
  logger.verbose(`Changing password for user: ${userId} `, { userId });
  const user = await model.findUserById(userId);

  // ! Check if the user exists
  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }

  logger.verbose('Comparing old password');
  const isPasswordMatch = bcrypt.compareSync(oldPassword, user.password);

  // ! Check if the old password is correct
  if (!isPasswordMatch) {
    throw new createHttpError.Forbidden(
      'Invalid old password. Please enter current password to change password',
    );
  }

  logger.verbose('Hashing new password');
  const password = bcrypt.hashSync(newPassword, 10);
  await model.changePassword(userId, password);
  logger.info('Password changed successfully');

  res.status(204).send();
};

export const getProfile: RequestHandler = async (req, res) => {
  res.status(200).json(res.locals.user);
};

export const getPermissions: RequestHandler = async (req, res) => {
  const permissions = await model.getPermissionsByRoleId(res.locals.user!.roleId);
  res.status(200).json({ permissions });
};
