# Launch Gates

- [x] lint、build、OpenNext build 通过。
- [ ] 生产 commit 与 GitHub/Cloudflare 部署 SHA 一致。
- [ ] 首页、Tracker、5 个支持科目、2 篇博客、Privacy、Terms 均为 200。
- [ ] 法律旧别名为永久重定向。
- [x] 本地未支持科目 `noindex` 且不在 sitemap。
- [x] 本地未登录 `/account` 跳转 `/sign-in`；API 返回 JSON 401。
- [ ] 登录保存、目标、删除、JSON/CSV、账户删除完成 E2E。
- [ ] Plausible pageview/核心事件有真实证据。
- [ ] sitemap、robots、canonical、schema 生产复验。
- [ ] GSC/Bing/IndexNow/Crawler Hints 状态有真实记录。
- [ ] Owner Review 明确 GO。
- [x] Owner 已授权提交、推送 main 与生产部署。
- [ ] 部署后 `git status` 已记录。

当前：`NO_GO`，等待前台登录态 QA、部署复验与最终 Owner Review。GSC/Bing 保持 `setup_required`；Stripe/Pro 保持 `DEFERRED`。
