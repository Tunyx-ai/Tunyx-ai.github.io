---
title: Choosing models
description: Short names, Hugging Face repos, GGUF files, local checkpoints and LoRA adapters.
---

`tunyx up` accepts:

| Form | Example |
|---|---|
| Short name | `qwen2.5:7b`, `llama3.1:8b`, `qwen2.5-coder:7b` (list them with `tunyx models`) |
| Hugging Face repo | `meta-llama/Llama-3.1-8B-Instruct` |
| GGUF repo | `bartowski/Qwen2.5-7B-Instruct-GGUF` (the best quantization that fits is chosen) |
| Local directory | `./my-finetune` |
| Local GGUF file | `/models/model.gguf` |

## Check before you download

```bash
tunyx plan meta-llama/Llama-3.1-70B-Instruct --profile batch
```

`plan` reads only the model's configuration and shows whether it fits, which engine and precision Tunyx would
use, the context length, and why.

## Download without deploying

```bash
tunyx pull qwen2.5-coder:7b
```

## Pin a version

```bash
tunyx up meta-llama/Llama-3.1-8B-Instruct --revision 0e9e39f
```

## Fine-tunes and adapters

```bash
tunyx up ./my-finetune --name support                                      # full checkpoint
tunyx up Qwen/Qwen2.5-7B-Instruct --lora support-v2=/adapters/support-v2   # LoRA adapter
```

Request an adapter by its name (`model="support-v2"`). Pass engine flags such as `--engine-arg=--max-loras=4`
when serving several adapters.

## Gated models

Accept the model's license on Hugging Face and set `HF_TOKEN`.

## Apple Silicon

With MLX installed, Tunyx prefers MLX models over GGUF on Macs.
