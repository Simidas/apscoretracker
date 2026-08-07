# Project Control Board

项目：apscoretracker
域名：apscoretracker.com（已注册、生产可访问）
目标市场：US / English
站点类型：教育工具站
商业化：当前免费；Pro/Stripe 延后
当前模式：automation_factory
当前状态：LIVE_CONDITIONAL
最后更新：2026-08-07

## Owner 只需要处理

- [x] 已确认运营主体为 Weldon（个人开发者），联系邮箱为 `weldonz2026@gmail.com`。
- [ ] 在 `apscoretracker.com` 前台登录测试账号，用于完整生产 QA；Clerk Dashboard 登录不等同于前台登录。
- [x] 已允许提交、推送 main 与生产部署。
- [ ] 若要开放 Pro，另行确认 Stripe 产品、税务、退款和生产发布。
- [ ] GSC/Bing 收录提交及任何公开外链发布前确认。

## 当前事实

- GitHub `main` 与生产部署历史存在，当前代码进入返修验证。
- Cloudflare D1 migration 已应用，无待执行 migration。
- Clerk/D1 免费云同步已实现。
- `BILLING_ENABLED=false`；Stripe 不属于当前免费版 Launch Gate。
- sitemap、canonical、schema、法律别名、登录跳转已进入本轮返修。
- GSC/Bing 提交与公开推广未获授权，不在本轮自动执行。
- 账户永久删除仅检查入口与确认机制，不实际执行。
- 实现提交 `8d8f8f49c5f2a14ccffc5911b0141a8baee4e913` 已推送 `main`。
- GitHub Actions run `31140215434`：OpenNext 构建 PASS；Cloudflare 部署因仓库 Token 失效 FAIL。
- 使用项目现有 OpenNext 部署命令安全回退成功；Worker version `2e73e179-b986-414a-b179-9803295a9094`。
- 部署 URL：`https://apscoretracker.simidas2017.workers.dev`；生产 URL：`https://apscoretracker.com`。

## 阶段摘要

- done：Research、PRD 基线、Data Contract、核心 Backend、核心 Frontend。
- running：登录态 QA、最终 Owner Review。
- waiting：GSC/Bing、Plausible 真实事件证据、Data Review。
- blocked：完整登录态 QA；GSC/Bing 为 `setup_required`。
- done：Compliance Owner Review、提交/推送、生产部署、公开页生产冒烟。

## 本轮验证证据

- 2026-08-07 `npm run lint`：PASS，无 warnings/errors。
- 2026-08-07 `npm run build`：PASS，30 routes。
- 2026-08-07 `npx opennextjs-cloudflare build`：PASS，Worker bundle 已生成。
- `git diff --check`、data contract JSON 解析、ShipSolo handoff validator：PASS。
- QA 截图已按真实 JPEG 格式改名为 `.jpg` 并更新文档引用。
- 生产公开页：Home、Tracker、Privacy、Terms、5 个支持科目、2 篇博客、robots、sitemap、OG 均为 200。
- 生产 SEO：canonical、schema、OG PASS；法律别名 308；unsupported subject noindex。
- 生产匿名鉴权：`/account` → `/sign-in`；`/api/me` → JSON 401。
- 浏览器控制连续超时，未取得 console/network 与前台登录态证据。
- 375×812：无横向滚动。
- 匿名试算：35/45 + 12/18 → 72% / Estimate 4。
- `/api/me` 未登录：401 JSON。
- Billing disabled：503 JSON `FEATURE_DISABLED`。

事实源：本文件 + `stage-status.md` + `kanban-plan.md` + `blocked-log.md`。
