"use client";

import Link from "next/link";

interface PostErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PostError({ error, reset }: PostErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h2 className="text-xl font-semibold">글을 불러오는 중 오류가 발생했습니다</h2>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          다시 시도
        </button>
        <Link href="/" className="rounded-md border px-4 py-2 text-sm">
          홈으로
        </Link>
      </div>
    </div>
  );
}
