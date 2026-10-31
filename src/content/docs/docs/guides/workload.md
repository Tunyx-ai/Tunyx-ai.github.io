---
title: Your real workload
description: Tunyx learns the shape of real traffic and optimizes for it. Prompts are kept only if you opt in, redacted.
---

Workload profiles are a good start, but your traffic is the real benchmark. The gateway learns each deployment's
traffic shape as requests arrive:

- prompt and output lengths (percentiles);
- concurrency and arrival rate, by hour of day;
- tool-call and streaming share;
- prefix-cache reuse.

Only counts and histograms are kept, never request content, and only on your machine.

```bash
tunyx workload support                    # what has been learned (usable after ~200 requests)
tunyx reoptimize support --from-traffic   # optimize against the real traffic instead of the profile
tunyx workload support --reset            # forget it
```

## Prompt samples (opt-in)

Benchmarks and calibration work best on text that reads like yours. Opt in to keep a small, redacted sample:

```bash
export TUNYX_CAPTURE_PROMPTS=0.01   # keep 1% of conversations
```

- Emails, phone and card numbers, API keys and tokens, and IP addresses are redacted before anything is written.
- At most `TUNYX_CAPTURE_MAX` (2,000) samples per deployment, for `TUNYX_CAPTURE_RETENTION_DAYS` (7) days, in
  files only the daemon's user can read.
- Used as benchmark prompts and as calibration data for the quantized variants Tunyx builds (unless you pass
  `--calibration`).
- Deleted with the deployment, or with `tunyx workload NAME --reset`.

## Cost per successful task

Cost per token can improve while your application gets worse: a cheaper configuration that makes an agent retry
more costs more per finished task. Tag the requests of one task and report the result:

```python
client.chat.completions.create(model="support", messages=msgs, extra_headers={"X-Tunyx-Task": ticket_id})
# ... when the task is done:
httpx.post("http://127.0.0.1:8800/v1/outcomes", json={"task": ticket_id, "success": resolved})
```

```bash
tunyx outcomes support    # success rate, cost per task and per successful task, for each configuration
```

## Budgets for background optimization

```bash
tunyx config set optimize_budget_gpu_hours 4   # per deployment, any 7 days
```

Over budget, background runs are skipped with an event saying so; `tunyx reoptimize` still runs on request.
