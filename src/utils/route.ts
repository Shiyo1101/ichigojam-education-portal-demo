/**
 * 一般ユーザーがアクセス可能なルート配列（認証不要なルート）
 * @type {string[]}
 */
export const PublicRoutes = ['/auth/new-verification', '/auth/reset-email'];

/**
 * ゲストユーザーのリダイレクト先
 * @type {string}
 */
export const GuestRedirect = '/guest';

/**
 * 管理者ルート用のプレフィックス
 * @type {string}
 */
export const AdminPrefix = '/admin';

/**
 * 認証に使用されるルート配列
 * @type {string[]}
 */
export const AuthRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset',
  '/auth/new-password',
];

/**
 * API 認証ルート用のプレフィックス
 * @type {string}
 */
export const ApiAuthPrefix = '/api/auth';

/**
 * ログイン後でもリダイレクトしないルート
 * @type {string[]}
 */
export const NoRedirectRoutes = ['/auth/error', '/auth/reset', '/auth/new-password'];

/**
 * ログイン後のデフォルトのリダイレクト先
 * @type {string}
 */

export const DefaultLoginRedirect = '/';
