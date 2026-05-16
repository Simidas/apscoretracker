# AP Score Tracker — MVP 范围收缩文档

## 核心原则

最小可用 = 用户能完整体验一次核心闭环：选择科目 → 输入模考成绩 → 保存 → 查看进步曲线和热力图

---

## 保留功能清单（MVP）

| 功能 | 简化方式 | 备注 |
|---|---|---|
| 30+ AP 科目计算器 | 先做 Top 10 科目（Lang, Psych, Calc AB/BC, Physics 1/C, Bio, Chem, Stats, USH, Gov） | 其余科目用通用模板快速扩展 |
| 分数输入 | MCQ + FRQ 分输入 → 自动算 1-5 分 | 复用公开 scoring curve |
| 本地保存 | localStorage，浏览器内持久化 | 无后端，无登录 |
| 历史记录列表 | 按时间倒序展示每次模考 | 显示日期、总分、1-5分 |
| 进步曲线图 | Recharts LineChart，单科目时间轴 | 横轴日期，纵轴 1-5 分 |
| 章节/题型 breakdown | 输入各章节得分 → 热力图展示 | 用 color scale 显示强弱 |
| 多科目切换 | 左侧/顶部科目导航 | 每个科目独立数据 |
| 导出 JSON | 一键下载备份文件 | 换设备/清缓存时可恢复 |
| 响应式布局 | 桌面 + 移动端可用 | Tailwind 断点 |

---

## 砍掉功能清单（移到后续迭代）

| 功能 | 原计划阶段 | 砍掉原因 |
|---|---|---|
| 用户登录/账号系统 | P0 | 增加后端复杂度，localStorage 足够验证 MVP |
| 后端数据库 | P0 | 同上 |
| PDF 导出 | P1 | 需要 html2canvas + jsPDF，MVP 先用 JSON |
| 备考计划生成 | P1 | 需要 AI 或规则引擎，MVP 后验证需求 |
| 目标分数设定 | P1 | 可手动心算，非核心闭环 |
| 跨设备同步 | P1 | 依赖账号系统 |
| 教师班级版 | P2 | B2B 场景，先验证 C 端 |
| AI 作文评分 | NOT-DO | 完全砍掉 |
| 换学分查询 | NOT-DO | 完全砍掉 |

---

## 技术栈

| 层 | 技术 | 说明 |
|---|---|---|
| 框架 | Next.js 14 (App Router) | 静态导出，无服务端 |
| 样式 | Tailwind CSS + shadcn/ui | 快速 UI，组件现成 |
| 图表 | Recharts | 进步曲线 + 热力图 |
| 存储 | localStorage | 首版唯一存储 |
| 部署 | Vercel | 自动 CI/CD |
| 域名 | apscoretracker.com | 已注册 |

---

## 数据库 Schema（最小化）

无后端，localStorage 数据结构：

```typescript
interface ExamRecord {
  id: string;           // uuid
  subject: string;      // "ap-lang" | "ap-psych" | ...
  date: string;         // ISO date
  mcqScore: number;     // raw MCQ points
  frqScore: number;     // raw FRQ points
  totalScore: number;   // composite 0-150 etc
  apScore: number;      // 1-5
  breakdown?: {         // optional chapter/topic scores
    [topic: string]: number;
  };
  notes?: string;
}

// localStorage key: "apst_records"
// value: ExamRecord[]
```

---

## 用户流程

```
访客 landing → 选择科目 → 输入 MCQ/FRQ → 计算得分 → 保存到历史
                                                    ↓
                                              查看历史列表
                                                    ↓
                                              点击图表 Tab
                                                    ↓
                                              查看进步曲线 + 热力图
```

---

## 验收标准

- [ ] 10 个科目计算器结果与 College Board 官方 curve 误差 ≤ 0.5 分
- [ ] 输入成绩 → 保存 → 刷新页面 → 数据仍在
- [ ] 同一科目保存 3 次以上 → 进步曲线正确显示
- [ ] 移动端可用，无横向滚动
- [ ] Lighthouse 性能评分 ≥ 80
- [ ] 首屏加载时间 ≤ 2s

---

## 开发时间线（1.5 周）

| 天数 | 任务 |
|---|---|
| Day 1-2 | 项目初始化 + 科目数据结构 + 10 个科目 scoring curve |
| Day 3-4 | 计算器 UI + localStorage 读写 |
| Day 5-6 | 历史记录列表 + 进步曲线图表 |
| Day 7 | 章节 breakdown + 热力图 |
| Day 8 | 响应式优化 + 导出 JSON |
| Day 9 | SEO 页面（10 个科目 landing）+ 博客页 |
| Day 10 | 测试 + Vercel 部署 + 域名绑定 |

---

## 成本验算

| 项目 | MVP 成本/月 | 优化手段 |
|---|---|---|
| Vercel Pro | $0（免费额度） | 静态站点，无 Serverless Function |
| 域名 | ~$10/年 | 已注册 |
| 无后端 | $0 | 无数据库/API |
| 无 AI API | $0 | 纯前端计算 |
| **总计** | **~$10/年** | |

---

## 决策检查点

| 检查点 | 时间 | 通过标准 | 不通过则 |
|---|---|---|---|
| 科目数据完成 | Day 2 | 10 个科目 curve 准确 | 减少到 5 个科目 |
| 核心闭环可用 | Day 6 | 输入→保存→图表完整跑通 | 砍掉热力图 |
| 上线前 | Day 10 | 验收标准全通过 | 延期 2 天或砍功能 |

---

## 给开发的交接摘要

```
项目：apscoretracker.com
技术栈：Next.js 14 + Tailwind + shadcn/ui + Recharts
存储：localStorage 唯一存储，无后端
P0：10 科目计算器 + 本地保存 + 进步曲线 + 热力图
NOT-DO：登录、后端、PDF导出、AI、账号系统
部署：Vercel 静态导出
验收：见上文 6 条标准
```
