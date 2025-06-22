---
aliases: [Invalidation Strategies]
date created: Saturday, June 21st 2025, 7:34:53 pm
date modified: Saturday, June 21st 2025, 7:35:03 pm
linter-yaml-title-alias: Invalidation Strategies
tags: []
title: Invalidation Strategies
---

## Invalidation Strategies

### Cache-Aside

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

#### Disadvantages

- Cache misses require 3 trips which increases latency
- Possibly stale data when data is updated in database (mitigate by setting a TTL value)
- New nodes (or when replacing a failed one) start with an empty cache

### Write Through

Data is written to cache by the application which is then written to the database. Data is written from cache to database synchronously; meaning no data is returned by the application until the write is completed.

While data is slow to write, it is very fast to read and not stale.

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

Application -> Cache: 1. writes
Cache -> Database: 2. persist to storage
Cache -> Application : 3. returns value
```

#### Disadvantages

- New nodes will only cache entities when updated
- Invalidation may be challenging as written data may rarely be accessed/evicted; mitigate by setting a TTL value

### Write Back

Similar to [[Systems Design/Principles/Components/Caches#Write Through|write through]] caching, but writes to the database are asynchronous which improves write performance.

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

Queue {
	shape: queue
}

Processor {
  shape: parallelogram
}


Application -> Cache: 1. reads/writes
Cache -> Queue: 2. add to event queue
Cache -> Application: 3. returns value
Queue -> Processor
Processor -> Database: 4. persist to storage
```

#### Disadvantages

- Potential data loss if cache goes down prior to its contents being written to the data store
- More complicated to implement than cache aside or write through implementations

### Refresh Ahead

Cache is configured to pro-actively refresh data prior to its expiration. In essence, it is using some heuristics to guess what data is most likely to be accessed.

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
Cache <- Database
```

#### Disadvantages

- Guessing incorrectly can reduce performance compared to without
