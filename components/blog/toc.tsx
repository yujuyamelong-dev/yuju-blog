"use client";

import { useEffect, useState } from "react";
import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import type { NotionBlock } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TocEntry {
  id: string;
  text: string;
  level: number;
}

interface TocProps {
  blocks: NotionBlock[];
}

function generateHeadingId(richText: RichTextItemResponse[]): string {
  const text = richText.map((item) => item.plain_text).join("");
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function extractRichText(richText: RichTextItemResponse[]): string {
  return richText.map((item) => item.plain_text).join("");
}

export function Toc({ blocks }: TocProps) {
  const [entries, setEntries] = useState<TocEntry[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // 1단계: Heading 파싱
  useEffect(() => {
    const headings: TocEntry[] = [];
    blocks.forEach((block) => {
      if (!("type" in block)) return;

      if (block.type === "heading_1") {
        headings.push({
          id: generateHeadingId(block.heading_1.rich_text),
          text: extractRichText(block.heading_1.rich_text),
          level: 1,
        });
      } else if (block.type === "heading_2") {
        headings.push({
          id: generateHeadingId(block.heading_2.rich_text),
          text: extractRichText(block.heading_2.rich_text),
          level: 2,
        });
      } else if (block.type === "heading_3") {
        headings.push({
          id: generateHeadingId(block.heading_3.rich_text),
          text: extractRichText(block.heading_3.rich_text),
          level: 3,
        });
      }
    });
    setEntries(headings);
  }, [blocks]);

  // 2단계: IntersectionObserver로 스크롤 추적
  useEffect(() => {
    if (entries.length === 0) return;

    const observerOptions = {
      rootMargin: "-20% 0px -60% 0px",
    };

    const observerCallback = (observedEntries: IntersectionObserverEntry[]) => {
      observedEntries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    entries.forEach((entry) => {
      const element = document.getElementById(entry.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [entries]);

  if (entries.length === 0) {
    return null;
  }

  return (
    <nav className="hidden lg:block lg:w-64 lg:flex-shrink-0 lg:sticky lg:top-20 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto">
      <div className="space-y-3 px-4 py-8">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          목차
        </h3>
        <ul className="space-y-2">
          {entries.map((entry) => (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(entry.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={cn(
                  "text-sm transition-colors hover:text-foreground",
                  entry.level === 1 && "pl-0",
                  entry.level === 2 && "pl-4",
                  entry.level === 3 && "pl-8",
                  activeId === entry.id
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {entry.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
