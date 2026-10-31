---
title: Configuration
description: Every environment variable and runtime setting, with defaults.
---

Everything has a default. Settings marked **runtime** can also be changed on a running daemon with
`tunyx config set KEY VALUE` (persisted, no restart; `tunyx config show` lists values and their source).

## Network, auth and tenancy

| Variable | Default | Meaning |
|---|---|---|
| `TUNYX_HOME` | `~/.tunyx` | state DB, logs |
| `TUNYX_HOST` / `TUNYX_PORT` | `127.0.0.1` / `8800` | bind address (non-localhost auto-generates an API key) |
| `TUNYX_API_KEYS` | – | inference keys; `team-a:sk-...` entries name the key for usage attribution. Clients send `Authorization: Bearer` or `x-api-key` (never in URLs) |
| `TUNYX_ADMIN_KEYS` | – | keys allowed to change deployments (if unset, API keys are admin keys) |
| `TUNYX_VIEWER_KEYS` | – | read-only keys (dashboard, `/metrics`, GET `/api`) |
| `TUNYX_KEY_SCOPES` | – | deployments each named key may use, e.g. `team-a=chat,coder;team-b=*` |
| `TUNYX_KEY_LIMITS` | – | per-team limits, e.g. `team-a:rpm=60,tpm=200000,concurrency=8;*:rpm=600` (429 + `Retry-After`) |
| `TUNYX_REQUIRE_APPROVAL` | `0` | four-eyes: changes become requests a different admin approves (`tunyx changes`) |
| `TUNYX_TLS_CERT` / `TUNYX_TLS_KEY` / `TUNYX_TLS_CLIENT_CA` | – | HTTPS, and mutual TLS with a client CA |
| `TUNYX_CORS_ORIGINS` | – | browser origins allowed to call the API |

## Model names

| Variable | Default | Meaning |
|---|---|---|
| `TUNYX_MODEL_ALIASES` | – | extra names for deployments, e.g. `gpt-4o=chat,claude-sonnet=chat` (listed in `/v1/models`) |
| `TUNYX_STRICT_MODELS` | on with key scopes, else off | unknown model names are 404. Off: with exactly one deployment, any name routes to it (tools that hard-code `gpt-4o` work) |

## Policy

| Variable | Default | Meaning |
|---|---|---|
| `TUNYX_ALLOWED_MODELS` | – | comma-separated patterns (`Qwen/*,meta-llama/*`) a deployment's model must match |
| `TUNYX_MODEL_ROOTS` | – | colon-separated directories local model paths must live under |
| `TUNYX_DENY_REMOTE_CODE` | `0` | refuse `--trust-remote-code` |
| `TUNYX_DENY_PICKLE` / `TUNYX_REQUIRE_PINNED_REVISION` | `0` | refuse `.bin` pickle weights / require HF commit pins |
| `TUNYX_MAX_MEMORY_FRACTION` | `1` | max GPU share any one deployment may take |
| `TUNYX_MAX_TOKENS` | – | cap on `max_tokens` per request |

## Gateway behaviour

| Variable | Default | Meaning |
|---|---|---|
| `TUNYX_MAX_BODY_MB` | `32` | request body limit (413 above it) |
| `TUNYX_MAX_QUEUE` | `1024` | requests allowed to wait per deployment (in-flight limit is derived from engine capacity) |
| `TUNYX_QUEUE_TIMEOUT` | `60` | seconds a request may wait for admission (or for a busy GPU when waking a model) |
| `TUNYX_CRASH_HOLD` | `30` | seconds a request waits for a crashed replica to come back before a 503 |
| `TUNYX_REQUEST_TIMEOUT` | `600` | total deadline for one request, streams included |
| `TUNYX_COLD_START_TIMEOUT` | `900` | seconds allowed for model load / wake |
| `TUNYX_ACCESS_LOG` | `0` | one JSON line per request on the `tunyx.access` logger |
| `TUNYX_DRAIN_SECONDS` / `TUNYX_DRAIN_TIMEOUT` | `5` / `120` | on SIGTERM: not-ready for N s, then finish in-flight requests for up to M s |

## Optimization and economics

| Setting | Default | Meaning |
|---|---|---|
| `optimize_window` (`TUNYX_OPTIMIZE_WINDOW`) **runtime** | – | local time window, e.g. `02:00-05:00`, in which background optimization may briefly take a busy single-GPU deployment offline (requests are queued). Outside it, a search that needs the whole GPU waits for 10 idle minutes |
| `gpu_hourly_cost` (`TUNYX_GPU_HOURLY_COST`) **runtime** | list-price estimate for known GPUs | $/GPU-hour for cost per million tokens |
| `power_cost_kwh` (`TUNYX_POWER_COST_KWH`) **runtime** | – | alternative cost basis: electricity price x board power |
| `reference_price_per_mtok` (`TUNYX_REFERENCE_PRICE`) **runtime** | – | what you'd pay an API per million tokens (blended); economics then shows how much cheaper or dearer self-hosting is |

## Operations

| Variable | Default | Meaning |
|---|---|---|
| `TUNYX_RETENTION_DAYS` | `14` | events, minute rollups, resolved proposals and old revisions (the last 10 revisions are always kept) |
| `TUNYX_AUDIT_LOG` / `TUNYX_AUDIT_RETENTION_DAYS` | – / `365` | JSONL audit stream for a SIEM; retention of the hash-chained audit table |
| `TUNYX_PRUNE_INTERVAL` / `TUNYX_BACKUP_INTERVAL` | `3600` / `3600` | seconds between pruning (incl. WAL checkpoint and log cleanup) / automatic backups |
| `TUNYX_KEEP_ENGINES` | `0` | on plain SIGTERM, leave engines running for the next daemon to re-adopt. An explicit `tunyx shutdown` always decides for itself (`--keep-engines`) |
| `TUNYX_GPU_MEMORY_GB` | – | override detected per-GPU memory (exotic environments) |
| `TUNYX_VLLM_PYTHON` / `TUNYX_SGLANG_PYTHON` / `TUNYX_MLX_PYTHON` / `TUNYX_LLAMACPP_SERVER` | – | engines installed in their own environments |
| `TUNYX_MAX_PASSES` | – | cap on optimization techniques tried per run (bounds optimization time; `0` = base configs only) |
| `TUNYX_QUANT_PYTHON` | `quant-env` next to the vLLM environment, if present | Python with llm-compressor, used to build calibrated quantized variants |
| `TUNYX_BENCHMARKS_DIR` | – | directory of `*.jsonl` eval sets usable as benchmarks by file name |
| `TUNYX_ALLOW_CODE_EVAL` | `0` | allow code benchmarks (HumanEval, MBPP), which run model-written code in a limited subprocess |
| `HF_TOKEN` | – | gated/private Hugging Face models |

## Profiles

Profiles can be customised per deployment through the API with `profile_overrides`, for example
`{"slo": {"p99_ttft_ms": 800}}`.

## Demo / development only

| Variable | Meaning |
|---|---|
| `TUNYX_ALLOW_MOCK=1` | enable the simulated engine |
| `TUNYX_SIMULATE_GPU=H100:80:1` | pretend to have GPUs (name:GiB:count); only with `TUNYX_ALLOW_MOCK=1` (`tunyx demo` sets both) |
