---
title: Several models, one machine
description: Share GPUs between models with memory shares, priorities, sleep and wake-on-request.
---

```bash
tunyx up qwen2.5:7b        --name chat  --memory 0.5
tunyx up qwen2.5-coder:7b  --name coder --memory 0.45 --priority 10
tunyx up llama3.1:8b       --name batch --idle-ttl 900
```

- **`--memory`** gives each model a share of GPU memory. By default the share is sized to the workload, so
  models can share a GPU without you calculating anything.
- **Eviction:** when a new model needs room, idle models with lower or equal priority are put to sleep.
- **Wake on request:** a sleeping model wakes automatically on its next request. The request waits in a queue
  meanwhile; if memory is busy, Tunyx waits for it or evicts another idle model.
- **`--idle-ttl`** puts a model to sleep after N idle seconds to free the GPU.
- **`--priority`:** higher-priority models are never evicted for lower ones.

`tunyx ps` shows each deployment's state (serving, sleeping, stopped) and memory share.

## Choosing shares

`tunyx status NAME` shows the utilization of each deployment's validated capacity. Under 50% means room to pack
another model; consistently over 90% means it needs more GPU.
