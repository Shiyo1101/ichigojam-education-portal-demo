'use server';

import type { z } from 'zod';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { getUserById } from '@/lib/user';
import { EditUserSchema } from '@/utils/schema';

export const editUser = async (userId: string, value: z.infer<typeof EditUserSchema>) => {
  const executor = await currentUser();
  const user = await getUserById(userId);

  if (!user) {
    return { error: 'ユーザーが見つかりません' };
  }

  if (!executor) {
    return { error: 'セッションエラー' };
  }

  if (executor.role !== 'ADMIN') {
    return { error: '権限がありません' };
  }

  const validatedFields = EditUserSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: '無効なフィールド' };
  }

  try {
    const { name, role } = validatedFields.data;

    await db.user.update({
      where: { id: userId },
      data: {
        name,
        role: role,
      },
    });

    if (user.role === 'GUEST' && role !== 'GUEST') {
      return { success: 'ゲストユーザーに利用許可を与えました。' };
    }

    return { success: 'ユーザー情報を更新しました' };
  } catch (error) {
    console.error('Error updating user:', error);
    return { error: 'ユーザー情報の更新に失敗しました' };
  }
};
