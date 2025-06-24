---
aliases: [URL Shortener Solution]
date created: Tuesday, June 24th 2025, 12:27:01 pm
date modified: Tuesday, June 24th 2025, 2:48:14 pm
linter-yaml-title-alias: URL Shortener Solution
tags: [practice/easy]
title: URL Shortener Solution
---

> [!Caution] WIP
> This solution is still a work in progress

## Problem Statement

Design a URL shortener service.

## Feature Exceptions (10 mins)

### Initial Clarifications

1. How many daily active users needs to be supported? What is the size and scope of this service?
	 - 100M DAU
	 - The service needs to be able to handle high traffic to shortened URLs and redirect them in near real-time
2. The problem states the service shortens URLs, but it does not indicate why users want to do so. What is the reason users want to shorten URLs?
	- The target persona are not consumers wanting to share URLs
	- The target persona are businesses. They will use this service to create branded links that then can be shared in marketing campaigns
- Do users need to customize more than the URL's slug, like the TLD (top level domain)?
1. Are there any metrics our users care to track given they are using this service for their marketing campaigns?
	- Users will want to track click counts for each link
2. How long do we store the URLs and their associated analytics? Are there any privacy governance, such as GDPR, that may impact data retention and/or storage location?
	1. Consuming users may be located anywhere in the world, meaning we need to adhere to GDPR in terms of collection of user data
	2. Data retention is 3 years for user collected analytics

### Requirements

#### Feature

1. On-boarding
	1. Customers can register domains to use with short URLs
2. URL shortening
	- Users can input a long URL and receive a shortened URL
	- Supports creating custom short URLs
	- Short URLs are alphanumeric and contain no special characters
	- Short URLs are globally unique for a TLD
	- Users can specify their own (registered) TLD to use for the shortened link
3. URL redirection
	- Short URLs redirect users to the long-form URL
	- Must be highly available
	- Redirection needs to be near real-time
4. URL analytics
	1. Short URLs click counts are tracked over time
	2. The data storage is up to a maximum of 3 years

#### Non-Functional

1. High availability of URL redirections
2. Low latency for URL redirections
3. High durability of created short URLs
4. High durability of collected analytics data

#### Out of Scope

1. Authentication and authorization of users creating short URLs
2. Deletion of short URLs by users
3. Advanced analytics
4. Security and safeguards against usage for SPAM, abuse, etc.

## Estimations (5 mins)

- R/W Ratio is 100:1; redirects happen significantly more frequently than shortening URLs
- **DAU is 100M**
- **1M writes a day**
	- 1200 RPS (writes)
	- 12,000 RPS (reads)
- **Storage needs are ~ 5.5TB**:
	- Assuming data entry for URL storage is 1KB each (including marketing campaign information)
		- 1M URL writes a day at 1KB is 5GB a day
		- ~5.5 TB for three year data retention
	- Assuming data entry per short URL analytics is 8B each
		- 8B for click count (32bit integer may not be enough, so opting for 64bit integer)
		- 1M URLs a day (writes) at 8B each is < 4GB for three years

## High Level Design (10 mins)

### On-boarding

```d2
Customer
Onboard
Customer SQL DB {
	shape: cylinder
}

Customer -> Onboard: 1. POST TLD
Onboard -> Customer SQL DB: 2. stores TLD
```

### Shortener

#### Diagram

```d2
Customer
Shortener
Customer SQL DB {
	shape: cylinder
}
NoSQL DB {
	shape: cylinder
}

Customer -> Shortener: 1. POST
Shortener -> Customer SQL DB: 2. validates domain
Shortener -> NoSQL DB: 3. stores (valid) URL, ID
```

### Redirection

#### Diagram

```d2
Users {
	End User
	Customer.Customer DNS
}
API Gateway
Redis {
	shape: cylinder
}
NoSQL DB {
	shape: cylinder
}
Redirection Services


# Redirection
Users.End User -> Users.Customer.Customer DNS: 1. GET
Users.Customer.Customer DNS -> API Gateway: 2. dns resolves
API Gateway -> Redirection Services: 3. request longURL
Redirection Services -> Redis: 4. retrieve longUrl
Redirection Services <-> NoSQL DB: 4.1 fallback
Redirection Services -> Users.End User: 5. return 302 redirect
```

### URL Analytics

## Deep Dive (20 mins)

## Follow-up Questions (10 mins)
