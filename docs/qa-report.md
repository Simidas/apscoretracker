# QA Acceptance Report — 2026-08-07

## 结论

公开页与匿名核心任务本地通过；登录/D1/账户永久删除缺测试登录态，暂为 `CONDITIONAL_GO`，不能给全站 QA_GO。

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

## 未测试

- apscoretracker.com 前台 Clerk 登录、首次 user upsert。当前只确认 Clerk Dashboard 已登录。
- D1 保存、目标同步、Free 每科 10 条限制。
- JSON/CSV 实际下载内容。
- 单条/全部记录删除。
- 永久账户删除入口与确认机制；按 Owner 限制不执行永久删除。
- 生产 Plausible 事件。

## 风险

- P0：无已知本地公开页 P0。
- P1：缺登录态 E2E；生产部署前必须补。
- P2：暂无自动化单元测试；当前依赖 lint/build/真实任务验收。

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
| 浏览器 console/network | PARTIAL，发现原 Chrome 标签进入 Clerk handshake 循环；匿名生产访问与 Clerk Frontend API/CORS 正常 |
| 登录态 D1/CSV/Account | BLOCKED，尚无前台测试账号登录证据 |

部署版本：`2e73e179-b986-414a-b179-9803295a9094`。

[NEEDS_REVIEW]
