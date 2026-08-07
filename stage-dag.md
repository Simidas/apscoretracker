# Stage DAG

```text
00 setup [DONE]
  → 01 research [DONE, refresh later]
    → 02 PRD / route contract [DONE]
      → 03 pricing [DONE: free launch, Pro deferred]
      → 04 compliance [NEEDS_REVIEW]
        → 05 SEO-copy freeze [DONE]
          → 06 design source [DONE]
            → 08 backend/data [DONE for free launch]
            → 07 frontend [DONE locally]
              → 10 SEO recheck [NEEDS_REVIEW]
              → 04 compliance recheck [RUNNING]
              → 02 PM acceptance [WAITING]
                → 09 QA [WAITING_LOGIN]
                  → Owner Review [WAITING]
                    → 11 launch [WAITING]
                      → 12 data review [WAITING]
```

Stripe/Pro 是独立后续分支，不阻断当前免费版：pricing decision → Stripe setup → billing implementation → compliance recheck → E2E → Owner Review → paid launch。
