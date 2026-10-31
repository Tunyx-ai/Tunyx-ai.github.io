---
title: Tunyx vs alternatives
description: How Tunyx compares with Ollama, running vLLM or SGLang by hand, NVIDIA NIM / Dynamo, and managed APIs.
---

Tunyx is a control plane, not an engine. It runs vLLM, SGLang, llama.cpp or MLX for you, decides how to run them
for *your* workload, proves the result with benchmarks and a quality gate, and keeps it healthy. So the question
is usually not "Tunyx or vLLM" but "who does the tuning, validation and day-2 operations around vLLM".

| | Tunyx | Ollama | vLLM / SGLang by hand | NVIDIA NIM / Dynamo | Managed APIs |
|---|---|---|---|---|---|
| Picks engine, precision, context and batch size for your hardware | **Yes, explained** | Fixed defaults | You do it | Curated profiles | Provider does it |
| Tunes against your workload's latency targets | **Yes, measured** | No | Manual sweeps | Multi-node planner | Opaque |
| Quality gate before promoting a quantized or changed config | **Yes** (tools, JSON, reasoning) | No | No | No | Opaque |
| Canary rollouts with automatic rollback | **Yes** | No | No | Via your platform | Per provider |
| Live retuning from real traffic | **Yes** (propose or auto) | No | No | Autoscaling | n/a |
| Throughput under concurrency | Engine-grade | Single-user oriented | Engine-grade | Engine-grade | High |
| Cost per token vs your API price | **Yes** | No | No | No | It is the bill |
| OpenAI + Anthropic + Ollama APIs on one endpoint | **Yes** | Ollama + OpenAI | OpenAI | OpenAI | OpenAI |
| Multi-tenant keys, scopes, limits, audit, four-eyes changes | **Yes** | No | No | Via your platform | Yes |
| Data stays on your hardware, air-gap ready | **Yes** | Yes | Yes | Yes | No |
| Multi-node, disaggregated serving | No (single node, 1–8 GPUs) | No | Building blocks | **Yes** | Yes |

## When to choose what

- **Graduating from Ollama.** Tunyx keeps the one-command feel (`tunyx up qwen2.5:7b`, `tunyx run`) and speaks
  the Ollama API, but serves on vLLM or SGLang with continuous batching, so throughput holds up with many users.
  It also validates quality and tells you what it costs.
- **You already run vLLM by hand.** Tunyx replaces the flag-tuning spreadsheet. It measures candidates on your
  traffic shape, rejects configs that break tool calls, and handles swaps, crashes and retuning. `tunyx plan` and
  the stock-defaults comparison show exactly what it changed and why.
- **You need multi-node or disaggregated serving at frontier scale.** Use NVIDIA Dynamo or llm-d. Tunyx targets
  single nodes (1–8 GPUs, MIG slices, Macs, CPU servers), where most self-hosted inference runs.
- **You don't want to own GPUs at all.** A managed API is simpler. Tunyx's economics view shows, from your own
  traffic, the point where self-hosting becomes cheaper.

## What it means for each role

| Role | What you get |
|---|---|
| **CEOs and founders** | Lower cost per token than API bills at steady load, data that stays in-house, no lock-in to a model or engine, and AI features without hiring an inference team |
| **CTOs and AI leads** | Configs chosen against your latency targets, every change gated on accuracy and tool calls, canary rollouts, audit log and four-eyes approval |
| **Platform and ML engineers** | Prometheus metrics, probes, systemd and Kubernetes manifests, declarative YAML, self-healing, re-attach across upgrades, and every decision explained |
| **Developers** | OpenAI, Anthropic and Ollama APIs; change one base URL. `tunyx up` and `tunyx run` for the simple path; LoRA adapters and fine-tunes by name |

## Honest limitations

- **Single node.** No cross-host scheduling or prefill/decode disaggregation yet. Multi-node fleets and replica
  autoscaling are on the roadmap.
- **State is SQLite on one node.** It's crash-safe with hourly backups, but there is no active-active high
  availability.
- **The built-in quality gate is generic.** Domain-specific checks need your own eval set
  (`tunyx eval --dataset`).
- **Identity is API keys with roles and scopes.** For SSO, put an identity-aware proxy in front.
