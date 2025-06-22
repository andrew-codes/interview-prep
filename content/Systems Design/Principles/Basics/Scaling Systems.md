---
aliases: [Scaling Systems]
date created: Thursday, June 19th 2025, 11:38:04 am
date modified: Sunday, June 22nd 2025, 10:09:04 am
linter-yaml-title-alias: Scaling Systems
tags: []
title: Scaling Systems
---

There are several categories of scaling. A system may use one or more scaling techniques.

## Decomposition

This is effectively microservices. This breaks down functional requirements into discrete services; each a domain of functional requirements.

```d2
Monolith {
	Application {
		User
		Feed
		Trending
	}
}

Monolith Database {
	shape: cylinder
}

Monolith.Application -> Monolith Database

Microservices {
	User Service -> User Database
	User Database { shape: cylinder }
	Feed Service -> Post Database
	Post Database { shape: cylinder }
	Trending Service -> Trends Database
	Trends Database { shape: cylinder }
}
```

### Scaling System

Domain slices may or may not have the same needs as other domains in the system. Micro-services enables domains to not only scale independently from one another, but the taken approaches to scale may be different as each domain may tolerate or have different trade-offs as part of its requirements.

### Scaling Organization

Also enables scaling the number of developers that can work on a system in an organization. Teams can own slices of the domain (services). This allows them to work within that domain without as many dependencies on other teams of developers.

### Challenges

1. System complexity increases. Although functionally the complexity remains the same, there is an increase in system complexity. This is due to the physical boundaries between domains; both in terms of infrastructure and domain communication.
2. The impact of cross domain dependencies are exacerbated in comparison to a monolithic system. In a monolithic system, dependencies occur mostly at the code level. Microservices elevate these to a systems level; both in terms of implementation and organizationally. For example, a team depending on another team's roadmap and work completion is an example of the increased impact these cross domain dependencies can cause.

## Vertical Scaling

Scaling the computational power/resources of a single server. Has a rather finite limit to how much it can scale a system.

## Horizontal Scaling

Services are scaled across multiple servers. This requires a coordinator (load balancer) to distribute requests across all servers. There are different approaches to doing this, such as weighted round robin, sticky sessions, etc.

```d2
Client -> Load Balancer
Load Balancer -> User Service 1
Load Balancer -> User Service 2
Load Balancer -> User Service 3
```

## Partitioning

This approach splits requests across a physical boundary (typically network or geographic location). This is a common approach to scale both databases ([[Systems Design/Principles/Components/Databases/Relational Database#Sharding|sharding]]) and systems across data centers.

```d2
Data Center 1 {
	User Service
	User Database {
		shape: cylinder
	}
	
	User Service -> User Database
}

Data Center 2 {
	User Service
	User Database {
		shape: cylinder
	}
	
	User Service -> User Database
}
```
