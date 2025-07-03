---
aliases: [Refresh Ahead]
date created: Sunday, June 22nd 2025, 11:22:06 am
date modified: Sunday, June 22nd 2025, 11:23:36 am
linter-yaml-title-alias: Refresh Ahead
tags: []
title: Refresh Ahead
---

Cache is configured to pro-actively refresh data prior to its expiration. In essence, it is using some heuristics to guess what data is most likely to be accessed.

```d2
Application {
	shape: cloud
}

Database {
	shape: cylinder
}

Cache {
	shape: hexagon
}

Application <-> Cache
Cache <- Database
```

## Disadvantages

- Guessing incorrectly can reduce performance compared to without
