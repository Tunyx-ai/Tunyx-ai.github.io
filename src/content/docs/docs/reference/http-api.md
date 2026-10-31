---
title: HTTP API
description: Inference endpoints (OpenAI, Anthropic, Ollama), the control-plane API and operational endpoints.
---

All endpoints are served from one address, by default `http://127.0.0.1:8800`. When keys are configured, send
`Authorization: Bearer KEY` (or `x-api-key`). The interactive reference with request and response schemas is at
**`/api/docs`** on your daemon.

## Inference: OpenAI-compatible

| Method | Path | |
|---|---|---|
| POST | `/v1/chat/completions` | Chat, streaming, tools, JSON mode and schema |
| POST | `/v1/completions` | Text completions |
| POST | `/v1/responses` | Responses API (streaming, tools, reasoning) |
| POST | `/v1/embeddings` | Embeddings |
| GET | `/v1/models` | Deployments, LoRA adapters and aliases |
| GET | `/v1/models/{model}` | One model |
| GET | `/v1/usage` | Usage for the calling key |

## Inference: Anthropic-compatible

| Method | Path | |
|---|---|---|
| POST | `/v1/messages` | Messages, streaming, tool use, thinking |
| POST | `/v1/messages/count_tokens` | Token counting |

## Inference: Ollama-compatible

| Method | Path | |
|---|---|---|
| POST | `/api/chat` | Chat (tools, thinking, preload with an empty request) |
| POST | `/api/generate` | Generate |
| POST | `/api/embed`, `/api/embeddings` | Embeddings |
| GET | `/api/tags` | List models |
| POST | `/api/show` | Model details and capabilities |
| GET | `/api/ps` | Loaded models |
| POST | `/api/pull` | Download a model (admin) |
| GET | `/api/version` | Version |

## Control plane

Admin keys are required for changes; viewer keys may read.

| Method | Path | |
|---|---|---|
| GET | `/api/info` | Version, hardware, settings summary |
| GET / PUT | `/api/config` | Runtime settings |
| GET | `/api/models` | Short model names |
| GET | `/api/profiles` | Workload profiles |
| POST | `/api/plan` | Plan a deployment without launching |
| GET / POST | `/api/deployments` | List / create deployments |
| GET / PATCH / DELETE | `/api/deployments/{name}` | Read / update / delete one |
| POST | `/api/deployments/{name}/swap` | Swap model (canary + rollback) |
| POST | `/api/deployments/{name}/reoptimize` | Re-run optimization |
| POST | `/api/deployments/{name}/rollback` | Roll back or abort a canary |
| POST | `/api/deployments/{name}/stop`, `/start` | Stop / start |
| PATCH | `/api/deployments/{name}/tuning` | Retuning mode and bounds |
| POST | `/api/deployments/{name}/tune-now` | Evaluate tuning rules now |
| GET | `/api/deployments/{name}/metrics` | Live and historical metrics |
| GET | `/api/deployments/{name}/logs` | Engine logs |
| GET | `/api/deployments/{name}/report?format=json\|md\|html` | Optimization history report |
| GET | `/api/deployments/{name}/trials` | Raw optimization history records |
| PUT | `/api/deployments/{name}/quality` | Set the quality suite (benchmarks and thresholds) |
| GET | `/api/benchmarks` | Available benchmarks |
| GET | `/api/proposals` | Tuning proposals |
| POST | `/api/proposals/{id}/approve`, `/reject` | Act on a proposal |
| GET | `/api/events` | Event stream |
| GET | `/api/usage` | Daily usage and cost |
| GET | `/api/audit`, `/api/audit/verify` | Audit log and integrity check |
| GET | `/api/changes` | Pending four-eyes change requests |
| POST | `/api/changes/{id}/approve`, `/reject` | Act on a change request |
| POST | `/api/backup` | Online backup |
| POST | `/api/shutdown` | Stop the daemon |

### Create a deployment

```bash
curl -X POST http://127.0.0.1:8800/api/deployments \
  -H 'Authorization: Bearer sk-admin' -H 'Content-Type: application/json' \
  -d '{"model": "Qwen/Qwen2.5-7B-Instruct", "name": "chat", "profile": "chat"}'
```

## Operations

| Method | Path | |
|---|---|---|
| GET | `/healthz` | Liveness (includes event-loop lag) |
| GET | `/readyz` | Readiness: 503 while loading, sleeping or draining |
| GET | `/metrics` | Prometheus metrics |
| GET | `/` | Dashboard |
