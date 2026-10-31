---
title: Dashboard & monitoring
description: The built-in dashboard, CLI views, Prometheus metrics and health endpoints.
---

## Dashboard

Open **http://127.0.0.1:8800/**. It has light and dark modes and shows:

- every deployment and its status;
- live throughput and latency charts (p50 and p99);
- why the current configuration was chosen;
- benchmark and quality results;
- cost and utilization;
- revisions and replicas;
- tuning proposals with one-click apply;
- the event stream.

If API keys are configured, the dashboard asks for one; viewer keys are enough.

## Command line

```bash
tunyx ps                    # all deployments, live tok/s, first-token latency, KV usage
tunyx status NAME           # everything about one deployment
tunyx logs NAME -f          # follow engine output
tunyx logs NAME --events    # Tunyx's decisions: promotions, rollbacks, restarts, proposals
```

## Prometheus

`/metrics` exposes request counts, latency histograms, tokens, cost, GPU share, engine restarts, rollouts and
event-loop lag. Metric names start with `tunyx_`. Useful ones:

| Metric | What it tells you |
|---|---|
| `tunyx_requests_total{deployment,status}` | Request volume and errors |
| `tunyx_gateway_responses_total{status,reason}` | Responses the gateway generated itself, e.g. `not_ready`, `model_not_found`, `key_limit` |
| `tunyx_engine_restarts_total` | Crashes and restarts |
| `tunyx_rollouts_total` | Promotions and rollbacks |
| `tunyx_time_to_first_token_seconds` | First-token latency histogram |
| `tunyx_deployment_status{status}` | Current state of each deployment |
| `tunyx_cost_dollars_total` | Spend by deployment |
| `tunyx_event_loop_lag_seconds` | Gateway stalls that would add latency |

## Health endpoints

| Endpoint | Meaning |
|---|---|
| `/healthz` | Liveness, including event-loop lag |
| `/readyz` | Readiness: 503 while loading, sleeping or draining |
| `/api/docs` | Interactive reference for the full HTTP API |
