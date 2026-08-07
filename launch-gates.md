# Launch Gates

- [x] lint、build、OpenNext build 通过。
- [x] 实现 commit `8d8f8f49c5f2a14ccffc5911b0141a8baee4e913` 已推送并由同一工作树直接部署 Cloudflare。
- [x] 首页、Tracker、5 个支持科目、2 篇博客、Privacy、Terms 均为 200。
- [x] 法律旧别名为 308 永久重定向。
- [x] 本地未支持科目 `noindex` 且不在 sitemap。
- [x] 本地未登录 `/account` 跳转 `/sign-in`；API 返回 JSON 401。
- [ ] 登录保存、目标、删除、JSON/CSV、账户删除完成 E2E。
- [ ] Plausible pageview/核心事件有真实证据。
- [x] sitemap、robots、canonical、schema、OG 生产复验。
- [ ] GSC/Bing/IndexNow/Crawler Hints 状态有真实记录。
- [ ] Owner Review 明确 GO。
- [x] Owner 已授权提交、推送 main 与生产部署。
- [ ] 部署后 `git status` 已记录。

当前：`LIVE_CONDITIONAL`，公开版已上线；等待前台登录态 QA、Plausible 证据与最终 Owner Review。GSC/Bing 保持 `setup_required`；Stripe/Pro 保持 `DEFERRED`。

## 生产部署记录 — 2026-08-07

- branch：`main`
- implementation commit：`8d8f8f49c5f2a14ccffc5911b0141a8baee4e913`
- GitHub Actions：run `31140215434`，构建通过，仓库 Cloudflare Token 失效导致部署失败
- deploy fallback：项目现有 OpenNext deploy 命令，PASS
- Worker version：`2e73e179-b986-414a-b179-9803295a9094`
- deploy URL：`https://apscoretracker.simidas2017.workers.dev`
- production URL：`https://apscoretracker.com`
- 公开页/SEO/匿名鉴权 smoke：PASS
- 浏览器 console/network、登录态 E2E：BLOCKED
