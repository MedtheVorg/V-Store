import { object, string, z } from 'zod';

export const signUpFormSchema = object({
  username: string({
    required_error: 'Username is required.',
  })
    .trim()
    .min(4, 'Username must be at least 4 characters long.')
    .max(30, 'Username must not exceed 30 characters.'),

  email: string({
    required_error: 'Email is required.',
  })
    .trim()
    .email('Invalid email'),

  password: string({
    required_error: 'Password is required.',
  }).trim(),
  avatar: z
    .any()
    .refine((file) => file?.length == 1, 'File is required.')
    .refine(
      (file: FileList) => file[0]?.type.includes('image'),
      'only images are allowed.'
    )
    .refine((file) => file[0]?.size <= 3000000, 'Max file size is 3MB.'),
});

export const signInFormSchema = object({
  email: string({
    required_error: 'Email is required.',
  })
    .trim()
    .email('Invalid email'),

  password: string().trim().min(1, 'Password is required.'),
});

export const updateUserSchema = object({
  username: string({
    required_error: 'Username is required.',
  })
    .trim()
    .min(4, 'Username must be at least 4 characters long.')
    .max(30, 'Username must not exceed 30 characters.')
    .optional(),

  oldPassword: string().trim().optional(),
  newPassword: string().trim().optional(),
  avatar: z
    .any()
    .refine((file) => {
      return file?.length == 0 ? false : true;
    }, 'File is required.')
    .refine((file: FileList) => {
      if (typeof file[0] === 'string') return true;

      return file[0]?.type.includes('image');
    }, 'only images are allowed.')
    .refine((file) => {
      if (typeof file[0] === 'string') return true;

      return file[0]?.size <= 3000000;
    }, 'Max file size is 3MB.')
    .optional(),
})
  .partial()
  .refine(
    ({ newPassword, oldPassword }) =>
      newPassword && !oldPassword ? false : true,
    {
      message: 'old password is also required',
      path: ['oldPassword'],
    }
  )
  .refine(
    ({ newPassword, oldPassword }) =>
      oldPassword && !newPassword ? false : true,
    {
      message: 'new password is also required',
      path: ['newPassword'],
    }
  );

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
export type SignInFormValues = z.infer<typeof signInFormSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
