"use client";

import { motion } from "framer-motion";
import type { DayContent } from "@/data/journey";

interface DayTimelineProps {
  days: DayContent[];
  currentDay: number;
  completedDays: number[];
  onDayClick: (dayId: number) => void;
}

const dayIcons: Record<number, string> = {
  1: "🪺",
  2: "🥚",
  3: "🐣",
  4: "🐥",
  5: "📸",
  6: "📋",
  7: "🎓",
};

export default function DayTimeline({
  days,
  currentDay,
  completedDays,
  onDayClick,
}: DayTimelineProps) {
  return (
    <div className="relative">
      {/* vertical dashed line */}
      <div className="dash-line absolute left-[28px] top-0 bottom-0" />

      <div className="flex flex-col gap-3">
        {days.map((day, index) => {
          const isCompleted = completedDays.includes(day.id);
          const isCurrent = day.id === currentDay;

          return (
            <motion.button
              key={day.id}
              onClick={() => onDayClick(day.id)}
              className={`card-soft relative flex w-full items-start gap-4 p-4 text-left transition-all active:scale-[0.98] ${
                isCurrent
                  ? "ring-2 ring-[#fbbf24] ring-offset-2 ring-offset-[#fffbf0]"
                  : ""
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* icon */}
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 text-lg ${
                  isCompleted
                    ? "border-[#a7f3d0] bg-[#d1fae5]"
                    : isCurrent
                      ? "border-[#fcd34d] bg-[#fef3c7]"
                      : "border-[#f0e0bc] bg-[#fffbeb]"
                }`}
              >
                {isCompleted ? "✅" : dayIcons[day.id] || "📌"}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-hand text-sm ${
                      isCompleted
                        ? "text-[#047857]"
                        : isCurrent
                          ? "text-[#92400e]"
                          : "text-[#b0a08a]"
                    }`}
                  >
                    Day {day.id}
                  </span>
                  {isCompleted && (
                    <span className="rounded-full bg-[#d1fae5] px-2.5 py-0.5 text-[10px] font-bold text-[#047857]">
                      已完成
                    </span>
                  )}
                  {isCurrent && !isCompleted && (
                    <span className="rounded-full bg-[#fef3c7] px-2.5 py-0.5 text-[10px] font-bold text-[#92400e]">
                      进行中
                    </span>
                  )}
                </div>
                <h3 className="font-hand text-base text-[#5c4a35]">
                  {day.title}
                </h3>
                {!isCompleted && (
                  <p className="mt-0.5 line-clamp-1 text-[11px] text-[#b0a08a]">
                    {day.task}
                  </p>
                )}
              </div>

              <span className="shrink-0 self-center text-lg text-[#d6c9a8]">
                →
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
