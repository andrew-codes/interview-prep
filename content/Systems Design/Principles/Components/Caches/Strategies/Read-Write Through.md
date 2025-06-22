---
aliases: [Read-Write Through]
date created: Sunday, June 22nd 2025, 11:22:06 am
date modified: Sunday, June 22nd 2025, 11:27:40 am
linter-yaml-title-alias: Read-Write Through
tags: []
title: Read-Write Through
---

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

## When to Use

- Simplify application logic by offloading data retrieval
- Strong data consistency required between cache and data store
- Any scenario benefiting from a consistent way to access cache

## Use Cases

- Financial transactions
	- Ledger of transactions must be the same between all parts of the system to prevent misappropriating money
- Inventory management
	- Inventory counts must be accurate to prevent over selling to customers

## Disadvantages

- New nodes will only cache entities when updated
- Invalidation may be challenging as written data may rarely be accessed/evicted; mitigate by setting a TTL value
- Write-heavy workloads that vastly outpace reads; no reason to store all writes to cache given low read usage
- Poorer write performance
