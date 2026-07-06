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

const allPlans = [
  {
    id: "safe_goose" as const,
    icon: "🦆",
    label: "安全鹅",
    desc: "本金安全 · 稳稳增值",
    color: "from-[#fbbf24] to-[#d97706]",
    tag: "保守型",
  },
  {
    id: "dream_account" as const,
    icon: "🎯",
    label: "梦想账户",
    desc: "目标驱动 · 中低风险",
    color: "from-[#60a5fa] to-[#2563eb]",
    tag: "目标型",
  },
  {
    id: "flexible_goose" as const,
    icon: "💧",
    label: "灵活金鹅",
    desc: "随取随用 · 应急储备",
    color: "from-[#34d399] to-[#10b981]",
    tag: "灵活型",
  },
];

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

  const planMeta = allPlans.find((p) => p.id === result.planType)!;

  const handleStart = () => {
    router.push(
      `/prologue?plan=${result.planType}&amount=${encodeURIComponent(result.suggestedAmount)}&egg=${encodeURIComponent(dailyEgg)}&goal=${encodeURIComponent(goal)}`
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-[#a8a29e]"
      >
        ← 返回
      </button>

      {/* REVEAL: "原来你是XX型选手！" */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero-card bg-gradient-to-br from-[#fbbf24] via-[#f59e0b] to-[#d97706] p-7 text-center text-white shadow-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-4 ring-white/30"
        >
          <span className="text-4xl">{planMeta.icon}</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-white/80"
        >
          原来你是
        </motion.p>
        <h1 className="text-2xl font-extrabold">{result.planName}</h1>
        <p className="mt-1 text-sm text-white/80">{result.reason}</p>
      </motion.div>

      {/* three-plan comparison: chosen one highlighted */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-1"
      >
        <p className="text-xs font-extrabold text-[#a8a29e] px-1">
          三条路径 · 为你匹配最合适的一条
        </p>
        <div className="grid grid-cols-3 gap-2">
          {allPlans.map((p) => {
            const isChosen = p.id === result.planType;
            return (
              <div
                key={p.id}
                className={`rounded-2xl border-2 p-3 text-center transition-all ${
                  isChosen
                    ? "border-[#d97706] bg-[#fefce8] shadow-md scale-105"
                    : "border-[#e7dcc8] bg-white opacity-50"
                }`}
              >
                <span className="text-2xl">{p.icon}</span>
                <p
                  className={`text-xs font-extrabold mt-1 ${
                    isChosen ? "text-[#92400e]" : "text-[#a8a29e]"
                  }`}
                >
                  {p.label}
                </p>
                <span
                  className={`text-[9px] ${
                    isChosen ? "text-[#d97706]" : "text-[#a8a29e]"
                  }`}
                >
                  {p.tag}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* story */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="dialog-bubble p-5"
      >
        <p className="text-xs leading-relaxed text-[#292524]">
          {plan.storyBrief}
        </p>
        <div className="mt-3 rounded-xl bg-[#fef3c7] px-3 py-2">
          <p className="text-[11px] font-extrabold text-[#92400e]">
            💡 {plan.storyTitle}：{plan.principle}
          </p>
        </div>
      </motion.div>

      {/* goose progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="paper-card p-5"
      >
        <h2 className="mb-3 text-sm font-extrabold text-[#292524]">
          🪺 试算你的收益
        </h2>
        <GooseProgress
          progress={15}
          dailyEgg={dailyEgg}
          amount={result.suggestedAmount}
        />
        <div className="mt-3 rounded-2xl bg-[#fefce8] p-3 text-center">
          <p className="text-xs text-[#57534e]">
            建议存入{" "}
            <strong className="text-[#92400e]">{result.suggestedAmount}</strong>
            ，每天预计收益{" "}
            <strong className="text-[#92400e]">{dailyEgg}</strong>
          </p>
        </div>
      </motion.div>

      {/* product */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
      >
        <h2 className="mb-2 text-sm font-extrabold text-[#292524]">
          🏷️ 推荐产品
        </h2>
        <ProductCard product={product} />
      </motion.div>

      {/* ocean-blue compliance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="rounded-2xl bg-[#dbeafe] px-4 py-2.5 text-center text-xs font-bold text-[#1e40af]"
      >
        理财有风险，投资需谨慎 · 本推荐基于规则表，AI 仅做叙事包装
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <button
          onClick={handleStart}
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
