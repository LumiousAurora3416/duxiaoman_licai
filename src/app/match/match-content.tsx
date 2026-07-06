"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { matchPlan } from "@/data/matching";
import products, { plans } from "@/data/products";
import GooseProgress from "@/components/GooseProgress";
import ProductCard from "@/components/ProductCard";

interface Props {
  income: string;
  savings: string;
  goal: string;
}

function calcDailyEgg(amountStr: string, yieldStr: string): string {
  const num = parseFloat(amountStr.replace(/[^0-9.]/g, ""));
  const y = parseFloat(yieldStr.replace(/[^0-9.]/g, ""));
  if (isNaN(num) || isNaN(y)) return "0.00 元";
  const daily = (num * y) / 100 / 365;
  return `${daily.toFixed(2)} 元`;
}

export default function MatchContent({ income, savings, goal }: Props) {
  const router = useRouter();

  const result = useMemo(
    () => matchPlan({ income: income as any, savings: savings as any, goal }),
    [income, savings, goal]
  );

  const plan = plans[result.planType];
  const product = products[plan.productId];
  const dailyEgg = calcDailyEgg(result.suggestedAmount, product.annualYield);

  return (
    <div className="flex flex-col gap-5">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-[#a8a29e]"
      >
        ← 返回
      </button>

      {/* hero banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero-card bg-gradient-to-br from-[#fbbf24] via-[#f59e0b] to-[#d97706] p-7 text-center text-white shadow-lg shadow-[#d97706]/20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-4 ring-white/30"
        >
          <span className="text-4xl">🦆</span>
        </motion.div>
        <h1 className="text-xl font-extrabold">你的 {result.planName}</h1>
        <p className="mt-1.5 text-sm text-white/80">{result.reason}</p>
      </motion.div>

      {/* story + principle in one card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="dialog-bubble p-5"
      >
        <p className="mb-1 text-xs leading-relaxed text-[#292524]">
          {plan.storyBrief}
        </p>
        <div className="mt-3 rounded-xl bg-[#fef3c7] px-3 py-2">
          <p className="text-[11px] font-extrabold text-[#92400e]">
            💡 {plan.storyTitle}：{plan.principle}
          </p>
        </div>
      </motion.div>

      {/* goose progress — wow moment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="paper-card p-5"
      >
        <h2 className="mb-3 text-sm font-extrabold text-[#292524]">
          🪺 你的鹅正在生长...
        </h2>
        <GooseProgress
          progress={15}
          dailyEgg={dailyEgg}
          amount={result.suggestedAmount}
        />
        <div className="mt-3 rounded-2xl bg-[#fefce8] p-3 text-center">
          <p className="text-xs text-[#57534e]">
            存入{" "}
            <strong className="text-[#92400e]">{result.suggestedAmount}</strong>
            ，每天收获 <strong className="text-[#92400e]">{dailyEgg}</strong>{" "}
            的金蛋
          </p>
        </div>
      </motion.div>

      {/* product */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="mb-2 text-sm font-extrabold text-[#292524]">
          🏷️ 推荐产品
        </h2>
        <ProductCard product={product} />
      </motion.div>

      {/* ocean-blue compliance note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="ocean-tag text-center"
      >
        理财有风险，投资需谨慎 · 本推荐基于静态规则表，AI 仅做叙事包装
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <button
          onClick={() =>
            router.push(
              `/journey?plan=${result.planType}&amount=${encodeURIComponent(result.suggestedAmount)}&egg=${encodeURIComponent(dailyEgg)}`
            )
          }
          className="w-full rounded-full bg-[#92400e] py-4 text-lg font-extrabold text-white shadow-lg shadow-[#d97706]/30 transition-all active:scale-95 hover:bg-[#78350f]"
        >
          开始 7 天成长之旅 →
        </button>
      </motion.div>

      <p className="text-center text-[10px] text-[#a8a29e]">
        理财有风险，投资需谨慎
      </p>
    </div>
  );
}
