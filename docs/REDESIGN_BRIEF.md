# AI 观测站 · 网站重设计实施 Brief

> 给 Codex 的执行指令。**一次只跑一个 Phase**，跑完汇报后再继续下一个。
> 严格遵守 `~/.codex/AGENTS.md` 的格式约束（禁止 Markdown 表格 / 决策风格 / 工作流）。

---

## 0. 全局基线（不可违反）

- 框架：**Astro 5 + 原生 CSS**。**禁止引入** Tailwind / UnoCSS / Sass / styled-components / 任何组件库。
- 主题：**dark only**，不做亮/暗切换。
- 字体：所有 webfont 必须本地化（`public/fonts/`）+ `font-display: swap` + 子集化（只保留站内出现过的汉字 + ASCII）。
- 资产先用 placeholder，最后 Phase 9 统一替换真实素材。
- 严禁动现有 MDX 内容；所有改造只动 `src/` 下代码 + `public/` 下资产 + `astro.config.mjs`。
- 每个 Phase 完成后必须 `npm run build` 通过、`npm run check` 无错。

---

## 1. 设计 tokens（Phase 1 时写入 `src/styles/global.css :root`）

```css
:root {
  /* color · 背景层 */
  --bg-deep: #050912;
  --bg-1: #0E1726;
  --bg-2: #15203A;
  --bg-3: #1C2B4A;

  /* color · 文字层 */
  --text-primary: #F2F6FF;
  --text-secondary: #8FA3C7;
  --text-tertiary: #4A5B7A;

  /* color · 描边 */
  --border-hairline: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.16);
  --border-glow: rgba(79, 209, 255, 0.4);

  /* color · 品牌 */
  --brand-cyan: #4FD1FF;
  --brand-purple: #A78BFA;
  --brand-gradient: linear-gradient(135deg, #4FD1FF 0%, #A78BFA 100%);

  /* type · 字号阶梯（rem，base = 16px） */
  --fs-display: 4.5rem;   /* 72 */
  --fs-h1: 3rem;          /* 48 */
  --fs-h2: 2rem;          /* 32 */
  --fs-h3: 1.5rem;        /* 24 */
  --fs-lg: 1.125rem;      /* 18 */
  --fs-base: 1rem;        /* 16 */
  --fs-sm: 0.875rem;      /* 14 */
  --fs-xs: 0.75rem;       /* 12 */

  /* type · 字体栈 */
  --font-display: "Source Han Sans SC Heavy", "HarmonyOS Sans SC", "PingFang SC", sans-serif;
  --font-body: "Inter Tight", "Source Han Sans SC", "PingFang SC", sans-serif;
  --font-mono: "Geist Mono", "JetBrains Mono", "SF Mono", monospace;

  /* spacing */
  --sp-1: 4px;  --sp-2: 8px;  --sp-3: 12px;  --sp-4: 16px;
  --sp-5: 24px; --sp-6: 32px; --sp-7: 48px;  --sp-8: 64px;
  --sp-9: 96px; --sp-10: 128px;

  /* radius */
  --r-sm: 8px; --r-md: 14px; --r-lg: 20px; --r-xl: 28px;

  /* layout */
  --container: min(1280px, calc(100vw - 48px));
  --container-narrow: min(880px, calc(100vw - 48px));

  /* motion */
  --ease-out: cubic-bezier(0.22, 0.61, 0.36, 1);
  --dur-fast: 160ms;
  --dur-base: 280ms;
  --dur-slow: 600ms;
}

::selection { background: var(--brand-cyan); color: var(--bg-deep); }

html { color-scheme: dark; }
body {
  background: var(--bg-deep);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-feature-settings: "ss01", "cv11";
}

/* 自定义滚动条 */
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: var(--bg-1); }
::-webkit-scrollbar-thumb { background: var(--bg-3); border-radius: 999px; }
::-webkit-scrollbar-thumb:hover { background: var(--brand-cyan); }
```

---

## 2. SITE 配置变更（Phase 1）

更新 `src/lib/site.ts`：

