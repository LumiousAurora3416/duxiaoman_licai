"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import journeyDays from "@/data/journey";
import DayTimeline from "@/components/DayTimeline";

function useStoredCompleted(): [number[], (days: number[]) => void] {
  const [completed, setCompleted] = useState<number[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem("goose_completed_days");
    if (stored) {
      try {
        setCompleted(JSON.parse(stored));
      } catch {
        /* ignore */
      }
    }
  }, []);
  const saveCompleted = (days: number[]) => {
    setCompleted(days);
    localStorage.setItem("goose_completed_days", JSON.stringify(days));
  };
  return [completed, saveCompleted];
}

export default function JourneyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [completed] = useStoredCompleted();

  const plan = searchParams.get("plan") ?? "safe_goose";
  const amount = searchParams.get("amount") ?? "1,000 元";
  const egg = searchParams.get("egg") ?? "0.10 元";

  const currentDay =
    journeyDays.find((d) => !completed.includes(d.id))?.id ?? 7;

  const handleDayClick = (dayId: number) => {
    const params = new URLSearchParams({ plan, amount, egg });
    router.push(`/day/${dayId}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-[#a8a29e]"
        >
          ← 返回
        </button>
        <h1 className="text-xl font-extrabold text-[#292524]">7 天成长之旅</h1>
        <p className="text-xs text-[#57534e]">
          已完成 {completed.length}/7 天 · 继续加油！
        </p>
      </motion.div>

      {/* progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="paper-card p-5"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-extrabold text-[#292524]">
            🪺 鹅的成长进度
          </span>
          <span className="rounded-full bg-[#fef3c7] px-3 py-1 text-xs font-extrabold text-[#92400e]">
            {Math.round((completed.length / 7) * 100)}%
          </span>
        </div>

        <div className="mb-3 h-4 w-full overflow-hidden rounded-full bg-[#fef3c7]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#fbbf24] to-[#d97706]"
            initial={{ width: 0 }}
            animate={{ width: `${(completed.length / 7) * 100}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] text-[#a8a29e]">
          <span>🦆 鹅宝宝</span>
          <span>💰 存入 {amount}</span>
          <span>🥚 日收益 {egg}</span>
        </div>
      </motion.div>

      <DayTimeline
        days={journeyDays}
        currentDay={currentDay}
        completedDays={completed}
        onDayClick={handleDayClick}
      />
    </div>
  );
}
