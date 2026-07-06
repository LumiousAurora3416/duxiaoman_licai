"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Mascot from "@/components/Mascot";

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
        className="flex w-fit items-center gap-1 text-sm text-[#b0a08a]"
      >
        ← 返回
      </button>

      {/* header cloud with map-reading mascot */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="cloud px-5 py-5 pr-24">
          <h1 className="font-hand text-2xl text-[#78350f]">先认识一下你</h1>
          <p className="mt-2 text-xs leading-relaxed text-[#7c6a55]">
            告诉我你的情况，帮你找到
            <span className="hl font-bold text-[#78350f]">最适合</span>
            的理财计划
          </p>
        </div>
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="pointer-events-none absolute -right-1 -top-6"
        >
          <Mascot name="map" size={96} priority />
        </motion.div>
      </motion.div>

      {/* income */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col gap-2.5"
      >
        <label className="flex items-center gap-1.5 font-hand text-base text-[#78350f]">
          <span className="text-lg">💰</span> 你的月收入大概是多少？
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {incomeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setIncome(opt.value)}
              className={`rounded-2xl border-2 px-4 py-3 text-sm font-bold transition-all active:scale-95 ${
                income === opt.value
                  ? "border-[#d97706] bg-[#fef3c7] text-[#92400e] shadow-sm"
                  : "border-[#f3e2b8] bg-[#fffdf7] text-[#7c6a55] hover:border-[#fbbf24]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* savings */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-2.5"
      >
        <label className="flex items-center gap-1.5 font-hand text-base text-[#78350f]">
          <span className="text-lg">🐷</span> 你目前有多少存款？
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {savingsOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSavings(opt.value)}
              className={`rounded-2xl border-2 px-4 py-3 text-sm font-bold transition-all active:scale-95 ${
                savings === opt.value
                  ? "border-[#d97706] bg-[#fef3c7] text-[#92400e] shadow-sm"
                  : "border-[#f3e2b8] bg-[#fffdf7] text-[#7c6a55] hover:border-[#fbbf24]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* goal */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-2.5"
      >
        <label className="flex items-center gap-1.5 font-hand text-base text-[#78350f]">
          <span className="text-lg">✨</span> 你的理财目标是什么？
        </label>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="比如：攒钱去日本旅行 / 存买房首付"
          className="w-full rounded-2xl border-2 border-[#f3e2b8] bg-[#fffdf7] px-4 py-3.5 text-sm text-[#4a3b2a] placeholder:text-[#b0a08a] outline-none transition-all focus:border-[#fbbf24] focus:ring-4 focus:ring-[#fef3c7]"
        />
      </motion.div>

      {/* submit */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="mt-1"
      >
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="btn-primary w-full py-4 text-lg"
        >
          <span className="font-hand">看看我的鹅</span> 🦢
        </button>
      </motion.div>

      <p className="text-center text-[10px] text-[#b0a08a]">
        理财有风险，投资需谨慎
      </p>
    </div>
  );
}
