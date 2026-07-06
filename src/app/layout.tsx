import type { Metadata, Viewport } from "next";
import { ZCOOL_KuaiLe, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const kuaile = ZCOOL_KuaiLe({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-kuaile",
  display: "swap",
});

const noto = Noto_Sans_SC({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "理财翻译官 — 度小满 ×《小狗钱钱》",
  description: "用《小狗钱钱》的故事，开启你的第一笔理财",
};

export const viewport: Viewport = {
  themeColor: "#fbbf24",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${kuaile.variable} ${noto.variable}`}>
      <body className="min-h-dvh bg-[#f0e4c8] flex items-start justify-center">
        <div className="paper-bg relative mx-auto w-full max-w-md min-h-dvh shadow-[0_0_40px_rgba(120,80,20,0.15)] overflow-x-hidden rounded-none sm:rounded-[36px] sm:my-4 sm:min-h-[calc(100dvh-2rem)] border-2 border-[#f0e0bc]">
          <div className="px-5 pb-10 pt-5">{children}</div>
        </div>
      </body>
    </html>
  );
}
