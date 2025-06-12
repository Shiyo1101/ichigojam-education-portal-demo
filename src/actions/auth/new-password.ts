'use server';

import { hashSync } from 'bcrypt-edge';
import type * as z from 'zod';

import { db } from '@/lib/db';
import { getPasswordResetTokenByToken } from '@/lib/password-reset-token';
import { getUserByEmail } from '@/lib/user';
import { NewPasswordSchema } from '@/utils/schema';

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: '認証用トークンが存在しません' };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: '無効なフィールド' };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: 'パスワードリセット用のトークンが発行されていません' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: '認証用トークンの有効期限が切れています' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'メールアドレスが存在しません' };
  }

  const hashedPassword = hashSync(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: 'パスワードがリセットされました！' };
};
