"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleSearch = useCallback(
    (query: string) => {
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      } else {
        // 검색어가 비어있으면 홈의 2번째 슬라이드(포스트 목록)로 이동
        router.push("/?slide=1");
      }
    },
    [router]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // 이전 타이머 취소
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // 300ms 후에 검색 실행
    const newTimeoutId = setTimeout(() => {
      handleSearch(newValue);
    }, 300);

    setTimeoutId(newTimeoutId);
  };

  const handleClear = () => {
    setValue("");
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // 검색어를 지우면 홈의 2번째 슬라이드(포스트 목록)로 이동
    router.push("/?slide=1");
  };

  return (
    <div className="relative flex-1 max-w-xs sm:max-w-sm">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="글 검색..."
          value={value}
          onChange={handleInputChange}
          className="pl-9 pr-9 h-10 text-sm bg-muted/50 border-muted hover:bg-muted focus:bg-background transition-colors min-h-11"
          aria-label="블로그 글 검색"
          data-testid="search-input"
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 h-6 w-6 p-0 hover:bg-muted"
            aria-label="검색어 초기화"
            data-testid="search-clear"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
