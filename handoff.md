# 全流程主持台交接摘要

## 当前结论

- 状态：[BLOCKED] LIVE_CONDITIONAL
- 一句话：免费云同步版已提交、推送并直接部署生产，公开页冒烟通过；仍待前台登录态 QA、Plausible/GSC/Bing 证据、CI Token 修复与最终 Owner Review。

## 必须读取

- `project-control.md`
- `docs/route-contract.md`
- `docs/data-contract.json`
- `docs/compliance-report.md`
- `docs/seo-copy-freeze.md`
- `blocked-log.md`

## 已确认

- 当前发布不开放 Pro/Stripe。
- 运营主体为 Weldon（个人开发者），联系邮箱为 `weldonz2026@gmail.com`。
- 允许提交、推送 main 和生产部署。
- 未经单独确认不得执行账户永久删除、公开发帖或付费推广。
- canonical 法律路由是 `/privacy`、`/terms`。
- 只有 5 个 Tracker 实际支持科目进入 sitemap。
- 用户可以 JSON/CSV 导出并发起永久账户删除。

## 不能假设

- 不能把 Clerk Dashboard 登录当作 apscoretracker.com 前台登录证据。
- 不能假设登录、D1 写入和账户删除入口已在生产验证；账户永久删除不得实际执行。
- 不能假设 GSC/Bing 已提交。
- 不能假设 GitHub Actions 已恢复；当前生产部署使用项目现有本地 OpenNext 命令完成。
- 不能假设 Stripe 可用。

## 风险

- P0：没有已知公开页 P0；生产公开页冒烟已通过。
- P1：登录/D1/账户删除尚未完成生产 E2E。
- P2：缺自动化单元测试和 GSC/Bing/分析证据。

## 下一阶段

在 `apscoretracker.com` 前台登录测试账号 → D1/CSV/Account E2E（不执行账户永久删除）→ 修复 GitHub Actions Token → Plausible/GSC/Bing → 最终 Owner Review。
