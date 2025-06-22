---
aliases: [Strategies]
date created: Sunday, June 22nd 2025, 11:30:14 am
date modified: Sunday, June 22nd 2025, 11:40:40 am
linter-yaml-title-alias: Strategies
tags: []
title: Strategies
---

See each strategy:

1. [[Systems Design/Principles/Components/Caches/Strategies/Cache-Aside|Cache-Aside]]
2. [[Systems Design/Principles/Components/Caches/Strategies/Read-Write Through|Read-Write Through]]
3. [[Systems Design/Principles/Components/Caches/Strategies/Write Back|Write Back]]
4. [[Systems Design/Principles/Components/Caches/Strategies/Refresh Ahead|Refresh Ahead]]

## Trade-offs

|                               | **Cache-Aside**                          | **Read-Write-Through**                                                       | **Write-Behind**                                                     | **Refresh Ahead** |
| ----------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------- |
| **Primary Use Cases**         | Read-heavy workloads, simple integration | Read-heavy workloads with requirement for high data consistency at all times | Write-heavy workloads, reducing write latency or load on  data store |                   |
| **Consistency**               | Low                                      | Strong                                                                       | Eventual                                                             | Eventual          |
| **Write Latency**             | Higher                                   | Same or slightly increased                                                   | Lower immediate latency                                              | Steady            |
| **Risk of Data Loss**         | Low risk; race conditions do exist       | Low risk                                                                     | Higher risk                                                          | No risk           |
| **Complexity**                | Lower                                    | Moderate                                                                     | Higher                                                               | Moderate          |
| **System Load on Data Store** | Potentially higher                       | Steady                                                                       | Reduced immediate load                                               | Steady            |
