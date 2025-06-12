'use server';

import { compareSync } from 'bcrypt-edge';
import { AuthError } from 'next-auth';
import type * as z from 'zod';

import { signIn } from '@/auth';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { getUserByEmail } from '@/lib/user';
import { DefaultLoginRedirect } from '@/utils/route';
import { LoginSchema } from '@/utils/schema';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: '無効なフィールド' };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    console.error('user email', existingUser?.email);
    console.error('user password', existingUser?.password);
    return { error: 'メールアドレスが存在しません！' };
  }

  const passwordMatch = await compareSync(password, existingUser.password);
  if (!passwordMatch) {
    return { error: 'パスワードが違います！' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: '認証メールを送信しました。認証を行ってください' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DefaultLoginRedirect,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.message) {
        case 'CredentialsSignin':
          return { error: '認証エラー' };
        default:
          return { error: 'その他のエラー' };
      }
    }

    throw error;
  }
};
