---
title: CLI
description: Every tunyx command, grouped by task.
---

Run `tunyx COMMAND --help` for all options of a command.

## Deploy

| Command | Purpose |
|---|---|
| `tunyx up MODEL` | Deploy a model: detect hardware, plan, optimize, validate and serve |
| `tunyx run MODEL [PROMPT]` | Chat in the terminal, or one-shot prompt (deploys first if needed) |
| `tunyx init` | Guided first run |
| `tunyx demo [--fast] [--stop]` | Full walkthrough on a simulated GPU |
| `tunyx plan MODEL` | What would be deployed, and why, without launching |
| `tunyx swap NAME MODEL` | Change a deployment's model with canary and rollback |
| `tunyx apply -f FILE` | Make deployments match a YAML file |
| `tunyx pull MODEL` | Download weights only |
| `tunyx models` | Short model names |
| `tunyx hw` | Detected hardware |
| `tunyx doctor` | Diagnose setup problems and explain fixes |

### `tunyx up` options

| Option | |
|---|---|
| `-p, --profile` | `chat` · `agent` · `batch` · `mixed` (default) |
| `-n, --name` | Deployment / served model name |
| `-O, --optimize` | `quick` · `standard` (default: up to 6 techniques) · `thorough` (up to 30) |
| `--engine` | Pin `vllm` · `sglang` · `llamacpp` |
| `--quant` | Pin precision: `none` · `fp8` · `Q4_K_M` · … |
| `--ctx` | Max context length |
| `--gpus` | GPU indices, e.g. `0,1` |
| `--memory` | GPU share, 0.05–1.0 |
| `--tuning` | `off` · `propose` (default) · `auto` |
| `--priority` | Eviction priority (default 0) |
| `--idle-ttl` | Sleep after N idle seconds |
| `--revision` | Hugging Face revision |
| `--trust-remote-code` | Allow model code from the repository |
| `--skip-quality` | Skip the quality gate (not recommended) |
| `--fresh` | Ignore cached tuning results |
| `--wait-optimal` | Serve only after optimization finishes |
| `--replace` | Replace an existing deployment with this name |
| `--engine-arg` | Raw engine flag (repeatable) |
| `--lora NAME=PATH` | LoRA adapter (repeatable) |
| `--bench SPEC` | Quality benchmark with thresholds (repeatable), e.g. `gsm8k:min=0.7`, `mmlu:drop=2%` |
| `--on-quality-fail` | `step-back` (default) or `reject` |
| `--calibration FILE` | Prompts (JSONL) to calibrate quantized variants on |
| `-d, --detach` | Don't follow progress |

## Operate

| Command | Purpose |
|---|---|
| `tunyx ps` | List deployments with live metrics |
| `tunyx status NAME` | Config and rationale, benchmarks, quality, economics, revisions |
| `tunyx logs NAME [-f] [--events] [--rev N] [--replica N]` | Engine logs or Tunyx events |
| `tunyx stop NAME` / `start NAME` | Free the GPU / start again |
| `tunyx down NAME` | Delete a deployment and its history |
| `tunyx reoptimize NAME [--profile P]` | Re-run optimization |
| `tunyx rollback NAME [--to REV]` | Roll back or abort a canary |
| `tunyx tune NAME --mode M [--max-seqs N] [--max-ctx N] [--no-kv-fp8] [--now]` | Live retuning settings |
| `tunyx proposals` / `approve ID` / `reject ID` | Tuning proposals |
| `tunyx bench TARGET [-p P] [-c 1,8,32] [--rate 1,2,4] [--seconds S] [-o FILE]` | Benchmark a deployment or URL |
| `tunyx eval TARGET [--bench gsm8k,mmlu] [-n N] [--dataset FILE]` | Run benchmarks or the built-in checks |
| `tunyx report NAME [--rev N] [--last N] [-f table\|md\|json\|html] [-o FILE]` | Optimization history |
| `tunyx quality NAME [--bench SPEC ...] [--on-fail step-back\|reject] [--reset]` | Show or set the quality suite |
| `tunyx benchmarks [list\|pull NAME\|show NAME]` | Available benchmarks, download, preview |
| `tunyx usage [--by deployment\|key] [--days N] [--csv FILE]` | Usage and cost |

## Govern

| Command | Purpose |
|---|---|
| `tunyx config show` / `set KEY VALUE` / `unset KEY` | Runtime settings |
| `tunyx audit [--since-hours N] [--verify] [--csv FILE]` | Audit log |
| `tunyx changes list` / `approve ID` / `reject ID` | Four-eyes change requests |
| `tunyx backup FILE` | Online backup |
| `tunyx restore FILE [-y]` | Restore (daemon stopped) |

## Daemon

| Command | Purpose |
|---|---|
| `tunyx serve [--detach]` | Run the daemon (gateway, control plane, dashboard) |
| `tunyx shutdown [--keep-engines]` | Stop the daemon |
| `tunyx version` | Version |
| `tunyx glossary` | Plain-language explanations of terms |
