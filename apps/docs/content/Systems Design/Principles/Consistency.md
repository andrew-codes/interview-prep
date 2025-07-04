---
aliases: [Consistency]
date created: Saturday, June 21st 2025, 2:44:25 pm
date modified: Saturday, June 21st 2025, 2:51:53 pm
linter-yaml-title-alias: Consistency
tags: []
title: Consistency
---

The challenges is when there are multiple copies of the same data in the system. All reads must produce the same, latest value; meaning that these various copies must stay in sync.

## Patterns

### Weak

After a write, a read may or may not see this write and a best effort approach is made. A good example of this is VoIP. When a call is partially dropped, the receiver does not hear what was said during the drop out.

### Eventual

After a write, reads will eventually see it. Writes generally propagate in the background. This works well in systems that require high availability.

### Strong

After a write, a read will see it (immediately). Think things such as updates in an RDBMS. This is ideal for systems that require transactional operations.
