---
aliases: [Relational Database]
date created: Saturday, June 21st 2025, 3:20:33 pm
date modified: Saturday, June 21st 2025, 3:53:28 pm
linter-yaml-title-alias: Relational Database
tags: []
title: Relational Database
---

## Replication

### Master-Slave

Occurs when writes happen to a master database and this database is replicated to additional replicas (databases) that only handle read operations. If the master goes down, then the system can continue to operate in read-only mode.

#### Disadvantages

- Additional logic required to promote a new master
- Heavy writes can cause slow downs for replicas and therefore decreasing their throughput
- As replicas scale, more data is required to be replicated for increased latency
- Some databases allow for multi-threaded writes while replicas may be single threaded writes

### Master-Master

All masters perform reads and writes, but they require coordination on writes. If all but one master node goes down, then system can continue to operate.

#### Disadvantages

- Requires a load balancer or application logic to exist in front of master databases to determine where to write data
- Requires decision in trade-off between increased latency due to synchronization or potentially violating ACID
- As scale increases, so does the risk and impact of conflict resolution for data

### Common Disadvantages

- Data loss when master fails prior to data replicating
- Requires additional hardware and complexity

## Federation

Partitions a database by function or domain. This promotes smaller databases and therefore have reduced replication lag. Additionally, more data can fit into memory per resource which increases the changes of a cache hit when querying. Finally, there is no coordination required across domains, so writes can happen in parallel (across domains).

### Disadvantages

- Not effective when relying on large schemas or functions
- Application logic is required to know in which database to write
- Cross database joins are more difficult to achieve
- Additional hardware and complexity

## Sharding

Distributes a single domain across multiple databases, such that a single database only handles a subset/partition of the domain.

> [!NOTE] Sharding beyond domain
> Partitioning can also be used to scale systems beyond this specific example See [[Systems Design/Principles/Basics/Scaling Systems#Partitioning|Scaling Systems]] for more details.

```d2
Application {
	shape: cloud
}

Application -> Load balancer: writes User Andrew

User1: User A-F {
	shape: cylinder
}
User2: User G-S {
	shape: cylinder
}
User3: User T-Z {
	shape: cylinder
}

Load balancer -> User1
Load balancer -> User2
Load balancer -> User3
```

### Disadvantages

- Application logic changes required that may result is increasingly complex SQL queries
- Distribution of data can become lopsided over time and rebalancing adds additional complexity
- Joining data across shards is complex
- Adds more hardware and overall system complexity

## Denormalization

This improves read performance at expense of write performance. However, this can be increasingly helpful in systems that are sharded or federated as it reduces the need to query across datasets. It also means few expensive joins which can increase latency due to expensive disk operations. Many systems' reads far outnumber their writes, so this is a somewhat common pattern to employ.

### Disadvantages

- Duplicated data
- Writes require updating multiple tables in order to keep copies of data the same
- Can perform worse than a normalized variant under heavy write loads
