# SEO Recheck — 2026-08-06

## 结论

本地技术 SEO 返修通过；生产复验与 GSC/Bing 提交尚未执行。状态：`NEEDS_REVIEW`。

## 已通过

- sitemap 只含 11 个真实、可索引 URL。
- `/privacy`、`/terms` 为 canonical；旧别名永久重定向。
- 首页 canonical 正确，并有 WebApplication + FAQPage schema。
- 5 个支持科目和 2 篇博客有唯一 canonical。
- 4 个未支持科目为 `noindex,follow` 且不在 sitemap。
- `/account`、`/sign-in`、`/sign-up` 不进入 sitemap 并设置 noindex。
- robots 允许搜索抓取并声明 sitemap。
- OpenGraph 图片由 `/opengraph-image` 生成。

## 待生产验证

- 部署后 HTTP/HTTPS、301/308、status code、canonical、schema。
- GSC property 与 sitemap 提交状态。
- Bing Webmaster / IndexNow 状态。
- Cloudflare Crawler Hints 状态。
- Plausible 首个真实 pageview 与 `Practice Test Saved` 事件。

[NEEDS_REVIEW]
