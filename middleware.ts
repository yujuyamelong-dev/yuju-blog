/**
 * @file middleware.ts
 * @description JWT 쿠키 검증으로 /admin/* 경로 보호
 */

import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-key-change-in-production-min-32-chars'
);

/**
 * JWT 토큰 검증
 */
async function verifyAuth(token: string): Promise<boolean> {
  try {
    await jose.jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

/**
 * 미들웨어: /admin/* 경로 보호
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // /admin/login 은 모두 허용
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // /admin/* 경로 검증
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')?.value;

    if (!token || !(await verifyAuth(token))) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
