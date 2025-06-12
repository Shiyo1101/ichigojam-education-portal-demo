// import { Resend } from 'resend';

// import PasswordResetEmail from '@/components/mail/password-reset-email';
// import SettingAccountEmail from '@/components/mail/setting-account-email';
// import VerificationEmail from '@/components/mail/verification-email';

// const resend = new Resend(process.env.RESEND_API_KEY || '');

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  // await resend.emails.send({
  //   from: 'noreply@ichigojam-educationportal.demo',
  //   to: email,
  //   subject: 'メールアドレスの確認',
  //   react: VerificationEmail(email, confirmLink),
  //   headers: {
  //     'X-Entity-Ref-ID': new Date().getTime() + '',
  //   },
  // });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  // await resend.emails.send({
  //   from: 'noreply@ichigojam-educationportal.demo',
  //   to: email,
  //   subject: 'パスワードのリセット',
  //   react: PasswordResetEmail(email, resetLink),
  //   headers: {
  //     'X-Entity-Ref-ID': new Date().getTime() + '',
  //   },
  // });
};

export const sendSettingAccountEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/reset-email?token=${token}`;

  // await resend.emails.send({
  //   from: 'noreply@ichigojam-educationportal.demo',
  //   to: email,
  //   subject: 'メールアドレスの変更',
  //   react: SettingAccountEmail(email, confirmLink),
  //   headers: {
  //     'X-Entity-Ref-ID': new Date().getTime() + '',
  //   },
  // });
};
