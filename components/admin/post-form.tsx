'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Post, PostStatus, NotionBlock } from '@/lib/types';
import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

interface PostFormProps {
  post?: Post & { blocks?: NotionBlock[] };
  isLoading?: boolean;
  onSubmit: (formData: FormData) => Promise<{ error?: string; success?: boolean }>;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? '저장 중...' : '저장'}
    </Button>
  );
}

export function PostForm({ post, onSubmit }: PostFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string>();

  const handleSubmit = async (formData: FormData) => {
    setError(undefined);
    const result = await onSubmit(formData);
    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      // 글 생성/수정 성공 시 관리자 페이지로 이동 및 새로고침
      router.push('/admin');
      router.refresh();
    }
  };

  const statuses: PostStatus[] = ['초안', '작성중', '발행됨'];

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
          {error}
        </div>
      )}

      {/* 제목 */}
      <div className="space-y-2">
        <Label htmlFor="title">제목 *</Label>
        <Input
          id="title"
          name="title"
          defaultValue={post?.title}
          required
          placeholder="글 제목을 입력하세요"
        />
      </div>

      {/* 설명 */}
      <div className="space-y-2">
        <Label htmlFor="description">설명</Label>
        <textarea
          id="description"
          name="description"
          defaultValue={post?.description || ''}
          placeholder="짧은 설명 (선택사항)"
          rows={3}
          className="w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {/* 태그 */}
      <div className="space-y-2">
        <Label htmlFor="tags">태그</Label>
        <Input
          id="tags"
          name="tags"
          defaultValue={post?.tags.map(t => t.name).join(', ') || ''}
          placeholder="태그 (쉼표로 구분, 선택사항)"
        />
        <p className="text-xs text-muted-foreground">쉼표(,)로 구분하여 여러 태그를 입력할 수 있습니다.</p>
      </div>

      {/* 상태 */}
      <div className="space-y-2">
        <Label htmlFor="status">상태</Label>
        <select
          id="status"
          name="status"
          defaultValue={post?.status || '초안'}
          className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* 발행일 */}
      <div className="space-y-2">
        <Label htmlFor="publishedDate">발행일</Label>
        <Input
          id="publishedDate"
          name="publishedDate"
          type="date"
          defaultValue={post?.publishedDate ? post.publishedDate.split('T')[0] : ''}
        />
      </div>

      {/* 본문 */}
      <div className="space-y-2">
        <Label htmlFor="content">본문 (선택사항)</Label>
        <textarea
          id="content"
          name="content"
          placeholder="글 본문을 입력하세요 (줄바꿈으로 단락 구분)"
          rows={10}
          defaultValue={
            post?.blocks
              ? post.blocks
                  .map((block: NotionBlock): string => {
                    if ('type' in block && block.type === 'paragraph' && 'paragraph' in block && block.paragraph?.rich_text) {
                      return block.paragraph.rich_text
                        .map((rt: RichTextItemResponse): string => ('text' in rt && rt.text?.content) || '')
                        .join('');
                    }
                    return '';
                  })
                  .filter(Boolean)
                  .join('\n')
              : ''
          }
          className="w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          줄바꿈으로 단락을 구분합니다.
          {post && (
            <>
              &nbsp;또는&nbsp;
              <a
                href={`https://notion.so/${post.notionPageId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Notion에서 편집
              </a>
            </>
          )}
        </p>
      </div>

      {/* 버튼 */}
      <div className="flex gap-2 pt-4">
        <SubmitButton />
        <a href="/admin">
          <Button type="button" variant="outline">
            취소
          </Button>
        </a>
      </div>
    </form>
  );
}
