---
aliases: [Time to Live]
date created: Sunday, June 22nd 2025, 11:42:35 am
date modified: Sunday, June 22nd 2025, 11:56:55 am
linter-yaml-title-alias: Time to Live
tags: []
title: Time to Live
---

## Reasonable Time to Live Values

These provide insights into reasonable TTL values given various scenarios. Use your own metrics if available to tune these further.

| **Use Case**          | **Value**        | **Notes**                                                           |
| --------------------- | ---------------- | ------------------------------------------------------------------- |
| User session data     | 1800s            | A single session in a system is likely to be within this time range |
| API rate limiting     | 3600s            |                                                                     |
| Cached search results | 300s - 86400s    | Can depend on write frequency of data or UX considerations          |
| Configuration data    | None or 2592000s | Rarely changing data, stored until explicitly updated or removed    |
| Weather data          | 600s             | Matching weather update frequency                                   |
