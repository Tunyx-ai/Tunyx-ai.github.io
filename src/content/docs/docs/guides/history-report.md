---
title: Optimization history
description: Every technique Tunyx tried, its speed and quality metrics, and why it was kept or reverted.
---

Tunyx logs every configuration it tries. For each one:

- **technique**: what changed, for example "INT4 weights, calibrated (built by Tunyx)";
- **decision and reason**: promoted, kept, reverted, stepped back, rejected or failed, with the measured reason
  (e.g. "no meaningful gain (+1.2% goodput; needs +3%)" or "gsm8k dropped 6.0 pts vs full precision");
- **speed**: startup time, throughput, time to first token and per-token latency (p50 and p99), goodput and
  capacity at your latency targets;
- **quality**: every benchmark score with its 95% confidence interval, the full-precision reference, the change in
  points and the thresholds it was held to;
- **built models**: recipe, calibration data, build time and size, for anything Tunyx quantized itself.

## In the terminal

```bash
tunyx report NAME                 # every optimization run as a table
tunyx report NAME --last 1        # just the latest run
tunyx report NAME --rev 3         # one revision
```

## Share it

```bash
tunyx report NAME -f html -o report.html   # self-contained page: send it, attach it, archive it
tunyx report NAME -f md                    # Markdown for docs and pull requests
tunyx report NAME -f json                  # for your own tooling
```

The dashboard shows the latest run under **Optimization history**, with an **Open full report** button.

## Through the API

```bash
curl http://127.0.0.1:8800/api/deployments/NAME/report?format=html
curl http://127.0.0.1:8800/api/deployments/NAME/trials       # raw records
```

History is kept for 180 days.