```ts
export const SITE = {
  title: "AI 观测站",
  englishTitle: "AI Observatory",
  slogan: "过滤技术噪音，轻松看透 AI 背后的商业逻辑。",
  description:
    "聚焦 AI 圈与科技行业的最新新闻、产品动态和趋势变化。我们不只聊发生了什么，更关注这些事件背后的竞争逻辑、商业机会和行业走向。希望用轻松但有信息量的方式，陪你快速看懂 AI 世界正在发生的变化。",
  url: "https://ai-observatory.pages.dev",
  author: "AI 观测站",
  authorBio: "聚焦 AI 产品、产业与组织变化的播客品牌。",
  contact: {
    email: "placeholder@example.com",      // 后续替换
    wechat: "placeholder_wechat_id",        // 后续替换
    xiaohongshu: "https://xiaohongshu.com/user/placeholder",
    twitter: "https://x.com/placeholder",
  },
};

export const NAV_ITEMS = [
  { label: "首页", href: "/" },
  { label: "全部播客", href: "/episodes/" },
  { label: "分类", href: "/categories/" },
  { label: "订阅", href: "/subscribe/" },
  { label: "关于", href: "/about/" },
];

export const FOOTER_GROUPS = [
  {
    title: "内容",
    links: [
      { label: "首页", href: "/" },
      { label: "全部播客", href: "/episodes/" },
      { label: "分类", href: "/categories/" },
    ],
  },
  {
    title: "订阅",
    links: [
      { label: "RSS Feed", href: "/rss.xml" },
      { label: "订阅入口", href: "/subscribe/" },
    ],
  },
  {
    title: "关于",
    links: [
      { label: "关于我们", href: "/about/" },
      { label: "联系编辑部", href: "/about/#contact" },
    ],
  },
];

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  深度解读: "把一件事拆到底，讲清楚背后的逻辑链。",
  资讯速报: "每日 AI 行业重大动态，10 分钟速览。",
  产品拆解: "上手用过、对比过、踩过坑的产品评测。",
  人物故事: "AI 时代正在做事的人，他们在想什么。",
  行业趋势: "从一周新闻里抽出真正影响格局的几条。",
};
```

---

## Phase 1 · 视觉系统重铸

### 目标
站点配色 / 字体 / 整体气质完全切换到新设计语言，所有现有页面在新 token 下能正常显示（即使布局还没改）。

### 任务清单

1. **新建 `src/styles/tokens.css`**：把上面 §1 的 `:root` 块单独拆出来，便于复用。
2. **重写 `src/styles/global.css`**：
   - 顶部 `@import "./tokens.css";`
   - 删除现有所有颜色 hard-code，改用 var
   - 保留现有所有 class 名（`.container` / `.page-hero` / `.card` 等），只改样式实现
   - 字体改用 §1 的 var
3. **新建 `public/fonts/`** 目录，放置（先用占位说明，资产 Phase 9 替换）：
   - `source-han-heavy.woff2`
   - `inter-tight.woff2`
   - `geist-mono.woff2`
4. **更新 `src/layouts/SiteLayout.astro`**：
   - 在 `<head>` 加 `<link rel="preload" as="font" type="font/woff2" href="/fonts/...">` 三条
   - 加 `@font-face` 定义到 global.css
   - 删除 Google Fonts 的 `<link>`
5. **更新 `src/lib/site.ts`**：替换为 §2 的版本

### 验收
- `npm run build` 通过
- 打开 `/` 看到深色背景 + 新字体（即使布局还是旧的）
- DevTools 检查 `getComputedStyle(:root).getPropertyValue('--brand-cyan')` 返回 `#4FD1FF`

### 不要做
- 不要重写任何页面的 HTML 结构
- 不要新建组件
- 不要改 MDX

---

## Phase 2 · 核心组件库

### 目标
建立可复用的 Astro 组件，为后续页面重构做准备。每个组件独立、自带样式（`<style>` 块写到组件内部）。

### 新建组件清单（全部放 `src/components/`）

**`Hero.astro`** — 通用首屏容器
- props: `kicker?`, `title`, `subtitle?`, `align?: "left" | "center"`
- 渲染：上方小字 kicker（uppercase Geist Mono）+ 大字 title（display 字号）+ 副标题
- 默认左对齐

