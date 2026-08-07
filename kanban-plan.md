# Kanban Plan

| task_id | stage | skill | owner | gate | status |
|---|---|---|---|---|---|
| APST-00 | setup/control | site-orchestrator-playbook | orchestrator | 事实源和权限清单存在 | DONE |
| APST-02 | route contract | product-definition-prd | PM | 路由、任务、NOT-DO 冻结 | DONE |
| APST-03 | pricing | site-pricing-calibration | PM | 免费版与 Pro 边界明确 | DONE |
| APST-04 | compliance | student-site-compliance-pipeline | compliance | V2 数据流与法律页一致 | NEEDS_REVIEW |
| APST-05 | copy freeze | site-copywriting-student | copy | SEO/claim 口径冻结 | DONE |
| APST-06 | design source | site-design-student | design | 现有 UI + OG；移动证据 | DONE |
| APST-08 | backend/data | backend-auto-site-cloudflare-workers | backend | D1/API/权限/错误态 | DONE |
| APST-07 | frontend repair | frontend-site-automation | frontend | 路由、删除、导出、SEO | DONE |
| APST-10 | SEO recheck | seo-launch-workflow | SEO | sitemap/canonical/schema/status | NEEDS_REVIEW |
| APST-09 | QA | student-site-qa-acceptance | QA | 公开页+登录真实任务 | BLOCKED |
| APST-OWNER | owner review | owner | Weldon | 明确 GO/NO-GO | WAITING |
| APST-11 | launch | site-ops-growth-launch | ops | 同 commit deploy/smoke/indexing | WAITING |
| APST-12 | review | site-data-review-iteration | analytics | 数据四态+K/I/S | WAITING |

详细输入输出见 `handoff.md`；阻塞与解锁动作见 `blocked-log.md`。
