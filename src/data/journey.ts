// 7-day journey content data
// Day 1, 2, 7 are fully implemented; Day 3-6 have summaries

export interface DayContent {
  id: number;
  title: string;
  subtitle: string;
  quote: string;
  quoteAuthor: string;
  task: string;
  steps: string[];
  knowledgePoint: string;
  productAction?: string;
  dayType: "full" | "summary";
}

const journeyDays: DayContent[] = [
  {
    id: 1,
    title: "认识你的鹅",
    subtitle: "在度小满安家",
    quote: "「你想要的富裕，是一种机会与可能。钱不是人一生中最重要的东西，但缺了它，你就会被逼着做很多不情愿的事。」",
    quoteAuthor: "《小狗钱钱》",
    task: "开通度小满账户，认识你的第一只鹅",
    steps: [
      "打开度小满 App，用手机号注册账户",
      "完成实名认证（准备好身份证）",
      "找到「银行存款精选」产品专区",
      "了解百信银行钱包 PLUS——这就是你的第一只鹅",
    ],
    knowledgePoint:
      "存款保险是国家给每个储户的保障，同一家银行 50 万以内本息全额赔付。你的鹅有国家保险，很安全。",
    productAction: "度小满 App → 银行存款精选 → 百信银行钱包 PLUS",
    dayType: "full",
  },
  {
    id: 2,
    title: "下第一颗金蛋",
    subtitle: "第一次买入体验",
    quote: "「不要杀掉你的鹅。鹅在，金蛋就在。」",
    quoteAuthor: "《小狗钱钱》",
    task: "存入第一笔钱，看你的鹅下第一颗金蛋",
    steps: [
      "打开百信银行钱包 PLUS 产品页",
      "输入想存的金额（哪怕 100 元也行）",
      "确认买入，完成首次申购",
      "回到收益页，查看预计每日收益——那就是你的金蛋",
    ],
    knowledgePoint:
      "百信银行钱包 PLUS 的收益按日计算。假设你存 5000 元，7 日年化 3.33%，每天大约有 0.45 元的收益，这就是你的鹅下的金蛋。",
    productAction: "百信银行钱包 PLUS → 输入金额 → 确认买入",
    dayType: "full",
  },
  {
    id: 3,
    title: "让鹅自己长大",
    subtitle: "设置自动转入",
    quote: "「当你决定要过自己的生活时，你就不需要别人的允许。」",
    quoteAuthor: "《小狗钱钱》",
    task: "设置每月自动转入，让鹅持续长大",
    steps: [
      "在钱包 PLUS 页面找到「自动转入」功能",
      "设置每月发薪日自动转入金额",
      "建议从 10% 的月收入开始",
    ],
    knowledgePoint:
      `自动转入是「先存后花」的核心习惯。每月工资一到账，自动存一笔，剩下的才是可支配收入。这是《小狗钱钱》里最重要的建议。`,
    productAction: "钱包 PLUS → 自动转入 → 设置金额和日期",
    dayType: "summary",
  },
  {
    id: 4,
    title: "别把鸡蛋放一个篮子",
    subtitle: "了解多样化",
    quote: "「你最好把钱分成三部分：养鹅、梦想储蓄罐、零花钱。」",
    quoteAuthor: "《小狗钱钱》",
    task: "了解除了存款，还有哪些低风险选择",
    steps: [
      "打开度小满产品列表",
      "了解货币基金（余额盈）——比存款活期收益高一点",
      "了解低风险基金组合——风险稍高但收益也更高",
    ],
    knowledgePoint:
      "分散投资是降低风险最有效的方式。把钱放在不同产品里，一个亏了还有别的赚。当然，作为新手，存款已经是很稳的起点了。",
    productAction: "度小满 → 产品列表 → 对比不同产品",
    dayType: "summary",
  },
  {
    id: 5,
    title: "梦想储蓄罐",
    subtitle: "设定目标",
    quote: "「列出你的梦想清单，选出最重要的三个。」",
    quoteAuthor: "《小狗钱钱》",
    task: "设定一个具体的储蓄目标，算算需要存多久",
    steps: [
      "写下你短期最想实现的目标（旅行、换手机、学技能）",
      "用计算器算算：按当前存钱速度，多久能达到",
      "想想能不能提高存钱比例来加速",
    ],
    knowledgePoint:
      "目标储蓄的关键是可视化和量化。把目标金额写下来，拆到每月、每周需要存多少，执行起来就容易多了。吉娅就是这么做的。",
    dayType: "summary",
  },
  {
    id: 6,
    title: "财务体检",
    subtitle: "看看你的钱去哪了",
    quote: "「钱的数目并不是决定性因素，更重要的是我们怎么来使用它。」",
    quoteAuthor: "《小狗钱钱》",
    task: "回顾一周支出，优化存钱比例",
    steps: [
      "回顾过去一周的支出（看账单或回忆）",
      "分三类：必要支出 / 想要但非必要 / 浪费",
      "从「想要」和「浪费」里挤出更多存钱空间",
    ],
    knowledgePoint:
      `财务体检不是让你过苦日子，而是看清钱花在哪，把浪费的部分变成存钱。哪怕每天省一杯奶茶，一年也是一千多。`,
    dayType: "summary",
  },
  {
    id: 7,
    title: "毕业典礼",
    subtitle: "你的理财成长报告",
    quote: "「生命中最美好的事情之所以发生，是因为你做了你不敢做的事情。」",
    quoteAuthor: "《小狗钱钱》",
    task: "回顾 7 天成长，制定未来计划",
    steps: [
      "回顾这 7 天你完成的所有操作",
      "看看你的鹅已经长了多大",
      "制定下个月的存钱目标",
      "继续养鹅，也可以探索梦想账户和灵活金鹅",
    ],
    knowledgePoint:
      "理财不是一次性的动作，而是一辈子的习惯。这 7 天只是一个开始。只要鹅在，金蛋就会一直在。恭喜你毕业！",
    productAction: "查看你的总资产 → 制定下月计划",
    dayType: "full",
  },
];

export default journeyDays;
