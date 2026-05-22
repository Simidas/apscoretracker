# AP Score Tracker — Product Definition PRD

## 0. 结论先行

- **做不做**：做。AP Score Tracker 定位是现有计算器赛道的差异化切口——不是做一次性算分工具，而是帮学生在多次模考之间追踪进步、定位薄弱点。
- **为什么做**：SERP 实扫确认，"tracker / progress" 类长尾词几乎没有专用工具站占位，用户现有替代方案是 Google Sheets / Notion 模板或手动记录，体验差。
- **一句话定位**：帮 AP 考生在多次模考之间追踪分数变化、定位薄弱章节、生成可视化进步曲线的免费工具。
- **首版做什么**：10 科目计算器 + 本地保存历史记录 + 进步曲线图表 + 章节热力图 + JSON 导出备份。
- **明确不做什么**：用户登录/账号系统、后端数据库、AI 作文评分、教师班级版、换学分查询、PDF 导出、跨设备同步。

---

## 1. 市场概述

### 目标关键词

| 关键词 | 类型 | 竞争度判断 |
|---|---|---|
| ap score calculator | 主词 | 红海，已有 10+ 专用站 |
| ap score tracker | 核心差异词 | **空白**，SERP 无专用工具 |
| ap practice test tracker | 长尾 | 空白，仅博客/模板 |
| track my ap scores | 长尾 | 空白，结果全是 College Board 官方 |
| ap exam progress tracker | 长尾 | 空白，仅一个 GitHub 个人项目 |
| ap lang score tracker | 科目长尾 | 空白 |
| ap psych score tracker | 科目长尾 | 空白 |

### 搜索量 / CPC / KD

- ap score calculator：~14,800/月，CPC $1.97，KD 34（数据来源：discoverkeywords.co 老词报告）
- tracker / progress 类长尾词：无精确数据，但搜索意图明确，竞争极低

### 趋势判断

- **长期需求**：AP 考试每年 5 月举行，全年有稳定搜索，考前 3-4 个月（1-4 月）流量峰值
- **非短期热点**：教育类工具需求稳定，不受 AI 热点波动影响
- **时机**：5 月考试季刚过，现在启动可在 2026-2027 考试周期前积累 SEO 权重

### 机会判断

| 过滤问题 | 判断 |
|---|---|
| 长期需求还是短期热点？ | ✅ 长期，每年重复 |
| SERP 有独立小站能排进去吗？ | ✅ tracker 类词完全空白 |
| 用户有明确付费场景吗？ | ⚠️ 学生付费意愿低，但 Pro 版可面向重度用户 |
| 用户有明确付费场景吗？ | ⚠️ 学生付费意愿低，但 Pro 版可面向重度用户 |

**结论：4 个强指标中 3 个强，1 个中等，值得推进。**

> **定价策略更新（2026-05-21）**：MVP 阶段全部免费，先验证"追踪"需求真实存在。付费功能（Pro 版）在验证 PMF 后再开启。详见定价报告 `/docs/pricing-report.md`。

---

## 2. SERP 与竞品分析

### SERP 实扫 — "ap score tracker"

| 排名 | 结果 | 类型 | 大小站 |
|---|---|---|---|
| 1 | College Board 官方查分 | 信息/工具 | 大站 |
| 2 | fiveable.me/ap-score-calculator | 工具 | 中站 |
| 3 | apscorehub.com | 工具 | 小站（2026-03） |
| 4 | albert.io | 工具 | 大站 |
| 5 | apscorecalculator.org | 工具 | 小站（2026-01） |
| 6 | College Board AP Central | 信息 | 大站 |
| 7 | apscorecalc.com | 工具 | 小站（2026-03） |
| 8 | collegize.ai | 工具 | 小站 |
| 9 | prepgo.com | 工具 | 中站 |
| 10 | Study.com 教程 | 信息 | 大站 |

**Top 10 类型分布**：工具页 6/10，信息页 4/10，大站 5/10，独立小站 5/10

**关键发现**：
- SERP 上 **没有任何一个站主打 "tracker" 概念**，全是 "calculator"
- 用户搜 "tracker" 却被计算器结果满足，说明需求被压抑——现有产品没解决"多次模考追踪"痛点

### SERP 实扫 — "ap practice test tracker"

