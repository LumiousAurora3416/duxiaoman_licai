"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface PlanDetail {
  icon: string;
  label: string;
  desc: string;
  story: string;
  product: string;
  color: string;
}

const plans: Record<string, PlanDetail> = {
  safe_goose: {
    icon: "🦢",
    label: "养鹅计划",
    desc: "本金安全增值",
    story:
      "农夫有一只每天下一颗金蛋的鹅，但他贪心不足，把鹅杀掉想一次取出所有金蛋，结果一无所有。鹅是你的本金，金蛋是你的收益——千万别杀鹅取卵。",
    product: "百信银行钱包 PLUS · 年化 3.33%",
    color: "from-[#fbbf24] to-[#d97706]",
  },
  dream_account: {
    icon: "🎯",
    label: "梦想账户",
    desc: "为目标存钱",
    story:
      "吉娅在钱钱的启发下，设立了三个梦想储蓄罐——去美国交换、买电脑、帮爸妈还债。她把每一笔收入按比例分配，梦想一个个实现了。",
    product: "低风险基金组合 · 年化 3.5%-5%",
    color: "from-[#60a5fa] to-[#2563eb]",
  },
  flexible_goose: {
    icon: "💧",
    label: "灵活金鹅",
    desc: "应急储备",
    story:
      "钱钱告诉吉娅：一定要留一部分钱随时能用，就像冬天储备粮食一样，不能把所有钱都拿去养鹅。这是应对突发状况的智慧。",
    product: "余额盈货币基金 · 年化 2.1%",
    color: "from-[#34d399] to-[#10b981]",
  },
};

interface Props {
  planId: string | null;
  onClose: () => void;
}

export default function PlanModal({ planId, onClose }: Props) {
  const plan = planId ? plans[planId] : null;

  return (
    <AnimatePresence>
      {plan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-5"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm card-soft overflow-hidden p-0"
          >
            {/* gradient top */}
            <div
              className={`bg-gradient-to-r ${plan.color} px-6 py-6 text-center text-white`}
            >
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <span className="text-3xl">{plan.icon}</span>
              </div>
              <h2 className="font-hand text-xl">{plan.label}</h2>
              <p className="text-sm text-white/80">{plan.desc}</p>
            </div>

            <div className="p-5">
              {/* story */}
              <div className="mb-4 rounded-2xl bg-[#fefce8] p-4">
                <p className="text-xs leading-relaxed text-[#292524]">
                  <span className="font-extrabold">📖 《小狗钱钱》故事</span>
                  <br />
                  {plan.story}
                </p>
              </div>

              {/* product */}
              <div className="mb-6 flex items-center gap-3 rounded-2xl border-2 border-[#fef3c7] bg-white p-3">
                <span className="text-xl">🏷️</span>
                <div>
                  <p className="text-[10px] font-bold text-[#a8a29e]">
                    对应产品
                  </p>
                  <p className="text-sm font-extrabold text-[#d97706]">
                    {plan.product}
                  </p>
                </div>
              </div>

              {/* actions */}
              <div className="flex flex-col gap-2">
                <Link
                  href="/input"
                  className="btn-primary w-full py-3.5 text-center text-sm"
                >
                  开始这个计划
                </Link>
                <button onClick={onClose} className="btn-ghost w-full py-3 text-sm">
                  再看看
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
