import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/blog/code-block";
import { extractRichText } from "@/lib/notion";
import type { NotionBlock } from "@/lib/types";

interface PostContentProps {
  blocks: NotionBlock[];
}

export function PostContent({ blocks }: PostContentProps) {
  return (
    <div
      className="prose prose-neutral dark:prose-invert max-w-none space-y-3 sm:space-y-4"
      data-testid="post-content"
    >
      {blocks.map((block) => {
        // PartialBlockObjectResponse는 type 필드가 없으므로 필터
        if (!("type" in block)) return null;
        return (
          <div key={block.id} data-testid="notion-block">
            <BlockRenderer block={block} />
          </div>
        );
      })}
    </div>
  );
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

function BlockRenderer({ block }: { block: BlockObjectResponse }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="leading-relaxed">
          <RichTextRenderer richText={block.paragraph.rich_text} />
        </p>
      );

    case "heading_1": {
      const id = generateHeadingId(block.heading_1.rich_text);
      return (
        <h1 id={id} className="mt-8 sm:mt-10 mb-3 sm:mb-4 text-2xl sm:text-3xl font-black tracking-tight">
          <RichTextRenderer richText={block.heading_1.rich_text} />
        </h1>
      );
    }

    case "heading_2": {
      const id = generateHeadingId(block.heading_2.rich_text);
      return (
        <h2 id={id} className="mt-6 sm:mt-8 mb-2 sm:mb-3 text-xl sm:text-2xl font-bold tracking-tight">
          <RichTextRenderer richText={block.heading_2.rich_text} />
        </h2>
      );
    }

    case "heading_3": {
      const id = generateHeadingId(block.heading_3.rich_text);
      return (
        <h3 id={id} className="mt-4 sm:mt-6 mb-1.5 sm:mb-2 text-lg sm:text-xl font-semibold">
          <RichTextRenderer richText={block.heading_3.rich_text} />
        </h3>
      );
    }

    case "bulleted_list_item":
      return (
        <ul className="list-disc list-inside space-y-1">
          <li>
            <RichTextRenderer richText={block.bulleted_list_item.rich_text} />
          </li>
        </ul>
      );

    case "numbered_list_item":
      return (
        <ol className="list-decimal list-inside space-y-1">
          <li>
            <RichTextRenderer richText={block.numbered_list_item.rich_text} />
          </li>
        </ol>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
          <RichTextRenderer richText={block.quote.rich_text} />
        </blockquote>
      );

    case "code":
      const caption = "caption" in block.code
        ? extractRichText(block.code.caption)
        : "";
      return (
        <CodeBlock
          code={extractRichText(block.code.rich_text)}
          language={block.code.language || ""}
          caption={caption || undefined}
        />
      );

    case "image":
      const imageUrl =
        block.image.type === "external"
          ? block.image.external.url
          : block.image.file.url;
      const imageCaption = "caption" in block.image
        ? extractRichText(block.image.caption)
        : "";
      return (
        <figure className="my-4 sm:my-6">
          <div className="relative w-full h-48 sm:h-64 md:h-96">
            <Image
              src={imageUrl}
              alt={imageCaption || "Notion 블록 이미지"}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 768px"
            />
          </div>
          {imageCaption && (
            <figcaption className="mt-2 text-center text-xs sm:text-sm text-muted-foreground">
              {imageCaption}
            </figcaption>
          )}
        </figure>
      );

    case "divider":
      return <Separator className="my-8" />;

    case "callout":
      return (
        <div className="my-4 flex gap-3 rounded-lg border bg-muted/50 p-4">
          {block.callout.icon?.type === "emoji" && (
            <span className="text-xl flex-shrink-0">
              {block.callout.icon.emoji}
            </span>
          )}
          <div className="flex-1">
            <RichTextRenderer richText={block.callout.rich_text} />
          </div>
        </div>
      );

    case "toggle":
      // Toggle 블록은 기본적으로 펼쳐진 상태로 내용만 표시
      return (
        <div className="my-4 pl-4 border-l-2 border-primary/50">
          <RichTextRenderer richText={block.toggle.rich_text} />
        </div>
      );

    case "to_do":
      return (
        <div className="flex items-start gap-2 my-2">
          <input
            type="checkbox"
            checked={block.to_do.checked}
            disabled
            className="mt-1"
          />
          <span className={block.to_do.checked ? "line-through text-muted-foreground" : ""}>
            <RichTextRenderer richText={block.to_do.rich_text} />
          </span>
        </div>
      );

    case "table":
      // 테이블은 복잡하므로 간단한 텍스트로 표시
      return (
        <div className="my-4 p-4 bg-muted/30 rounded text-sm text-muted-foreground">
          [테이블 콘텐츠]
        </div>
      );

    case "table_row":
      // 테이블 행은 테이블 렌더러에서 처리
      return null;

    default:
      // 지원하지 않는 블록 타입은 무시
      return null;
  }
}

function RichTextRenderer({ richText }: { richText: RichTextItemResponse[] }) {
  return (
    <>
      {richText.map((item, idx) => {
        const { bold, italic, code, strikethrough, underline } =
          item.annotations;
        let content: React.ReactNode = item.plain_text;

        if (code) {
          content = (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              {content}
            </code>
          );
        }

        if (bold) {
          content = <strong>{content}</strong>;
        }

        if (italic) {
          content = <em>{content}</em>;
        }

        if (strikethrough) {
          content = <del>{content}</del>;
        }

        if (underline) {
          content = <u>{content}</u>;
        }

        if (item.href) {
          return (
            <a
              key={idx}
              href={item.href}
              className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </a>
          );
        }

        return <span key={idx}>{content}</span>;
      })}
    </>
  );
}
