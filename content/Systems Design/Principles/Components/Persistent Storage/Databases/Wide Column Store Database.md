---
aliases: [Wide Column Store Database]
date created: Saturday, June 21st 2025, 6:05:32 pm
date modified: Saturday, June 21st 2025, 6:37:34 pm
linter-yaml-title-alias: Wide Column Store Database
tags: []
title: Wide Column Store Database
---

Stores data as columns which consists of a name/value pair. Columns can be grouped into column families in a nested fashion. You are able to access any given column given a row key as well as all columns that share a row key. Values are timestamped which is used to handle conflict resolution. Additionally, most store row keys in lexicographic order; allowing for efficient look ups of row keys and their columns.

These are often used for large volume datasets and offer high availability and scalability. Some examples include:

- Google Bigtable
- Cassandra
