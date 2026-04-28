export const SITE = {
  name: "AI 观测站",
  title: "AI 观测站",
  englishTitle: "AI Observatory",
  tagline: "每天十分钟，听懂 AI 产业链",
  slogan: "过滤技术噪音，轻松看透 AI 背后的商业逻辑。",
  description:
    "AI 观测站把每天碎片化的 AI 新闻、产品发布与产业变化，整理成可收听、可搜索、可回看的节目档案。",
  url: "https://ai-observatory.pages.dev",
  email: "hello@ai-observer.fm",
  author: "AI 观测站",
  contact: {
    rss: "/rss.xml",
    email: "hello@ai-observer.fm",
    xiaoyuzhou: "/subscribe/",
  },
};

export const NAV_ITEMS = [
  { href: "/", label: "首页" },
  { href: "/episodes/", label: "全部播客" },
  { href: "/categories/", label: "分类" },
  { href: "/search/", label: "搜索" },
  { href: "/subscribe/", label: "订阅" },
  { href: "/about/", label: "关于" },
];

export const FOOTER_GROUPS = [
  {
    title: "内容",
    links: [
      { href: "/", label: "首页" },
      { href: "/episodes/", label: "全部播客" },
      { href: "/categories/", label: "分类" },
    ],
  },
  {
    title: "订阅",
    links: [
      { href: "/rss.xml", label: "RSS Feed" },
      { href: "/subscribe/", label: "订阅入口" },
      { href: "/search/", label: "搜索" },
    ],
  },
  {
    title: "关于",
    links: [
      { href: "/about/", label: "关于 AI 观测站" },
      { href: "mailto:hello@ai-observer.fm", label: "联系邮箱" },
    ],
  },
];

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  深度解读: "把一件事拆到底，讲清楚背后的逻辑链。",
  资讯速报: "每日 AI 行业重大动态，10 分钟快速建立信息坐标。",
  产品拆解: "上手用过、对比过、踩过坑之后的产品结论。",
  人物故事: "围绕关键人物、公司和决策，理解行业为什么变。",
  行业趋势: "把新闻、产品、组织与资本市场放在一张图里看。",
};