**`VolNumber.astro`** — 大期号
- props: `index: number`
- 渲染：`VOL.027`，Geist Mono，display 字号，渐变描边色
- 用法：详情页 hero 左上角

**`SectionHeading.astro`** — 区块标题
- props: `kicker?`, `title`, `action?: { label, href }`
- 渲染：左边 kicker + title 两行，右边可选链接（`查看全部 →`）

**`EpisodeCard.astro`**（重写）
- props: `episode`, `variant?: "default" | "featured" | "compact"`
- default：方形封面 + 标题 + 描述 + meta（日期 / 时长 / 分类 dot chip）
- featured：横向 2 列，左边大封面，右边大字标题
- compact：仅文字，单行 meta + 标题
- hover：边框从 `--border-hairline` 渐变到 `--border-glow`，封面微缩放 1.02

**`CategoryChip.astro`** — 分类标签
- props: `name`, `href?`
- 渲染：椭圆胶囊 + 前置 4px 圆点 + 文字
- 圆点颜色按分类映射（深度解读 cyan / 资讯速报 purple / 产品拆解 white / 人物故事 暖白 / 行业趋势 蓝绿）

**`BrainHero.astro`** — 大脑装饰
- props: `size?: number`（默认 480）
- 渲染：`<img>` 大脑透明 PNG（`/brain.png`，先用占位）
- 动效：`@keyframes` 缓慢自旋（120s 一周）+ 呼吸光晕（box-shadow 强度 12s 循环）
- 鼠标移动时 `transform: translate3d(parallaxX, parallaxY, 0)` 视差跟随（最大偏移 ±20px）

**`ChapterList.astro`** — 章节大纲（即时间线 A）
- props: `headings: { depth, slug, text }[]`（来自 `astro:content` 的 `getHeadings()`）
- 渲染：左侧竖线 + 缩进列表，h2 一级 / h3 二级
- 每条点击跳到正文 anchor（`#${slug}`）
- sticky 在详情页右侧

**`AudioPlayer.astro`** — 自定义播放器
- props: `src`, `title`, `cover?`
- UI：圆角卡片，左封面 + 右标题/控制条
- 控制：播放/暂停 / 进度条（可拖拽）/ 当前时间-总时长 / 1.0/1.25/1.5x 倍速 / 跳过 ±15s
- 进度条 hover 时显示 tooltip 时间
- **不做**章节锚点跳音频（按 A 方案，章节只跳正文）
- 内部用 `<audio>` element + 一段 `<script>` 控制
- 没有 audioUrl 时显示"音频准备中"占位

**`PlatformLinks.astro`** — 订阅平台链接
- props: `platforms?: { xiaoyuzhou?, apple?, spotify? }`
- 渲染：3 个圆角胶囊按钮，仅渲染有 URL 的
- 每个按钮含品牌 SVG icon + 平台名

**`SiteHeader.astro` / `SiteFooter.astro`** — 拆出来
- 把现在 SiteLayout 里的 header / footer 抽成独立组件
- Footer 三列布局，按 `FOOTER_GROUPS` 渲染 + 底部一行 © + slogan

### 验收
- 在 `src/pages/dev-preview.astro`（Phase 2 临时新建）挨个渲染上面所有组件
- `npm run build` 通过
- 截图组件 preview 给用户看

### 不要做
- 不要改任何现有 page
- 不要删 `EpisodeCard` 旧版（先并存，Phase 3 再切换）

---

## Phase 3 · 页面重构 · 首页 + 全部播客 + 分类

### 任务

**`src/pages/index.astro`** 重写：
1. **Hero 区**：左 60% 是 `<Hero kicker="AI OBSERVATORY · 2026" title="AI 观测站" subtitle={SITE.slogan} />`，右 40% 是 `<BrainHero />`
2. **最新一期**：`<EpisodeCard variant="featured" episode={latest} />`
3. **5 个分类入口**：grid 5 列，每个是 `<a>` 卡片，包含分类名 + 期数 + 一句描述
4. **最近 6 期**：grid 3 列 × 2 行，`<EpisodeCard variant="default" />`
5. **CTA 条**：底部一条横幅，左边文案 "每周三更新，订阅一下"，右边 `<PlatformLinks platforms={platforms} />`

