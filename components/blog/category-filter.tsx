"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

interface CategoryFilterProps {
  categories: Category[];
  currentCategory: string;
}

export function CategoryFilter({
  categories,
  currentCategory,
}: CategoryFilterProps) {
  return (
    <nav className="flex flex-wrap gap-2 mb-6" aria-label="카테고리 필터">
      {/* 전체 링크 → 홈으로 이동 */}
      <Link
        href="/"
        className={cn(
          "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
          currentCategory === ""
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border text-muted-foreground hover:border-primary hover:text-primary"
        )}
      >
        전체
      </Link>

      {/* 카테고리 링크들 */}
      {categories.map((cat) => {
        const isActive = cat.name === currentCategory;
        return (
          <Link
            key={cat.id}
            href={`/categories/${encodeURIComponent(cat.name)}`}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            )}
          >
            {cat.name}
          </Link>
        );
      })}
    </nav>
  );
}
