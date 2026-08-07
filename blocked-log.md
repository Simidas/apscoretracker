# Blocked Log

| ID | 阶段 | 阻塞 | Owner | 解锁动作 | 状态 |
|---|---|---|---|---|---|
| B-01 | QA | Clerk Dashboard 已登录，但尚无 apscoretracker.com 前台测试账号登录证据；不能验证 D1 保存/刷新持久化/删除、CSV 与 Account 页面 | Weldon | 在 apscoretracker.com 登录测试账号并保持标签页打开；只检查账户删除入口，不执行永久删除 | OPEN |
| B-02 | Compliance | 运营主体与联系邮箱需人工确认 | Weldon | 已确认主体为 Weldon（个人开发者），联系邮箱为 weldonz2026@gmail.com | RESOLVED 2026-08-07 |
| B-03 | Launch | 本轮提交、推送与生产部署需要 Owner 授权 | Weldon | 已明确授权提交、推送 main 和生产部署 | RESOLVED 2026-08-07 |
| B-04 | SEO | GSC/Bing 登录态与站点权限尚无证据 | Weldon | 后续配置或登录对应后台；提交前仍需单独确认 | SETUP_REQUIRED |
| B-05 | Paid launch | Stripe 产品、Price、Secrets、退款/税务/E2E 缺失 | Weldon | 仅在决定开放 Pro 时恢复该分支 | DEFERRED |

不得在聊天中发送 Key、密码、Cookie 或验证码。
