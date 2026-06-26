# AP Score Tracker — 开发文档

> 项目地址：https://github.com/Simidas/apscoretracker  
> 线上地址：https://apscoretracker.com  
> 当前阶段：V1.1 已实现，V2.0 准备开发  
> 最后更新：2026-06-26

---

## 1. 项目概述

AP Score Tracker 是一个面向 AP 考生的在线分数追踪工具。它不是单次算分器，而是让学生持续记录多次模考，观察分数趋势，定位薄弱 topic，并据此安排下一轮复习。

当前线上产品体验仍是 **V1.1 local-first 版本**：

- 不需要注册或登录
- 不接入后端数据库
- 不接入支付系统
- 用户输入的模考数据保存在浏览器 `localStorage`
- 部署目标是 Cloudflare Workers，通过 `@opennextjs/cloudflare` 构建

V2.0 的目标是增加账号、云端同步和订阅付费。V2.0 已开始基础开发：依赖、middleware、登录页面、账户页、D1 migration、records/targets API、billing API 和 Stripe webhook 骨架已经加入；TrackerApp 仍未切换到云端数据流。

### 一句话定位

帮 AP 考生在多次模考之间追踪分数变化、定位薄弱章节、生成可视化进步曲线的练习追踪工具。

### 核心差异化

- 竞品多是一次性 score calculator
- 本项目主打 progress tracker 和 repeated practice test history
- V1.1 打开即用，降低首次使用门槛
- V2.0 准备增加跨设备同步和 Pro 功能，为商业化做基础

---

## 2. 当前真实技术栈

以下版本来自当前 `package-lock.json` 和构建输出。

| 层级 | 技术 | 当前版本/状态 | 说明 |
|---|---|---:|---|
| 框架 | Next.js | 15.5.18 | App Router |
| 运行时 | React | 18.3.1 | 函数组件 + Hooks |
| 语言 | TypeScript | 5.9.3 | 严格模式配置见 `tsconfig.json` |
| 样式 | Tailwind CSS | 3.4.19 | 自定义 CSS variables + utility classes |
| UI 基础 | shadcn 风格 Button + Base UI 依赖 | 当前仅少量使用 | 组件在 `src/components/ui` |
| 图表 | Recharts | 3.8.1 | 进步曲线、目标线 |
| 图标 | Lucide React | 1.16.0 | Navigation、CTA、功能区块图标 |
| 字体 | Geist 本地字体文件 | `next/font/local` | 文件位于 `src/app/fonts` |
| 存储 | Browser localStorage | V1.1 唯一业务数据存储 | `apst_records`、`apst_targets` |
| 分析 | Plausible script | 已在 `layout.tsx` 注入 | 当前使用 `plausible.shipsolo.io` 脚本 |
| Auth | Clerk | V2 骨架已接入 | 需要环境变量后联调 |
| Billing | Stripe | V2 骨架已接入 | Elements 为目标，Checkout 为备选 |
| 部署 | Cloudflare Workers | Wrangler + OpenNext | 非 Cloudflare Pages 静态导出 |
| 构建适配 | `@opennextjs/cloudflare` | 1.19.11 | 生成 `.open-next/worker.js` |
| CLI | Wrangler | 4.94.0 | 建议 Node 22 |
| CI/CD | GitHub Actions | push main 自动部署 | `npx opennextjs-cloudflare build` → `wrangler deploy` |

### 本地环境注意

- 建议使用 Node 22。当前 Cloudflare 相关依赖在 Node 20.11.1 下会有 engine warning。
- `next build` 曾提示上级目录存在 `/Users/weldon/package-lock.json`，可能干扰 workspace root 推断。如继续出现，可删除无关上级 lockfile，或在 `next.config.mjs` 设置 `outputFileTracingRoot`。
- `eslint-config-next` 目前仍是 `14.2.35`，和 Next 15 不完全一致，后续可单独对齐。

---

## 3. 项目结构

