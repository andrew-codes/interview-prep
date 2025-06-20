---
aliases: [Resource Estimation]
date created: Thursday, June 19th 2025, 12:07:35 pm
date modified: Friday, June 20th 2025, 5:14:39 pm
linter-yaml-title-alias: Resource Estimation
tags: []
title: Resource Estimation
---

## Importance

These become increasingly important for infrastructure design questions; e.g. rate limiting and caching.

> [!NOTE] Napkin Estimations
> When performing "napkin estimations", focus on the answer's order of magnitude. The correct coefficient is not nearly as important as the correct exponent. See the [[Systems Design/Principles/Basics/Resource Estimation/Napkin Estimates|Napkin Estimates]] guide for more pointers.

## Metrics of Estimation

> [!NOTE] Read versus write
> Note `RPS` and `QPS` may differ between read operations and write operations.

- `RPS` (requests per second (entry point server))
- `QPS` (queries per second (database))
- `TPS` (transactions per second) is a unit of measurement for `QPS`
- Ongoing connections (web sockets)
- Throughput (capacity of a system to handle load)
- Latency
- Response time
- Storage size
- `DAU` (daily active users)
