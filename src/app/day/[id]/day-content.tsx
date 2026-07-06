"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { DayContent as DayType } from "@/data/journey";
import QuoteCard from "@/components/QuoteCard";
import GooseProgress from "@/components/GooseProgress";

interface Props {
  day: DayType;
  plan: string;
  amount: string;
  egg: string;
}

export default function DayContent({ day, plan, amount, egg }: Props) {
  const router = useRouter();
  const [completed, setCompleted] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>(
    day.steps.map(() => false)
  );

  const isDay7 = day.id === 7;
  const allChecked = checkedSteps.every(Boolean);

  const toggleStep = (index: number) => {
    const next = [...checkedSteps];
    next[index] = !next[index];
    setCheckedSteps(next);
  };

  const handleComplete = () => {
    const stored = localStorage.getItem("goose_completed_days");
    const completedDays: number[] = stored ? JSON.parse(stored) : [];
    if (!completedDays.includes(day.id)) {
      completedDays.push(day.id);
      localStorage.setItem(
        "goose_completed_days",
        JSON.stringify(completedDays)
      );
    }
    setCompleted(true);
    setTimeout(() => {
      router.push(
        `/journey?plan=${plan}&amount=${encodeURIComponent(amount)}&egg=${encodeURIComponent(egg)}`
      );
    }, 1200);
  };

  // ── Day 7: Graduation ──
  if (isDay7) {
    return (
      <div className="flex flex-col gap-5">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-[#a8a29e]"
        >
          ← 返回
        </button>

        {/* celebration hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hero-card bg-gradient-to-br from-[#fbbf24] via-[#f59e0b] to-[#d97706] p-8 text-center text-white shadow-lg shadow-[#d97706]/20"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-4 ring-white/30"
          >
            <span className="text-5xl">🦆</span>
          </motion.div>
          <h1 className="text-2xl font-extrabold">🎉 恭喜毕业！</h1>
          <p className="mt-1 text-sm text-white/80">你的鹅已经长大啦！</p>
        </motion.div>

        {/* growth report */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="paper-card p-5"
        >
          <h2 className="mb-4 font-extrabold text-[#292524]">
            📊 你的理财成长报告
          </h2>
          <div className="space-y-2">
            {[
              {
                label: "匹配方案",
                value:
                  plan === "safe_goose"
                    ? "安全鹅计划"
                    : plan === "dream_account"
                      ? "梦想账户计划"
                      : "灵活金鹅计划",
                color: "text-[#d97706]",
              },
              { label: "存入金额", value: amount, color: "text-[#292524]" },
              { label: "每日金蛋", value: egg, color: "text-[#d97706]" },
              {
                label: "已学知识",
                value: "存款保险 · 复利 · 资产配置",
                color: "text-[#047857]",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-2xl bg-[#fefce8] px-4 py-3"
              >
                <span className="text-xs text-[#57534e]">{item.label}</span>
                <span className={`text-sm font-extrabold ${item.color}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <GooseProgress progress={85} dailyEgg={egg} amount={amount} />
          </div>
        </motion.div>

        {/* graduation message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="paper-card p-5 text-center"
        >
          <span className="text-3xl">🐾</span>
          <p className="mt-2 text-sm leading-relaxed text-[#292524] italic">
            &ldquo;生命中最美好的事情之所以发生，
            <br />
            是因为你做了你不敢做的事情。&rdquo;
          </p>
          <p className="mt-3 text-xs text-[#57534e]">
            理财是一辈子的习惯，这 7 天只是一个开始。
            <br />
            继续养鹅，你的金蛋会越下越多！
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col gap-3"
        >
          <button
            onClick={handleComplete}
            className="w-full rounded-full bg-[#92400e] py-4 text-lg font-extrabold text-white shadow-lg shadow-[#d97706]/30 transition-all active:scale-95 hover:bg-[#78350f]"
          >
            继续养鹅 🦆
          </button>
          <button
            onClick={() =>
              router.push(
                "/match?income=8k_12k&savings=5k_20k&goal=%E6%97%85%E8%A1%8C"
              )
            }
            className="w-full rounded-full border-2 border-[#e7dcc8] bg-white py-3 text-sm font-bold text-[#57534e] transition-all active:scale-95 hover:bg-[#f5f5f4]"
          >
            探索其他计划
          </button>
        </motion.div>

        <p className="text-center text-[10px] text-[#a8a29e]">
          理财有风险，投资需谨慎
        </p>
      </div>
    );
  }

  // ── Normal day (1-6) ──
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-[#a8a29e]"
        >
          ← 返回
        </button>
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-extrabold ${
            day.dayType === "summary"
              ? "bg-[#f5f5f4] text-[#a8a29e]"
              : "bg-[#fef3c7] text-[#92400e]"
          }`}
        >
          Day {day.id}
        </span>
      </div>

      {/* title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-xl font-extrabold text-[#292524]">{day.title}</h1>
        <p className="mt-0.5 text-sm text-[#d97706]">{day.subtitle}</p>
      </motion.div>

      {/* quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <QuoteCard quote={day.quote} author={day.quoteAuthor} />
      </motion.div>

      {/* task card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="paper-card p-5"
      >
        <h2 className="mb-3 flex items-center gap-1.5 text-sm font-extrabold text-[#292524]">
          <span>🎯</span> 今日任务
        </h2>
        <p className="mb-4 text-sm text-[#57534e]">{day.task}</p>

        <div className="space-y-2">
          {day.steps.map((step, i) => (
            <button
              key={i}
              onClick={() => toggleStep(i)}
              className={`flex w-full items-start gap-3 rounded-2xl p-3.5 text-left text-xs transition-all active:scale-[0.99] ${
                checkedSteps[i]
                  ? "bg-[#d1fae5] text-[#6b7280] line-through"
                  : "bg-[#f5efe0] text-[#292524] hover:bg-[#fef3c7]"
              }`}
            >
              <span
                className={`step-circle ${
                  checkedSteps[i]
                    ? "step-circle--complete"
                    : "step-circle--incomplete"
                }`}
              >
                {checkedSteps[i] ? "✓" : i + 1}
              </span>
              {step}
            </button>
          ))}
        </div>
      </motion.div>

      {/* product action hint */}
      {day.productAction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="ocean-tag flex items-center gap-1.5"
        >
          <span>📱</span> {day.productAction}
        </motion.div>
      )}

      {/* knowledge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-2xl bg-[#fefce8] p-4"
      >
        <h3 className="mb-1 flex items-center gap-1 text-sm font-extrabold text-[#92400e]">
          <span>💡</span> 理财小知识
        </h3>
        <p className="text-xs leading-relaxed text-[#57534e]">
          {day.knowledgePoint}
        </p>
      </motion.div>

      {/* goose progress (from Day 2) */}
      {day.id >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="paper-card p-5"
        >
          <GooseProgress
            progress={day.id * 12}
            dailyEgg={egg}
            amount={amount}
          />
        </motion.div>
      )}

      {/* complete button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={handleComplete}
          disabled={!allChecked}
          className={`w-full rounded-full py-4 text-lg font-extrabold transition-all active:scale-95 ${
            allChecked && !completed
              ? "bg-[#92400e] text-white shadow-lg shadow-[#d97706]/30 hover:bg-[#78350f]"
              : completed
                ? "bg-[#d1fae5] text-[#047857]"
                : "bg-[#e7e5e4] text-[#a8a29e] cursor-not-allowed"
          }`}
        >
          {completed
            ? "✅ 已完成"
            : allChecked
              ? "完成今日任务 →"
              : "请先完成所有步骤"}
        </button>
      </motion.div>

      <p className="text-center text-[10px] text-[#a8a29e]">
        理财有风险，投资需谨慎
      </p>
    </div>
  );
}
