'use server';

import { db } from '@/lib/db';
import { getEmailResetTokenByToken } from '@/lib/email-reset-token';
import { getUserByEmail } from '@/lib/user';

export const resetEmail = async (token: string) => {
  const existingToken = await getEmailResetTokenByToken(token);

  if (!existingToken) {
    return { error: '認証用トークンが存在しません' };
  }

  // tokenの期限を確認
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: '認証用トークンの有効期限が切れています' };
  }

  const user = await getUserByEmail(existingToken.oldEmail);
  if (!user) {
    return { error: 'ユーザーが見つかりません' };
  }

  // メールアドレス認証をuserテーブルに反映
  await db.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.newEmail,
    },
  });

  // 認証トークン削除
  await db.emailResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: 'メールアドレスが更新されました。' };
};