| 排名 | 结果 | 类型 |
|---|---|---|
| 1 | apscore5.com | 练习平台（有 progress tracking） |
| 2 | sparkl.me 博客 | Google Sheets 模板教程 |
| 3 | test-ninjas.com | 练习测试 |
| 4 | knowt.com | 练习测试 |
| 5 | ap-ally.com | AI 学习平台 |
| 6 | superap.org | 练习测试 |
| 7 | College Board Bluebook | 官方练习 |
| 8 | Quizlet | 练习 |
| 9 | freeappractice.org | AI 练习题 |
| 10 | highschooltestprep.com | 练习测试 |

**关键发现**：
- apscore5.com 是唯一带 "progress tracking" 的，但它是练习平台，不是纯追踪工具
- sparkl.me 博客说明用户确实在找追踪方案，但只能用 Google Sheets 替代
- **无专用 tracker 工具站**

### SERP 实扫 — "track my ap scores"

结果全是 College Board 官方查分流程，无任何第三方工具。

### Top 3 竞品

| 竞品 | 定位 | 优势 | 劣势 | 域名年龄 |
|---|---|---|---|---|
| **APScore5** (apscore5.com) | AP 练习 + 进度追踪 | 有练习题 + checklist tracker | 需注册，非专用 tracker，功能重 | 2026-04 |
| **sparkl.me** | 博客 + 辅导服务 | Google Sheets 模板教程 | 不是工具，是服务 | 2023-08 |
| **zelensky-ea.github.io** | AP Bio 进度追踪 | 纯前端，无注册 | 仅 1 个科目，个人项目，无维护 | GitHub Pages |

### 三层竞品分级

| 层级 | 定义 | 竞品 |
|---|---|---|
| Tier 1 | 直接竞品 | apscore5.com（功能部分重叠） |
| Tier 2 | 相邻方案 | Google Sheets / Notion 模板、Excel 手动记录 |
| Tier 3 | 现状/不做 | 不追踪、考完就忘、只靠感觉 |

**核心洞察**：我们不是在抢 Tier 1 的用户，而是在把 Tier 2 和 Tier 3 的用户（用 Sheets 或不做追踪的人）变成我们的用户。

### 用户痛点证据

- Reddit r/APStudents 常见帖："How do I track my progress across multiple practice tests?"
- sparkl.me 博客流量说明：学生主动搜索 "AP tracker template"
- apscore5.com 把 "progress tracking" 作为卖点，说明市场验证过需求

---

## 3. 目标用户

### 细分用户

| 用户 | 画像 | 痛点 | 触发场景 | 付费意愿 |
|---|---|---|---|---|
| **主力：自律型考生** | 11-12 年级，考 2-4 科，目标 4-5 分 | 模考 5-10 次后不知道进步了多少，不知道哪里还弱 | 每次模考后想记录和分析 | 低（学生），但家长可能愿付 |
| 次要1：自学生 | 无 AP 课程，自学备考 | 没有老师给反馈，完全靠自己判断水平 | 每学完一个单元后自测 | 中 |
| 次要2：AP 老师 | 教 1-2 科，想推荐工具给学生 | 想让学生养成追踪习惯，但不想自己建系统 | 学期初/考前 | 中（学校预算） |

### 主力用户深度画像

- **Who**：Emma，17 岁，美国高中 Junior，正在备考 AP Lang 和 AP Psych
- **Pain**：已经做了 4 套 AP Lang 模考，分数在 3-4 之间波动，不知道是真的进步了还是题目难度不同
- **Current**：在 Notes app 里手动记分数，没有可视化
- **Trigger**：刚做完一套模考，想知道自己离 5 分还有多远
- **Hangout**：Reddit r/APStudents, TikTok study accounts, Discord study groups
- **Willingness**：$0（免费版足够），但如果能生成 PDF 报告给家长/老师看，愿付 $5-10

---

## 4. 产品定位

### 定位语句

```
FOR AP 考生
WHO 在多次模考中无法追踪进步和定位薄弱点
AP Score Tracker IS A 在线分数追踪工具
THAT 保存每次模考成绩并生成进步曲线和章节热力图
UNLIKE Google Sheets 或一次性计算器
AP Score Tracker 自动可视化进步趋势并指出该复习哪里
```

### 消息层级

