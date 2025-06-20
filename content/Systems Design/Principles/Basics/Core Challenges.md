---
aliases: [Core Challenges]
date created: Thursday, June 19th 2025, 11:21:11 am
date modified: Friday, June 20th 2025, 5:08:52 pm
linter-yaml-title-alias: Core Challenges
tags: []
title: Core Challenges
---

Common challenges in a distributed system.

## Too Many Concurrent Users

This can be solved by segmenting users across many servers and/or databases. For distributing across many services, this can be achieved with a load balancer implementation. For doing the same across many databases, it is often referred to as replicating.

## Too Much Data to Move Around

Solution is to segment users across [partitions](Systems Design/Principles/Basics/Scaling%20Systems#Partitioning.md). For example, database 1 contains users 1 - n and database 2 contains users (n+1) - k.

## Fast and Responsive System

Solution is to process write requests from a message queue. This allows the writes to happen async in the background and gives the front end time to mask the time it takes to actually happen. For example, if it takes on average 2 seconds to process a write request, then the UI could show a view before taking the user to read the contents of the write request. This interaction takes longer than the time to process and so the delay is not easily perceivable.

## Stale and Inconsistent Data

Introduced by creating a fast and responsive system at scale. Depends on domain and business toleration for inconsistent data. Eventually, the system will catch up and data will become consistent. However, some systems tolerate this better than others; e.g. web searching versus banking applications.
