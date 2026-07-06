// DeepSeek API integration
// OpenAI-compatible format — just change baseURL and apiKey

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

export async function generateNarrative(
  prompt: string,
  apiKey: string
): Promise<string> {
  try {
    const res = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? "";
  } catch (err) {
    console.error("DeepSeek API call failed:", err);
    throw err;
  }
}

// Mock version for demo when API key is not available
export function mockNarrative(
  planName: string,
  productName: string,
  yield_: string,
  userSituation: string
): string {
  const templates: Record<string, string> = {
    safe_goose: `📖 《小狗钱钱》小课堂

${userSituation}，还记得农夫与金鹅的故事吗？农夫每天从鹅那里得到一颗金蛋，却贪心地把鹅杀了，结果一无所有。

在理财中，**你的本金就是那只鹅**，而收益就是金蛋。

${productName} 就是你第一只鹅的家。这只鹅目前年化收益率 ${yield_}，每天都在为你下金蛋。最重要的是，它住在受国家存款保险保护的银行里，50 万以内本息全额赔付——相当于给你的鹅买了全额保险。

💡 理财有风险，投资需谨慎。但存款产品是风险最低的起点。`,

    dream_account: `📖 《小狗钱钱》小课堂

${userSituation}，吉娅为了去美国交换、买电脑、帮爸妈还债，设立了三个梦想储蓄罐。她每收到一笔钱，就按比例分配进去——梦想就是这样一步步实现的。

${productName} 就是你的梦想加速器。预期年化收益率 ${yield_}，比单纯存银行多一点收益，离梦想近一点距离。

💡 理财有风险，投资需谨慎。基金投资有波动，但长期坚持是积累财富的好方式。`,

    flexible_goose: `📖 《小狗钱钱》小课堂

${userSituation}，钱钱告诉吉娅一个重要的道理：一定要留一部分钱随时能用，就像冬天储备粮食一样。

${productName} 就是你的应急储备池。近 7 日年化收益率 ${yield_}，随取随用，T+0 两小时内到账。它比活期存款收益高，又比定期存款灵活。

💡 理财有风险，投资需谨慎。货币基金风险极低，适合存放应急备用金。`,
  };

  return (
    templates[planName] ??
    `📖 《小狗钱钱》小课堂\n\n${userSituation}，理财的第一步是理解你的钱在做什么。${productName} 是一个不错的起点，年化收益率 ${yield_}。\n\n💡 理财有风险，投资需谨慎。`
  );
}
