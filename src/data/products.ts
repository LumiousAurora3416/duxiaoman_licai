// Product mapping: 《小狗钱钱》 concepts → 度小满 products
// Static mapping table — no LLM involvement in product selection

export interface Product {
  id: string;
  name: string;
  provider: string;
  type: "deposit" | "money_market" | "fund";
  annualYield: string;
  minInvestment: string;
  safetyTag: string;
  safetyDetail: string;
  description: string;
  icon: string;
}

export interface PlanConcept {
  id: "safe_goose" | "dream_account" | "flexible_goose";
  name: string;
  storyTitle: string;
  storyBrief: string;
  principle: string;
  suitableFor: string;
  applicableFunds: string;
  productId: string;
  aiPromptTemplate: string;
}

const products: Record<string, Product> = {
  wallet_plus: {
    id: "wallet_plus",
    name: "百信银行钱包 PLUS",
    provider: "百信银行",
    type: "deposit",
    annualYield: "3.33%",
    minInvestment: "0.01 元",
    safetyTag: "存款保险保障",
    safetyDetail: "50 万以内本息全额赔付，受国家《存款保险条例》保护",
    description: "低风险、随存随取的银行存款产品",
    icon: "🏦",
  },
  money_market: {
    id: "money_market",
    name: "余额盈货币基金",
    provider: "度小满",
    type: "money_market",
    annualYield: "2.1%",
    minInvestment: "1 元",
    safetyTag: "低风险",
    safetyDetail: "货币基金风险极低，T+0 两小时内到账，每日快速赎回限额 1 万",
    description: "会生利息的活期存款，随取随用",
    icon: "💧",
  },
  target_fund: {
    id: "target_fund",
    name: "低风险基金组合",
    provider: "度小满",
    type: "fund",
    annualYield: "3.5%-5%",
    minInvestment: "10 元",
    safetyTag: "中低风险",
    safetyDetail: "分散投资于债券等低风险资产，风险可控",
    description: "为目标量身定制的基金定投方案",
    icon: "🎯",
  },
};

export const plans: Record<string, PlanConcept> = {
  safe_goose: {
    id: "safe_goose",
    name: "安全鹅计划",
    storyTitle: "农夫与金鹅",
    storyBrief:
      "金先生给吉娅讲了一个寓言：农夫有一只每天下一颗金蛋的鹅，但他贪心不足，把鹅杀掉想一次取出所有金蛋，结果一无所有。鹅 = 本金，金蛋 = 收益。",
    principle: "绝对不动用本金，让鹅持续下金蛋",
    suitableFor: "追求零亏损、有长期闲置资金的理财新手",
    applicableFunds: "半年以上不用的闲钱",
    productId: "wallet_plus",
    aiPromptTemplate: `你是一个用《小狗钱钱》帮小白理解理财的翻译官助手。
用户情况：{userSituation}
匹配理念：安全鹅（农夫与金鹅寓言）
对应产品：{productName}，年化收益率 {yield}
你的任务：用农夫与金鹅的寓言开头，用讲故事的方式翻译这个产品的特点，让完全不懂金融的小白听懂，最后加一句"理财有风险，投资需谨慎"。
字数控制在 150 字以内。`,
  },
  dream_account: {
    id: "dream_account",
    name: "梦想账户计划",
    storyTitle: "吉娅的梦想储蓄罐",
    storyBrief:
      "吉娅在钱钱的启发下，设立了三个梦想储蓄罐——去美国交换、买电脑、帮爸妈还债。她把每一笔收入按比例分配，梦想一个个实现了。",
    principle: "把梦想拆解成可量化的储蓄计划，专款专用",
    suitableFor: "有明确目标（旅行、进修、买房首付）的储蓄者",
    applicableFunds: "有明确目标的资金",
    productId: "target_fund",
    aiPromptTemplate: `你是一个用《小狗钱钱》帮小白理解理财的翻译官助手。
用户情况：{userSituation}
匹配理念：梦想账户（吉娅的梦想储蓄罐）
对应产品：{productName}，预期年化收益率 {yield}
你的任务：用吉娅设立梦想储蓄罐的故事开头，帮用户理解如何通过定期存钱实现目标，末尾加一句"理财有风险，投资需谨慎"。
字数控制在 150 字以内。`,
  },
  flexible_goose: {
    id: "flexible_goose",
    name: "灵活金鹅计划",
    storyTitle: "钱钱的应急忠告",
    storyBrief:
      "钱钱告诉吉娅：一定要留一部分钱随时能用，就像冬天储备粮食一样，不能把所有钱都拿去养鹅。这是应对突发状况的智慧。",
    principle: "应急储备，随取随用，不动长期养的鹅",
    suitableFor: "需要 3-6 个月应急备用金的理财新手",
    applicableFunds: "3-6 个月的生活费作为应急资金",
    productId: "money_market",
    aiPromptTemplate: `你是一个用《小狗钱钱》帮小白理解理财的翻译官助手。
用户情况：{userSituation}
匹配理念：灵活金鹅（钱钱的应急忠告）
对应产品：{productName}，近 7 日年化收益率 {yield}
你的任务：用钱钱让吉娅留应急钱的故事开头，帮用户理解为什么应急储备很重要，末尾加一句"理财有风险，投资需谨慎"。
字数控制在 150 字以内。`,
  },
};

export default products;
