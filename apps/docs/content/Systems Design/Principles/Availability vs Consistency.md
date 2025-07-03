---
aliases: [Availability vs Consistency]
date created: Saturday, June 21st 2025, 2:25:00 pm
date modified: Saturday, June 21st 2025, 2:44:56 pm
linter-yaml-title-alias: Availability vs Consistency
tags: []
title: Availability vs Consistency
---

## CAP Theorem

You can only guarantee 2 of the 3 following items:

1. [[Systems Design/Principles/Consistency|Consistency]] - every read receives the latest write or produces an error
2. [[Systems Design/Principles/Availability|Availability]] - every request receives a response; with no guarantee of freshness of response
3. Partition tolerance - system continues to operate despite hardware, network failures (arbitrary partitions)

Network and hardware failures will occur and are not within our control. For this reason, systems will generally always support partition tolerance; leaving us with a choice of one of the other two.

### CP

This is good for systems that require or heavily rely on atomic reads and writes.

### AP

Writes will take longer to propagate through the system, but every request will yield a response; though the response may or may not be the latest value. This is a good choice if a system can support eventual consistency of its data and needs to function despite external errors.
