"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { DayContent as DayType, PlanType } from "@/data/journey";
import QuoteCard from "@/components/QuoteCard";
import GooseProgress from "@/components/GooseProgress";

interface Props {
  day: DayType;
  plan: PlanType;
  amount: string;
  egg: string;
}

const planTheme: Record<
  PlanType,
  { accent: string; bg: string; tag: string; btn: string }
> = {
  safe_goose: {
    accent: "text-[#d97706]",
    bg: "bg-[#fefce8]",
    tag: "bg-[#fef3c7] text-[#92400e]",
    btn: "bg-[#92400e] hover:bg-[#78350f]",
  },
  dream_account: {
    accent: "text-[#2563eb]",
    bg: "bg-[#eff6ff]",
    tag: "bg-[#dbeafe] text-[#1e40af]",
    btn: "bg-[#1d4ed8] hover:bg-[#1e40af]",
  },
  flexible_goose: {
    accent: "text-[#059669]",
    bg: "bg-[#ecfdf5]",
    tag: "bg-[#d1fae5] text-[#047857]",
    btn: "bg-[#047857] hover:bg-[#065f46]",
  },
};

export default function DayContent({ day, plan, amount, egg }: Props) {
  const router = useRouter();
  const theme = planTheme[plan];
  const [completed, setCompleted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>(
    day.steps.map(() => false)
  );

  const isDay7 = day.id === 7;
  const allChecked = checkedSteps.every(Boolean);

  const toggleStep = (i: number) => {
    const next = [...checkedSteps];
    next[i] = !next[i];
    setCheckedSteps(next);
  };

  const saveProgress = () => {
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

    if (day.tomorrowPreview && !isDay7) {
      setShowPreview(true);
    } else {
      setTimeout(
        () =>
          router.push(
            `/journey?plan=${plan}&amount=${encodeURIComponent(amount)}&egg=${encodeURIComponent(egg)}`
          ),
        600
      );
    }
  };

  const goToJourney = () => {
    router.push(
      `/journey?plan=${plan}&amount=${encodeURIComponent(amount)}&egg=${encodeURIComponent(egg)}`
    );
  };

  // ── Day 7 graduation ──
  if (isDay7) {
    return (
      <div className="flex flex-col gap-5">
        <button onClick={goToJourney} className="flex items-center gap-1 text-sm text-[#a8a29e]">
          ← 返回
        </button>
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hero-card bg-gradient-to-br from-[#fbbf24] via-[#f59e0b] to-[#d97706] p-8 text-center text-white shadow-lg"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-4 ring-white/30"
          >
            <span className="text-5xl">🦆</span>
          </motion.div>
          <h1 className="text-2xl font-extrabold">🎉 恭喜毕业！</h1>
          <p className="mt-1 text-sm text-white/80">你的努力有了成果！</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="paper-card p-5"
        >
          <h2 className="mb-4 font-extrabold text-[#292524]">📊 成长报告</h2>
          <div className="space-y-2">
            {[
              { label: "匹配方案", value: planName(plan), color: theme.accent },
              { label: "存入金额", value: amount, color: "text-[#292524]" },
              { label: "每日收益", value: egg, color: theme.accent },
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="paper-card p-5 text-center"
        >
          <p className="text-sm leading-relaxed text-[#292524] italic">
            &ldquo;生命中最美好的事情之所以发生，
            <br />是因为你做了你不敢做的事情。&rdquo;
          </p>
          <p className="mt-3 text-xs text-[#57534e]">
            理财是一辈子的习惯，这 7 天只是一个开始 🐾
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col gap-3"
        >
          <button
            onClick={goToJourney}
            className={`w-full rounded-full ${theme.btn} py-4 text-lg font-extrabold text-white shadow-lg transition-all active:scale-95`}
          >
            继续养鹅 🦆
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full rounded-full border-2 border-[#e7dcc8] bg-white py-3 text-sm font-bold text-[#57534e] transition-all active:scale-95 hover:bg-[#f5f5f4]"
          >
            探索其他计划
          </button>
        </motion.div>
        <p className="text-center text-[10px] text-[#a8a29e]">理财有风险，投资需谨慎</p>
      </div>
    );
  }

  // ── Normal day: three-part structure ──
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <button onClick={goToJourney} className="flex items-center gap-1 text-sm text-[#a8a29e]">
          ← 返回
        </button>
        <span className={`rounded-full px-3 py-1 text-[11px] font-extrabold ${theme.tag}`}>
          Day {day.id} / 7
        </span>
      </div>

      {/* Part 1: 📖 故事时间 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">📖</span>
          <span className="text-xs font-extrabold text-[#a8a29e] tracking-wider">故 事 时 间</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#292524]">{day.title}</h1>
        <p className={`mt-0.5 text-sm ${theme.accent} font-bold`}>
          {day.subtitle}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <QuoteCard quote={day.quote} author="《小狗钱钱》" />
      </motion.div>

      {/* Part 2: 💡 理财小知识 (moved before action for "story→knowledge→action" flow) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">💡</span>
          <span className="text-xs font-extrabold text-[#a8a29e] tracking-wider">理 财 小 知 识</span>
        </div>
        <div className={`rounded-2xl ${theme.bg} p-4`}>
          <p className="text-xs leading-relaxed text-[#57534e]">
            {day.knowledgePoint}
          </p>
        </div>
      </motion.div>

      {/* Part 3: 🎯 今日行动 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="paper-card p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🎯</span>
          <span className="text-xs font-extrabold text-[#a8a29e] tracking-wider">今 日 行 动</span>
        </div>
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

        {day.productAction && (
          <div className="mt-4 rounded-2xl bg-gradient-to-r from-[#eff6ff] to-[#dbeafe] p-3">
            <p className="flex items-center gap-1.5 text-xs font-bold text-[#1e40af]">
              <span>📱</span> {day.productAction}
            </p>
          </div>
        )}
      </motion.div>

      {/* goose progress */}
      {day.id >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="paper-card p-5"
        >
          <GooseProgress progress={day.id * 12} dailyEgg={egg} amount={amount} />
        </motion.div>
      )}

      {/* complete button or tomorrow preview */}
      <AnimatePresence mode="wait">
        {showPreview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-gradient-to-r from-[#fef3c7] to-[#fde68a] p-5 text-center"
          >
            <p className="text-xs font-extrabold text-[#92400e]">👀 明日预告</p>
            <p className="mt-1 text-sm text-[#78350f]">
              {day.tomorrowPreview}
            </p>
            <button
              onClick={goToJourney}
              className={`mt-3 rounded-full ${theme.btn} px-8 py-2.5 text-sm font-extrabold text-white shadow transition-all active:scale-95`}
            >
              知道了，回时间线 →
            </button>
          </motion.div>
        ) : (
          <motion.div key="button" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button
              onClick={saveProgress}
              disabled={!allChecked || completed}
              className={`w-full rounded-full py-4 text-lg font-extrabold transition-all active:scale-95 ${
                completed
                  ? "bg-[#d1fae5] text-[#047857]"
                  : allChecked
                    ? `${theme.btn} text-white shadow-lg`
                    : "bg-[#e7e5e4] text-[#a8a29e] cursor-not-allowed"
              }`}
            >
              {completed ? "✅ 已完成" : allChecked ? "完成今日任务 →" : "请先完成所有步骤"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-[10px] text-[#a8a29e]">理财有风险，投资需谨慎</p>
    </div>
  );
}

function planName(p: PlanType): string {
  return { safe_goose: "安全鹅计划", dream_account: "梦想账户计划", flexible_goose: "灵活金鹅计划" }[p];
}
