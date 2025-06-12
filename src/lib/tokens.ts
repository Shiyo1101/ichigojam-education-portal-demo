import { v4 as uuidv4 } from 'uuid';

import { db } from '@/lib/db';
import { getPasswordResetTokenByEmail } from '@/lib/password-reset-token';
import { getVerificationTokenByEmail } from '@/lib/verification-token';

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToke = await getVerificationTokenByEmail(email);

  if (existingToke) {
    await db.verificationToken.delete({
      where: {
        id: existingToke.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateEmailResetToken = async (oldEmail: string, newEmail: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await db.emailResetToken.findFirst({
    where: {
      oldEmail,
    },
  });

  if (existingToken) {
    await db.emailResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const emailResetToken = await db.emailResetToken.create({
    data: {
      oldEmail,
      newEmail,
      token,
      expires,
    },
  });

  return emailResetToken;
};