```text
apscoretracker/
├── .github/workflows/
│   └── deploy.yml              # push main → Cloudflare Workers 自动部署
├── docs/
│   ├── V1.1-PRD.md             # V1.1 功能需求
│   ├── V2.0-PRD.md             # V2.0 待开发需求
│   ├── compliance-report.md    # V1 local-first 合规报告，V2 需更新
│   ├── design-handoff.md       # 设计交付文档
│   ├── landing-page-copy.md    # 落地页文案
│   └── pricing-report.md       # 定价策略报告，部分内容偏历史
├── open-next.config.ts         # OpenNext Cloudflare 适配器配置
├── migrations/
│   └── 0001_v2_core.sql        # V2 D1 schema
├── public/
│   └── _headers                # Cloudflare 自定义响应头
├── src/
│   ├── app/
│   │   ├── page.tsx            # 首页
│   │   ├── layout.tsx          # 根布局、字体、metadata、Plausible
│   │   ├── globals.css         # 全局样式 + Tailwind
│   │   ├── tracker/page.tsx    # 追踪器页面入口
│   │   ├── account/page.tsx    # V2 账户页骨架
│   │   ├── sign-in/            # Clerk sign in
│   │   ├── sign-up/            # Clerk sign up
│   │   ├── api/                # V2 API route 骨架
│   │   ├── privacy/page.tsx    # 隐私政策
│   │   ├── terms/page.tsx      # 服务条款
│   │   ├── robots.ts           # robots.txt
│   │   ├── sitemap.ts          # sitemap.xml
│   │   ├── blog/
│   │   │   ├── how-to-track-ap-progress/
│   │   │   └── ap-score-improvement-tips/
│   │   ├── ap-biology/
│   │   ├── ap-calculus-ab/
│   │   ├── ap-calculus-bc/
│   │   ├── ap-chemistry/
│   │   ├── ap-lang/
│   │   ├── ap-physics-1/
│   │   ├── ap-psych/
│   │   ├── ap-statistics/
│   │   └── ap-us-history/
│   ├── components/
│   │   ├── auth/               # Clerk Provider/Auth controls
│   │   ├── sections/
│   │   │   ├── Navigation.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── UseCases.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── FinalCTA.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── TrackerApp.tsx  # V1.1 核心应用
│   │   └── ui/
│   │       └── button.tsx
│   └── lib/
│       ├── tracker-data.ts     # 科目、分数计算、localStorage target helpers
│       ├── v2/                 # V2 API/data/billing helpers
│       └── utils.ts            # cn()
├── next.config.mjs             # Next 配置 + OpenNext dev 初始化
├── wrangler.jsonc              # Cloudflare Workers 配置
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
├── .env.example
├── README.md
├── PRD.md                      # 原始 PRD，部分内容已历史化
└── DEVELOPMENT.md
```

`.open-next/` 是构建产物，不应提交。

---

## 4. 当前已实现功能

### 4.1 首页 `/`

首页由 9 个 section 组成：

`Navigation` → `HeroSection` → `HowItWorks` → `UseCases` → `Features` → `Pricing` → `FAQ` → `FinalCTA` → `Footer`

当前首页重点：

- 首屏展示 AP progress tracker 价值
- 内嵌模拟进步曲线
- CTA 指向 `/tracker`
- FAQ 强调 local-first 和无账号门槛

### 4.2 追踪器 `/tracker`

核心闭环：

```text
选择科目
  ↓
输入 MCQ / FRQ 原始分
  ↓
填写 topic accuracy 和 notes
  ↓
计算 totalPercent 与 AP 1-5 估分
  ↓
保存到 localStorage
  ↓
历史列表、趋势图、目标分数、学习建议、topic strength 更新
```

已实现能力：

- 5 个实际可追踪科目
- MCQ/FRQ 输入校验与 clamp
- `calculateTotalPercent()` 加权百分比
- `calculateApScore()` 阈值映射
- 目标分数 `apst_targets`
- 目标差距显示
- study tips 基于最低 topic average 和目标分差生成
- Recharts AreaChart 进步曲线
- ReferenceLine 显示目标 AP score
- JSON export / import
- 删除单条记录、清空全部记录
- 打印友好样式

注意：V2 API 已经存在，但当前 `TrackerApp` 仍走 V1.1 localStorage。前端数据流切换是后续里程碑。

### 4.3 SEO 页面

当前存在 9 个学科 SEO 页面：

- `/ap-biology`
- `/ap-calculus-ab`
- `/ap-calculus-bc`
- `/ap-chemistry`
- `/ap-lang`
- `/ap-physics-1`
- `/ap-psych`
- `/ap-statistics`
- `/ap-us-history`

注意：SEO 页面数量多于 Tracker 实际支持科目。Tracker 当前实际支持 5 科。

### 4.4 博客页

- `/blog/how-to-track-ap-progress`
- `/blog/ap-score-improvement-tips`

---

## 5. 当前数据模型

### 5.1 localStorage keys

| Key | 用途 | 数据形态 |
|---|---|---|
| `apst_records` | 用户保存的模考记录 | `ExamRecord[]` JSON |
| `apst_targets` | 每科目标 AP 分数 | `Record<subjectId, 1 | 2 | 3 | 4 | 5>` JSON |

### 5.2 TypeScript 模型

当前权威定义在 `src/lib/tracker-data.ts`：

```typescript
export type ExamRecord = {
  id: string;
  subjectId: string;
  date: string;
  mcqScore: number;
  frqScore: number;
  totalPercent: number;
  apScore: 1 | 2 | 3 | 4 | 5;
  topicScores: Record<string, number>;
  notes?: string;
};
```

### 5.3 实际 Tracker 科目

当前 `subjects` 数组包含 5 科：

| subjectId | 名称 | MCQ Max | FRQ Max |
|---|---|---:|---:|
| `ap-lang` | AP English Language | 45 | 18 |
| `ap-psych` | AP Psychology | 75 | 14 |
| `ap-calc-ab` | AP Calculus AB | 45 | 54 |
| `ap-bio` | AP Biology | 60 | 24 |
| `apush` | AP United States History | 55 | 36 |

---

## 6. 部署架构

### 6.1 Cloudflare Workers + OpenNext

```text
push main
  ↓
GitHub Actions
  ↓
npm ci
  ↓
npx opennextjs-cloudflare build
  ↓
wrangler deploy
  ↓
Cloudflare Worker: apscoretracker
```

