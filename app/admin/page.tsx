import Link from 'next/link';
import { getAllPostsAdmin } from '@/lib/notion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DeleteButton } from '@/components/admin/delete-button';

export const metadata = {
  title: '글 목록 - 관리자',
};

export default async function AdminPage() {
  const posts = await getAllPostsAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">글 목록 ({posts.length})</h2>
        <Link href="/admin/posts/new">
          <Button>새 글 작성</Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">아직 글이 없습니다.</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-4 py-3 font-semibold">제목</th>
                  <th className="text-left px-4 py-3 font-semibold">상태</th>
                  <th className="text-left px-4 py-3 font-semibold">태그</th>
                  <th className="text-left px-4 py-3 font-semibold">수정일</th>
                  <th className="text-left px-4 py-3 font-semibold">작업</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 max-w-xs truncate">{post.title}</td>
                    <td className="px-4 py-3">
                      <Badge variant={post.status === '발행됨' ? 'default' : 'secondary'}>
                        {post.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {post.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <Badge key={tag.id} variant="outline" className="text-xs">
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {new Date(post.modifiedDate).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <Link href={`/admin/posts/${post.id}/edit`}>
                        <Button variant="outline" size="sm">
                          수정
                        </Button>
                      </Link>
                      <DeleteButton pageId={post.id} title={post.title} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
