# AP Score Tracker (apscoretracker.com) — 合规审查报告

> **声明**：本报告基于 `student-site-compliance-pipeline` skill 生成，是合规审查工作流，不是正式法律意见。高风险项目、重大商业项目应咨询执业律师。
> 
> **审查日期**：2026-05-21
> **审查依据**：PRD v2.0 (commit 5ecc0f7) + 定价报告 `/docs/pricing-report.md`
> **审查人**：AI Agent 自动化合规审查

---

## 1. 风险等级：🟢 低风险

**判定原因：**
- 纯前端工具站，无用户注册/登录系统
- 无后端服务器，无数据库
- 无 AI 生成内容
- 无文件上传
- MVP 阶段无支付/订阅（全部免费）
- 所有数据处理在浏览器本地完成（localStorage）
- 目标用户为高中生（13-18岁），非儿童（13岁以下）

**触发中/高风险的条件检查：**

| 条件 | 状态 | 说明 |
|---|---|---|
| 注册/登录 | ❌ 无 | localStorage 自动保存，无需账号 |
| 上传文件 | ❌ 无 | 仅 JSON 导出（本地生成，用户下载） |
| AI 生成 | ❌ 无 | 纯数学计算，无 AI API |
| 支付/订阅 | ❌ 无（MVP） | Phase 1 后才引入，当前不涉及 |
| 敏感数据处理 | ❌ 无 | 不处理健康、金融、生物识别等 |
| 儿童（<13岁） | ❌ 不涉及 | AP 考生通常为 14-18 岁 |
| 公开发布 UGC | ❌ 无 | 无社交功能，无公开内容 |

---

## 2. 数据流摘要

```
用户输入（MCQ/FRQ 分数）
    ↓
浏览器前端（Next.js 客户端组件）
    ↓
本地计算（scoring curve 数据在前端）
    ↓
localStorage（浏览器本地存储）
    ↓
用户查看（进步曲线、热力图 — Recharts 渲染）
    ↓
JSON 导出（用户主动下载备份文件）
```

**关键特征：**
- 数据**不离开用户设备**
- 无服务器接收、处理或存储用户数据
- 无第三方 API 接收用户输入内容
- 无分析/追踪脚本（MVP 阶段假设）
- 无 Cookie（除必要的技术 Cookie）

**数据保留：**
- 保留位置：用户浏览器 localStorage
- 保留期限：永久（除非用户清除浏览器数据）
- 用户删除方式：清除浏览器数据 或 使用应用内"清除所有数据"按钮

---

## 3. 第三方服务清单