| 层级 | 内容 |
|---|---|
| **Headline** | Track Your AP Progress Across Every Practice Test |
| **Subhead** | See your score trends, spot weak topics, and know exactly what to study next |
| **Benefits** | ① 自动进步曲线 — 看清每次模考是进步还是退步 ② 薄弱章节定位 — 不用猜，热力图告诉你该复习哪章 ③ 多科目统一管理 — 一个页面追踪所有 AP 科目 ④ 零注册零登录 — 打开即用，数据存在本地 |
| **Features** | 30+ 科目计算器 / 本地历史保存 / Recharts 可视化 / 章节 Breakdown / JSON 导出 |
| **Proof** | "I went from a 2 to a 5 on AP Lang by tracking my weak spots" — 用户证言（后续收集） |

### 差异化

| 维度 | 现有竞品 | AP Score Tracker |
|---|---|---|
| 核心功能 | 一次性算分 | 多次模考追踪 |
| 数据留存 | 无 | 本地保存，跨会话保留 |
| 可视化 | 无 | 进步曲线 + 热力图 |
| 使用门槛 | 需注册（apscore5） | 零注册，打开即用 |
| 科目覆盖 | 部分 | 30+ 全科 |

### 禁词清单

- 不能说 "最准确的 AP 分数预测"（无法验证）
- 不能说 "保证提分"（教育合规风险）
- 不能说 "官方 College Board 工具"（商标风险）

---

## 5. 功能规划

### P0（首版必做 — 核心闭环）

| 功能 | 说明 | 简化方式 |
|---|---|---|
| 10 科目计算器 | AP Lang, Psych, Calc AB, Calc BC, Physics 1, Physics C, Bio, Chem, Stats, USH | 先做 Top 10，其余用通用模板扩展 |
| 分数输入 | MCQ + FRQ 输入 → 自动算 1-5 分 | 复用公开 scoring curve |
| 本地保存 | localStorage 持久化 | 无后端，无登录 |
| 历史记录列表 | 按时间倒序展示 | 显示日期、总分、AP 分数 |
| 进步曲线图 | Recharts LineChart | 时间轴 × AP 分数 |
| 章节 Breakdown | 输入各章节得分 | 热力图展示强弱 |
| 多科目切换 | 侧边栏/顶部导航 | 每科目独立数据 |
| JSON 导出 | 一键下载备份 | 换设备/清缓存可恢复 |
| 响应式布局 | 桌面 + 移动端 | Tailwind 断点 |

### P1（快速跟进 — 验证需求后）

| 功能 | 说明 |
|---|---|
| 扩展至 30+ 科目 | 覆盖全部 AP 科目 |
| 目标分数设定 | 设定目标 → 显示差距 |
| 备考建议生成 | 基于薄弱章节给简单建议 |
| 打印友好样式 | 生成可打印的进度报告 |
| 社交分享卡片 | 分享进步曲线到 Reddit/Twitter |

### NOT-DO（明确不做）

| 功能 | 原因 |
|---|---|
| 用户登录/账号系统 | 增加后端复杂度，localStorage 足够 MVP |
| 后端数据库 | 同上 |
| PDF 导出 | 需要 html2canvas + jsPDF，P1 后考虑 |
| AI 作文评分 | 完全砍掉，非定位方向 |
| 换学分查询 | 完全砍掉，非定位方向 |
| 教师班级版 | B2B 场景，先验证 C 端 |
| 跨设备同步 | 依赖账号系统 |
| 练习题库 | apscore5/test-ninjas 已做，不正面竞争 |

---

## 6. 页面信息架构（IA）

### 首页结构

