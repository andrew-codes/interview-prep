---
aliases: [Invalidation and Eviction Strategies]
date created: Sunday, June 22nd 2025, 11:41:15 am
date modified: Sunday, June 22nd 2025, 11:52:32 am
linter-yaml-title-alias: Invalidation and Eviction Strategies
tags: []
title: Invalidation and Eviction Strategies
---

## Eviction Strategies

1. [[Systems Design/Principles/Components/Caches/Invalidation and Eviction Strategies/Least Recently Used|Least Recently Used]]
2. [[Systems Design/Principles/Components/Caches/Invalidation and Eviction Strategies/Least Frequently Used|Least Frequently Used]]
3. [[Systems Design/Principles/Components/Caches/Invalidation and Eviction Strategies/Most Recently Used|Most Recently Used]]
4. [[Systems Design/Principles/Components/Caches/Invalidation and Eviction Strategies/Random|Random]]
5. [[Systems Design/Principles/Components/Caches/Invalidation and Eviction Strategies/Time to Live|Time to Live]]

### Use Cases

| **Invalidation Strategy** | **Use Case**                                                                           | **Additional Notes** |
| ------------------------- | -------------------------------------------------------------------------------------- | -------------------- |
| LRU                       | Predictable usage patterns; expect users to frequent same data                         | Most popular         |
| LFU                       | Predictable usage patterns; some data is more regularly accessed that others           |                      |
| MRU                       | Data becomes stale quickly                                                             |                      |
| RR                        | No distillable usage patterns; data changes quickly such that caching is less valuable |                      |
| TTL                       | Time sensitive nature of data's staleness                                              |                      |

### Best Practices

1. Set an optimal size limit for cache
2. Monitor; cache hit/miss ratio
3. Tune eviction strategies

## Invalidation Strategies

1. Write requests invalidate data
2. Event-driven; based on user, domain or system actions
3. Manual control
