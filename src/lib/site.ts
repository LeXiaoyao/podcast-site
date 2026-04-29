// src/lib/site.ts — 完整替换版本
// 更新：主理人信息、联系方式、导航

export const SITE = {
  name: "AI 观测站",
  title: "AI 观测站",
  englishTitle: "AI Observatory",
  tagline: "每天追踪 AI 产业、产品、模型、资本与大厂动态，用一档播客帮你看懂 AI 正在怎么改变世界。",
  slogan: "过滤技术噪音，轻松看透 AI 背后的商业逻辑。",
  description:
    "AI 观测站把每天碎片化的 AI 新闻、产品发布与产业变化，整理成可收听、可搜索、可回看的节目档案。",
  url: "https://lexiaoyao.github.io/podcast-site",
  author: "乐逍遥",
  contact: {
    email: "xiaoyao201709@163.com",
    xiaoyuzhou: "https://www.xiaoyuzhoufm.com/podcast/69bcbc3f0e7cef5a34d09492",
    apple: "https://podcasts.apple.com/us/podcast/ai%E8%A7%82%E6%B5%8B%E7%AB%99-ai-observatory/id1887157488?l=zh-Hans-CN",
    xiaohongshu: "https://xhslink.com/m/48OT41dSQNw",
    rss: "/rss.xml",
  },
};

export const NAV_ITEMS = [
  { href: "/",            label: "首页" },
  { href: "/episodes/",   label: "全部节目" },
  { href: "/categories/", label: "分类" },
  { href: "/about/",      label: "关于" },
];

export const FOOTER_GROUPS = [
  {
    title: "内容",
    links: [
      { href: "/",            label: "首页" },
      { href: "/episodes/",   label: "全部节目" },
      { href: "/categories/", label: "分类" },
    ],
  },
  {
    title: "订阅",
    links: [
      { href: "https://www.xiaoyuzhoufm.com/podcast/69bcbc3f0e7cef5a34d09492", label: "小宇宙" },
      { href: "https://podcasts.apple.com/us/podcast/ai%E8%A7%82%E6%B5%8B%E7%AB%99-ai-observatory/id1887157488?l=zh-Hans-CN", label: "Apple Podcasts" },
      { href: "/rss.xml", label: "RSS Feed" },
    ],
  },
  {
    title: "关于",
    links: [
      { href: "/about/",                    label: "关于 AI 观测站" },
      { href: "mailto:xiaoyao201709@163.com", label: "联系乐逍遥" },
      { href: "https://xhslink.com/m/48OT41dSQNw", label: "小红书" },
    ],
  },
];

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  深度解读:   "把一件事拆到底，讲清楚背后的逻辑链。",
  资讯速报:   "每日 AI 行业重大动态，10 分钟快速建立信息坐标。",
  产品拆解:   "上手用过、对比过、踩过坑之后的产品结论。",
  人物故事:   "围绕关键人物、公司和决策，理解行业为什么变。",
  行业趋势:   "把新闻、产品、组织与资本市场放在一张图里看。",
};
