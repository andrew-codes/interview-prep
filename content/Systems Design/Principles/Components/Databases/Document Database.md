---
aliases: [Document Database]
date created: Saturday, June 21st 2025, 6:05:04 pm
date modified: Saturday, June 21st 2025, 6:29:20 pm
linter-yaml-title-alias: Document Database
tags: []
title: Document Database
---

Built on foundation of [[Systems Design/Principles/Components/Databases/Key-Value Store Database|key-value store databases]]. Each entity is stored as a document and the database provides a query language and optimized APIs to query the internal structure of documents. Often used for data that only changes occasionally. For this reason, they are effective for systems that tolerate [[Systems Design/Principles/Consistency#Eventual|eventual consistency]]. Such examples include:

- MongoDB
- RavenDB
- CouchDB
