---
title: Cost & economics
description: Cost per million tokens, utilization, idle spend and comparison with your API price.
---

`tunyx status` and the dashboard show:

- **Cost per million tokens**, at current load and at validated capacity.
- **Utilization:** how much of the validated capacity you use, and what idle time costs, e.g. "leaving 60% on
  the table (≈$38/day idle)".
- **Comparison with an API**, once you set what you'd otherwise pay.

Until you set your real GPU price, Tunyx uses a list-price estimate for known GPUs, clearly labelled as an
estimate.

```bash
tunyx config set gpu_hourly_cost 2.10            # your real $/GPU-hour
tunyx config set power_cost_kwh 0.15             # or: cost from electricity, for owned hardware
tunyx config set reference_price_per_mtok 0.60   # what an API would charge you per million tokens
```

These take effect immediately, without a restart.

## Usage and chargeback

```bash
tunyx usage                          # daily tokens and cost per deployment (last 30 days)
tunyx usage --by key                 # per team / named API key
tunyx usage --by key --csv usage.csv
```

Name keys per team (`TUNYX_API_KEYS="team-a:sk-...,team-b:sk-..."`) to attribute usage. See
[Teams, keys & security](/docs/guides/teams-security/).

## How cost is computed

Cost per million tokens = GPU-hours × hourly price × GPU share ÷ tokens served. Capacity comes from the
validated benchmark of the active configuration, so "utilization" means a share of what this deployment is
proven to handle, not a theoretical peak.
