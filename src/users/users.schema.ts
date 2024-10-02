import { z, ZodType } from 'zod';

const emailSchema = z.string({ required_error: 'Email is required' }).email();
const passwordSchema = z
  .string({ required_error: 'Password is required' })
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  .regex(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  .regex(/\d/, { message: 'Password must contain at least one number' })
  .regex(/[\W_]/, {
    message: 'Password must contain at least one special character',
  });

export class UsersSchema {
  static readonly UserRegistrationRequest: ZodType = z
    .object({
      email: emailSchema,
      password: passwordSchema,
    })
    .required();

  static readonly UserLoginRequest: ZodType = z.object({
    email: emailSchema,
    password: passwordSchema,
  });
}

export type UserRegistrationRequest = z.infer<
  typeof UsersSchema.UserRegistrationRequest
>;

export type UserLoginRequest = z.infer<typeof UsersSchema.UserLoginRequest>;
