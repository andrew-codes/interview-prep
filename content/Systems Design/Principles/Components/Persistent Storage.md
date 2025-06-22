---
aliases: [Persistent Storage]
date created: Sunday, June 22nd 2025, 12:08:13 pm
date modified: Sunday, June 22nd 2025, 12:17:35 pm
linter-yaml-title-alias: Persistent Storage
tags: []
title: Persistent Storage
---

1. [[Systems Design/Principles/Components/Persistent Storage/Databases#SQL|SQL database]]
2. [[Systems Design/Principles/Components/Persistent Storage/Databases#NoSQL|NoSQL database]]
3. Object Storage

## Comparisons

|              | SQL                               | NoSQL      | Object Storage            |
| ------------ | --------------------------------- | ---------- | ------------------------- |
| Scalability  | Vertical                          | Horizontal | Horizontal                |
| Transactions | ACID                              | Varies     |                           |
| Queries      | Complex requiring expensive joins | Flexible   | Based on metadata of blob |

## When to Use

| SQL                                      | NoSQL                                                     | Object Storage                                    |
| ---------------------------------------- | --------------------------------------------------------- | ------------------------------------------------- |
| Structured data                          | Semi-structured                                           | Unstructured or binary data (images, video, etc.) |
| Strict schema                            | Unknown or flexible schema                                | Backup/disaster recovery is critical              |
| Data is relational                       | Non-relational data                                       | Serving content directly to client such as a CDN  |
| Straight-forward pattern for scalability | There is no need for complex joins                        |                                                   |
| Transactions                             | Very large data-sets (in the TB or PB)                    |                                                   |
| Need of complex joins                    | High throughput IOPS (input/output operations per second) |                                                   |
| Queries by index are fast                |                                                           |                                                   |
