---
aliases: [Numbers You Should Know]
date created: Friday, June 20th 2025, 1:13:34 pm
date modified: Saturday, June 21st 2025, 9:32:13 pm
linter-yaml-title-alias: Numbers You Should Know
tags: []
title: Numbers You Should Know
---

## Time

```text
1 ns = 10^-9 seconds
1 us = 10^-6 seconds = 1,000 ns
1 ms = 10^-3 seconds = 1,000 us = 1,000,000 ns
1s   = 10^1 seconds  = 1,000 ms = 1,00,000 us  = 1,000,000,000 ns
1d   = 84,600s 
```

## Powers of Two

```text
Power           Exact Value         Approx Value        Bytes
---------------------------------------------------------------
7                             128
8                             256
10                           1024   1 thousand           1 KB
16                         65,536                       64 KB
20                      1,048,576   1 million            1 MB
30                  1,073,741,824   1 billion            1 GB
32                  4,294,967,296                        4 GB
40              1,099,511,627,776   1 trillion           1 TB
```

## Availability

### 99.9%

| Duration           | Acceptable downtime |
|--------------------|---------------------|
| Downtime per year  | 8h 45min 57s        |
| Downtime per month | 43m 49.7s           |
| Downtime per week  | 10m 4.8s            |
| Downtime per day   | 1m 26.4s            |

### 99.99%

| Duration           | Acceptable downtime |
|--------------------|---------------------|
| Downtime per year  | 52min 35.7s         |
| Downtime per month | 4m 23s              |
| Downtime per week  | 1m 5s               |
| Downtime per day   | 8.6s                |

## Latency

> [!TODO] Add common latency measurements

## QPS

| Size      | QPS             | Scenarios                                                                                                                                                                                                                         |
| --------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Low       | 1-100           | - Simple unified backends; express/django<br>- Relational database; PostgreSQL/MySQL<br>- Single server instance                                                                                                                  |
| Medium    | 100-1,000       | - Horizontal and decoupling important<br>- Modular; microservices<br>- Sharding, replication, caching<br>- Orchestration software, such as K8s                                                                                    |
| High      | 1,000 - 100,000 | - Microservices, message queues, redundancy, and distributed systems<br>- Event-driven architecture; message queues<br>- Distributed data stores<br>- Heavy caching on data stores<br>- Orchestration and load balancers utilized |
| Very High | 100,000+        | - Globally replicated databases<br>- Runs in multi-regional data centers<br>- Serverless to scale on demand<br>- Multiple cloud providers for redundancy                                                                          |
