import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Providers } from "./providers";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yuju-blog-yujuyamelong.vercel.app';

export const metadata: Metadata = {
  title: {
    default: "유주's Blog",
    template: "%s | 유주's Blog",
  },
  description:
    "유주의 개발 블로그입니다. 프론트엔드, TypeScript, Next.js 등 다양한 주제를 다룹니다.",
  keywords: ["블로그", "개발", "Next.js", "React", "TypeScript", "프론트엔드"],
  authors: [{ name: "유주" }],
  creator: "유주",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    title: "유주's Blog",
    description: "유주의 개발 블로그입니다. 프론트엔드, TypeScript, Next.js 등 다양한 주제를 다룹니다.",
    siteName: "유주's Blog",
    images: [
      {
        url: `${siteUrl}/og-default.png`,
        width: 1200,
        height: 630,
        alt: "유주's Blog",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "유주's Blog",
    description: "유주의 개발 블로그입니다.",
    images: [`${siteUrl}/og-default.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className={`${GeistSans.className} antialiased`}>
        <Providers>
          {/* TooltipProvider: shadcn Tooltip 전역 설정 */}
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
