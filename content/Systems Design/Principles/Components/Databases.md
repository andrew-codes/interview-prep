---
aliases: [Databases]
date created: Saturday, June 21st 2025, 3:09:17 pm
date modified: Saturday, June 21st 2025, 6:49:16 pm
linter-yaml-title-alias: Databases
tags: []
title: Databases
---

## SQL

- [[Systems Design/Principles/Components/Databases/Relational Database|Relational Database]]

## NoSQL

- [[Systems Design/Principles/Components/Databases/Key-Value Store Database|Key-Value Store Database]]
- [[Systems Design/Principles/Components/Databases/Document Database|Document Database]]
- [[Systems Design/Principles/Components/Databases/Wide Column Store Database|Wide Column Store Database]]
- [[Systems Design/Principles/Components/Databases/Graph Database|Graph Database]]

## When to Use

| Reasons to Use SQL                       | Reasons to use NoSQL                                      |
| ---------------------------------------- | --------------------------------------------------------- |
| Structured data                          | Semi-structured                                           |
| Strict schema                            | Unknown or flexible schema                                |
| Data is relational                       | Non-relational data                                       |
| Straight-forward pattern for scalability | There is no need for complex joins                        |
| Transactions                             | Very large data-sets (in the TB or PB)                    |
| Need of complex joins                    | High throughput IOPS (input/output operations per second) |
| Queries by index are fast                |                                                           |

### Example Use Cases for NoSQL

- Frequently accessed data
- Temporary data, e.g., online shopping carts
- High volume of data ingestion such as log data
- Data sets used to look up other datasets (metadata/lookup datasets)
