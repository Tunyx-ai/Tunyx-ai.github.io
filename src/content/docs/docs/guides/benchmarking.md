---
title: Benchmarking
description: Workload-shaped benchmarks against any deployment or OpenAI-compatible endpoint.
---

`tunyx bench` runs the same workload-shaped benchmarks Tunyx uses for optimization, against any deployment or
any OpenAI-compatible URL. That includes other providers, for comparison.

```bash
tunyx bench support -p agent                  # closed loop: fixed numbers of concurrent users
tunyx bench support -c 1,8,32 --seconds 60    # choose concurrency levels and duration
tunyx bench support --rate 2,4,8              # open loop: requests arrive at N per second
tunyx bench http://other-host/v1 -p chat -o results.json
```

## What you get

- Time to first token and per-token latency (p50 and p99)
- Throughput and **goodput** (tokens/s from requests that met the profile's targets)
- SLO attainment per level
- Confidence intervals; levels with too few samples are flagged

## How it measures

- Steady-state windows: warm-up and ramp-down are excluded.
- Latency is measured from request arrival, queueing included.
- Open-loop mode uses Poisson arrivals, so you see behaviour at an offered load, not just at fixed concurrency.

## Quality evaluation

```bash
tunyx eval support                          # built-in 68-item evaluation
tunyx eval support --bench gsm8k,mmlu -n 200 # real benchmarks, with confidence intervals
tunyx eval support --dataset my_eval.jsonl  # your own cases
```

To make benchmarks a gate for every optimization, see [Quality gates](/docs/concepts/quality-gates/).
