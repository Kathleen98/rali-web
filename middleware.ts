import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { userInfoProps } from './@types/user/user_info';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value;
  const userInfoFromCookie = request.cookies.get("user_infos")?.value;
  const { pathname } = request.nextUrl;

  const publicRoutes = ['/login'];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith('/submissions')) {
    if (!userInfoFromCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const userInfo: userInfoProps = JSON.parse(userInfoFromCookie);
      
      if (userInfo.role !== "COORD") {
        return NextResponse.redirect(new URL("/ranking", request.url));
      }
    } catch (error) {
      console.log(error)
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};