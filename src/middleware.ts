import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import {
  AdminPrefix,
  ApiAuthPrefix,
  AuthRoutes,
  DefaultLoginRedirect,
  GuestRedirect,
  NoRedirectRoutes,
  PublicRoutes,
} from '@/utils/route';

export default auth(async function middleware(req) {
  const session = await auth();
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  const isLoggedIn = !!session;
  const isAdminRoute = pathname.startsWith(AdminPrefix);
  const isApiAuthRoute = pathname.startsWith(ApiAuthPrefix);
  const isGuestRoute = pathname.startsWith(GuestRedirect);
  const isNoRedirectRoute = NoRedirectRoutes.includes(pathname);
  const isPublicRoute = PublicRoutes.includes(pathname);
  const isAuthRoute = AuthRoutes.includes(pathname);

  if (isApiAuthRoute || isNoRedirectRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DefaultLoginRedirect, nextUrl));
    }
    return NextResponse.next();
  }

  /* ADMINのアクセス制限 */
  if (isAdminRoute && isLoggedIn) {
    if (session.user.role === 'ADMIN') {
      const headers = new Headers(req.headers);
      headers.set('x-pathname', pathname);

      return NextResponse.next({
        request: {
          headers,
        },
      });
    } else {
      return NextResponse.redirect(new URL(DefaultLoginRedirect, nextUrl));
    }
  }
  /*******************/

  /* GUESTのアクセス制限 */
  // role=GUEST以外のユーザーはGUESTページにアクセス不可
  if (isLoggedIn && session.user.role !== 'GUEST' && isGuestRoute) {
    return NextResponse.redirect(new URL(DefaultLoginRedirect, nextUrl));
  }

  // role=GUESTのユーザーはGUESTページに強制リダイレクト
  if (isLoggedIn && session.user.role === 'GUEST') {
    if (!isGuestRoute) {
      return NextResponse.redirect(new URL(GuestRedirect, nextUrl));
    }
  }
  /********************/

  // 未ログインユーザーはログインページに強制リダイレクト
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/auth/login', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api)(.*)', '/material/(.*)'],
};
