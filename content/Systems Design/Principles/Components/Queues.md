---
aliases: [Queues]
date created: Saturday, June 21st 2025, 7:42:41 pm
date modified: Saturday, June 21st 2025, 9:46:24 pm
linter-yaml-title-alias: Queues
tags: []
title: Queues
---

## Little's Law

Allows predicability of response times. Allows queues to be placed in front of processes to gather insights into the process itself.

$$
L = \lambda \times W
$$

Where:

- L = Average number of items in the system
- $\lambda$ = Average arrival rate (items per unit of time)
- W = Average time an item spends in the system

## Queue Types

### Message Queues

Useful when processing data is too long to be done inline (in scope of the request's response). This could be caused by unacceptable latency or because the request occurs on a periodic interval.

A message queue can receive, hold, and deliver messages. Here a message represents an action or request along with relevant data and metadata. Message queues may or may not be persistent; meaning a non persistent implementation will lose all messages once the queue process restarts.

Examples include:

- RabbitMQ; requires adapting to the Advanced Message Queuing Protocol (AMQP) and node management
- Mosquitto (MQTT)
- NServiceBus

### Task Queues

Specialized queue that can receive tasks and related data, runs them, then delivers their results. Can be scheduled and typically run computationally intensive jobs.

## Protocol Types

|            | AMQP/JMS-style                                                               | Log-based                                                                   |
| ---------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Storage    | In-memory/transient                                                          | Persistent/on disk                                                          |
| Durability | Optional                                                                     | Strong durability guarantees                                                |
| Ordering   | Unordered or per-queue ordering                                              | Partition-based                                                             |
| Use When   | Messages are expensive to process, order not important                       | Messages are fast to process, ordering is important                         |
| Examples   | Encoding media, handling large files, fetch data from ticketing event system | Analytics, event sourcing, financial/payment processing, IOT sensor streams |

## Back Pressure

Queue size can sometimes grow beyond the size of the resource's memory constraints. When this occurs, there is performance degradation due to excessive cache misses and disk access. Back pressure addresses this issue by limiting the size of the queue. Clients receive an server busy/503 HTTP status in cases that a message cannot be enqueued; allowing them to try again later (exponential backoff).

## Disadvantages

- Introduces additional system complexity and hardware resources
- May not be suitable for computational cheap activities that are better suited for synchronous requests
- Can cause additional latency for tasks that do not require asynchronism
