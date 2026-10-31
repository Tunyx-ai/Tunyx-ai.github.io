---
title: Troubleshooting
description: Common problems and how to fix them.
---

Start with `tunyx doctor`. Every error Tunyx prints also includes a suggested fix.

| Problem | Try |
|---|---|
| "No engine installed" | `pip install vllm` (NVIDIA), or set `TUNYX_VLLM_PYTHON` if it lives in another environment |
| Model doesn't fit | `tunyx plan MODEL` shows why. Use a smaller or quantized model, a lower `--ctx`, or more GPUs |
| Gated model download fails | Accept the license on the model's Hugging Face page and set `HF_TOKEN` |
| Endpoint returns 503 "loading" | The model is starting or waking. Retrying clients will succeed; watch `tunyx logs NAME --events` |
| 429 "saturated" | You're at validated capacity. Add GPUs, use a smaller model, or raise `TUNYX_MAX_QUEUE` |
| 404 "model not found" | Use the deployment name (`tunyx ps`), or add an alias with `TUNYX_MODEL_ALIASES` |
| "Prompt too long" | Redeploy with a larger `--ctx` if memory allows; `tunyx plan` shows the maximum |
| Quality gate rejected a config | Working as intended. `tunyx status NAME` shows which check failed |
| Optimization never improves a busy model | Set an optimize window: `tunyx config set optimize_window 02:00-05:00` |
| Dashboard asks for a key | Use any viewer, inference or admin key from your configuration |
| Engine crashes on start | `tunyx logs NAME` for engine output; `tunyx up ... --engine-arg=...` to pass flags |

## Getting help

During the private beta, email [varunkavin5@gmail.com](mailto:varunkavin5@gmail.com) with the output of `tunyx doctor` and
`tunyx logs NAME --events`.
