'use server';

import { cookies } from 'next/headers';
import * as jose from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-key-change-in-production-min-32-chars'
);

/**
 * 인증 상태 확인 (서버 컴포넌트/액션에서만 사용)
 */
export async function verifyAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return false;
    }

    await jose.jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}
