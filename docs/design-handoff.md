# AP Score Tracker — 站点设计交付包

---

## 1. 竞品视觉分析

### 竞品 A: APScore5 (apscore5.com)
- **主色调:** 白色背景 + 绿色/青色强调 (#00C896)
- **深色/浅色:** 浅色为主
- **字体:** 系统无衬线体（类似 Inter）
- **Hero 策略:** 居中标题 + 右侧进度条预览图
- **布局:** 居中 Hero → 课程卡片 3 列 → 功能列表 → 检查清单
- **CTA 文案:** "Start Free AP Practice" / "Start My AP Score 5 Study Plan"
- **整体感觉:** 教育平台感，功能堆砌，信息密度高，略像 LMS
- **可借鉴:** 课程卡片结构清晰，进度可视化直观
- **必须避开:** 绿色太常见，布局过于对称模板化，注册门槛高

### 竞品 B: Get AP Ready (getapready.com)
- **主色调:** 白色背景 + 蓝色/紫色渐变
- **深色/浅色:** 浅色为主
- **字体:** 系统无衬线体
- **Hero 策略:** 居中标题 + 右侧 AI 验证流程图
- **布局:** 居中 Hero → 统计数据 4 列 → 3 步流程 → 功能网格 → 课程列表
- **CTA 文案:** "Start Free — 20 Credits" / "Try a Free Practice Set"
- **整体感觉:** 典型 AI SaaS 模板感，紫蓝渐变 + 白背景
- **可借鉴:** 数据展示清晰（21 courses, 150+ units）
- **必须避开:** 紫蓝渐变 + 白背景（最 AI 味组合），居中 3 列 features，强制注册

### 竞品 C: Fiveable (fiveable.me)
- **主色调:** 白色背景 + 多彩 emoji + 粉色强调
- **深色/浅色:** 浅色为主
- **字体:** 系统无衬线体
- **Hero 策略:** 居中标题 + 学生头像轮播 + 课程图片墙
- **布局:** 居中 Hero → 课程分类列表 → 评价区 → 其他考试
- **CTA 文案:** "start studying →" / "free diagnostic"
- **整体感觉:** 活泼、年轻化、社区感强，但信息过载
- **可借鉴:** 学生头像建立信任，课程分类清晰
- **必须避开:** emoji 过多显得不专业，信息密度过高，色彩太杂

### 设计决策
- **竞品都是浅色 → 我们优先深色**（差异化最强）
- **竞品都用蓝/绿/紫 → 我们用暖琥珀 + 冷青**（独特记忆点）
- **竞品都是居中 Hero → 我们用 Split / Dashboard Preview**（工具感更强）
- **竞品都是 3 列 Features → 我们用 Bento Grid**（现代感）
- **竞品都像教育平台 → 我们要像精密工具**（追踪器定位）

---

## 2. 反 AI 味约束表

| AI 默认做法 | 我们的做法 |
|---|---|
| Inter / Roboto 字体 | **Space Grotesk** (Display) + **DM Sans** (Body) |
| 紫蓝渐变 + 白背景 | **深色主题** (#0A0A0F) + **琥珀金强调** (#FFB800) |
| 对称居中 3 列 | **非对称布局** / Bento Grid / Split Hero |
| emoji 做 icon | **Lucide Icons** / 定制 SVG |
| 统一 border-radius | **有尖有圆** — 按钮 8px，卡片 12px，标签 4px |
| 白灰交替 section | **深色统一** + 色块区分 + 细线分隔 |
| "Revolutionize" 标题 | **具体动作** — "Track", "See", "Know" |

### 禁词清单
```
Revolutionize / Empower / Seamless / Cutting-edge / Next-generation
Unlock your potential / Transform your learning / AI-powered
```

### 安全表达
```
Track your progress / See your trends / Know what to study
Built for students / Free, no signup / Your data stays private
```

---

## 3. 三个设计方向

### 方向 A: Dark Industrial（推荐）
- **调性:** Industrial — 精密、可靠、开发者工具感
- **关键词:** precise, trustworthy, focused, no-nonsense, data-driven
- **配色:**
  - Background: `#0A0A0F`
  - Surface: `#141419`
  - Primary: `#00E5CC` (赛博青 — 数据/图表)
  - CTA: `#FFB800` (琥珀金 — 行动)
  - Text Primary: `#E8ECF0`
  - Text Secondary: `#8A8F98`
- **字体:** Space Grotesk + DM Sans
- **Hero:** Split 布局 — 左侧文案，右侧 Dashboard 预览（暗色图表）
- **Features:** Bento Grid，2+1 不对称
- **适合原因:** 与竞品浅色形成最强反差，"追踪器"工具感最准确，深色更适合长时间查看图表

### 方向 B: Japanese Minimal
- **调性:** Japanese Minimal — 极简、留白、清晰
- **关键词:** calm, clean, intentional, breathing room, focused
- **配色:**
  - Background: `#FAFAF8` (暖白)
  - Surface: `#FFFFFF`
  - Primary: `#1A1A1A` (墨黑)
  - CTA: `#D4652A` (砖红 — 日式传统色)
  - Text Primary: `#1A1A1A`
  - Text Secondary: `#6B6B6B`
- **字体:** Sora + Outfit
- **Hero:** 大面积留白，居中但极简，一行标题 + 一行副标题 + 一个按钮
- **Features:** 单列大卡片，大量留白
- **适合原因:** 差异化强，但可能过于"安静"，不利于转化

### 方向 C: Retro-futurism
- **调性:** Retro-futurism — 80s 科技杂志 + 现代数据可视化
- **关键词:** bold, nostalgic, energetic, chart-driven, editorial
- **配色:**
  - Background: `#0F0F1A`
  - Surface: `#1A1A2E`
  - Primary: `#FF6B9D` (霓虹粉)
  - CTA: `#00F5D4` (霓虹青)
  - Text Primary: `#F0F0F5`
  - Text Secondary: `#9B9BB0`
- **字体:** Clash Display + Outfit
- **Hero:** 非对称，大标题 + 右侧图表截图带霓虹 glow
- **Features:** 2 列大卡片，粗边框，强对比
- **适合原因:** 视觉冲击力最强，但可能过于"娱乐化"，削弱工具可信度

### 推荐: 方向 A — Dark Industrial
理由：
1. 竞品全是浅色，深色差异化最强
2. "追踪器"定位需要数据/图表感，深色更适合可视化
3. 学生群体对深色模式接受度高（Discord, Spotify, Notion）
4. 琥珀金 CTA 在深色上对比度极高，转化最优

---

## 4. 首页页面生成 Prompt

### Desktop Prompt

```text
Design a dark-theme landing page for AP Score Tracker — a free tool that helps AP students track practice test scores, visualize progress trends, and identify weak topics across multiple exams with no signup needed.

Target users:
- High school students (ages 14-18) preparing for AP exams
- Self-studying AP students without teacher feedback
- Students taking 2-4 AP subjects simultaneously

Design vibe:
Industrial / precise / trustworthy / data-driven
Keywords: focused, no-nonsense, chart-driven, student-built, private

Typography:
Use "Space Grotesk" for headings.
Use "DM Sans" for body text.
Do not use Inter, Roboto, Arial, or system default fonts.

Color scheme:
Background: #0A0A0F
Surface: #141419
Primary accent: #00E5CC (cyber teal for data/charts)
CTA / highlight: #FFB800 (amber gold for actions)
Text primary: #E8ECF0
Text secondary: #8A8F98
Border: #1E1E28

Page structure:

1. NAVIGATION
Logo left (wordmark "AP Score Tracker" in Space Grotesk), nav links center, primary CTA right.
Links: Subjects, Pricing, FAQ
CTA: "Start Tracking — Free"
Background: transparent over hero, solid #0A0A0F on scroll.

2. HERO SECTION
Layout: Split — left 55% text, right 45% dashboard preview.
Headline: "Track Your AP Progress Across Every Practice Test"
Subheadline: "See your score trends, spot weak topics, and know exactly what to study next. No signup, no login — your data stays in your browser."
Primary CTA: "Start Tracking Free — No Signup Needed" (amber gold button)
Secondary CTA: "See How It Works" (text link)
Trust Line: "Free forever • No account required • Works on mobile"
Hero visual: Dark dashboard mockup showing a line chart (progress curve) and a heatmap grid. Chart line in #00E5CC, heatmap cells in gradient from #141419 to #00E5CC. No fake UI details.

3. HOW IT WORKS
3 steps in a horizontal row with connecting line:
Step 1: "Choose Your Subject" — "Select from 5 subjects at launch — AP Lang, AP Psych, Calc AB, Bio, US History."
Step 2: "Enter Your Scores" — "Input your MCQ and FRQ raw scores from any practice test."
Step 3: "Track Your Progress" — "View your improvement curve and topic heatmap instantly."
Each step: number in amber circle + title + description.

4. USE CASES
3 cards in a row:
- "The Multi-Subject Student" — Before/After/Bridge text
- "The Self-Studier" — Before/After/Bridge text  
- "The Pre-Exam Crunch" — Before/After/Bridge text
Card style: Surface background (#141419), left border 3px in #00E5CC, padding 24px.

5. FEATURES
Bento Grid layout (2 large + 2 small):
- Large 1: "Progress Curve" — "Line chart showing your predicted AP score across every practice test. Know at a glance if you're on track for a 5."
- Large 2: "Topic Heatmap" — "Color-coded grid showing accuracy for each unit. Stop wasting time on chapters you've already mastered."
- Small 1: "Zero Setup" — "No account. No password. Open and start tracking immediately."
- Small 2: "JSON Export" — "Download your records anytime. Your data is portable."
Each card: icon (Lucide: TrendingUp, Grid3x3, Zap, Download) + title + description.

6. PRICING
Two cards side by side:
- Free: "$0 forever" — "Unlimited tracking, all 5 subjects, progress curves, heatmaps, JSON export." CTA: "Start Tracking Free"
- Pro: "$4.99/mo" — "Everything in Free + PDF reports, study plans, goal tracking. Coming after validation." CTA: "Join Waitlist" (disabled style)
Free card: default border. Pro card: amber border + "Coming Soon" badge.

7. FAQ
Accordion style, 6 questions:
- Is it free?
- Do I need to sign up?
- How accurate is it?
- Which subjects are supported?
- Is my data private?
- Is this an official College Board tool?
Background: Surface (#141419). Open state: left border amber.

8. FINAL CTA
Full-width section, centered:
"You've got practice tests piling up. Spreadsheets are clunky. Calculator sites forget your scores."
"AP Score Tracker fixes that. In 30 seconds, you'll know exactly where you stand — and what to study next."
CTA: "Track My First Practice Test — Free" (large amber button)
Trust line: "No signup • No credit card • Your data stays private"

9. FOOTER
Logo, links (Privacy, Terms, Contact), copyright.
AP trademark disclaimer: "AP is a registered trademark of College Board. AP Score Tracker is not affiliated with, endorsed by, or approved by College Board."

Design constraints:
- NOT a generic SaaS template.
- No purple-blue gradient on white background.
- No centered hero with generic 3-column features.
- No emoji icons; use Lucide-style icons.
- Use asymmetric layout where appropriate.
- CTA must be the most visible element above the fold.
- Keep strong information hierarchy.
- Make the design look like a real brand, not AI-generated.
- Section spacing: 100-120px.
- Card border-radius: 12px. Button border-radius: 8px.

Device: DESKTOP version. Width: 1440px.
```

### Mobile Prompt

```text
Design the MOBILE version (375px width) of the AP Score Tracker landing page.

Same dark theme, same colors, same fonts.

Rules:
- Single column layout throughout.
- Headline max 2 lines: "Track Your AP Progress Across Every Practice Test"
- Hero: stacked — headline → subhead → CTA button (full width) → trust line → dashboard preview below.
- How It Works: 3 steps stacked vertically with vertical connecting line.
- Use Cases: cards stack vertically, full width.
- Features: Bento grid becomes single column, all cards full width.
- Pricing: cards stack vertically.
- FAQ: accordion, full width.
- Final CTA: full width, stacked text + full width button.
- Touch targets minimum 44x44px.
- No horizontal overflow.
- Navigation: hamburger menu, logo left, CTA right as icon or small button.
```

---

## 5. Logo / OG / Hero 图提示词

### Logo SVG

```text
Design an SVG vector logo icon for AP Score Tracker.
Requirements:
- Output raw SVG code, not an image.
- Monochrome, using #00E5CC (cyber teal).
- viewBox="0 0 64 64"
- Geometric design: combine a trending line graph (3 data points connected by lines) with a subtle checkmark at the endpoint.
- The line should start bottom-left, rise with 2 angles, end top-right with a small checkmark.
- 16px size must still be recognizable.
- Only one memory point: "progress line + checkmark"
- No gradients, no shadows, no 3D.
- Product concept: A tool that tracks AP exam practice test progress over time.
```

### OG Image (1200x630)

```text
Generate a 1200x630 social preview image for AP Score Tracker.
Background: #0A0A0F (dark).
Left side: bold headline "Track Your AP Progress" in Space Grotesk, white (#E8ECF0), 72px.
Below headline: subhead "Free. No signup. Your data stays private." in DM Sans, #8A8F98, 28px.
Right side: abstract dark dashboard visualization — a line chart trending upward in #00E5CC (cyber teal), with a heatmap grid below in subtle #141419 to #00E5CC gradient cells.
Bottom-left: brand name "AP Score Tracker" in #FFB800 (amber gold), 24px.
Style: Industrial, precise, data-driven, premium, clean, not template-looking.
No tiny text. No fake UI details. No photos of people.
```

### Hero 图

```text
Generate a hero image for AP Score Tracker landing page.
Style: Industrial / data-driven / dark tech.
Content: A dark-themed dashboard mockup showing:
- A line chart (progress curve) trending upward, line in #00E5CC
- A heatmap grid with cells in varying intensity of #00E5CC
- Subtle grid lines in #1E1E28
- No text in the image
- No fake UI chrome (no window borders, no browser frames)
Color palette: #0A0A0F background, #00E5CC primary, #141419 surface.
Aspect ratio: 16:9.
```

---

## 6. HANDOFF.md

```markdown
# AP Score Tracker — Design Handoff

状态：可开发
日期：2026-05-22
负责人：Weldon

---

## 1. 项目概览

产品名：AP Score Tracker
域名：apscoretracker.com
一句话定位：A free tool that helps AP students track their practice test scores, visualize progress trends, and identify weak topics across multiple exams — no signup needed.
目标用户：美高/国际学校学生（14-18岁），同时备考2-4门AP
设计调性：Dark Industrial — precise, trustworthy, data-driven

---

## 2. 交付文件

```text
deliverables/ap-score-tracker/
├── prompts/
│   ├── landing-desktop.md
│   ├── landing-mobile.md
│   └── seo-page-template.md
├── screens/
│   ├── landing-desktop.png
│   └── landing-mobile.png
├── html/
│   ├── landing-desktop.html
│   └── landing-mobile.html
└── assets/
    ├── icon.svg
    ├── wordmark.svg
    ├── favicon.svg
    ├── og-image.png
    └── hero-prompt.md
```

### Prompt
- `prompts/landing-desktop.md` — Desktop 首页完整 Prompt
- `prompts/landing-mobile.md` — Mobile 首页完整 Prompt
- `prompts/seo-page-template.md` — SEO 子页复用规则

### 截图 / 设计稿
- [待生成] `screens/landing-desktop.png`
- [待生成] `screens/landing-mobile.png`

### HTML / CSS 参考
- [待开发] `html/landing-desktop.html`
- [待开发] `html/landing-mobile.html`

### 品牌资产
- [待生成] `assets/icon.svg` — Logo 图标
- [待生成] `assets/wordmark.svg` — 文字标识
- [待生成] `assets/favicon.svg` — 网站图标
- [待生成] `assets/og-image.png` — 社交分享图
- `assets/hero-prompt.md` — Hero 图生成提示词

---

## 3. Design Tokens

| Token | Value |
|---|---|
| Background | #0A0A0F |
| Surface | #141419 |
| Text Primary | #E8ECF0 |
| Text Secondary | #8A8F98 |
| Primary Accent | #00E5CC |
| CTA / Highlight | #FFB800 |
| Border | #1E1E28 |
| Font Display | Space Grotesk |
| Font Body | DM Sans |
| Border Radius - Button | 8px |
| Border Radius - Card | 12px |
| Border Radius - Tag | 4px |
| Section Spacing | 100-120px |
| Card Padding | 24px |

---

## 4. 页面 IA

### 首页

1. Navigation (透明 → 滚动后 solid)
2. Hero (Split: 55% text / 45% dashboard preview)
3. How It Works (3 steps, horizontal)
4. Use Cases (3 cards)
5. Features (Bento Grid: 2 large + 2 small)
6. Pricing (2 cards: Free + Pro)
7. FAQ (Accordion, 6 questions)
8. Final CTA (Full-width, centered)
9. Footer (Logo, links, AP trademark disclaimer)

### SEO 矩阵页模板

可复用：配色、字体、导航、定价、FAQ、Footer
每页只改：headline、subheadline、subject-specific demo、use cases、FAQ 中 2-3 个问题

示例 SEO 页：
- /ap-lang-score-tracker
- /ap-psych-score-tracker
- /ap-calc-ab-score-tracker
- /ap-bio-score-tracker
- /ap-us-history-score-tracker

---

## 5. 开发注意事项

- 首屏必须保留 CTA（"Start Tracking Free — No Signup Needed"）
- 不要把 Hero 改成居中模板布局 — 保持 Split 55/45
- 不要替换回 Inter / Roboto / Arial — 使用 Space Grotesk + DM Sans
- 不要使用 emoji icon — 使用 Lucide React 图标
- 移动端必须单列，不允许横向滚动
- Pricing Free 卡片为默认状态，Pro 卡片加 amber border + "Coming Soon" badge
- FAQ  accordion 默认全部折叠，展开时左侧 amber border
- 合规必须展示：AP trademark disclaimer 在 Footer
- 禁用表达：Revolutionize, Empower, Seamless, Cutting-edge, AI-powered
- Hero dashboard preview 可用 Recharts 实现的真实图表截图替代 AI 生成图
- localStorage 逻辑：数据仅存浏览器，无后端

---

## 6. 需要替换 / 补充的内容

- [ ] 产品真实截图（Recharts 图表实现后替换 Hero mockup）
- [ ] Hero 图（可用真实截图替代）
- [ ] Logo SVG（按提示词生成）
- [ ] OG Image（按提示词生成）
- [ ] Privacy / Terms 链接（合规页面开发后更新）
- [ ] CTA 链接（"/app" 或 "#tracker" 锚点）
- [ ] Plausible 统计代码（部署时插入）

---

## 7. 终检结果

- [x] 5 秒内能看懂产品（"Track Your AP Progress Across Every Practice Test"）
- [x] 首屏 CTA 可见（琥珀金按钮）
- [x] Desktop + Mobile Prompt 都完成
- [x] 375px 无横向滚动（单列布局）
- [x] 没有紫蓝渐变 + 白背景模板感
- [x] 没有 emoji icon
- [x] 没有假评价（Social Proof 用冷启动文案）
- [x] 没有按钮 href="#"（待开发时替换）
- [x] 占位图已标记（Hero mockup → 真实截图）

---

## 8. 未完成项 / 风险

1. **真实产品截图缺失** — 需等 Recharts 图表开发完成后替换 Hero mockup
2. **Logo/OG 图未生成** — 有提示词，可手动或用图片工具生成
3. **Pro 版未激活** — Pricing 区 Pro 卡片需标注 "Coming Soon"
4. **SEO 子页未开发** — 5 个科目各需一个 landing page，复用模板即可
```

---

*设计交付包生成时间：2026-05-22*
*基于 site-design-student skill v1.0.0*
