---
aliases: [Resource Estimation]
date created: Thursday, June 19th 2025, 12:07:35 pm
date modified: Saturday, June 21st 2025, 3:02:32 pm
linter-yaml-title-alias: Resource Estimation
tags: []
title: Resource Estimation
---

## Importance

These become increasingly important for infrastructure design questions; e.g. rate limiting and caching.

> [!NOTE] Napkin Estimations
> When performing "napkin estimations", focus on the answer's order of magnitude. The correct coefficient is not nearly as important as the correct exponent. See the [[Systems Design/Principles/Basics/Resource Estimation/Napkin Estimates|Napkin Estimates]] guide for more pointers.

## What to Measure

> [!NOTE] Read versus write
> Note `RPS` and `QPS` may differ between read operations and write operations.

- `DAU` (daily active users)
- `RPS` (requests per second (entry point server))
- `QPS` (queries per second (database))
- `TPS` (transactions per second) is a unit of measurement for `QPS`
- Ongoing connections (web sockets)
- Throughput (capacity of a system to handle load)
- Latency
- Response time
- Storage size
