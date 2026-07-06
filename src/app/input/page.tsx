"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const incomeOptions = [
  { value: "below_5k", label: "5K 以下" },
  { value: "5k_8k", label: "5K ~ 8K" },
  { value: "8k_12k", label: "8K ~ 12K" },
  { value: "above_12k", label: "12K 以上" },
];

const savingsOptions = [
  { value: "below_1k", label: "1K 以下" },
  { value: "1k_5k", label: "1K ~ 5K" },
  { value: "5k_20k", label: "5K ~ 20K" },
  { value: "above_20k", label: "20K 以上" },
];

type Step = "income" | "savings" | "goal" | "complete";

const messages: Record<Step, { assistant: string }> = {
  income: {
    assistant: "先认识一下吧！\n你一个月大概赚多少？",
  },
  savings: {
    assistant: "不错不错！\n那现在小金库里存了多少啦？",
  },
  goal: {
    assistant: "最后一个问题——\n你存钱最想用来做什么？",
  },
  complete: {
    assistant: "好嘞！让我帮你看看\n最适合你的理财计划...",
  },
};

export default function InputPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("income");
  const [income, setIncome] = useState("");
  const [savings, setSavings] = useState("");
  const [goal, setGoal] = useState("");

  const selectIncome = (val: string) => {
    setIncome(val);
    setStep("savings");
  };

  const selectSavings = (val: string) => {
    setSavings(val);
    setStep("goal");
  };

  const submitGoal = () => {
    if (!goal.trim()) return;
    setStep("complete");
    const params = new URLSearchParams({ income, savings, goal: goal.trim() });
    setTimeout(() => router.push(`/match?${params.toString()}`), 1500);
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* back */}
      <motion.button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-[#a8a29e]"
        whileTap={{ scale: 0.95 }}
      >
        ← 返回
      </motion.button>

      {/* chat area */}
      <div className="flex flex-col gap-5">
        {/* assistant bubble */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="dialog-bubble p-5"
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fefce8]">
                <span className="text-base">🐶</span>
              </div>
              <span className="text-xs font-extrabold text-[#92400e]">
                钱钱
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#292524] whitespace-pre-line">
              {messages[step].assistant}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* user response area */}
        <AnimatePresence mode="wait">
          {step === "income" && (
            <motion.div
              key="income"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 gap-2"
            >
              {incomeOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => selectIncome(opt.value)}
                  className="rounded-2xl border-2 border-[#e7dcc8] bg-white px-4 py-4 text-sm font-bold text-[#57534e] transition-all active:scale-95 hover:border-[#fbbf24]"
                >
                  {opt.label}
                </button>
              ))}
            </motion.div>
          )}

          {step === "savings" && (
            <motion.div
              key="savings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 gap-2"
            >
              {savingsOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => selectSavings(opt.value)}
                  className="rounded-2xl border-2 border-[#e7dcc8] bg-white px-4 py-4 text-sm font-bold text-[#57534e] transition-all active:scale-95 hover:border-[#fbbf24]"
                >
                  {opt.label}
                </button>
              ))}
            </motion.div>
          )}

          {step === "goal" && (
            <motion.div
              key="goal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-2"
            >
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitGoal()}
                placeholder="比如：攒钱去日本旅行..."
                className="w-full rounded-2xl border-2 border-[#e7dcc8] bg-white px-4 py-4 text-sm text-[#292524] placeholder:text-[#a8a29e] outline-none transition-all focus:border-[#fbbf24] focus:ring-4 focus:ring-[#fef3c7]"
                autoFocus
              />
              <button
                onClick={submitGoal}
                disabled={!goal.trim()}
                className={`rounded-2xl py-3.5 text-sm font-extrabold transition-all active:scale-95 ${
                  goal.trim()
                    ? "bg-[#92400e] text-white shadow-md"
                    : "bg-[#e7e5e4] text-[#a8a29e] cursor-not-allowed"
                }`}
              >
                好的，帮我看看 →
              </button>
            </motion.div>
          )}

          {step === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mx-auto mb-3 text-3xl"
              >
                🔍
              </motion.div>
              <p className="text-sm text-[#57534e]">正在分析你的情况...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
