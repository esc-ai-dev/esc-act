# Best-in-Class Work Plan: Ambient Task-Capture Engine

**Author:** Manus AI Consolidation Team  
**Version:** 5.0 (Synthesized from Versions 1–4)  
**Date:** September 29, 2025

## 1. Strategic Context

The Ambient Task-Capture Engine must deliver an automation layer that ingests Gmail, Slack, and WhatsApp communications, extracts explicit and implicit tasks with OpenAI, preserves source context, and surfaces everything on a unified task board so professionals never miss commitments.【F:README.md†L1-L33】【F:docs/PRD.md†L1-L132】

## 2. Guiding Principles

1. **Secure-by-default integrations** – OAuth credentials must be encrypted, rotated, and protected by RLS policies before any production rollout.【F:docs/IMPLEMENTATION.md†L121-L184】【F:docs/PRD.md†L133-L221】
2. **AI with measurable accuracy** – Each extraction must be schema-validated, benchmarked, and improved through Agent workflow orchestration, using precision/recall metrics as quality gates.【F:docs/PRD.md†L154-L221】【F:docs/IMPLEMENTATION.md†L255-L310】
3. **Unified, resilient experience** – Users interact through a Supabase-authenticated dashboard with reliable task management, observability, and deployment automation.【F:README.md†L5-L72】【F:docs/IMPLEMENTATION.md†L186-L254】

## 3. Delivery Roadmap Overview

| Phase | Objective | Key Outcomes |
| --- | --- | --- |
| 0. Platform Baseline | Establish full testing harness, local Supabase automation, and developer ergonomics. |
| 1. Authentication Guardrails | Deliver Supabase auth routes, providers, and connection UX safeguards. |
| 2. Gmail Completion | Modernize OAuth handlers, session-aware links, token refresh, and ingestion tests. |
| 3. Data Security | Fix schema constraints, encrypt credentials, and adopt migration discipline. |
| 4. Slack & WhatsApp | Ship remaining connectors, services, and webhook ingestion. |
| 5. AI Pipeline | Integrate OpenAI Agent planner, harden extraction, and add AI benchmarks. |
| 6. Task UX | Empower editing, filtering, and rich context in the task board. |
| 7. Reliability | Add observability, rate limiting, health checks, and alerting. |
| 8. Operations | Codify infrastructure, CI/CD, and production readiness. |
| X. 10x Enhancements | Daily digest, command palette, and duplicate detection for high leverage. |

## 4. Detailed Backlog with Definition of Done & Automated Verification

### Phase 0 – Platform Baseline (Week 0)

| ID | Backlog Item | Definition of Done | Automated Test |
| --- | --- | --- | --- |
| 0.1 | Establish testing & QA harness | `npm run typecheck`, `npm run test:unit` (Vitest), and `npm run test:e2e` (Playwright) scripts exist with coverage for gmailService, taskExtractionService, and dashboard smoke test. CI config added. | `npm run lint && npm run typecheck && npm run test:unit && npm run test:e2e -- --grep smoke` |
| 0.2 | Supabase local automation | Supabase CLI dev dependency, `npm run test:db` spins up local Postgres (Docker), applies `db/schema.sql`, and tears down. README updated with workflow. | `npm run test:db` |
| 0.3 | Environment & docs linting | `.env.example` covers Gmail, Supabase, OpenAI keys. `npm run lint:docs` (Markdownlint) configured. README updated with setup pipeline. | `npm run lint:docs` |

### Phase 1 – Authentication & Session Guardrails (Week 1)

| ID | Backlog Item | Definition of Done | Automated Test |
| --- | --- | --- | --- |
| 1.1 | Supabase auth routes | `/login`, `/signup`, `/auth/callback` App Router segments using `@supabase/auth-helpers-nextjs`; dashboard redirects anonymous users to `/login`. | `npm run test:e2e -- --grep "auth flow"` |
| 1.2 | Supabase client provider | Global Supabase session provider wraps client components; `TaskBoard` consumes context and respects RLS. | `npm run test:unit -- taskboard.session.spec.ts` |
| 1.3 | Connection onboarding UX | Dashboard header shows connection status for Gmail/Slack/WhatsApp; reconnect attempts disabled during OAuth; friendly prompts for missing auth. | `npm run test:e2e -- --grep "connection banner"` |

### Phase 2 – Gmail Integration Completion (Week 2)

| ID | Backlog Item | Definition of Done | Automated Test |
| --- | --- | --- | --- |
| 2.1 | Port OAuth routes | `/api/connect/gmail` and `/api/connect/gmail/callback` expose App Router `GET` handlers using `NextRequest`/`NextResponse`, returning validated errors. | `npm run test:unit -- gmail-oauth.spec.ts` |
| 2.2 | Fix connect link | Dashboard builds Gmail connect URL with actual session `user.id`, disables button until user exists. | `npm run test:unit -- dashboard-connect-link.spec.ts` |
| 2.3 | Token refresh & dedupe | Gmail service encrypts refresh tokens, performs historyId checkpointing, and retries transient errors. | `npm run test:unit -- gmailService.spec.ts` |
| 2.4 | Gmail ingestion E2E | Playwright test mocks OAuth completion and cron endpoint, asserting tasks persist to Supabase via pipeline. | `npm run test:e2e -- --grep "gmail ingestion"` |

### Phase 3 – Database Integrity & Security (Week 3)

