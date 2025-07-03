---
aliases: [Queues]
date created: Saturday, June 21st 2025, 7:42:41 pm
date modified: Sunday, June 22nd 2025, 10:33:32 am
linter-yaml-title-alias: Queues
tags: []
title: Queues
---

Queues enable asynchronous processing of events that occur in a system.

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

- RabbitMQ
- Kafka
- Mosquitto (MQTT)
- Amazon Kinesis
- Google Cloud Pub/Sub
- Azure Service Bus

### Task Queues

Specialized queue that can receive tasks and related data, runs them, then delivers their results. Can be scheduled and typically run computationally intensive jobs.

### Dead Letter Queues

Also know as DLQ, this queue stores messages that could not be processed or delivered by a primary message queue. Useful scenarios include:

- Error handling
- Monitoring and debugging
- Isolate problematic messages that otherwise impact the performance of the primary queue
- Retry once root issue impacting message is resolved

## Protocol Types

|                         | AMQP/JMS-style                                                               | Log-based                                                                   |
| ----------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Storage                 | In-memory/transient                                                          | Persistent/on disk                                                          |
| Durability              | Optional                                                                     | Strong durability guarantees                                                |
| Ordering                | Unordered or per-queue ordering                                              | Partition-based (topics), ordered                                           |
| Use When                | Messages are expensive to process, order not important                       | Messages are fast to process, ordering is important                         |
| Examples Scenarios      | Encoding media, handling large files, fetch data from ticketing event system | Analytics, event sourcing, financial/payment processing, IOT sensor streams |
| Example Implementations | RabbitMQ                                                                     | Kafka, Mosquitto (MQTT), Kinesis, Google Cloud Pub/Sub                      |

## Back Pressure

Queue size can sometimes grow beyond the size of the resource's memory constraints. When this occurs, there is performance degradation due to excessive cache misses and disk access. Back pressure addresses this issue by limiting the size of the queue. Clients receive an server busy/503 HTTP status in cases that a message cannot be enqueued; allowing them to try again later (exponential backoff).

## Consumer Failures

Consumers can fail to process a message, in which case there several actions that could be chosen to handle these scenarios:

1. [[Systems Design/Principles/Basics/Error Handling Patterns#Retries|Retries]]
2. [[Systems Design/Principles/Components/Queues#Dead Letter Queues|DLQ]]
3. Discard message

## Disadvantages

- Introduces additional system complexity and hardware resources
- May not be suitable for computational cheap activities that are better suited for synchronous requests
- Can cause additional latency for tasks that do not require asynchronism
