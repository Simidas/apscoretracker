# Blocked Log

| ID | 阶段 | 阻塞 | Owner | 解锁动作 | 状态 |
|---|---|---|---|---|---|
| B-01 | QA | 原 Chrome 标签进入 Clerk handshake 循环；匿名生产路由和 Clerk Frontend API 正常，但尚无前台测试账号登录证据 | Weldon | 已配置生产 Google OAuth，并使用 `simidas2017@gmail.com` 完成前台登录、D1/CSV/Account E2E；只检查账户删除入口，未执行永久删除 | RESOLVED 2026-08-07 |
| B-02 | Compliance | 运营主体与联系邮箱需人工确认 | Weldon | 已确认主体为 Weldon（个人开发者），联系邮箱为 weldonz2026@gmail.com | RESOLVED 2026-08-07 |
| B-03 | Launch | 本轮提交、推送与生产部署需要 Owner 授权 | Weldon | 已明确授权提交、推送 main 和生产部署 | RESOLVED 2026-08-07 |
| B-04 | SEO | GSC/Bing 登录态与站点权限尚无证据 | Weldon | 后续配置或登录对应后台；提交前仍需单独确认 | SETUP_REQUIRED |
| B-05 | Paid launch | Stripe 产品、Price、Secrets、退款/税务/E2E 缺失 | Weldon | 仅在决定开放 Pro 时恢复该分支 | DEFERRED |
| B-06 | CI | GitHub Actions 中的 `CLOUDFLARE_API_TOKEN` 已失效；首次部署在 Secrets 上传阶段失败 | Weldon | 2026-08-07 已获明确授权并更新同名 GitHub Secret；run `31140215434` 重跑构建与部署均通过 | RESOLVED 2026-08-07 |

不得在聊天中发送 Key、密码、Cookie 或验证码。