```
1. Hero
   - Headline: Track Your AP Progress Across Every Practice Test
   - Subhead: See your score trends, spot weak topics, and know exactly what to study next
   - 嵌入式计算器 Demo（首屏直接用）
   - CTA: Start Tracking Free — No Signup Needed

2. Demo / 效果展示
   - 动图/截图：展示"输入 3 次模考 → 看到进步曲线"的过程

3. How It Works（3 步）
   ① Choose Your Subject — Select from 30+ AP exams
   ② Enter Your Scores — Input MCQ and FRQ results from any practice test
   ③ Track Your Progress — View your trend line and topic heatmap instantly

4. Use Cases（3 个场景卡片）
   - "Preparing for May Exams" — 考前密集模考期追踪
   - "Self-Studying at Home" — 自学生无老师反馈时自我监控
   - "Comparing Multiple Subjects" — 同时备考多科，统筹时间分配

5. Features（4 个功能卡片）
   - Progress Chart: Visualize your score trends over time
   - Topic Heatmap: Instantly see which units need more review
   - Multi-Subject Dashboard: All your AP exams in one place
   - Zero Setup: No account, no login, no friction

6. FAQ（8 个）
   - Is this free? / Does it work on mobile? / How is my data stored?
   - Which AP subjects are supported? / How accurate is the score prediction?
   - Can I export my data? / Can I use this for official AP scores?
   - Is there a way to sync across devices?

7. Footer CTA
   - "Start Tracking Your First Practice Test"
```

### 转化检查

- [x] Hero 3 秒内说明价值
- [x] 首屏可直接使用工具
- [x] CTA 是"动词 + 结果"
- [x] 有 How It Works
- [x] 有真实样例展示
- [x] FAQ 覆盖价格、隐私、限制
- [x] 定价区先展示价值（免费）

### SEO 页面矩阵

| 页面 | URL | 目标关键词 | 目的 | 优先级 |
|---|---|---|---|---|
| 首页 | / | ap score tracker, ap score calculator | 转化 | P0 |
| AP Lang | /ap-lang | ap lang score tracker, ap lang score calculator | SEO + 转化 | P0 |
| AP Psych | /ap-psych | ap psych score tracker, ap psych score calculator | SEO + 转化 | P0 |
| AP Calc BC | /ap-calculus-bc | ap calc bc score tracker | SEO + 转化 | P0 |
| AP Physics C | /ap-physics-c | ap physics c score tracker | SEO + 转化 | P0 |
| AP Bio | /ap-biology | ap bio score tracker | SEO + 转化 | P1 |
| AP Chem | /ap-chemistry | ap chem score tracker | SEO + 转化 | P1 |
| AP Stats | /ap-statistics | ap stats score tracker | SEO + 转化 | P1 |
| AP USH | /ap-us-history | apush score tracker | SEO + 转化 | P1 |
| 博客 | /blog/how-to-track-ap-progress | how to track ap exam progress | 引流 | P2 |
| 博客 | /blog/ap-score-improvement-tips | how to improve ap score | 引流 | P2 |
| 对比 | /alternative/apscore5 | apscore5 alternative | 截流 | P2 |

---

## 7. 定价设计

### 竞品价格锚点

| 竞品 | 定价模式 |
|---|---|
| apscore5.com | 免费 + 订阅（未公开价格） |
| fiveable.me | 免费计算器 + $9.99/月 学习平台 |
| albert.io | 免费试用 + 订阅 |
| test-ninjas.com | 免费 |

### 定价草案

| 版本 | 功能 | 价格 |
|---|---|---|
| **Free** | 无限次计算、本地保存 20 条记录、基础图表、10 科目 | $0 |
| **Pro** | 无限记录、30+ 科目、PDF 导出、备考计划、目标设定、打印样式 | $4.99/月 或 $29.99/年 |
| **Lifetime** | Pro 功能永久 | $49.99（一次性） |

### 首版策略

- **MVP 阶段全部免费**，先积累用户和数据
- Pro 版在验证留存后再开启
- 学生付费意愿低，Lifetime 定价锚定很重要

### MVP 阶段（当前）

- **全部功能免费开放**，无付费墙
- 本地保存记录数不设上限（原 20 条限制取消）
- 目标：验证用户是否真的有"跨模考追踪"需求
- 验证指标：
  - 用户是否保存 3 次以上记录？
  - 是否查看进步曲线/热力图？
  - 是否使用 JSON 导出？
  - 7 日留存率 > 20%？

### 付费功能规划（PMF 验证后开启）

| 阶段 | 触发条件 | 动作 |
|---|---|---|
| Phase 1 | 7 日留存 > 20% 且 30% 用户保存 ≥3 条记录 | 引入 Pro 版，限制免费用户保存 3 条记录 |
| Phase 2 | 转化率 > 2% | 新增年付 $39.99/年（33% 折扣） |
| Phase 3 | 月活 > 5000 | 考虑联盟营销（Amazon Affiliate 推荐备考书） |

