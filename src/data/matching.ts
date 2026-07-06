// Matching rules: user profile → goose plan
// Rule-based, no LLM involvement

export interface UserProfile {
  income: IncomeLevel;
  savings: SavingsLevel;
  goal: string;
}

export type IncomeLevel = "below_5k" | "5k_8k" | "8k_12k" | "above_12k";
export type SavingsLevel = "below_1k" | "1k_5k" | "5k_20k" | "above_20k";
export type PlanType = "safe_goose" | "dream_account" | "flexible_goose";

export interface MatchResult {
  planType: PlanType;
  planName: string;
  confidence: number; // 1-3, how strong the match is
  reason: string;
  suggestedAmount: string; // suggested initial investment
  userSituation: string; // readable summary for AI prompt
}

const incomeLabels: Record<IncomeLevel, string> = {
  below_5k: "5K 以下",
  "5k_8k": "5K-8K",
  "8k_12k": "8K-12K",
  above_12k: "12K 以上",
};

const savingsLabels: Record<SavingsLevel, string> = {
  below_1k: "1K 以下",
  "1k_5k": "1K-5K",
  "5k_20k": "5K-20K",
  above_20k: "20K 以上",
};

// Priority-based matching: highest priority wins
// Priority: savings (safety first) > goal keywords > income
export function matchPlan(profile: UserProfile): MatchResult {
  const goal = profile.goal.toLowerCase();
  const savings = profile.savings;

  // 1. Keyword-based: if goal mentions specific intent
  if (
    goal.includes("应急") ||
    goal.includes("备用") ||
    goal.includes("灵活") ||
    goal.includes("日常")
  ) {
    return {
      planType: "flexible_goose",
      planName: "灵活金鹅计划",
      confidence: 3,
      reason: "你的目标偏重日常流动性和应急储备，灵活金鹅最适合你",
      suggestedAmount: suggestAmount(savings, 0.3),
      userSituation: makeSituation(profile, "灵活金鹅"),
    };
  }

  if (
    goal.includes("旅行") ||
    goal.includes("梦想") ||
    goal.includes("目标") ||
    goal.includes("进修") ||
    goal.includes("买房") ||
    goal.includes("买车") ||
    goal.includes("攒钱")
  ) {
    return {
      planType: "dream_account",
      planName: "梦想账户计划",
      confidence: 3,
      reason: "你有明确的目标，梦想账户帮你把目标变成可执行的储蓄计划",
      suggestedAmount: suggestAmount(savings, 0.5),
      userSituation: makeSituation(profile, "梦想账户"),
    };
  }

  // 2. Low savings → safety first
  if (savings === "below_1k" || savings === "1k_5k") {
    return {
      planType: "safe_goose",
      planName: "安全鹅计划",
      confidence: 2,
      reason: "当前存款较少，建议先养一只安全鹅，稳稳积累第一桶金",
      suggestedAmount: suggestAmount(savings, 0.6),
      userSituation: makeSituation(profile, "安全鹅"),
    };
  }

  // 3. Lower income → safety
  if (profile.income === "below_5k") {
    return {
      planType: "safe_goose",
      planName: "安全鹅计划",
      confidence: 2,
      reason: "收入还在起步阶段，安全鹅帮你稳稳打好理财基础",
      suggestedAmount: suggestAmount(savings, 0.6),
      userSituation: makeSituation(profile, "安全鹅"),
    };
  }

  // 4. Default: safe goose (most conservative, suitable for beginners)
  return {
    planType: "safe_goose",
    planName: "安全鹅计划",
    confidence: 1,
    reason: "作为理财第一步，从安全鹅开始最稳妥",
    suggestedAmount: suggestAmount(savings, 0.5),
    userSituation: makeSituation(profile, "安全鹅"),
  };
}

function suggestAmount(savings: SavingsLevel, ratio: number): string {
  const map: Record<SavingsLevel, string> = {
    below_1k: `${Math.round(500 * ratio)} 元`,
    "1k_5k": `${Math.round(2000 * ratio)} 元`,
    "5k_20k": `${Math.round(10000 * ratio)} 元`,
    above_20k: `${Math.round(20000 * ratio)} 元`,
  };
  return map[savings];
}

function makeSituation(profile: UserProfile, plan: string): string {
  return `月收入${incomeLabels[profile.income]}，存款${savingsLabels[profile.savings]}，理财目标是"${profile.goal}"，匹配方案为${plan}`;
}
