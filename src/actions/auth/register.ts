'use server';

import { hashSync } from 'bcrypt-edge';
import type * as z from 'zod';

import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { getUserByEmail } from '@/lib/user';
import { ResisterSchema } from '@/utils/schema';

export const register = async (values: z.infer<typeof ResisterSchema>) => {
  const validatedFields = ResisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: '無効なフィールド' };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = hashSync(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'すでに登録されたメールアドレスです' };
  }

  // ユーザーをDBに登録
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // メールアドレス認証用のトークンを生成
  const verificationToken = await generateVerificationToken(email);

  // 認証メールを送信
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: '本登録メールを送信しました' };
};