### 付费功能清单（Pro 版）

| 功能 | MVP | Pro |
|---|---|---|
| 基础计算器 | ✅ 免费 | ✅ 免费 |
| 本地保存记录 | ✅ 无限 | ✅ 无限（Phase 1 后限制 3 条） |
| 进步曲线图 | ✅ 免费 | ✅ 免费 |
| 章节热力图 | ✅ 免费 | ✅ 免费 |
| JSON 导出 | ✅ 免费 | ✅ 免费 |
| 30+ 科目 | P1 免费 | ✅ 免费 |
| PDF 导出 | — | ✅ Pro |
| 目标分数设定 | — | ✅ Pro |
| 备考计划生成 | — | ✅ Pro |
| 打印友好样式 | — | ✅ Pro |
| 无广告 | — | ✅ Pro |

### 成本验算

| 项目 | MVP 成本/月 | 说明 |
|---|---|---|
| Cloudflare Pages | $0 | 静态站点，免费额度 |
| 域名 | ~$0.8 | $10/年 |
| 无后端 | $0 | localStorage |
| 无 AI API | $0 | 纯前端计算 |
| **总计** | **~$0.8/月** | |

---

## 8. 域名与技术栈

### 域名候选

| 域名 | 状态 | 评价 |
|---|---|---|
| **apscoretracker.com** | ✅ 已注册 | 首选，关键词精准，tracker 差异化明确 |
| apscoretracker.app | ✅ 可注册 | 备选，.app 工具属性强 |
| apscoretrack.com | ✅ 可注册 | 备选，短但语义稍弱 |

**最终选择**：apscoretracker.com（已注册）

### 技术栈

| 层 | 技术 | 说明 |
|---|---|---|
| 框架 | Next.js 14 (App Router) | 静态导出，SSG |
| 样式 | Tailwind CSS + shadcn/ui | 快速 UI |
| 图表 | Recharts | 进步曲线 + 热力图 |
| 存储 | localStorage | 首版唯一存储 |
| 部署 | Cloudflare Pages | 自动 CI/CD |
| 域名 | apscoretracker.com | 已注册 |

---

## 9. GTM 策略

### 首发渠道

1. **Reddit r/APStudents** — 软植入，先发价值帖 "I built a free tool to track AP practice test progress"，再提工具
2. **r/ApplyingToCollege** — 交叉推广
3. **Product Hunt** — 教育工具类别，目标 100+ upvotes

### 首周动作

- Day 1：上线 10 个科目页面
- Day 2：发 Reddit 价值帖
- Day 3：提交 Product Hunt
- Day 4-7：收集反馈，修复 bug，准备博客内容

### 内容计划

| 时间 | 内容 | 目标关键词 |
|---|---|---|
| Week 1 | "How I Tracked My AP Progress from 2 to 5" | ap score tracker |
| Week 2 | "Best AP Score Trackers (Free Tools Compared)" | best ap score tracker |
| Week 3 | "AP Lang Score Tracker: How to Improve Your Essay Score" | ap lang score tracker |
| Month 2 | "AP Practice Test Tracker Template vs Tool" | ap practice test tracker |

---

## 10. 转化漏斗与埋点

| 事件 | 触发点 | 优先级 |
|---|---|---|
| page_view | 各页面加载 | P0 |
| calculator_open | 打开计算器 | P0 |
| score_input | 输入 MCQ/FRQ | P0 |
| score_calculate | 点击计算 | P0 |
| record_save | 保存到历史 | P0 |
| chart_view | 查看进步曲线 | P1 |
| heatmap_view | 查看热力图 | P1 |
| json_export | 导出 JSON | P1 |
| upgrade_view | 查看定价（后续） | P2 |

> **埋点补充（MVP 验证期）**：
> - `record_count_3plus`：用户保存 ≥3 条记录（核心验证指标）
> - `chart_interaction`：与进步曲线/热力图的交互
> - `return_visit_7d`：7 日内回访（留存指标）
> - `json_export`：导出备份（用户粘性信号）

---

## 11. 风险评估