**`src/pages/episodes/index.astro`** 重写：
1. Hero：`<Hero kicker="ALL EPISODES" title="全部播客" subtitle={`共 ${count} 期`} />`
2. 分类筛选 chips（`<CategoryChip>` 横排 + "全部" 默认）
3. 列表：`<EpisodeCard variant="compact">` 长列表，按时间倒序
4. 客户端筛选：URL hash `#category=xxx` 控制显示，纯 CSS `:has()` 或一段轻量 JS

**`src/pages/categories/index.astro`** 重写：
1. Hero：`<Hero kicker="CATEGORIES" title="按主题浏览" />`
2. 5 个分类大卡片，2 列布局，每卡含分类名 + 描述 + 期数 + 最近一期标题预览

**`src/pages/categories/[slug].astro`** 重写：
1. Hero：分类名 + 描述 + 期数
2. `<EpisodeCard variant="default">` grid 3 列

### 验收
- 4 个页面截图，pass 给用户审视觉
- 移动端先不做（Phase 8）

---

## Phase 4 · 详情页重构

**`src/pages/episodes/[slug].astro`** 重写：

1. **顶部 hero 区**：
   - 左：`<VolNumber index={n} />` + 大字标题 + meta 行（日期 / 时长 / 分类 chip / flowType）
   - 右：方形封面图（带发丝边 + cyan 微光）
2. **音频播放器**：`<AudioPlayer src={audioUrl} title={title} cover={coverUrl} />` 全宽
3. **正文 + 侧栏**：
   - 左 8/12：正文 `<Content />`，加 prose 样式（h2/h3 大留白、blockquote 左侧 cyan 竖线 + 暗背景、code 等宽字 + cyan 文字、a 下划线 cyan）
   - 右 4/12 sticky：上面 `<ChapterList headings={headings} />`，下面"参考资料"卡片（references 列表）
4. **底部 CTA**：`<PlatformLinks platforms={platforms} />`
5. **上下期导航**：保留现有逻辑，样式更新

### 关键实现
- `headings` 用 `await episode.render()` 拿到的 `headings`
- prose 样式新建 `src/styles/prose.css`，class `.prose-shell` 内全部样式
- 章节锚点：MDX 自动给 h2/h3 加 `id`（Astro 默认行为），`<ChapterList>` 直接用 slug 跳

### 验收
- 桌面端打开任一详情页，章节列表 sticky 工作、点击跳转 + 高亮
- 音频播放器能播、能拖、倍速可切

---

## Phase 5 · 订阅页 + 关于页

**`src/pages/subscribe.astro`** 重写：
1. Hero：`<Hero kicker="SUBSCRIBE" title="选你顺手的方式" />`
2. 3 张大卡：
   - RSS Feed → `/rss.xml`
   - 小宇宙 → 平台主色 #9ECAE8 作 accent
   - Apple Podcasts → 苹果灰
3. 每张卡：左上角 SVG icon、标题、说明、CTA 按钮

**`src/pages/about.astro`** 重写：
1. Hero：`<Hero kicker="ABOUT" title="关于 AI 观测站" subtitle={SITE.description} />`
2. **关于节目** 段：3-4 段长文（用 prose 样式）
3. **关于 AI 观测站** 段（id="contact"）：
   - 左：方形配图（`<img src="/about-avatar.jpg" />`，圆角 `--r-lg`，边框发光）
   - 右：标题 "联系编辑部" + 4 个联系方式 chip（邮箱 / 微信 / 小红书 / X）
4. **更新日志** 段（可选）：v1 写一段"为什么做这个站"

### 验收
- `/subscribe` 只保留 RSS 和播客平台入口
- `/about` 头像 + 联系方式正确渲染

---

## Phase 6 · OG image + SEO

1. **`src/layouts/SiteLayout.astro`** 增加 `ogImage?: string` prop：
   - `<meta property="og:image" content={ogImage ?? SITE.url + '/og-default.png'}>`
   - `<meta property="og:title" content={title}>`
   - `<meta property="og:description" content={description}>`
   - `<meta name="twitter:card" content="summary_large_image">`
