import { notFound } from 'next/navigation';
import { updatePostAction } from '@/app/admin/actions';
import { getAllPostsAdmin, getPostBlocks } from '@/lib/notion';
import { PostForm } from '@/components/admin/post-form';

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EditPostPageProps) {
  const { id } = await params;
  return {
    title: `글 수정 (${id}) - 관리자`,
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;

  // 모든 글 중에서 해당 글 찾기
  const posts = await getAllPostsAdmin();
  const post = posts.find(p => p.id === id);

  if (!post) {
    notFound();
  }

  // 블록 데이터 가져오기
  const blocks = await getPostBlocks(post.notionPageId);
  const postWithBlocks = { ...post, blocks };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold mb-6">글 수정</h2>
      <PostForm post={postWithBlocks} onSubmit={updatePostAction.bind(null, id)} />
    </div>
  );
}
