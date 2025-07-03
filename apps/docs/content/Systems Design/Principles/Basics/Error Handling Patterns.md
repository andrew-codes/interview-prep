---
aliases: [Error Handling Patterns]
date created: Sunday, June 22nd 2025, 10:32:34 am
date modified: Sunday, June 22nd 2025, 10:44:03 am
linter-yaml-title-alias: Error Handling Patterns
tags: []
title: Error Handling Patterns
---

## Retries

When communication to a service or processing of a message from a [[Systems Design/Principles/Components/Queues|queue]], the consumer service re-attempts the request and tries again. This is typically paired with a finite number of retries, an exponential backoff, and jitter.

> [!NOTE] Avoiding the thundering herd problem
> If a retried message continues to fail, then you can encounter "storm" such that you overload the queue and related processors with messages that cannot be processed. Mitigate this via a retry backoff. Each retry adds some additional delay (compounded via exponential backoff) and jitter. Jitter adds a degree of randomness to the backoff delay to avoid processing spikes.

### Where to Use Retries

1. [[Systems Design/Principles/Components/Queues#Consumer Failures|Message processing in queues]]
2. Transient network failures
3. Rate limits on requested API (typically external)
4. Transient overload of requested resource

## Timeouts

Prevents indefinite hangs when a request is unable to be completed and the requested service never returns a response.

## Fallbacks

Provide some, non-ideal response or experience when an error occurs so that the system can continue to operate. Typical examples include:

- Cached responses from previous or frequently accessed requests
- Default response (Null object pattern applied to systems design)
- Mocked responses use placeholder data
- Graceful degradation removes some functionality of the system that are problematic, but allow the core functionality to remain

## Circuit Break

Refuse to send requests to service that has produced some threshold of errors in a given timeframe. This helps prevent the error from cascading through the system; which could lead to data corruption or an invalid system state.
