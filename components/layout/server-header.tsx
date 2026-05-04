import { verifyAuth } from '@/lib/auth';
import { Header } from './header';

/**
 * 인증 상태를 서버에서 확인하고 Header에 전달하는 서버 컴포넌트
 */
export async function ServerHeader() {
  const isAuthenticated = await verifyAuth();
  return <Header isAuthenticated={isAuthenticated} />;
}
