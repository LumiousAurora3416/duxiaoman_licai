"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PlanModal from "@/components/PlanModal";
import Mascot from "@/components/Mascot";

const concepts = [
  { id: "safe_goose", emoji: "🦢", label: "养鹅计划", desc: "本金安全增值" },
  { id: "dream_account", emoji: "🎯", label: "梦想账户", desc: "为目标存钱" },
  { id: "flexible_goose", emoji: "💧", label: "灵活金鹅", desc: "应急储备" },
];

export default function HomePage() {
  const [activePlan, setActivePlan] = useState<string | null>(null);

  return (
    <>
      <div className="flex min-h-[calc(100dvh-6rem)] flex-col">
        {/* brand row */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 pt-1"
        >
          <span className="chip-ocean px-3 py-1 text-[11px]">度小满</span>
          <span className="text-xs text-[#b0a08a]">×</span>
          <span className="rounded-[14px] border-2 border-[#fcd34d] bg-[#fffbeb] px-3 py-1 text-[11px] font-bold text-[#b45309]">
            《小狗钱钱》
          </span>
        </motion.div>

        {/* headline cloud bubble */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="cloud cloud-tail mt-6 px-6 py-6 text-center"
        >
          <h1 className="font-hand text-[28px] leading-snug text-[#78350f]">
            你的{" "}
            <span className="underline-wavy text-[#1e3a8a]">理财翻译官</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#7c6a55]">
            不用懂任何术语，只需会讲故事
            <br />
            用 <span className="hl font-bold text-[#78350f]">《小狗钱钱》</span>{" "}
            的故事，
            <br />
            轻松迈出{" "}
            <span className="hl-blue font-bold text-[#1e3a8a]">
              理财第一步
            </span>
          </p>
        </motion.div>

        {/* mascot */}
        <motion.div
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 13, delay: 0.3 }}
          className="mt-2 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Mascot name="wave" size={190} priority />
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-2 flex justify-center"
        >
          <Link
            href="/input"
            className="btn-primary inline-flex items-center gap-2 px-12 py-4 text-lg"
          >
            <span className="font-hand">开始旅程</span>
            <span className="text-xl">→</span>
          </Link>
        </motion.div>

        {/* three plan cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <p className="mb-3 text-center text-xs text-[#b0a08a]">
            三个陪你成长的小计划 · 点击了解
          </p>
          <div className="grid grid-cols-3 gap-3">
            {concepts.map((c, i) => (
              <motion.button
                key={c.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setActivePlan(c.id)}
                className="card-soft flex flex-col items-center gap-1.5 px-2 py-4 transition-transform hover:-translate-y-0.5"
              >
                <span className="text-3xl">{c.emoji}</span>
                <span className="font-hand text-sm text-[#78350f]">
                  {c.label}
                </span>
                <span className="text-[10px] leading-tight text-[#b0a08a]">
                  {c.desc}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="mt-auto pt-8 text-center">
          <p className="text-[10px] text-[#b0a08a]">理财有风险，投资需谨慎</p>
        </div>
      </div>

      <PlanModal planId={activePlan} onClose={() => setActivePlan(null)} />
    </>
  );
}