|| 风险 | 可能性 | 影响 | 缓解措施 |
|---|---|---|---|---|
|| 现有计算器站快速复制 tracker 功能 | 高 | 高 | 先发优势 + 社区口碑 + 数据积累，6 个月内建立品牌 |
|| 考试季流量波动（淡季无流量） | 中 | 中 | 全年维护博客内容，覆盖非考试季查询 |
|| 本地存储数据丢失 | 中 | 中 | JSON 导出/导入备份功能 |
|| 无后端导致无法跨设备 | 低 | 低 | 首版接受此限制，Pro 版再解决 |
|| 学生付费意愿低 | 中 | 中 | **MVP 阶段全部免费，先验证需求；付费功能后置** |
|| College Board 政策变化 | 低 | 高 | 及时更新 scoring curve，保持灵活性 |
|| MVP 验证失败（用户不需要追踪功能） | 中 | 高 | 快速迭代，若 4 周内无留存则 pivot 为纯计算器站 |

---

## 12. 交接摘要

### 给文案

```
产品名：AP Score Tracker
定位语句：Track Your AP Progress Across Every Practice Test
Headline：Track Your AP Progress Across Every Practice Test
Subhead：See your score trends, spot weak topics, and know exactly what to study next
核心 Benefits：
1. 自动进步曲线 — 看清每次模考是进步还是退步
2. 薄弱章节定位 — 热力图告诉你该复习哪章
3. 多科目统一管理 — 一个页面追踪所有 AP 科目
4. 零注册零登录 — 打开即用
FAQ 必须覆盖：免费？移动端？数据存储？支持科目？准确度？导出？官方分数？跨设备？
不能把产品说成：最准确、保证提分、官方 College Board 工具
CTA 格式：动词 + 结果（Start Tracking Free / See Your Progress）
```

### 给设计

```
首页结构：
1. Hero（计算器嵌入 + Headline + CTA）
2. Demo 展示
3. How It Works（3 步）
4. Use Cases（3 卡片）
5. Features（4 卡片）
6. FAQ（手风琴）
7. Footer CTA

首屏重点：计算器必须首屏可见，用户不用滚动就能开始用
核心交互：选择科目 → 输入分数 → 计算 → 保存 → 查看图表
视觉参考：clean, minimal, academic（蓝/白/灰配色，避免花哨）
移动端要求：计算器表单必须移动端友好，无横向滚动
不需要设计：复杂插画、3D 元素、动画特效（保持加载快）
```

### 给开发

```
技术栈：Next.js 14 + Tailwind + shadcn/ui + Recharts
存储：localStorage 唯一存储，无后端
P0 功能：
  - 10 科目 scoring curve 数据
  - 计算器组件（MCQ + FRQ 输入）
  - localStorage 读写（ExamRecord[]）
  - 历史记录列表
  - Recharts 进步曲线（LineChart）
  - 章节 breakdown 热力图
  - 多科目切换导航
  - JSON 导出/导入
  - 10 个 SEO landing 页面
NOT-DO：登录、后端、PDF导出、AI、账号系统、跨设备同步
部署：Cloudflare Pages 静态导出（output: 'export'）
域名：apscoretracker.com（已注册）
验收标准：
  1. 10 科目计算结果误差 ≤ 0.5 分
  2. 输入→保存→刷新→数据仍在
  3. 同一科目 3 次以上 → 曲线正确显示
  4. 移动端可用，无横向滚动
  5. Lighthouse ≥ 80
  6. 首屏加载 ≤ 2s
```

---

## 质量检查清单

- [x] 有明确关键词（AP Score Tracker）
- [x] 有搜索量 / CPC / KD（主词有数据，长尾词标注待验证）
- [x] SERP 经过实扫（3 组关键词）
- [x] 搜索意图判断清楚（工具型 + 信息型混合）
- [x] Top 3 竞品写清楚（APScore5, sparkl.me, GitHub 项目）
- [x] 竞品做了三层分级
- [x] 拆了 3 个用户场景
- [x] 选定主力用户（自律型考生）
- [x] 有结构化定位语句
- [x] 消息层级清楚
- [x] 功能范围分 P0 / P1 / NOT-DO
- [x] 首页 IA 可直接给设计使用
- [x] SEO 页面矩阵明确
- [x] 定价有竞品锚点和成本意识
- [x] 域名有 Top 3 推荐（已注册）
- [x] GTM 有首周动作
- [x] 埋点事件明确
- [x] 风险有缓解措施
- [x] 交接摘要已分发给文案/设计/开发
