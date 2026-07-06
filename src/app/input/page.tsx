"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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

export default function InputPage() {
  const router = useRouter();
  const [income, setIncome] = useState("");
  const [savings, setSavings] = useState("");
  const [goal, setGoal] = useState("");

  const canSubmit = income && savings && goal.trim();

  const handleSubmit = () => {
    if (!canSubmit) return;
    const params = new URLSearchParams({ income, savings, goal: goal.trim() });
    router.push(`/match?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-[#a8a29e]"
      >
        ← 返回
      </button>

      {/* header card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="paper-card p-5 text-center"
      >
        <div className="mb-2 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fefce8]">
            <span className="text-xl">🐶</span>
          </div>
          <span className="text-lg text-[#a8a29e]">+</span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fefce8]">
            <span className="text-xl">🦆</span>
          </div>
        </div>
        <h1 className="text-xl font-extrabold text-[#292524]">先认识一下你</h1>
        <p className="mt-1 text-xs text-[#57534e]">
          让我了解你的情况，帮你找到
          <span className="highlight-wavy font-extrabold text-[#292524]">
            最适合
          </span>
          的理财计划
        </p>
      </motion.div>

      {/* income */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <label className="text-sm font-extrabold text-[#292524]">
          你的月收入大概是多少？
        </label>
        <div className="grid grid-cols-2 gap-2">
          {incomeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setIncome(opt.value)}
              className={`rounded-2xl border-2 px-4 py-3 text-sm font-bold transition-all active:scale-95 ${
                income === opt.value
                  ? "border-[#d97706] bg-[#fefce8] text-[#92400e] shadow-sm"
                  : "border-[#e7dcc8] bg-white text-[#57534e] hover:border-[#fbbf24]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* savings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <label className="text-sm font-extrabold text-[#292524]">
          你目前有多少存款？
        </label>
        <div className="grid grid-cols-2 gap-2">
          {savingsOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSavings(opt.value)}
              className={`rounded-2xl border-2 px-4 py-3 text-sm font-bold transition-all active:scale-95 ${
                savings === opt.value
                  ? "border-[#d97706] bg-[#fefce8] text-[#92400e] shadow-sm"
                  : "border-[#e7dcc8] bg-white text-[#57534e] hover:border-[#fbbf24]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* goal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <label className="text-sm font-extrabold text-[#292524]">
          你的理财目标是什么？
        </label>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="比如：攒钱去日本旅行 / 存买房首付"
          className="w-full rounded-2xl border-2 border-[#e7dcc8] bg-white px-4 py-3 text-sm text-[#292524] placeholder:text-[#a8a29e] outline-none transition-all focus:border-[#fbbf24] focus:ring-4 focus:ring-[#fef3c7]"
        />
      </motion.div>

      {/* submit */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-1"
      >
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-full rounded-full py-4 text-lg font-extrabold transition-all active:scale-95 ${
            canSubmit
              ? "bg-[#92400e] text-white shadow-lg shadow-[#d97706]/30 hover:bg-[#78350f]"
              : "bg-[#e7e5e4] text-[#a8a29e] cursor-not-allowed"
          }`}
        >
          看看我的鹅 🦆
        </button>
      </motion.div>

      <p className="text-center text-[10px] text-[#a8a29e]">
        理财有风险，投资需谨慎
      </p>
    </div>
  );
}
