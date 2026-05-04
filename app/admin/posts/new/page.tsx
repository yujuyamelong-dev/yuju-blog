import { createPostAction } from '@/app/admin/actions';
import { PostForm } from '@/components/admin/post-form';

export const metadata = {
  title: '새 글 작성 - 관리자',
};

export default function NewPostPage() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold mb-6">새 글 작성</h2>
      <PostForm onSubmit={createPostAction} />
    </div>
  );
}
