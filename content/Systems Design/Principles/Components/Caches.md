---
aliases: [Caches]
date created: Saturday, June 21st 2025, 6:49:37 pm
date modified: Sunday, June 22nd 2025, 11:43:47 am
linter-yaml-title-alias: Caches
tags: []
title: Caches
---

1. [[Systems Design/Principles/Components/Caches/Cache Levels of System|Cache Levels of System]]
2. [[Systems Design/Principles/Components/Caches/Strategies|Caching Strategies]]
3. [[Systems Design/Principles/Components/Caches/Invalidation and Eviction Strategies|Invalidation Strategies]]

## Implementation Comparison

Most commonly used are:

- Redis
- Memcached

| Feature               | Redis                                                                     | Memcached                                |
| --------------------- | ------------------------------------------------------------------------- | ---------------------------------------- |
| Age                   | More recent                                                               | Older                                    |
| Data Structures       | Strings, lists, sets, sorted sets, hashes, bitmaps                        | Key-value pairs (strings or binary data) |
| Persistence           | Optional                                                                  | In-memory only                           |
| Atomic Operations     | Yes (e.g., increments, list manipulations)                                | No                                       |
| Pub/Sub               | Yes                                                                       | No                                       |
| High Availability     | Yes (but with additional services/resources)                              | Yes (but with 3rd party solutions only)  |
| Complexity            | HIgher complexity (intrinsic to having more features and data structures) | Simpler                                  |
| Cache Eviction Policy | Configurable (e.g., LRU, LFU i.e., least frequently used, etc.)           | Least Recently Used (LRU)                |
| Use Cases             | Real-time needs, application caching                                      | Simple caching, session storage          |
| Companies Using       | GitHub, Stack Overflow                                                    | Facebook, YouTube, Reddit                |

## Disadvantages

- Requires maintaining consistency of data between caches and sources of truth (cache invalidation)
- Cache invalidation is a notoriously difficult problem and can require significant investment to get right for a specific system and its constraints
- Requires application changes to access cache
