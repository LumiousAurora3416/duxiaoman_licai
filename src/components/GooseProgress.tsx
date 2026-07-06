"use client";

import { motion } from "framer-motion";

interface GooseProgressProps {
  progress: number;
  dailyEgg?: string;
  amount?: string;
}

export default function GooseProgress({
  progress,
  dailyEgg,
  amount,
}: GooseProgressProps) {
  return (
    <div className="w-full space-y-3">
      {/* goose */}
      <div className="relative flex items-center justify-between px-2">
        <motion.div
          className="flex flex-col items-center"
          animate={{ x: `${Math.min(progress, 85)}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fefce8] shadow-md ring-2 ring-[#fde68a]">
            <span className="text-2xl">🦆</span>
          </div>
          <span className="mt-1 text-[10px] font-extrabold text-[#92400e]">
            你的鹅
          </span>
        </motion.div>
        {progress > 30 && (
          <motion.div
            className="absolute top-0 right-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
          >
            <span className="text-2xl">🥚</span>
          </motion.div>
        )}
      </div>

      {/* track */}
      <div className="relative h-6 w-full overflow-hidden rounded-full bg-[#fef3c7] shadow-inner">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#fbbf24] to-[#d97706]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {progress > 20 && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 text-xs"
            style={{ left: `calc(${progress}% - 8px)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
          >
            ✨
          </motion.div>
        )}
      </div>

      {/* stats */}
      <div className="flex justify-between text-xs text-[#57534e]">
        <span>
          鹅的体重：
          <strong className="text-[#92400e]">{amount || "0 元"}</strong>
        </span>
        {dailyEgg && (
          <span>
            每日金蛋：
            <strong className="text-[#92400e]">{dailyEgg}</strong>
          </span>
        )}
      </div>
    </div>
  );
}
