---
aliases: [Availability]
date created: Saturday, June 21st 2025, 1:50:57 pm
date modified: Saturday, June 21st 2025, 8:49:50 pm
linter-yaml-title-alias: Availability
tags: []
title: Availability
---

## Patterns

There are two primary patterns used for ensure high availability in systems; replication and fail-over.

### Replication

Applies to data stores. See [[Systems Design/Principles/Components/Databases/Relational Database#Replication|Database Replication]] for more information.

### Fail-over

#### Active-Active

In this configuration, all resources handle each request and spread the load between them. This requires DNS to be aware of all resource IP addresses or application logic to know about each resource.

#### Active-Passive

In this configuration, the active resource handles requests. There is a heartbeat sent between active and passive resources. If this request is interrupted, then the passive server takes over the active resource's IP address to handle requests.

> [!TIP] Hot versus Cold Resources
> The boot-up time of a cold passive resource can be mitigated by having it always running; otherwise known as a hot resource.

#### Disadvantages

1. Requires additional hardware
2. Introduces additional complexity into the system as there are more resources, dependent on one another
3. Potential data loss if the active resource fails before new data is replicated to passive resource
