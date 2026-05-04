'use server';

/**
 * @file app/admin/actions.ts
 * @description 어드민 기능의 Server Actions
 */

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidateTag, revalidatePath } from 'next/cache';
import * as jose from 'jose';
import { createPost, updatePost, deletePost } from '@/lib/notion-write';
import type { PostCreateInput, PostUpdateInput, PostStatus } from '@/lib/types';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-key-change-in-production-min-32-chars'
);

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

/**
 * 로그인: 비밀번호 검증 후 JWT 쿠키 설정
 */
export async function loginAction(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  try {
    const password = formData.get('password') as string;

    if (!password) {
      return { error: '비밀번호를 입력해주세요.' };
    }

    if (password !== ADMIN_PASSWORD) {
      return { error: '비밀번호가 일치하지 않습니다.' };
    }

    // JWT 토큰 생성 (24시간 유효)
    const token = await new jose.SignJWT({ admin: true })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(JWT_SECRET);

    // 쿠키 설정
    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24시간
    });

    console.log('[loginAction] ✅ 로그인 성공');
    return { success: true };
  } catch (error) {
    console.error('[loginAction] ❌ 로그인 실패:', error);
    return { error: '로그인 중 오류가 발생했습니다.' };
  }
}

/**
 * 로그아웃: 인증 쿠키 삭제
 */
export async function logoutAction(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('auth-token');
    console.log('[logoutAction] ✅ 로그아웃 성공');
    redirect('/admin/login');
  } catch (error) {
    console.error('[logoutAction] ❌ 로그아웃 실패:', error);
  }
}

/**
 * 새 글 생성
 */
export async function createPostAction(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const tagsStr = formData.get('tags') as string;
  const status = formData.get('status') as string;
  const publishedDate = formData.get('publishedDate') as string;
  const content = formData.get('content') as string;

  if (!title?.trim()) {
    return { error: '제목은 필수입니다.' };
  }

  try {
    // 태그 파싱 (쉼표로 구분)
    const tags = tagsStr
      ?.split(',')
      .map(t => t.trim())
      .filter(Boolean) || [];

    const postData: PostCreateInput = {
      title,
      description: description || undefined,
      tags,
      status: (status || '초안') as PostStatus,
      publishedDate: publishedDate || undefined,
      content: content || undefined,
    };

    console.log('[createPostAction] 글 생성 요청:', postData);
    const pageId = await createPost(postData);

    console.log('[createPostAction] ✅ 글 생성 성공:', pageId);
    revalidateTag('admin-posts');
    revalidateTag('posts');
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('[createPostAction] ❌ 글 생성 실패:', error);
    return {
      error: error instanceof Error ? error.message : '글 생성 중 오류가 발생했습니다.',
    };
  }
}

/**
 * 기존 글 수정
 */
export async function updatePostAction(
  pageId: string,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const tagsStr = formData.get('tags') as string;
  const status = formData.get('status') as string;
  const publishedDate = formData.get('publishedDate') as string;
  const content = formData.get('content') as string;

  if (!title?.trim()) {
    return { error: '제목은 필수입니다.' };
  }

  try {
    // 태그 파싱
    const tags = tagsStr
      ?.split(',')
      .map(t => t.trim())
      .filter(Boolean) || [];

    const updateData: PostUpdateInput = {
      title,
      description: description || undefined,
      tags,
      status: (status || '초안') as PostStatus,
      publishedDate: publishedDate || undefined,
      content: content || undefined,
    };

    console.log('[updatePostAction] 글 수정 요청:', pageId, updateData);
    await updatePost(pageId, updateData);

    console.log('[updatePostAction] ✅ 글 수정 성공:', pageId);
    revalidateTag('admin-posts');
    revalidateTag('posts');
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('[updatePostAction] ❌ 글 수정 실패:', error);
    return {
      error: error instanceof Error ? error.message : '글 수정 중 오류가 발생했습니다.',
    };
  }
}

/**
 * 글 삭제 (아카이브)
 */
export async function deletePostAction(pageId: string): Promise<{ error?: string; success?: boolean }> {
  try {
    console.log('[deletePostAction] 글 삭제 요청:', pageId);
    await deletePost(pageId);

    console.log('[deletePostAction] ✅ 글 삭제 성공:', pageId);
    revalidateTag('admin-posts');
    revalidateTag('posts');
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('[deletePostAction] ❌ 글 삭제 실패:', error);
    return {
      error: error instanceof Error ? error.message : '글 삭제 중 오류가 발생했습니다.',
    };
  }
}
