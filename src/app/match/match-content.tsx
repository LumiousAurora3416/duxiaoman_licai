"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { matchPlan } from "@/data/matching";
import products, { plans } from "@/data/products";
import GooseProgress from "@/components/GooseProgress";
import ProductCard from "@/components/ProductCard";
import Mascot from "@/components/Mascot";

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
        className="flex w-fit items-center gap-1 text-sm text-[#b0a08a]"
      >
        ← 返回
      </button>

      {/* hero — matched plan with mascot */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[26px] border-2 border-[#f0b445] bg-gradient-to-br from-[#fcd34d] via-[#f59e0b] to-[#d97706] p-6 text-center text-white shadow-[0_10px_24px_rgba(217,119,6,0.25)]"
      >
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.25, type: "spring" }}
          className="mx-auto mb-2 w-fit"
        >
          <Mascot name="celebrate" size={110} shape="circle" priority />
        </motion.div>
        <p className="text-xs font-bold text-white/85">为你匹配到</p>
        <h1 className="font-hand text-2xl">{result.planName}</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-white/90">
          {result.reason}
        </p>
      </motion.div>

      {/* story cloud */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="cloud cloud-tail px-5 py-5"
      >
        <p className="text-sm leading-relaxed text-[#5c4a35]">
          {plan.storyBrief}
        </p>
        <div className="mt-3 rounded-2xl bg-[#fef3c7] px-3.5 py-2.5">
          <p className="text-xs font-bold text-[#92400e]">
            💡 {plan.storyTitle}：{plan.principle}
          </p>
        </div>
      </motion.div>

      {/* goose progress — wow moment */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card-soft p-5"
      >
        <h2 className="mb-3 flex items-center gap-1.5 font-hand text-lg text-[#78350f]">
          <span>🪺</span> 你的鹅正在生长...
        </h2>
        <GooseProgress
          progress={15}
          dailyEgg={dailyEgg}
          amount={result.suggestedAmount}
        />
        <div className="mt-3 rounded-2xl bg-[#fffbeb] p-3 text-center">
          <p className="text-xs text-[#7c6a55]">
            存入{" "}
            <strong className="text-[#92400e]">{result.suggestedAmount}</strong>
            ，每天收获 <strong className="text-[#92400e]">{dailyEgg}</strong>{" "}
            的金蛋
          </p>
        </div>
      </motion.div>

      {/* product */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <h2 className="mb-2 flex items-center gap-1.5 font-hand text-lg text-[#78350f]">
          <span>🏷️</span> 推荐产品
        </h2>
        <ProductCard product={product} />
      </motion.div>

      {/* compliance note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="chip-ocean px-4 py-3 text-center text-xs"
      >
        理财有风险，投资需谨慎 · 本推荐基于静态规则表，AI 仅做叙事包装
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <button
          onClick={() =>
            router.push(
              `/journey?plan=${result.planType}&amount=${encodeURIComponent(result.suggestedAmount)}&egg=${encodeURIComponent(dailyEgg)}`
            )
          }
          className="btn-primary w-full py-4 text-lg"
        >
          <span className="font-hand">开始 7 天成长之旅</span> →
        </button>
      </motion.div>

      <p className="text-center text-[10px] text-[#b0a08a]">
        理财有风险，投资需谨慎
      </p>
    </div>
  );
}
