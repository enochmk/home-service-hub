import { RequestHandler } from 'express';
import {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  SignInRequest,
  SignUpRequest,
} from './auth.schema';
import * as service from './auth.service';

export const signIn: SignInRequest = async (req, res) => {
  const { email, password } = req.body;
  const response = await service.signIn(email, password);
  res.status(200).json(response);
};

export const signUp: SignUpRequest = async (req, res) => {
  const response = await service.signUp(req.body);
  res.status(201).json(response);
};

export const getUserProfile: RequestHandler = async (_req, res) => {
  const userId = res.locals.user.id;
  const response = await service.getUserProfile(userId);
  res.status(200).json(response);
};

export const changePassword: ChangePasswordRequest = async (req, res) => {
  const userId = res.locals.user.id;
  const { oldPassword, newPassword } = req.body;
  await service.changePassword(userId, oldPassword, newPassword);
  res.status(204).send();
};

export const forgotPassword: ForgotPasswordRequest = async (req, res) => {
  const response = await service.forgotPassword(req.body.email);
  // res.status(204).send();
  res.status(200).json(response);
};

export const resetPassword: ResetPasswordRequest = async (req, res) => {
  const passwordResetToken = req.params.passwordResetToken;
  await service.resetPassword(passwordResetToken, req.body.password);
  res.status(204).send();
};

export const signOut: RequestHandler = async (req, res) => {
  const userId = res.locals.user.id;
  await service.signOut(userId);
  res.status(204).send();
};
