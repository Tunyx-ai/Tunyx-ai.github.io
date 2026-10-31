---
title: Glossary
description: Plain-language explanations of the terms Tunyx shows.
---

Run `tunyx glossary` for the same list in your terminal.

| Term | Meaning |
|---|---|
| **TTFT** | Time to first token: how long before the reply starts appearing |
| **ITL / TPOT** | Time between tokens: how smooth the streaming feels |
| **p50 / p99** | The typical request / the slowest 1% of requests |
| **Throughput** | Tokens generated per second across all users |
| **Goodput** | Throughput counting only requests that met the latency targets |
| **SLO** | Service-level objective: the latency target a profile sets |
| **Concurrency** | How many requests are in flight at once |
| **KV cache** | GPU memory holding conversation context. More cache means more simultaneous users and longer prompts |
| **Prefix caching** | Reusing cached context for prompts that start the same way (system prompts, agent histories) |
| **Session affinity** | Sending a conversation's requests to the same replica so its cache is reused |
| **FP8 / GGUF / Q4_K_M** | Lower-precision formats: smaller and faster, sometimes less accurate (the quality gate checks) |
| **Speculative decoding** | Guessing several tokens ahead and verifying them in one step, to stream faster |
| **Tensor parallel (TP)** | Splitting one model across several GPUs |
| **Replica** | An extra copy of a model on other GPUs, to serve more users |
| **MIG** | NVIDIA Multi-Instance GPU: one physical GPU split into isolated slices |
| **Canary** | Sending a small share of traffic to a new version before trusting it |
| **Revision** | A numbered, validated configuration of a deployment you can roll back to |
| **Profile** | A description of your workload (chat, agent, batch, mixed) and its targets |
| **Quality gate** | The accuracy, tool-call and JSON checks a config must pass before serving |
| **Control plane** | The part of Tunyx that decides and manages; the engine does the actual inference |