| 名称 | 用途 | 处理的数据类型 | 是否接触用户内容 | 是否跨境传输 | 模型训练 | 政策链接 |
|---|---|---|---|---|---|---|
| **Cloudflare Pages** | 静态站点托管 | 访问日志（IP、UA、URL） | ❌ 不接触用户分数数据 | ⚠️ 美国 | 不适用 | [cloudflare.com/privacypolicy](https://www.cloudflare.com/privacypolicy/) |
| **Cloudflare** | CDN + DNS | 访问日志、IP | ❌ 不接触用户分数数据 | ⚠️ 全球节点 | 不适用 | [cloudflare.com/privacypolicy](https://www.cloudflare.com/privacypolicy/) |
| **Plausible Analytics** | 隐私友好分析 | 匿名访问数据（无 Cookie） | ❌ | ✅ 欧盟（plausible.io 托管） | 不适用 | [plausible.io/privacy](https://plausible.io/privacy) |
| **Namecheap** | 域名注册 | 注册信息 | ❌ | ⚠️ 美国 | 不适用 | [namecheap.com/privacy](https://www.namecheap.com/legal/general/privacy-policy/) |

**注意：**
- Plausible Analytics 不使用 Cookie，不收集个人数据，GDPR 下不需要 Cookie 同意横幅
- 纯静态导出站点，Cloudflare Pages 提供文件托管，不执行服务器端代码
- Cloudflare CDN 可能在全球节点缓存静态文件，不处理用户分数数据

---

## 4. 用户地区与法律义务

| 地区 | 是否覆盖 | 法律义务 | 当前合规状态 |
|---|---|---|---|
| **美国（全局）** | ✅ 是 | COPPA（儿童隐私）、CCPA（加州） | COPPA：目标用户 14-18 岁，不收集 13 岁以下数据 ✅ |
| **欧盟/英国** | ✅ 是 | GDPR、ePrivacy/Cookie | Plausible 无 Cookie，无需 Cookie Banner ✅；已补充 GDPR 权利说明 ✅ |
| **加州（CCPA）** | ✅ 是 | 隐私权披露、opt-out | 不"出售"个人数据，无广告像素 ✅；已补充 CCPA 权利说明 ✅ |

**关键判断：**
- Plausible Analytics 不使用 Cookie，不收集个人数据，GDPR 下**不需要 Cookie 同意横幅**
- Cloudflare CDN 仅缓存静态文件，不处理用户分数数据
- 已补充 GDPR 和 CCPA 权利说明到 Privacy Policy 草稿
- 不面向 13 岁以下儿童，COPPA 不触发

---

## 5. 必需合规页面

| 页面 | 是否必需 | 优先级 | 说明 |
|---|---|---|---|
| **Privacy Policy** (`/privacy`) | ✅ 必需 | P0 | 即使无后端，也需说明数据存储方式 |
| **Terms of Service** (`/terms`) | ⚠️ 建议 | P1 | 免责声明、使用规则、知识产权 |
| **Cookie Policy** (`/cookie-policy`) | ❌ 当前不需要 | P2 | 无追踪 Cookie 时可轻量或合并到 Privacy |
| **Refund Policy** (`/refund`) | ❌ 当前不需要 | P2 | MVP 无付费；Phase 1 后必需 |
| **Disclaimer** (`/disclaimer`) | ⚠️ 建议 | P1 | 教育工具建议有：不保证分数、非官方工具 |
| **Contact** (`/contact`) | ✅ 必需 | P0 | 用户联系/删除数据请求渠道 |

---

## 6. 数据处理表（Privacy Policy 底稿）

| 数据类型 | 用途 | Lawful Basis | 第三方 | 保留期限 | 用户可否删除 |
|---|---|---|---|---|---|
| AP 模考分数（MCQ/FRQ） | 计算 AP 分数、生成进步曲线 | [待确认：用户同意 / 合法利益] | 无（纯本地） | 永久（localStorage） | ✅ 可清除浏览器数据或应用内删除 |
| 章节得分 Breakdown | 生成热力图、定位薄弱点 | [待确认] | 无 | 永久 | ✅ 同上 |
| 访问日志（IP、UA） | 安全、防滥用、排错 | 合法利益 | Cloudflare Pages / Cloudflare CDN | 按服务商政策（通常 30 天） | ❌ 无法单独删除 |
| 分析数据 | 统计访问、优化页面 | 合法利益 | Plausible Analytics | 按 Plausible 配置 | ✅ 可通过浏览器设置退出 |

**待确认项：**
- [x] 是否使用 Google Analytics / Plausible / 其他分析工具？→ **Plausible**
- [x] 是否使用 Cloudflare Analytics？→ **Cloudflare CDN**
- [x] 目标市场是否包含欧盟/英国？→ **全球覆盖**
- [x] 站点运营主体（个人/公司）及联系邮箱 → **Weldon / weldonz2026@gmail.com**

---

## 7. 支付/订阅检查

**当前状态：MVP 阶段无支付**

| 检查项 | 状态 | 说明 |
|---|---|---|
| 是否收费 | ❌ 否（MVP） | 全部免费 |
| 退款政策 | N/A | Phase 1 后需补充 |
| 自动续费 | N/A | Phase 1 后需补充 |
| 取消路径 | N/A | Phase 1 后需补充 |
| VAT/Sales Tax | N/A | Phase 1 后需补充 |
| 支付方式 | N/A | 计划用 Stripe / Lemon Squeezy |

**Phase 1 后需补充（参考定价报告）：**
- Pro 版 $4.99/月 或 $39.99/年
- 退款窗口：[待确认：7 / 14 / 30 天？]
- 取消路径：应用内取消（需后端支持）或邮件取消
- 自动续费披露：周期、金额、扣款时间、取消方式

---

## 8. AI 内容安全检查

**状态：不适用**

| 检查项 | 状态 | 说明 |
|---|---|---|
| AI 生成内容 | ❌ 无 | 纯数学计算，无 AI API |
| 输入过滤 | N/A | 用户输入为数字（MCQ/FRQ 分数） |
| Prompt 安全 | N/A | 无 LLM 调用 |
| 输出检查 | N/A | 计算结果为数字 |
| 内容审核状态机 | N/A | 不适用 |

**注意：** 若未来添加"AI 备考建议"功能，需重新评估并补充内容安全机制。

---

## 9. 品牌/商标/版权风险检查

| 检查项 | 状态 | 说明 |
|---|---|---|
| 域名蹭品牌 | ⚠️ 需注意 | `apscoretracker.com` 含 "AP"，是 College Board 注册商标 |
| 使用他人 logo | ❌ 无 | 未使用 College Board logo |
| 暗示官方/授权 | ⚠️ 需检查 | PRD 已列禁词：不能说 "official" / "approved by College Board" |
| SEO 高风险表述 | ⚠️ 需检查 | 禁词清单已有："最准确"、"保证提分" |
| AI 角色/名人/深伪 | ❌ 无 | 不涉及 |

**建议：**
- 首页/页脚明确声明："Not affiliated with or endorsed by College Board"
- 所有页面避免 "AP®" 商标滥用（® 符号仅 College Board 官方可用）
- 使用 "AP" 作为描述性用语（nominative fair use），但不做商标暗示

---

## 10. 上线前 Checklist

### 页面
- [ ] `/privacy` Privacy Policy — **必需**
- [ ] `/terms` Terms of Service — **建议**
- [ ] `/contact` 联系方式 — **必需**
- [ ] `/disclaimer` 免责声明 — **建议**
- [ ] `/cookie-policy` Cookie Policy — 当前不需要（无追踪 Cookie）
- [ ] `/refund` Refund Policy — 当前不需要（无付费）

### 页面链接
- [ ] 页脚有 Privacy / Terms / Contact 链接
- [ ] Cookie Banner — 当前不需要

### 数据与第三方
- [ ] 数据处理表已填写（见 §6）
- [ ] 第三方清单与实际代码一致（见 §3）
- [ ] 数据保留期限明确（localStorage 永久，用户可清除）
- [ ] 用户删除/联系路径可用（应用内"清除数据"按钮 + 联系邮箱）

### Cookie
- [ ] 无追踪 Cookie — ✅ 当前合规
- [ ] 若未来加 GA/Clarity，需补 Cookie Banner

### 支付
- [ ] 当前无支付 — N/A
- [ ] Phase 1 后需补：退款政策、自动续费披露、取消路径

### AI 内容安全
- [ ] 无 AI — 不适用

### 品牌/IP
- [ ] 页脚声明 "Not affiliated with College Board"
- [ ] 无 "official" / "guaranteed" / "best" 表述
- [ ] 无 College Board logo / 商标使用

### 版本管理
- [ ] 每个法律页面有 Last updated 日期
- [ ] 内部保留 change log
- [ ] 联系邮箱可用 [待确认]

---

## 11. 法律页面草稿

### 11.1 Privacy Policy 草稿骨架

```
Privacy Policy — AP Score Tracker
Last updated: [待确认]

1. Introduction
   AP Score Tracker ("we", "us", "our") operates apscoretracker.com. This Privacy Policy explains how we handle information when you use our service.

2. Information We Collect
   We do not collect personal information directly. All data you enter (practice test scores, topic breakdowns) is stored locally in your browser using localStorage. We do not have access to this data.

3. Information We May Collect Automatically
   We use Plausible Analytics for privacy-friendly traffic analysis. Plausible does not use cookies and does not collect personal data. See https://plausible.io/privacy.
   
   We also collect standard server logs via our hosting provider (Cloudflare Pages) and CDN provider (Cloudflare), which may include: IP address, browser type, pages visited, visit duration.

4. Third-Party Services
   - Cloudflare Pages: Hosting provider. May collect access logs. See https://www.cloudflare.com/privacypolicy/
   - Cloudflare CDN: CDN and DNS provider. May collect access logs. See https://www.cloudflare.com/privacypolicy/
   - Plausible Analytics: Privacy-friendly analytics. No cookies, no personal data. See https://plausible.io/privacy
   - Namecheap: Domain registrar. See https://www.namecheap.com/legal/general/privacy-policy/

5. Data Retention
   - Your practice test data: Stored in your browser's localStorage until you clear it.
   - Server logs: Retained by Cloudflare per their policy (typically 30 days).

6. Your Rights
   - You can clear all your data at any time by using the "Clear All Data" button in the app or by clearing your browser's localStorage.
   - GDPR Rights (for EU/UK users): You have the right to access, rectify, erase, restrict processing, object to processing, and data portability. Since we do not store personal data on our servers, most requests can be fulfilled by clearing your browser data. For any other requests, contact us at weldonz2026@gmail.com.
   - CCPA Rights (for California users): You have the right to know what personal information is collected, the right to delete personal information, and the right to opt-out of the sale of personal information. We do not sell personal information.

7. Children's Privacy
   Our service is designed for high school students (ages 14-18). We do not knowingly collect data from children under 13. If you believe a child under 13 has used our service, please contact us.

8. Changes to This Policy
   We may update this policy. Changes will be posted on this page with an updated date.

9. Contact Us
   Email: weldonz2026@gmail.com
   Operator: Weldon (Individual Developer)
```

### 11.2 Terms of Service 草稿骨架

```
Terms of Service — AP Score Tracker
Last updated: 2026-05-21

1. Acceptance of Terms
   By using AP Score Tracker, you agree to these Terms.

2. Service Description
   AP Score Tracker is a free online tool that helps students track their AP exam practice test progress. All calculations are performed locally in your browser.

3. No Account Required
   Our service does not require registration or login. Data is stored locally in your browser.

4. Disclaimer
   - AP Score Tracker is not affiliated with, endorsed by, or approved by College Board.
   - Score predictions are estimates based on publicly available scoring curves and may not reflect your official AP score.
   - We do not guarantee any specific score improvement.

5. Intellectual Property
   The scoring curves and exam formats are based on publicly available information. Our code and interface are our property.

6. Limitation of Liability
   We provide this tool "as is" without warranties. We are not liable for any decisions you make based on the tool's output.

7. Changes to Terms
   We may update these terms. Continued use constitutes acceptance.

8. Governing Law
   These Terms are governed by the laws of the State of California, United States, without regard to its conflict of law principles. Any disputes shall first be attempted to be resolved informally by contacting us at weldonz2026@gmail.com. If informal resolution fails, disputes shall be resolved through binding arbitration conducted remotely via video conference.

9. Contact
   Email: weldonz2026@gmail.com
   Operator: Weldon (Individual Developer)
```

### 11.3 Disclaimer 草稿

```
Disclaimer — AP Score Tracker

AP Score Tracker is an independent tool and is not affiliated with, endorsed by, or approved by College Board.

- "AP" is a registered trademark of College Board.
- Score predictions are estimates based on publicly available scoring curves.
- Your official AP score may differ from our predictions.
- This tool is for informational purposes only and does not guarantee any specific result.

Contact: weldonz2026@gmail.com
Operator: Weldon (Individual Developer)
```

### 11.4 Cookie Policy 草稿（当前不需要，预留）

```
Cookie Policy — AP Score Tracker
Last updated: 2026-05-21

We use minimal cookies necessary for the functioning of our website.

We use Plausible Analytics for privacy-friendly traffic analysis. Plausible does not use cookies and does not collect personal data. See https://plausible.io/privacy.

We do not use analytics cookies, advertising cookies, or tracking pixels.

If we add additional analytics or tracking in the future, we will update this policy and request your consent where required by law.
```

### 11.5 Refund Policy 草稿（Phase 1 后启用）

```
Refund Policy — AP Score Tracker
Last updated: 2026-05-21

1. Subscription Refunds
   - You may request a full refund within 15 days of your initial purchase.
   - Refund requests after this period are considered on a case-by-case basis.

2. Cancellation
   - You can cancel your subscription at any time from your account settings.
   - Cancellation takes effect at the end of your current billing period.

3. Processing Time
   - Refunds are typically processed within 5-10 business days.

4. Contact
   - To request a refund, contact us at weldonz2026@gmail.com.
```

---

## 12. 待确认事项汇总

| # | 事项 | 影响 | 建议动作 |
|---|---|---|---|
| 1 | **站点运营主体（个人/公司）及联系邮箱** | Privacy Policy、Terms、Contact 页面必需 | **已确认：Weldon / weldonz2026@gmail.com** |
| 2 | ~~适用法律 / 管辖地~~ | Terms of Service 必需 | **已确认：California 法律 + 在线仲裁** |
| 3 | **是否使用分析工具（GA/Plausible/Cloudflare Analytics）** | 数据处理表、Cookie Policy、GDPR 合规 | **已确认：Plausible（无 Cookie，无需 Banner）** |
| 4 | **是否使用 Cloudflare CDN** | 第三方清单、跨境传输 | **已确认：使用 Cloudflare CDN** |
| 5 | **目标市场是否明确包含欧盟/英国** | GDPR 合规深度 | **已确认：全球覆盖** |
| 6 | **退款窗口（Phase 1 后）** | Refund Policy | **已确认：15 天** |
| 7 | **取消路径（Phase 1 后）** | 支付合规 | **已确认：应用内取消（后续补充）** |
| 8 | **AP® 商标声明** | 品牌风险 | **已确认：页脚加 trademark 声明** |

---

*报告生成时间：2026-05-21*
*基于 student-site-compliance-pipeline skill*
