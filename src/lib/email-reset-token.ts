import { db } from '@/lib/db';

export const getEmailResetTokenByEmail = async (oldEmail: string) => {
  try {
    const emailResetToken = await db.emailResetToken.findFirst({
      where: { oldEmail },
    });

    return emailResetToken;
  } catch {
    return null;
  }
};

export const getEmailResetTokenByToken = async (token: string) => {
  try {
    const emailResetToken = await db.emailResetToken.findUnique({
      where: { token },
    });

    return emailResetToken;
  } catch {
    return null;
  }
};