| ID | Backlog Item | Definition of Done | Automated Test |
| --- | --- | --- | --- |
| 3.1 | Repair enum constraints | `db/schema.sql` enums rewritten with proper `CHECK` literals; Supabase CLI migration succeeds. | `npm run test:db` |
| 3.2 | Encrypt credentials | `pgcrypto` enabled, OAuth secrets stored using AES/GCM; services decrypt on demand and rotate existing plaintext records. | `npm run test:unit -- credentials-vault.spec.ts` |
| 3.3 | Migration discipline | Timestamped SQL migrations under `db/migrations`, runner invoked before builds; documentation updated. | `npm run test:db -- --verify` |

### Phase 4 – Slack & WhatsApp Connectors (Weeks 4–5)

| ID | Backlog Item | Definition of Done | Automated Test |
| --- | --- | --- | --- |
| 4.1 | Slack OAuth & storage | `/api/connect/slack` App Router handlers persist encrypted bot tokens/team IDs in `connections`, manage status field. | `npm run test:unit -- slack-oauth.spec.ts` |
| 4.2 | Slack ingestion service | `slackService.ts` processes Events API payloads, normalizes messages before extraction, handles retries & rate limits. | `npm run test:unit -- slackService.spec.ts` |
| 4.3 | WhatsApp webhook ingestion | `/api/webhooks/whatsapp` receives 2chat.io events, stores context, and invokes extraction; includes signature validation. | `npm run test:unit -- whatsappService.spec.ts` |

### Phase 5 – AI Pipeline & Agent Workflow (Weeks 6–7)

| ID | Backlog Item | Definition of Done | Automated Test |
| --- | --- | --- | --- |
| 5.1 | Upgrade OpenAI SDK & Agent planner | Latest `openai` SDK installed; `agentPlannerService.ts` integrates Agent workflow planning to orchestrate extraction steps. | `npm run test:unit -- agentPlanner.spec.ts` |
| 5.2 | Robust JSON extraction | Extraction pipeline uses streaming guards, retries, and Zod schema validation before persisting tasks. | `npm run test:unit -- taskExtractionService.spec.ts` |
| 5.3 | AI evaluation harness | Benchmark suite with curated transcripts outputs precision/recall; integrated into CI gating. | `npm run test:ai` |

### Phase 6 – Task Management UX (Weeks 8–9)

| ID | Backlog Item | Definition of Done | Automated Test |
| --- | --- | --- | --- |
| 6.1 | Editable task drawer | Task drawer allows edit/delete with optimistic updates and Supabase mutations respecting RLS. | `npm run test:e2e -- --grep "Task editing"` |
| 6.2 | Filtering & search | Source filters, status tabs, and free-text search implemented via Supabase RPC for efficient queries. | `npm run test:unit -- taskFilters.spec.ts` |
| 6.3 | Context-rich detail view | Task cards show source previews and agent-suggested follow-ups while maintaining drag-and-drop UX. | `npm run test:e2e -- --grep "Task context drawer"` |

### Phase 7 – Observability & Reliability (Week 10)

| ID | Backlog Item | Definition of Done | Automated Test |
| --- | --- | --- | --- |
| 7.1 | Structured logging & tracing | OpenTelemetry/Sentry capture spans for each ingestion source with PII scrubbing and error tagging. | `npm run test:unit -- logging.spec.ts` |
| 7.2 | Rate limiting & backoff | Middleware enforces provider rate limits with exponential backoff strategies across integrations. | `npm run test:unit -- rate-limit.spec.ts` |
| 7.3 | Health checks & alerts | `/api/health` endpoint plus cron heartbeat alerts wired to Slack; failure scenarios documented. | `npm run test:e2e -- --grep "health check"` |

### Phase 8 – Deployment & Operations (Weeks 11–12)

| ID | Backlog Item | Definition of Done | Automated Test |
| --- | --- | --- | --- |
| 8.1 | Infrastructure as code | Terraform/Supabase configs capture Supabase project, Vercel settings, and secrets; runbooks stored in `/docs`. | `npm run lint && npm run test:db` |
| 8.2 | CI/CD pipeline | GitHub Actions run lint/typecheck/unit/e2e/AI tests on PRs and auto-deploy main behind approval gate. | `npm run test:ci` |
| 8.3 | Production readiness review | Checklist covering logging, alerting, support runbooks committed; sign-off recorded in `/docs/RELEASE_CHECKLIST.md`. | `npm run lint:docs` |

### Phase X – High-Leverage Enhancements (Parallel after Phase 5)

| ID | Enhancement | Definition of Done | Automated Test |
| --- | --- | --- | --- |
| X1 | Daily agent-generated digest | Agent planner composes daily email of open tasks per user via Supabase Edge Function with unsubscribe link. | `npm run test:ai -- --grep "daily digest"` |
| X2 | Command palette triage | Keyboard command palette (`Cmd/Ctrl+K`) offers quick filters and agent-suggested triage actions. | `npm run test:e2e -- --grep "command palette"` |
| X3 | Smart duplicate detection | Embedding-based similarity check prevents duplicate tasks across channels; threshold configurable. | `npm run test:unit -- duplicate-detection.spec.ts` |

## 5. Governance & Review Cadence

- **Weekly delivery review**: Assess completion of scheduled backlog IDs, update risk log, and recalibrate scope.
- **Quality gates**: No merge to main unless lint/typecheck/unit/e2e/AI suites pass and migrations applied cleanly.
- **Security audits**: Quarterly review of credential storage, RLS policies, and third-party scopes.

## 6. Acceptance Criteria for Production Readiness

1. All phases 0–8 complete with passing automation and documented evidence.
2. AI evaluation suite sustains ≥85% precision and ≥90% recall across benchmark corpus.
3. Zero plaintext OAuth secrets in database; encryption verified via Supabase admin audit.
4. CI/CD deploys tagged releases with automated rollback plan documented.

This consolidated plan synthesizes the strengths of Versions 1–4 into a single actionable backlog ready for execution and stakeholder approval.
