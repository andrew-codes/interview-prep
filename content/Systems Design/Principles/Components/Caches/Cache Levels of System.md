---
aliases: [Cache Levels of System]
date created: Saturday, June 21st 2025, 7:34:53 pm
date modified: Saturday, June 21st 2025, 7:35:00 pm
linter-yaml-title-alias: Cache Levels of System
tags: []
title: Cache Levels of System
---

## Cache Levels of System

### Database Caching

Useful to maintain an even distribution of reads and writes across database partitions; which generally improves overall system performance. This is very helpful in spikes of traffic to specific data or regions that would otherwise cause an imbalance.

### Web Server

Some reverse proxies can act as a cache.

### Application

Cache invalidation (such as least recently used LRU) is critical as application caches such as Redis or Memcached operate entirely within memory. While memory is significantly faster to access, there is also significantly less of it compared to disk space. Both Redis and Memcached are [[Systems Design/Principles/Components/Databases/Key-Value Store Database|key-value store databases]]. Some, such as Redis, offer persistence to disk and other features; such as native handling of sorted lists.

#### Query Caching

Key is a hash of the query with the result as the value; however this is difficult to invalidate with complex queries. For example, changing a attribute in for a row in a RDBMS requires invalidating any cached query that used this attribute.

#### Object Caching

Caches instances of classes or other serialized data sets with the object's unique identifier as the key. This can be helpful for sharing data between asynchronous processes. Examples include:

- User sessions
- Rendered HTML pages
- Activity streams
