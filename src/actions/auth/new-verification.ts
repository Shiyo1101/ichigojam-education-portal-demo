'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/lib/user';
import { getVerificationTokenByToken } from '@/lib/verification-token';

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: '認証用トークンが存在しません' };
  }

  // tokenの期限を確認
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: '認証用トークンの有効期限が切れています' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'メールアドレスが存在しません' };
  }
  // メールアドレス認証をuserテーブルに反映
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  // 認証トークン削除
  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: 'メールアドレスが認証されました' };
};
