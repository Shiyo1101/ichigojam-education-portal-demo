'use server';

import type { z } from 'zod';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { sendSettingAccountEmail } from '@/lib/mail';
import { generateEmailResetToken } from '@/lib/tokens';
import { SettingAccountSchema } from '@/utils/schema';

export const settingAccount = async (values: z.infer<typeof SettingAccountSchema>) => {
  const user = await currentUser();
  if (!user.email) {
    return { error: 'セッションエラー' };
  }

  const validatedFields = SettingAccountSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: '無効なフィールド' };
  }

  const { name, email } = validatedFields.data;

  if (name !== user.name) {
    await db.user.update({
      where: { id: user.id },
      data: { name: name },
    });
  }

  if (email !== user.email) {
    const emailResetToken = await generateEmailResetToken(user.email, email);
    await sendSettingAccountEmail(email, emailResetToken.token);

    return { success: '更新用の認証メールを新規メールアドレスに送信しました。' };
  }

  return { success: 'アカウントを更新しました' };
};
