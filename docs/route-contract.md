# AP Score Tracker Route Contract

版本：2026-08-06

## Indexable

| Route | Primary task | Canonical |
|---|---|---|
| `/` | 理解价值并进入 tracker | `/` |
| `/tracker` | 试算；登录后保存和查看进度 | `/tracker` |
| `/ap-lang` | AP Lang tracker 搜索入口 | 同路径 |
| `/ap-psych` | AP Psych tracker 搜索入口 | 同路径 |
| `/ap-calculus-ab` | AP Calc AB tracker 搜索入口 | 同路径 |
| `/ap-biology` | AP Biology tracker 搜索入口 | 同路径 |
| `/ap-us-history` | APUSH tracker 搜索入口 | 同路径 |
| `/blog/how-to-track-ap-progress` | 学习进度方法 | 同路径 |
| `/blog/ap-score-improvement-tips` | 分数改进建议 | 同路径 |
| `/privacy` | 隐私披露 | `/privacy` |
| `/terms` | 服务条款 | `/terms` |

## Non-indexable

- `/account`、`/sign-in/*`、`/sign-up/*`：用户状态页，`noindex,nofollow`。
- `/ap-calculus-bc`、`/ap-chemistry`、`/ap-physics-1`、`/ap-statistics`：Tracker 尚不支持，保留页面但 `noindex,follow`，且不进入 sitemap。
- `/api/*`：机器接口，不进入 sitemap。

## Redirects

- `/privacy-policy` → `/privacy`（permanent）。
- `/terms-of-service` → `/terms`（permanent）。

## NOT-DO

- 不把尚未支持的学科描述为可保存追踪。
- 不把 Pro/Stripe 描述为已上线。
- 不索引账户、登录、API、占位页或错误页。
