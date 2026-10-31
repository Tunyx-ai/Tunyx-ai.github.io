---
title: Failure handling
description: What Tunyx does when engines crash, GPUs fill up, traffic spikes or an update regresses.
---

| Situation | What Tunyx does |
|---|---|
| Engine crashes | Restarts it with backoff. Requests arriving meanwhile wait up to `TUNYX_CRASH_HOLD` (30 s) instead of failing |
| Engine hangs | Removes it from routing and restarts it |
| Repeated out-of-memory crashes | Rolls out a smaller configuration |
| Connection fails before the first byte | Retries on another replica (up to 3 attempts) |
| Too much traffic | Queues fairly per team, then returns 429 with `Retry-After` instead of letting latency explode |
| Prompt longer than the context limit | 400 with the limit and how to raise it, never silent truncation |
| Model falls back to CPU or partial GPU | Detected and reported in status |
| New model or config regresses | Canary detects it and rolls back automatically |
| No candidate passes validation | Serves a conservative safe config and explains why |
| Not enough GPU memory for a new model | Evicts idle lower-priority models, or explains who holds the GPUs |
| Sleeping model receives a request | Wakes it; the request waits in the queue; waits for memory or evicts another idle model |
| Daemon restarts or upgrades | Re-attaches running engines after verifying their identity, or relaunches the last good revision |
| Daemon receives SIGTERM | Reports not-ready, drains in-flight requests, then stops |
| Optimization would interrupt live traffic | Shortens the search; full re-optimization waits for the optimize window |

Status never says `serving` when nothing can serve: a deployment with no healthy replica shows
`degraded: unavailable 0/N` until it recovers.
