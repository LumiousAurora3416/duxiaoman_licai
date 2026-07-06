"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PlanModal from "@/components/PlanModal";

const concepts = [
  { id: "safe_goose", icon: "🦆", label: "养鹅计划", desc: "本金安全增值" },
  { id: "dream_account", icon: "🎯", label: "梦想账户", desc: "为目标存钱" },
  { id: "flexible_goose", icon: "💧", label: "灵活金鹅", desc: "应急储备" },
];

export default function HomePage() {
  const [activePlan, setActivePlan] = useState<string | null>(null);

  return (
    <>
      <div className="flex min-h-[calc(100dvh-6rem)] flex-col items-center justify-between">
        <div className="flex-1" />

        <div className="flex flex-col items-center text-center">
          {/* goose mascot in a warm circle */}
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
            className="mb-4"
          >
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#fbbf24] to-[#d97706] shadow-lg shadow-[#d97706]/20 ring-4 ring-[#fde68a]">
              <span className="text-5xl">🦆</span>
            </div>
          </motion.div>

          {/* headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-1 text-3xl font-extrabold text-[#292524]"
          >
            你的理财翻译官
          </motion.h1>

          {/* subtitle with wavy highlight */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 max-w-[260px] text-sm leading-relaxed text-[#57534e]"
          >
            用 <span className="highlight-wavy font-bold text-[#292524]">《小狗钱钱》</span> 的故事，
            <br />
            不用懂术语，也能轻松迈出
            <span className="highlight-wavy font-bold text-[#292524]">
              理财第一步
            </span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <Link
              href="/input"
              className="inline-flex items-center gap-2 rounded-full bg-[#92400e] px-10 py-4 text-lg font-bold text-white shadow-lg shadow-[#d97706]/30 transition-all active:scale-95 hover:bg-[#78350f]"
            >
              开始旅程
              <span className="text-xl">→</span>
            </Link>
          </motion.div>

          {/* three clickable plan cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 grid grid-cols-3 gap-3 w-full max-w-xs"
          >
            {concepts.map((c, i) => (
              <motion.button
                key={c.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 + i * 0.1 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setActivePlan(c.id)}
                className="paper-card flex flex-col items-center gap-1.5 px-2 py-4 transition-all hover:shadow-md active:shadow-sm"
              >
                <span className="text-2xl">{c.icon}</span>
                <span className="text-xs font-bold text-[#292524]">
                  {c.label}
                </span>
                <span className="text-[10px] text-[#a8a29e]">{c.desc}</span>
              </motion.button>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-3 text-[10px] text-[#a8a29e]"
          >
            👆 点击了解每个计划
          </motion.p>
        </div>

        {/* footer */}
        <div className="mt-auto pt-8">
          <p className="text-[10px] text-[#a8a29e]">
            理财有风险，投资需谨慎
          </p>
        </div>
      </div>

      <PlanModal planId={activePlan} onClose={() => setActivePlan(null)} />
    </>
  );
}
