# AP Score Tracker V2 合规复核

> 复核日期：2026-08-07
> 适用版本：免费云同步版（Clerk + Cloudflare Workers/D1）
> 说明：这是产品合规工作流，不是正式法律意见。

## 结论

当前免费版为中等合规风险，代码和法律页面已按真实数据流对齐。付费能力默认关闭；在 Stripe 产品、税务、退款、续费和生产 E2E 完成前不得把 `BILLING_ENABLED` 设为 `true`。

状态：`COMPLIANCE_GO`。代码侧 P0 已修复；Owner 已确认运营主体为 Weldon（个人开发者），联系邮箱为 `weldonz2026@gmail.com`。账户永久删除只验证入口与确认机制，本轮不得实际执行。

## 当前数据流

| 数据 | 用途 | 位置/处理者 | 删除方式 |
|---|---|---|---|
| Clerk user ID、邮箱、session | 注册、登录、鉴权 | Clerk | Account 页面永久删除 |
| MCQ/FRQ、科目、目标分、topic、notes | 保存与同步学习进度 | Cloudflare D1 | 单条/全部记录删除，或 Account 页面永久删除 |
| IP、UA、URL、请求时间 | 托管、安全、排错 | Cloudflare | 按服务商政策和请求处理 |
| 聚合访问事件 | 产品分析 | Plausible | 按 Plausible 数据政策 |
| Stripe customer/subscription | 当前未启用；未来付费使用 | Stripe | 当前不创建；账户删除会删除已关联 customer |

项目不使用 AI API、文件上传、公开 UGC 或广告像素。

## 第三方披露

- Clerk：身份认证和 session。
- Cloudflare Workers/D1：运行应用和保存登录用户 tracker 数据。
- Plausible：聚合访问分析。
- Stripe：代码集成存在但 `BILLING_ENABLED=false`，当前免费版不创建付款。

以上服务均已在 `/privacy` 披露；支付启用前必须再次复核。

## 法律页 Route Contract

| 页面 | Canonical | 别名策略 | 状态 |
|---|---|---|---|
| Privacy | `/privacy` | `/privacy-policy` 永久重定向 | 已实现 |
| Terms | `/terms` | `/terms-of-service` 永久重定向 | 已实现 |
| Contact | Footer `mailto:` | 无独立页面 | Owner 已确认联系邮箱 |
| Refund | 暂不适用 | Billing 启用前必须创建 | Billing 阻塞条件 |
| Cookie | 当前无非必要 Cookie | 若分析方案改变需重审 | 持续监控 |

## 用户权利与保留

- Tracker 支持 JSON/CSV 导出。
- 用户可删除单条记录、当前科目记录或全部记录。
- Account 页面提供永久账户删除；删除 D1 数据、Clerk 账户及已关联 Stripe customer。
- Cloudflare/Clerk/Plausible 的基础设施日志或备份可能依服务商政策短期保留。

## Claims / IP

禁止使用：`official`、`approved by College Board`、`guaranteed score`、`100% accurate`、`permanently free`、未启用时的 `unlimited Pro`。

必须保留：分数仅为练习趋势估算；AP 是 College Board 商标；本站与 College Board 无关联、背书或批准关系。

## 支付启用硬闸门

启用 `BILLING_ENABLED=true` 前必须全部满足：

- Stripe test/live 产品和月付/年付 Price 已创建。
- Secret、Webhook Secret、Price ID 已进入 Cloudflare Secret Storage。
- Checkout/Elements 方案已冻结并完成 test-mode E2E。
- 定价页、Terms、Privacy、Refund Policy 披露价格、周期、自动续费、取消与退款。
- 税务处理方案已确认。
- 失败付款、取消、退款和 webhook 重放已验收。

## QA 合规检查

- `/privacy`、`/terms` 返回 200，旧别名返回永久重定向。
- Footer 法律链接无 404。
- 未登录用户可试算，但不能读取或保存他人数据。
- API 未登录返回 JSON 401，不返回 HTML 404。
- Account 删除需要登录和显式确认。
- Billing 关闭时订阅、Portal、Webhook 返回明确 `FEATURE_DISABLED`。
- sitemap 不包含登录、账户、API、noindex 或不存在页面。

## Owner 复核记录

- 2026-08-07：运营主体确认为 Weldon（Individual Developer）。
- 2026-08-07：隐私与删除请求联系邮箱确认为 `weldonz2026@gmail.com`。
- 2026-08-07：允许提交、推送和生产部署；不允许未经单独确认执行账户永久删除、公开发帖或付费推广。
- 2026-08-07：使用 `simidas2017@gmail.com` 完成生产 Google 登录；Account 永久删除入口已检查，未执行账户永久删除。
- 若面向学校或 13 岁以下儿童，需另做 COPPA/教育数据评估。

[COMPLIANCE_GO]
