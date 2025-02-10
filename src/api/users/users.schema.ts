import { RequestHandler } from 'express';
import z from 'zod';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '../../utils/constants';

export const getUserSchema = z.object({
  params: z.object({
    userId: z.string().uuid(),
  }),
});

export type GetUserInput = z.infer<typeof getUserSchema>['params'];

export type GetUserRequest = RequestHandler<any, any, GetUserInput>;

export const createUserSchema = z.object({
  body: z.object({
    firstName: z.string().min(2, 'First name is too short').max(100, 'First name is too long'),
    lastName: z.string().min(2, 'Last name is too short').max(100, 'Last name is too long'),
    roleId: z.string().uuid(),
    email: z.string().email(),
    phoneNumber: z.string(),
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, 'Password is too short')
      .max(MAX_PASSWORD_LENGTH, 'Password is too long'),
    shouldUpdatePassword: z.boolean().default(false).optional(),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>['body'];

export type CreateUserRequest = RequestHandler<any, any, CreateUserInput>;

export const updateUserSchema = z.object({
  params: z.object({
    userId: z.string().uuid(),
  }),
  body: z
    .object({
      firstName: z
        .string()
        .min(2, 'First name is too short')
        .max(100, 'First name is too long')
        .optional(),
      lastName: z
        .string()
        .min(2, 'Last name is too short')
        .max(100, 'Last name is too long')
        .optional(),
      roleId: z.string().uuid().optional(),
      email: z.string().email().optional(),
      active: z.boolean().optional(),
      shouldUpdatePassword: z.boolean().default(false).optional(),
    })
    .strict(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>['body'];

export type UpdateUserRequest = RequestHandler<any, any, UpdateUserInput>;

export const updateUserPasswordSchema = z.object({
  params: z.object({
    userId: z.string().uuid(),
  }),
  body: z.object({
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, 'Password is too short')
      .max(MAX_PASSWORD_LENGTH, 'Password is too long'),
    shouldUpdatePassword: z.boolean().default(false).optional(),
  }),
});

export type UpdateUserPasswordInput = z.infer<typeof updateUserPasswordSchema>['body'];

export type UpdateUserPasswordRequest = RequestHandler<any, any, UpdateUserPasswordInput>;

export const changeOwnPasswordSchema = z.object({
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

export type ChangeOwnPasswordInput = z.infer<typeof changeOwnPasswordSchema>['body'];

export type ChangeOwnPasswordRequest = RequestHandler<any, any, ChangeOwnPasswordInput>;
