---
aliases: [Caches]
date created: Saturday, June 21st 2025, 6:49:37 pm
date modified: Saturday, June 21st 2025, 7:38:40 pm
linter-yaml-title-alias: Caches
tags: []
title: Caches
---

1. [[Systems Design/Principles/Components/Caches/Cache Levels of System|Cache Levels of System]]
2. [[Systems Design/Principles/Components/Caches/Invalidation Strategies|Invalidation Strategies]]

## Disadvantages

- Requires maintaining consistency of data between caches and sources of truth (cache invalidation)
- Cache invalidation is a notoriously difficult problem and can require significant investment to get right for a specific system and its constraints
- Requires application changes to access cache
