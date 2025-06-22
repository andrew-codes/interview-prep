---
aliases: [Key-Value Store Database]
date created: Saturday, June 21st 2025, 3:20:57 pm
date modified: Saturday, June 21st 2025, 6:21:56 pm
linter-yaml-title-alias: Key-Value Store Database
tags: []
title: Key-Value Store Database
---

Data store where keys are stored in lexicographical order and provide $\text{O}(1)$ reads and writes; often backed by memory or SSD drives. With a limited set of operations, it pushes complexity into an application if more advanced operations are required. Given this, it is often used as an in-memory caching layer.

## Disadvantages

- Reads for tabular layouts is complex and expensive; requires joining on each row to get each attribute
- No enforcement of consistent attribute names
