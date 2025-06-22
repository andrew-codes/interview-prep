---
aliases: [Write Back]
date created: Sunday, June 22nd 2025, 11:22:06 am
date modified: Sunday, June 22nd 2025, 11:29:45 am
linter-yaml-title-alias: Write Back
tags: []
title: Write Back
---

Similar to [[Systems Design/Principles/Components/Caches/Strategies/Read-Write Through|write through]] caching, but writes to the database are asynchronous which improves write performance.

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

## When to Use

- Write performance is valued over consistency
- Data loss is more tolerated

## Disadvantages

- Potential data loss if cache goes down prior to its contents being written to the data store
- More complicated to implement than cache aside or write through implementations
