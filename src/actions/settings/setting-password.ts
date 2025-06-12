'use server';

import { compareSync, hashSync } from 'bcrypt-edge';
import type { z } from 'zod';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { getUserById } from '@/lib/user';
import { SettingPasswordSchema } from '@/utils/schema';

export const settingPassword = async (values: z.infer<typeof SettingPasswordSchema>) => {
  const user = await currentUser();
  if (!user.id) {
    return { error: 'セッションエラー' };
  }

  const existingUser = await getUserById(user.id);
  if (!existingUser) {
    return { error: 'アカウントが見つかりません' };
  }

  const validatedFields = SettingPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: '無効なフィールド' };
  }

  const passwordMatch = compareSync(validatedFields.data.currentPassword, existingUser.password);

  if (!passwordMatch) {
    return { error: '現在のパスワードが違います' };
  }

  const { newPassword } = validatedFields.data;

  const hashedPassword = hashSync(newPassword, 10);

  await db.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  return { success: 'パスワードを更新しました' };
};
