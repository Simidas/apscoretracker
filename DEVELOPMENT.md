# AP Score Tracker — 开发文档

> 项目地址：https://github.com/Simidas/apscoretracker  
> 线上地址：https://apscoretracker.com  
> 技术负责人：马来研（开发助理）  
> 最后更新：2026-05-23

---

## 1. 项目概述

AP Score Tracker 是一个面向 AP 考生的免费在线分数追踪工具。核心定位不是一次性算分器，而是帮学生在多次模考之间追踪进步、定位薄弱章节、生成可视化进步曲线。

### 一句话定位
帮 AP 考生在多次模考之间追踪分数变化、定位薄弱章节、生成可视化进步曲线的免费工具。

### 核心差异化
- 现有竞品（apscore5、albert.io 等）全是"一次性计算器"
- 我们是"多次模考追踪器"，填补 "tracker / progress" 类长尾词的 SEO 空白
- 零注册、零登录、打开即用，数据存在浏览器本地

---

## 2. 技术栈

| 层级 | 技术 | 版本 | 说明 |
|---|---|---|---|
| 框架 | Next.js | 15.0 | App Router，静态导出 |
| 运行时 | React | 18 | 函数组件 + Hooks |
| 语言 | TypeScript | 5.9 | 严格模式 |
| 样式 | Tailwind CSS | 3.4 | 自定义设计系统 |
| UI 组件 | shadcn/ui | — | Button 等基础组件 |
| 图表 | Recharts | 3.8 | 进步曲线、数据可视化 |
| 图标 | Lucide React | 1.16 | 全站图标 |
| 字体 | Space Grotesk + DM Sans | Google Fonts | 品牌字体 |
| 存储 | localStorage | — | 首版唯一存储，无后端 |
| 部署 | Cloudflare Workers | — | 全栈部署，非纯静态 Pages |
| 分析 | Plausible | — | 隐私友好型分析 |
| CI/CD | GitHub Actions | — | push main 自动部署 |

---

## 3. 项目结构

```
apscoretracker/
├── .github/workflows/          # CI/CD
│   └── deploy.yml              # push main → Cloudflare Workers 自动部署
├── docs/                       # 产品文档
│   ├── compliance-report.md    # 合规报告（GDPR/隐私/条款）
│   ├── design-handoff.md       # 设计交付文档
│   ├── landing-page-copy.md    # 落地页文案
│   └── pricing-report.md       # 定价策略报告
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # 首页（落地页）
│   │   ├── layout.tsx          # 根布局（字体、meta、Plausible）
│   │   ├── tracker/page.tsx    # 追踪器应用页
│   │   ├── sitemap.ts          # 动态 sitemap
│   │   ├── robots.ts           # robots.txt
│   │   ├── globals.css         # 全局样式 + Tailwind
│   │   ├── blog/               # SEO 博客页
│   │   │   ├── how-to-track-ap-progress/
│   │   │   └── ap-score-improvement-tips/
│   │   ├── ap-lang/            # SEO 学科落地页
│   │   ├── ap-psych/
│   │   ├── ap-calculus-ab/
│   │   ├── ap-calculus-bc/
│   │   ├── ap-physics-1/
│   │   ├── ap-biology/
│   │   ├── ap-chemistry/
│   │   ├── ap-statistics/
│   │   ├── ap-us-history/
│   │   ├── privacy/            # 隐私政策
│   │   └── terms/              # 服务条款
│   ├── components/
│   │   ├── sections/           # 页面区块组件
│   │   │   ├── Navigation.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── UseCases.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── FinalCTA.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── TrackerApp.tsx  # 核心追踪器应用
│   │   └── ui/                 # shadcn/ui 组件
│   │       └── button.tsx
│   ├── lib/
│   │   ├── utils.ts            # cn() 工具函数
│   │   └── tracker-data.ts     # 科目数据、scoring curves
│   └── app/fonts/              # Geist 字体文件
├── next.config.mjs             # Next.js 配置（静态导出）
├── wrangler.toml               # Cloudflare Workers 配置
├── tailwind.config.ts          # Tailwind 配置
├── tsconfig.json               # TypeScript 配置
├── package.json
├── MVP.md                      # MVP 范围收缩文档
├── PRD.md                      # 产品定义 PRD
├── README.md                   # 项目 README
└── DEVELOPMENT.md              # 本文件
```

---

## 4. 核心功能模块

### 4.1 落地页（Home）
9 个区块：Navigation → Hero → HowIt Works → UseCases → Features → Pricing → FAQ → FinalCTA → Footer
- Hero 内嵌计算器 Demo，首屏可直接使用
- 所有 CTA 指向 /tracker

### 4.2 追踪器应用（/tracker）
核心闭环：选择科目 → 输入 MCQ/FRQ → 计算 1-5 分 → 保存 → 查看历史 + 进步曲线 + 热力图

**数据流：**
```
用户输入 MCQ/FRQ → tracker-data.ts 计算 composite → 映射到 1-5 AP 分
                                              ↓
                                    localStorage (key: "apst_records")
                                              ↓
                                    历史列表 / Recharts 曲线 / 热力图
```

