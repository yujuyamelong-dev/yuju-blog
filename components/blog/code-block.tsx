"use client";

import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
  caption?: string;
}

export function CodeBlock({ code, language, caption }: CodeBlockProps) {
  const [highlightedCode, setHighlightedCode] = useState(code);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const hljs = (await import("highlight.js")).default;

        if (language && hljs.getLanguage(language)) {
          const result = hljs.highlight(code, { language });
          setHighlightedCode(result.value);
        } else {
          const result = hljs.highlightAuto(code);
          setHighlightedCode(result.value);
        }
      } catch (error) {
        console.error("[CodeBlock] 문법 강조 실패:", error);
        setHighlightedCode(code);
      }
    })();
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("[CodeBlock] 복사 실패:", error);
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-lg border">
      <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
        <span className="text-xs text-muted-foreground font-mono">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          title={copied ? "복사됨" : "복사"}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>복사됨</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>복사</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto bg-background/50 p-4">
        <code
          className="text-sm font-mono leading-relaxed hljs"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
      {caption && (
        <div className="border-t bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
          {caption}
        </div>
      )}
    </div>
  );
}
