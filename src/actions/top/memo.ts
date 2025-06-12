'use server';

import type { Memo } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import type { z } from 'zod';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { MemoSchema } from '@/utils/schema';

type CreateMemoActionProps = {
  memo: z.infer<typeof MemoSchema>;
};

export const createMemoAction = async ({ memo }: CreateMemoActionProps) => {
  const user = await currentUser();
  if (!user.id) {
    return { error: 'セッションエラー' };
  }

  const validatedFields = MemoSchema.safeParse(memo);
  if (!validatedFields.success) {
    return { error: '無効なフィールド' };
  }

  const { content } = validatedFields.data;

  await db.memo.create({
    data: {
      content: content.trim(),
      authorId: user.id,
    },
  });

  revalidatePath('/');

  return { success: 'メモを作成しました' };
};

type UpdateMemoActionProps = {
  memo: z.infer<typeof MemoSchema>;
  memoInfo: {
    memoId: Memo['id'];
    authorId: Memo['authorId'];
  };
};

export const updateMemoAction = async ({ memo, memoInfo }: UpdateMemoActionProps) => {
  const user = await currentUser();
  if (!user) {
    return { error: 'セッションエラー' };
  }

  const validatedFields = MemoSchema.safeParse(memo);
  if (!validatedFields.success) {
    return { error: '無効なフィールド' };
  }

  const { content } = validatedFields.data;

  if (user.role !== 'ADMIN' && memoInfo.authorId !== user.id) {
    return { error: '権限がありません' };
  }

  await db.memo.update({
    where: { id: memoInfo.memoId },
    data: {
      content: content.trim(),
      updatedAt: new Date(),
    },
  });

  revalidatePath('/');

  return { success: 'メモを更新しました' };
};

type DeleteMemoActionProps = {
  memoInfo: {
    memoId: Memo['id'];
    authorId: Memo['authorId'];
  };
};

export const deleteMemoAction = async ({ memoInfo }: DeleteMemoActionProps) => {
  const user = await currentUser();
  if (!user) {
    return { error: 'セッションエラー' };
  }

  if (user.role !== 'ADMIN' && memoInfo.authorId !== user.id) {
    return { error: '権限がありません' };
  }

  await db.memo.delete({
    where: { id: memoInfo.memoId },
  });

  revalidatePath('/');
  return { success: 'メモを削除しました' };
};