### 4.3 SEO 学科页面
每个科目独立页面（/ap-lang, /ap-psych 等），包含：
- 科目专属 meta title/description
- 嵌入式计算器
- 科目相关 FAQ

### 4.4 博客页
两篇 SEO 博客：
- /blog/how-to-track-ap-progress
- /blog/ap-score-improvement-tips

---

## 5. 数据模型

### localStorage Schema

```typescript
interface ExamRecord {
  id: string;           // uuid v4
  subject: string;      // "ap-lang" | "ap-psych" | ...
  date: string;         // ISO 8601
  mcqScore: number;     // raw MCQ points
  frqScore: number;     // raw FRQ points
  totalScore: number;   // composite (0-150 etc，因科目而异)
  apScore: number;      // 1-5
  breakdown?: {         // 各章节/主题得分（可选）
    [topic: string]: number;
  };
  notes?: string;       // 用户备注
}

// localStorage key: "apst_records"
// value: ExamRecord[] (JSON 序列化)
```

### 科目数据结构

详见 `src/lib/tracker-data.ts`，包含：
- 10 个科目的 scoring curves（MCQ/FRQ 权重、composite 范围、1-5 分阈值）
- 各科目章节/单元 breakdown 定义
- 科目显示名称、slug、描述

---

## 6. 部署架构

### Cloudflare Workers（全栈）

```
GitHub push main
      ↓
GitHub Actions (deploy.yml)
      ↓
npm ci → npm run build → wrangler deploy
      ↓
Cloudflare Workers (apscoretracker)
      ↓
静态资源: .vercel/output/static (site bucket)
```

### 配置要点

**wrangler.toml:**
```toml
name = "apscoretracker"
compatibility_date = "2024-05-12"
compatibility_flags = ["nodejs_compat"]

[site]
bucket = "./.vercel/output/static"
```

**GitHub Secrets:**
- `CLOUDFLARE_API_TOKEN` — Workers 部署令牌
- `CLOUDFLARE_ACCOUNT_ID` — 账户 ID

### 域名
- 注册商：Dynadot
- DNS：迁移到 Cloudflare（进行中）
- 目标：apscoretracker.com

---

## 7. 开发工作流

### 本地开发
```bash
npm install
npm run dev          # localhost:3000
```

### 构建
```bash
npm run build        # 输出到 .vercel/output/static
```

### 手动部署
```bash
npm run deploy       # build + wrangler deploy
```

### 自动部署
push 到 `main` 分支即触发 GitHub Actions 自动部署。

---

## 8. 关键决策记录

| 日期 | 决策 | 原因 |
|---|---|---|
| 2026-05-16 | 项目初始化 | Next.js 14 + Tailwind + shadcn/ui |
| 2026-05-17 | 锁定 5 个首发科目 | Lang, Psych, Calc AB, Bio, USH |
| 2026-05-18 | 设计方向：Dark Industrial | 竞品分析后确定差异化视觉 |
| 2026-05-19 | 部署从 Pages 迁移到 Workers | 需要服务端能力（sitemap、SEO） |
| 2026-05-20 | MVP 全部免费 | 先验证 PMF，Pro 版后续再开 |
| 2026-05-21 | 添加 SEO 学科页面 + 博客 | 抢占 tracker 类长尾词 |
| 2026-05-22 | 迁移到 OpenNext | 更好的 Cloudflare Workers 集成 |
| 2026-05-22 | 添加 sitemap.ts + robots.ts | SEO 基础设施 |

---

## 9. 待办 / 后续迭代

### P1（验证需求后）
- [ ] 扩展至 30+ 科目
- [ ] 目标分数设定 + 差距显示
- [ ] 备考建议生成（基于薄弱章节）
- [ ] 打印友好样式 / 可打印报告
- [ ] 社交分享卡片（Reddit/Twitter）

### P2（增长阶段）
- [ ] 更多 SEO 博客内容
- [ ] 竞品截流页（/alternative/apscore5）
- [ ] 用户证言收集
- [ ] Pro 版付费功能（跨设备同步、PDF 导出、高级分析）

### 技术债务
- [ ] 考虑从 localStorage 迁移到 KV/D1（如果需要跨设备）
- [ ] 图片优化（目前 unoptimized: true）
- [ ] Lighthouse 性能评分优化（目标 ≥ 90）

---

## 10. 参考文档

- **PRD**: `PRD.md` — 产品定义、市场分析、用户画像、功能规划
- **MVP**: `MVP.md` — 范围收缩、验收标准、开发时间线
- **设计交付**: `docs/design-handoff.md` — 视觉规范、组件库、动画
- **合规报告**: `docs/compliance-report.md` — GDPR、隐私政策、服务条款
- **定价策略**: `docs/pricing-report.md` — 免费/付费策略、竞品定价

---

## 11. 联系方式

- 项目负责人：小马
- 技术实现：马来研（开发助理）
- 仓库：https://github.com/Simidas/apscoretracker
