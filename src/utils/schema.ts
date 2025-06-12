import * as z from 'zod';

/**
 * トップページ（メモ編集）
 * /
 */
export const MemoSchema = z.object({
  content: z.string().min(1, {
    message: 'メモ内容は必須です',
  }),
});

/**
 * トップページ（メモ削除）
 * /
 */
export const DeleteMemoSchema = z.object({
  delete: z.boolean().refine((value) => value === true, {
    message: '削除する場合はチェックしてください',
  }),
});

/**
 * ログインページ
 * /auth/login
 */
export const LoginSchema = z.object({
  email: z.string().email({
    message: 'メールアドレスは必須です',
  }),
  password: z.string().min(6, {
    message: 'パスワードは必須です（6文字以上）',
  }),
});

/**
 * 新規登録ページ
 * /auth/register
 */
export const ResisterSchema = z.object({
  email: z.string().email({
    message: 'メールアドレスは必須です',
  }),
  password: z.string().min(6, {
    message: 'パスワードは必須です（6文字以上）',
  }),
  name: z.string().min(1, {
    message: '名前は必須です（漢字またはローマ字でフルネーム）',
  }),
});

/**
 * パスワードリセットページ
 * /auth/reset
 */
export const ResetSchema = z.object({
  email: z.string().email({
    message: 'メールアドレスを入力してください',
  }),
});

/**
 * 新しいパスワード設定ページ
 * /auth/new-password
 */
export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'パスワードは6文字以上必要です',
  }),
});

/**
 * アカウント設定ページ
 * /settings
 */
export const SettingAccountSchema = z.object({
  name: z.string().min(1, {
    message: '名前は必須です（漢字またはローマ字でフルネーム）',
  }),
  email: z.string().email({
    message: 'メールアドレスは必須です',
  }),
});

/**
 * アカウント設定ページ
 * /settings
 */
export const SettingPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'パスワードを入力してください' }),
    newPassword: z.string().min(6, { message: 'パスワードは6文字以上必要です' }),
    newPasswordConfirm: z.string().min(1, { message: '確認用のパスワードを入力してください' }),
  })
  .superRefine(({ currentPassword, newPassword, newPasswordConfirm }, ctx) => {
    if (newPassword !== newPasswordConfirm) {
      ctx.addIssue({
        path: ['newPasswordConfirm'],
        code: 'custom',
        message: 'パスワードが一致しません',
      });
    }
    if (currentPassword === newPassword) {
      ctx.addIssue({
        path: ['newPassword'],
        code: 'custom',
        message: '現在のパスワードと同じです',
      });
    }
  });

/**
 * ユーザー管理/編集
 * /admin/users/[id]/edit
 */
export const EditUserSchema = z.object({
  name: z.string().min(1, {
    message: '名前は必須です（漢字またはローマ字でフルネーム）',
  }),
  role: z.enum(['ADMIN', 'GENERAL', 'GUEST'], {
    errorMap: () => ({ message: 'ロールを選択してください' }),
  }),
});