OpenNext 输出：

- Worker 入口：`.open-next/worker.js`
- 静态资源：`.open-next/assets`

### 6.2 关键配置

`wrangler.jsonc`：

- `main`: `.open-next/worker.js`
- `name`: `apscoretracker`
- `compatibility_date`: `2026-05-23`
- `compatibility_flags`: `nodejs_compat`, `global_fetch_strictly_public`
- `assets.binding`: `ASSETS`
- `services.binding`: `WORKER_SELF_REFERENCE`
- `images.binding`: `IMAGES`

`open-next.config.ts`：

- 当前使用默认 `defineCloudflareConfig({})`
- R2 incremental cache 暂未启用

V2 D1 需要在真实数据库创建后往 `wrangler.jsonc` 增加：

```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "apscoretracker-prod",
    "database_id": "..."
  }
]
```

`next.config.mjs`：

- `images.unoptimized = true`
- 调用 `initOpenNextCloudflareForDev()` 以支持 OpenNext dev 场景

### 6.3 GitHub Actions

当前 `.github/workflows/deploy.yml`：

- 触发：push 到 `main`
- Node：22
- 步骤：checkout → setup-node → `npm ci` → `npx opennextjs-cloudflare build` → `wrangler deploy`

---

## 7. 开发工作流

### 本地安装

```bash
npm ci
```

V2 环境变量：

```bash
cp .env.example .env.local
```

然后填入 Clerk、Stripe 和 app URL。D1 通过 `wrangler.jsonc` binding 提供，不放在 `.env.local`。

### 本地开发

```bash
npm run dev
```

默认地址：http://localhost:3000

### Next 构建

```bash
npm run build
```

### Cloudflare/OpenNext 构建

```bash
npx opennextjs-cloudflare build
```

### Cloudflare 本地预览

```bash
npm run preview
```

### 手动部署

```bash
npm run deploy
```

### 类型生成

```bash
npm run cf-typegen
```

---

## 8. 文档状态

| 文档 | 当前意义 | 状态 |
|---|---|---|
| `README.md` | 对外/快速上手说明 | 已更新为当前 Workers 技术栈 |
| `DEVELOPMENT.md` | 当前实现与开发部署说明 | 本文件，已按实际代码更新 |
| `PRD.md` | 原始 MVP 产品需求 | 历史文档，部分内容与当前实现不一致 |
| `MVP.md` | MVP 范围收缩 | 历史文档 |
| `docs/V1.1-PRD.md` | V1.1 功能说明 | 与当前实现较接近 |
| `docs/V2.0-PRD.md` | 下一阶段产品需求 | 作为下一步开发依据 |
| `docs/compliance-report.md` | V1 local-first 合规 | V2 上线前必须更新 |
| `docs/pricing-report.md` | 定价研究 | V2 可参考，但需按最终方案刷新 |

---

## 9. 关键决策记录

| 日期 | 决策 | 原因/备注 |
|---|---|---|
| 2026-05-16 | 项目初始化 | Next.js + Tailwind + shadcn 风格组件 |
| 2026-05-17 | 首发 Tracker 支持 5 科 | AP Lang、AP Psych、Calc AB、AP Bio、APUSH |
| 2026-05-18 | 采用差异化暗色视觉方向 | 与传统 calculator 类产品拉开差异 |
| 2026-05-20 | V1 全部免费、local-first | 先验证 tracker 需求 |
| 2026-05-21 | 添加 SEO 学科页和博客 | 抢占 AP progress / tracker 长尾词 |
| 2026-05-23 | 迁移到 `@opennextjs/cloudflare` | 面向 Cloudflare Workers 部署 |
| 2026-06-26 | 明确 V2.0 为下一阶段 | Clerk + D1 + Stripe 仍未进入代码实现 |
| 2026-06-26 | V2 基础开发启动 | 增加 Clerk/Stripe 依赖、middleware、D1 migration、API/billing 骨架 |

---

## 10. 后续工作建议

### 10.1 V1.1 收尾

- [x] 对齐 `eslint-config-next` 与 Next 15
- [x] CI Node 升级到 22
- [x] 处理 Next workspace root warning
- [ ] 给 `tracker-data.ts` 增加基础单元测试
- [ ] 明确 SEO 页面与 Tracker 实际支持科目的关系
- [ ] 更新 V1 隐私/条款中 Cloudflare Pages 的历史表述

### 10.2 V2.0 开发前置

- [ ] 确认 V2 是否强制登录保存数据
- [ ] 确认 Free/Pro 限制口径
- [ ] 确认 D1 schema、迁移方式和本地 dev 数据库
- [ ] 确认 Stripe 是 Checkout 还是 Elements
- [ ] 确认 V1 localStorage 数据是否迁移
- [ ] 更新合规文档、隐私政策、服务条款

---

## 11. 参考链接

- OpenNext Cloudflare：https://opennext.js.org/cloudflare
- Cloudflare Workers：https://developers.cloudflare.com/workers/
- Wrangler：https://developers.cloudflare.com/workers/wrangler/
- Next.js：https://nextjs.org/docs
