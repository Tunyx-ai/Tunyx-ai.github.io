---
title: Declarative config
description: Describe deployments in YAML and let Tunyx make reality match. GitOps-friendly.
---

```yaml
# tunyx.yaml
deployments:
  - name: chat
    model: Qwen/Qwen2.5-7B-Instruct
    profile: chat
    constraints:
      memory_fraction: 0.5      # share the GPU with the coder below
    tuning: propose

  - name: coder
    model: Qwen/Qwen2.5-Coder-7B-Instruct
    profile: agent
    constraints:
      memory_fraction: 0.45
    priority: 10               # never evicted for lower-priority models
    tuning: auto               # apply safe changes automatically, within bounds
    profile_overrides:
      slo: { p99_ttft_ms: 3000 }

  - name: nightly-batch
    model: meta-llama/Llama-3.1-8B-Instruct
    profile: batch
    idle_ttl: 900              # sleep after 15 idle minutes; wakes on the next request
```

```bash
tunyx apply -f tunyx.yaml --dry-run   # show what would change
tunyx apply -f tunyx.yaml             # create missing deployments, swap changed models (with canary)
tunyx apply -f tunyx.yaml --prune     # also delete deployments not in the file
tunyx apply -f tunyx.yaml --wait      # block until every deployment is serving
```

Changed models are swapped with [canary and automatic rollback](/docs/guides/swap-rollback/), so applying a file
in CI is safe.
