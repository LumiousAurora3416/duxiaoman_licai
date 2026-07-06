"use client";

import { motion } from "framer-motion";
import Mascot from "@/components/Mascot";

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
  const clamped = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full space-y-3">
      {/* goose walking along the track */}
      <div className="relative h-16">
        <motion.div
          className="absolute bottom-0 flex flex-col items-center"
          initial={{ left: 0 }}
          animate={{ left: `calc(${Math.min(clamped, 82)}%)` }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <Mascot name="goose" size={54} shape="circle" />
          </motion.div>
        </motion.div>
        {clamped > 28 && (
          <motion.span
            className="absolute -top-1 right-2 text-2xl"
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.8, type: "spring" }}
          >
            🥚
          </motion.span>
        )}
      </div>

      {/* track */}
      <div className="relative h-6 w-full overflow-hidden rounded-full bg-[#fef3c7] shadow-[inset_0_2px_4px_rgba(180,120,40,0.15)]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#fbbf24] to-[#d97706]"
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        {clamped > 15 && (
          <motion.span
            className="absolute top-1/2 -translate-y-1/2 text-xs"
            style={{ left: `calc(${clamped}% - 10px)` }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.8 }}
          >
            ✨
          </motion.span>
        )}
      </div>

      {/* stats */}
      <div className="flex justify-between text-xs text-[#7c6a55]">
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
