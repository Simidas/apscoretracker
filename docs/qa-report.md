# QA Acceptance Report — 2026-08-07

## 结论

公开页、匿名任务和登录态生产核心任务通过，当前免费版结论为 `QA_GO`。账户永久删除只检查入口，按 Owner 限制未执行。

## 环境

- OpenNext Cloudflare Worker 本地预览：`http://localhost:8787`
- Viewport：默认桌面 + 375×812
- 构建：Next.js production build、OpenNext build 均通过
- 静态检查：lint、`git diff --check`、data contract 解析、ShipSolo handoff validator 均通过
- 截图：`docs/screens/home-desktop.jpg`、`docs/screens/tracker-mobile-375.jpg`

## 真实任务

| 任务 | 结果 | 证据 |
|---|---|---|
| 首页 5 秒识别 What/Who/CTA | PASS | H1 与免费试算/登录同步口径可见 |
| 首页进入 Tracker | PASS | CTA 导航到 `/tracker` |
| 匿名试算 | PASS | MCQ 35/45、FRQ 12/18 → Composite 72%、Estimate 4 |
| 移动端 | PASS | 375px `scrollWidth=clientWidth=375`，保存入口可见 |
| 法律别名 | PASS | 两个旧路径均 308 到 canonical 页面 |
| sitemap | PASS | 11 个真实 URL，无登录/API/unsupported 页面 |
| unsupported subject | PASS | `noindex,follow` 且无 canonical 冒领 |
| 未登录 Account | PASS | 跳转 `/sign-in`，不再 404/500 |
| 未登录 API | PASS | `/api/me` → 401 JSON `UNAUTHENTICATED` |
| Billing off | PASS | subscribe → 503 JSON `FEATURE_DISABLED` |
| 控制台 | PASS | 无 error；仅本地开发 Key/Plausible localhost 警告 |

## 登录态生产 E2E

| 检查 | 结果 | 证据 |
|---|---|---|
| Google OAuth 登录 | PASS | `simidas2017@gmail.com`；首页显示 Tracker、Account 与用户菜单 |
| D1 创建 | PASS | AP Lang 35/45 + 12/18 → 72%、Estimate 4、Target 4；云端计数 1/10 |
| 刷新持久化 | PASS | reload 后记录、Target 4、72% 和 QA notes 仍存在 |
| CSV | PASS | 实际下载 7 列、2 行的 `ap-score-tracker-records.csv` |
| Account | PASS | 邮箱、Free、使用量和永久删除入口正确 |
| QA 记录清理 | PASS | 按唯一 ID 和 QA notes 精确删除 1 条；D1 复核数量为 0 |
| 账户永久删除 | NOT RUN | 仅检查入口，遵守 Owner 禁止执行限制 |
| Console | PASS | 登录态页面 error 日志为 0 |
| 原始 network 事件抓取 | PARTIAL | CDP 采集无响应并已停止；保存、刷新、Account 与 D1 结果证明关键请求成功 |

## 未测试 / 上线后观测

- Free 每科第 10/11 条边界限制。
- JSON 实际下载内容；CSV 已实际下载验证。
- 生产 Plausible 事件面板。

## 风险

- P0：无已知本地公开页 P0。
- P1：无已知当前免费版 P1。
- P2：暂无自动化单元测试；缺 Free 限额边界、JSON 下载、Plausible/GSC/Bing 证据。

## Owner 限制

- 已允许提交、推送 main 与生产部署。
- 不允许未经单独确认执行账户永久删除、公开发帖或付费推广。
- GSC/Bing 尚无真实提交证据，保持 `setup_required`。

## 生产冒烟 — 2026-08-07

| 检查 | 结果 |
|---|---|
| Home、Tracker、Privacy、Terms | PASS，200 |
| 5 个支持科目、2 篇博客 | PASS，200 |
| robots、sitemap、OG image | PASS，200 |
| canonical、WebApplication/FAQ schema、OG | PASS |
| Privacy/Terms 旧别名 | PASS，308 |
| unsupported subject | PASS，200 + noindex |
| 未登录 Account | PASS，307 到 `/sign-in` |
| 未登录 `/api/me` | PASS，401 JSON |
| 浏览器 console/network | Console PASS；关键请求由 UI/D1 结果验证，原始 CDP network 抓取 PARTIAL |
| 登录态 D1/CSV/Account | PASS；专用 QA 记录已清理，账户永久删除未执行 |

部署版本：`2e73e179-b986-414a-b179-9803295a9094`。

[QA_GO]
