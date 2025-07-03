---
aliases: [Cache-Aside]
date created: Sunday, June 22nd 2025, 11:22:06 am
date modified: Sunday, June 22nd 2025, 11:23:18 am
linter-yaml-title-alias: Cache-Aside
tags: []
title: Cache-Aside
---

Also known as lazy-loading. Cache does not interact with data storage directly. Instead, the application checks the cache and, in the case of miss, access the data storage and writes the value to cache prior to returning the value.

Benefits include a smaller cache size because only accessed values are written to cache.

```d2
Application {
	shape: cloud
}

Database {
	shape: cylinder
}

Cache {
	shape: hexagon
}

Application <-> Cache
Application <-> Database
```

## When to Use

- Read-heavy workloads with infrequent writes

## Disadvantages

- Cache misses require 3 trips which increases latency
- Possibly stale data when data is updated in database (mitigate by setting a TTL value)
- New nodes (or when replacing a failed one) start with an empty cache
- Race conditions between multiple services writes can produce inconsistency and errors in a system
