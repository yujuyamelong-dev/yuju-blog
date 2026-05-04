import Link from 'next/link';
import { logoutAction } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: '관리자',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* 어드민 헤더 */}
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <Link href="/admin" className="hover:opacity-80 transition-opacity">
              관리자
            </Link>
          </h1>

          <nav className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              홈
            </Link>
            <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              글 목록
            </Link>
            <Link
              href="/admin/posts/new"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              새 글
            </Link>

            <form action={logoutAction}>
              <Button type="submit" variant="ghost" size="sm">
                로그아웃
              </Button>
            </form>
          </nav>
        </div>
      </header>

      {/* 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
