import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "理财翻译官 — 度小满 ×《小狗钱钱》",
  description: "用《小狗钱钱》的故事，开启你的第一笔理财",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-dvh bg-[#d6c9b3] flex items-start justify-center">
        <div className="relative mx-auto w-full max-w-md min-h-dvh bg-[#fffcf5] shadow-xl shadow-black/5 overflow-x-hidden border-x border-[#e7dcc8]">
          {/* top decorative stripe */}
          <div className="h-2 bg-gradient-to-r from-[#fbbf24] via-[#d97706] to-[#fbbf24]" />
          <div className="px-5 pb-8 pt-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
