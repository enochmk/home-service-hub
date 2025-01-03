import { RequestHandler } from 'express';
import z from 'zod';

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 100;

export const signInSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, 'Password is too short')
      .max(MAX_PASSWORD_LENGTH, 'Password is too long'),
  }),
});

export type SignInInput = z.infer<typeof signInSchema>['body'];

export type SignInRequest = RequestHandler<any, any, SignInInput>;

export const signUpSchema = z.object({
  body: z.object({
    firstName: z.string().min(2, 'First name is too short').max(100),
    lastName: z.string().min(2, 'Last name is too short').max(100),
    email: z.string().email(),
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, 'Password is too short')
      .max(MAX_PASSWORD_LENGTH, 'Password is too long'),
  }),
});

export type SignUpInput = z.infer<typeof signUpSchema>['body'];

export type SignUpRequest = RequestHandler<any, any, SignUpInput>;

export const changePasswordSchema = z.object({
  body: z.object({
    oldPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH, 'Old Password is too short')
      .max(MAX_PASSWORD_LENGTH, 'Old Password is too long'),
    newPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH, 'New Password is too short')
      .max(MAX_PASSWORD_LENGTH, 'New Password is too long'),
  }),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>['body'];

export type ChangePasswordRequest = RequestHandler<any, any, ChangePasswordInput>;

export const resetPasswordSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, 'Password is too short')
      .max(MAX_PASSWORD_LENGTH, 'Password is too long'),
  }),
  params: z.object({
    passwordResetToken: z.string().max(160),
  }),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>['body'];

export type ResetPasswordRequest = RequestHandler<any, any, ResetPasswordInput>;

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>['body'];

export type ForgotPasswordRequest = RequestHandler<any, any, ForgotPasswordInput>;
