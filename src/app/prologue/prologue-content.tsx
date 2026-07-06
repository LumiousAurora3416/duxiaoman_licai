"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getJourneyDays, type PlanType } from "@/data/journey";

interface Props {
  plan: string;
  amount: string;
  egg: string;
  goal: string;
}

const planMeta: Record<PlanType, { icon: string; name: string; color: string; desc: string }> = {
  safe_goose: {
    icon: "🦆",
    name: "安全鹅计划",
    color: "from-[#fbbf24] to-[#d97706]",
    desc: "稳稳养大你的鹅，让它每天下金蛋",
  },
  dream_account: {
    icon: "🎯",
    name: "梦想账户计划",
    color: "from-[#60a5fa] to-[#2563eb]",
    desc: "给每个梦想一个专用的储蓄罐",
  },
  flexible_goose: {
    icon: "💧",
    name: "灵活金鹅计划",
    color: "from-[#34d399] to-[#10b981]",
    desc: "先建好安全网，再想怎么飞",
  },
};

const dayPreviews: Record<PlanType, string[]> = {
  safe_goose: [
    "认识你的鹅——开通账户",
    "下第一颗金蛋——首次买入",
    "让鹅自动长大——设置定存",
    "把鹅养在安全的地方——存款保险",
    "看你的鹅下蛋——查看收益",
    "别打扰鹅睡觉——长期持有",
    "鹅长大了！——毕业典礼",
  ],
  dream_account: [
    "写下你的梦想——明确目标",
    "给梦想定价——量化拆解",
    "开一个梦想储蓄罐——开通定投",
    "第一次投喂梦想——首次扣款",
    "梦想进度条——跟踪进度",
    "灵活调整——优化计划",
    "你的梦想路线图——毕业典礼",
  ],
  flexible_goose: [
    "算算你的过冬口粮——计算储备",
    "开一个灵活小钱包——开通货基",
    "存入口粮钱——首次转入",
    "灵活金鹅也会下蛋——查看收益",
    "分清想要和需要——优化支出",
    "调整储备比例——优化储备",
    "你的安全网建好了——毕业典礼",
  ],
};

export default function PrologueContent({ plan, amount, egg, goal }: Props) {
  const router = useRouter();
  const pt = plan as PlanType;
  const meta = planMeta[pt] || planMeta.safe_goose;
  const days = getJourneyDays(pt);
  const previews = dayPreviews[pt] || dayPreviews.safe_goose;

  const handleStart = () => {
    router.push(
      `/journey?plan=${plan}&amount=${encodeURIComponent(amount)}&egg=${encodeURIComponent(egg)}`
    );
  };

  return (
    <div className="flex flex-col gap-6 py-4">
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
        className={`hero-card bg-gradient-to-br ${meta.color} p-6 text-center text-white shadow-lg`}
      >
        <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-4 ring-white/30">
          <span className="text-3xl">{meta.icon}</span>
        </div>
        <h1 className="text-xl font-extrabold">{meta.name}</h1>
        <p className="mt-1 text-sm text-white/80">{meta.desc}</p>
      </motion.div>

      {/* what to expect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="paper-card p-5"
      >
        <h2 className="mb-1 text-sm font-extrabold text-[#292524]">
          接下来的 7 天，你将...
        </h2>
        <p className="mb-4 text-xs text-[#a8a29e]">
          每天只需 3-5 分钟，陪你从零开始
        </p>

        <div className="space-y-1.5">
          {days.map((day, i) => (
            <motion.div
              key={day.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="flex items-center gap-3 rounded-xl bg-[#f5efe0] px-3.5 py-2.5"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fef3c7] text-[10px] font-extrabold text-[#92400e]">
                {day.id}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-extrabold text-[#292524]">
                  {day.title}
                </p>
                <p className="text-[10px] text-[#a8a29e] line-clamp-1">
                  {previews[i]}
                </p>
              </div>
              <span className="text-xs text-[#d6d3d1]">→</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* your info summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl bg-[#fefce8] p-4"
      >
        <div className="flex items-center justify-between text-xs text-[#57534e]">
          <span>💰 建议存入 <strong className="text-[#92400e]">{amount}</strong></span>
          <span>🥚 日收益 <strong className="text-[#92400e]">{egg}</strong></span>
        </div>
        {goal && (
          <p className="mt-2 text-xs text-[#78716c] text-center">
            🎯 目标：{goal}
          </p>
        )}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={handleStart}
          className="w-full rounded-full bg-[#92400e] py-4 text-lg font-extrabold text-white shadow-lg shadow-[#d97706]/30 transition-all active:scale-95 hover:bg-[#78350f]"
        >
          准备好了！开始 →
        </button>
      </motion.div>

      <p className="text-center text-[10px] text-[#a8a29e]">
        理财有风险，投资需谨慎
      </p>
    </div>
  );
}
