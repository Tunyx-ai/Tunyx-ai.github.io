---
title: Live retuning
description: Let Tunyx propose or apply better settings as real traffic changes.
---

Tunyx watches real traffic: time to first token, per-token latency, KV-cache pressure, preemptions, prefix-cache
hit rate, queueing, and prompts rejected for being too long. When a different setting would serve that traffic
better, it creates a **proposal**.

```bash
tunyx proposals          # what Tunyx suggests and why
tunyx approve ID         # apply: validated, canaried, auto-rollback on regression
tunyx reject ID
```

The dashboard lists proposals too, with one-click apply.

## Modes

| Mode | Behaviour |
|---|---|
| `off` | No retuning |
| `propose` (default) | Suggests changes; you approve them |
| `auto` | Applies safe changes automatically, within bounds you set |

```bash
tunyx up MODEL --tuning auto
tunyx tune support --mode auto --max-seqs 256 --max-ctx 32768 --no-kv-fp8
tunyx tune support --now      # evaluate the rules immediately
```

## Safety rails

- Every change is validated and canaried, with automatic rollback.
- In `auto` mode, changes that need an engine restart wait until the deployment has been idle for 30 seconds.
- Bounds cap what auto mode may change: maximum batch size, maximum context, and whether FP8 KV cache is allowed.
