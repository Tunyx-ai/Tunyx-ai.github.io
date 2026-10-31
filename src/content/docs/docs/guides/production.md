---
title: Running in production
description: Run Tunyx as a service with systemd or Kubernetes, with backups, upgrades and alerts.
---

## Run as a service

```bash
tunyx serve                 # foreground
tunyx serve --detach        # background
tunyx shutdown              # stop the daemon and its engines
tunyx shutdown --keep-engines   # stop only the daemon; models keep serving for a quick restart
```

- **systemd:** use `deploy/tunyx.service` from the repository.
- **Kubernetes:** `deploy/kubernetes/tunyx.yaml` is a StatefulSet with GPU requests, liveness and readiness
  probes and graceful drain. Declare models with `tunyx apply`.

## Graceful drain

On SIGTERM, Tunyx reports not-ready for `TUNYX_DRAIN_SECONDS` (default 5), so load balancers stop sending
traffic. It then finishes in-flight requests for up to `TUNYX_DRAIN_TIMEOUT` (default 120 s).

## Backups

Backups run automatically every hour. On demand:

```bash
tunyx backup /backups/tunyx-$(date +%F).db
tunyx restore /backups/tunyx-2026-10-31.db   # daemon must be stopped
```

Backups hold deployments, revisions, the tuning cache and the audit log.

## Upgrades

```bash
tunyx shutdown --keep-engines
pip install --upgrade ...       # new Tunyx version
tunyx serve --detach
```

Running engines are re-attached after their identity is verified, so models keep serving through the upgrade.

## Runtime settings

```bash
tunyx config show
tunyx config set optimize_window 02:00-05:00
tunyx config unset optimize_window
```

Settings changed this way are stored by the daemon and take effect without a restart.

## Suggested alerts

```txt
# Error rate above 2% (engine and gateway-generated errors are both counted)
sum by (deployment) (rate(tunyx_requests_total{status=~"5..|upstream_error"}[5m]))
/ sum by (deployment) (rate(tunyx_requests_total[5m])) > 0.02

# p99 time to first token over 2 s
histogram_quantile(0.99, sum by (le, deployment) (rate(tunyx_time_to_first_token_seconds_bucket[5m]))) > 2

# Deployment failed or unavailable
max by (deployment) (tunyx_deployment_status{status=~"failed|degraded"}) == 1

# Engines restarting repeatedly
increase(tunyx_engine_restarts_total[10m]) > 2

# A tenant is being throttled
sum by (key) (rate(tunyx_key_requests_total{status="429"}[5m])) > 0

# Paying for idle GPUs
sum by (deployment) (rate(tunyx_cost_dollars_total[1h])) * 3600 > 0 and on(deployment)
  sum by (deployment) (rate(tunyx_tokens_total{kind="output"}[1h])) == 0

# Gateway event loop stalling (adds directly to latency)
max_over_time(tunyx_event_loop_lag_seconds[5m]) > 0.05
```

## Retention

Events, minute rollups and old revisions are kept for `TUNYX_RETENTION_DAYS` (default 14; the last 10 revisions
are always kept). The database is checkpointed and old logs are pruned automatically.
