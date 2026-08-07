# Launch Gates

- [x] lint、build、OpenNext build 通过。
- [x] 实现 commit `8d8f8f49c5f2a14ccffc5911b0141a8baee4e913` 已推送并由同一工作树直接部署 Cloudflare。
- [x] 首页、Tracker、5 个支持科目、2 篇博客、Privacy、Terms 均为 200。
- [x] 法律旧别名为 308 永久重定向。
- [x] 本地未支持科目 `noindex` 且不在 sitemap。
- [x] 本地未登录 `/account` 跳转 `/sign-in`；API 返回 JSON 401。
- [x] Google 登录、D1 保存、目标持久化、刷新读取、CSV 下载、专用 QA 记录删除、Account 与永久删除入口完成 E2E；未执行账户永久删除。
- [ ] Plausible pageview/核心事件有真实证据。
- [x] sitemap、robots、canonical、schema、OG 生产复验。
- [ ] GSC/Bing/IndexNow/Crawler Hints 状态有真实记录。
- [x] Owner Review：当前免费生产范围 GO；提交、推送和生产部署已有明确授权。
- [x] Owner 已授权提交、推送 main 与生产部署。
- [x] 部署后 `git status` 已记录；文档更新前为 `main...origin/main` clean。

当前：`LIVE`，公开页和登录态关键任务已通过。Plausible 真实事件证据进入上线后观测；GSC/Bing 保持 `setup_required`；Stripe/Pro 保持 `DEFERRED`。

## 生产部署记录 — 2026-08-07

- branch：`main`
- implementation commit：`8d8f8f49c5f2a14ccffc5911b0141a8baee4e913`
- GitHub Actions：run `31140215434`，更新仓库 Cloudflare Secret 后重跑构建与部署均通过
- deploy fallback：项目现有 OpenNext deploy 命令，PASS
- Worker version：`2e73e179-b986-414a-b179-9803295a9094`
- deploy URL：`https://apscoretracker.simidas2017.workers.dev`
- production URL：`https://apscoretracker.com`
- 公开页/SEO/匿名鉴权 smoke：PASS
- 浏览器登录态 E2E：PASS，账号 `simidas2017@gmail.com`
- D1：专用记录创建和刷新持久化 PASS；精确删除 1 条后复核 QA 记录数为 0
- CSV：实际下载 PASS（7 列、表头 + 1 条 QA 记录）
- Account：账号、Free plan、使用量和永久删除入口 PASS；未执行永久账户删除
