"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { DayContent as DayType } from "@/data/journey";
import QuoteCard from "@/components/QuoteCard";
import GooseProgress from "@/components/GooseProgress";
import Mascot from "@/components/Mascot";

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
          className="flex w-fit items-center gap-1 text-sm text-[#b0a08a]"
        >
          ← 返回
        </button>

        {/* celebration hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-[26px] border-2 border-[#f0b445] bg-gradient-to-br from-[#fcd34d] via-[#f59e0b] to-[#d97706] p-6 text-center text-white shadow-[0_10px_24px_rgba(217,119,6,0.25)]"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mx-auto mb-2 w-fit"
          >
            <Mascot name="celebrate" size={130} shape="circle" priority />
          </motion.div>
          <h1 className="font-hand text-3xl">🎉 恭喜毕业！</h1>
          <p className="mt-1 text-sm text-white/90">你的鹅已经长大啦！</p>
        </motion.div>

        {/* growth report */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-soft p-5"
        >
          <h2 className="mb-4 flex items-center gap-1.5 font-hand text-lg text-[#78350f]">
            <span>📊</span> 你的理财成长报告
          </h2>
          <div className="flex flex-col gap-2">
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
              { label: "存入金额", value: amount, color: "text-[#5c4a35]" },
              { label: "每日金蛋", value: egg, color: "text-[#d97706]" },
              {
                label: "已学知识",
                value: "存款保险 · 复利 · 资产配置",
                color: "text-[#047857]",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-2xl border-2 border-[#f3e2b8] bg-[#fffbeb] px-4 py-3"
              >
                <span className="text-xs text-[#7c6a55]">{item.label}</span>
                <span className={`text-sm font-bold ${item.color}`}>
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
          className="cloud px-5 py-5 text-center"
        >
          <p className="font-hand text-base leading-relaxed text-[#78350f]">
            &ldquo;生命中最美好的事情之所以发生，
            <br />
            是因为你做了你不敢做的事情。&rdquo;
          </p>
          <p className="mt-3 text-xs leading-relaxed text-[#7c6a55]">
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
            className="btn-primary w-full py-4 text-lg"
          >
            <span className="font-hand">继续养鹅</span> 🦢
          </button>
          <button
            onClick={() =>
              router.push(
                "/match?income=8k_12k&savings=5k_20k&goal=%E6%97%85%E8%A1%8C"
              )
            }
            className="btn-ghost w-full py-3 text-sm"
          >
            探索其他计划
          </button>
        </motion.div>

        <p className="text-center text-[10px] text-[#b0a08a]">
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
          className="flex items-center gap-1 text-sm text-[#b0a08a]"
        >
          ← 返回
        </button>
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-bold ${
            day.dayType === "summary"
              ? "bg-[#f0e4c8] text-[#b0a08a]"
              : "bg-[#fef3c7] text-[#92400e]"
          }`}
        >
          Day {day.id}
        </span>
      </div>

      {/* title */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-hand text-2xl text-[#78350f]">{day.title}</h1>
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
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-soft p-5"
      >
        <h2 className="mb-3 flex items-center gap-1.5 font-hand text-lg text-[#78350f]">
          <span>🎯</span> 今日任务
        </h2>
        <p className="mb-4 text-sm text-[#7c6a55]">{day.task}</p>

        <div className="flex flex-col gap-2">
          {day.steps.map((step, i) => (
            <button
              key={i}
              onClick={() => toggleStep(i)}
              className={`flex w-full items-start gap-3 rounded-2xl p-3.5 text-left text-xs transition-all active:scale-[0.99] ${
                checkedSteps[i]
                  ? "bg-[#d1fae5] text-[#6b7280] line-through"
                  : "bg-[#fffbeb] text-[#5c4a35] hover:bg-[#fef3c7]"
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
          className="chip-ocean flex items-center gap-1.5 px-4 py-3 text-xs"
        >
          <span>📱</span> {day.productAction}
        </motion.div>
      )}

      {/* knowledge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-2xl border-2 border-[#fcd34d] bg-[#fffbeb] p-4"
      >
        <h3 className="mb-1 flex items-center gap-1 font-hand text-base text-[#92400e]">
          <span>💡</span> 理财小知识
        </h3>
        <p className="text-xs leading-relaxed text-[#7c6a55]">
          {day.knowledgePoint}
        </p>
      </motion.div>

      {/* goose progress (from Day 2) */}
      {day.id >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="card-soft p-5"
        >
          <GooseProgress progress={day.id * 12} dailyEgg={egg} amount={amount} />
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
          disabled={!allChecked || completed}
          className={`w-full py-4 text-lg ${
            completed
              ? "rounded-full bg-[#d1fae5] font-bold text-[#047857]"
              : "btn-primary"
          }`}
        >
          <span className="font-hand">
            {completed
              ? "✅ 已完成"
              : allChecked
                ? "完成今日任务 →"
                : "请先完成所有步骤"}
          </span>
        </button>
      </motion.div>

      <p className="text-center text-[10px] text-[#b0a08a]">
        理财有风险，投资需谨慎
      </p>
    </div>
  );
}