2. **详情页**传 `episode.data.coverUrl` 给 `ogImage`
3. **`public/og-default.png`** 占位（Phase 9 替换真图）
4. `astro.config.mjs` 确认 `site` 字段正确，`@astrojs/sitemap` 已启用
5. 加 `public/robots.txt`：
   ```
   User-agent: *
   Allow: /
   Sitemap: https://ai-observatory.pages.dev/sitemap-index.xml
   ```

### 验收
- 用 `https://www.opengraph.xyz` 抓任意页面 URL，看 OG 卡片
- robots.txt 可访问

---

## Phase 7 · 大脑动效 + 微交互

1. `BrainHero.astro` 加：
   - `@keyframes spin-slow { to { transform: rotateZ(360deg) } }` 120s linear infinite
   - `@keyframes breathe-glow { 0%,100% { filter: drop-shadow(0 0 24px rgba(79,209,255,0.3)) } 50% { filter: drop-shadow(0 0 48px rgba(167,139,250,0.5)) } }` 12s
   - 鼠标视差用 `mousemove` 监听，`transform` 应用 translate
   - `prefers-reduced-motion` 时全部禁用
2. **页面切换过渡**：用 Astro `ViewTransitions`（`@astrojs/view-transitions` 已在 v5 内置）
   - SiteLayout 加 `<ViewTransitions />`
   - 标题 / 封面 / hero 加 `transition:name`
3. **EpisodeCard hover**：边框颜色 transition 280ms ease-out
4. **按钮 ripple**：CTA 按钮 hover 时背景微亮 + 边框渐变

### 验收
- 录屏一段交互：首页打开 → 点击卡片进详情 → 返回，看到过渡顺滑
- 系统设置开 reduce motion，所有动效消失

---

## Phase 8 · 响应式 + 性能

1. `global.css` 末尾加 media query：
   - `@media (max-width: 1024px)`：grid 列数减半，hero 字号缩到 56px
   - `@media (max-width: 720px)`：单列，hero 字号 32px，详情页章节列表移到正文上方折叠
   - 容器内边距：1024 → 24px，720 → 16px
2. 字体子集化：
   - 用 `subfont` 或手工 `pyftsubset` 把思源黑体 Heavy 砍到 ~300KB（只保留站内汉字）
   - 命令记录在 `docs/FONTS.md`
3. 图片优化：
   - 所有 `<img>` 加 `loading="lazy"`（首屏除外）+ `decoding="async"`
   - 封面用 Astro `<Image>` 自动 webp 转换
4. Lighthouse 跑分目标：Perf ≥ 85, A11y ≥ 95, BP ≥ 95, SEO = 100

### 验收
- iPhone 14 Pro 视图下每个页面截图
- Lighthouse 报告贴出来

---

## Phase 9 · 资产替换 + 上线

1. 用户提供的真实素材替换 `public/`：
   - `logo.svg` / `logo.png`（导航 + favicon）
   - `brain.png`（hero 装饰，透明背景）
   - `about-avatar.jpg`（about 配图）
   - `og-default.png`（1200×630 默认社交卡）
   - `cover-placeholder.svg` 保留作 fallback
2. 真实字体 woff2 文件放 `public/fonts/`
3. 真实联系方式更新到 `src/lib/site.ts` 的 `SITE.contact`
4. 最终构建：`npm run build && npm run preview`
5. 推 git，Cloudflare Pages 自动构建

### 验收
- 生产环境 URL 可访问
- RSS 用 podba.se 验证通过

---

## 跨 Phase 通用约束

- **每个 Phase 开始前**：`git checkout -b redesign/phase-N`，结束后 `git commit -m "phase-N: <summary>"` 不合并到 main
- **每个组件最多 200 行**，超出拆分
- **不写注释解释 What**，只在 Why 非显而易见时写一行
- **遇到设计决策模糊**，停下来问用户**一个**具体问题，不要猜
- **同一思路连续失败 2 次**：换路径，不再微调
- 单个 Phase 投入 >2 小时无明显进展，停下汇报
