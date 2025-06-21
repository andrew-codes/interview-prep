---
aliases: [Load Balancer]
date created: Saturday, June 21st 2025, 1:31:02 pm
date modified: Saturday, June 21st 2025, 1:53:16 pm
linter-yaml-title-alias: Load Balancer
tags: []
title: Load Balancer
---

Load balancers distribute requests across many compute resources. They are effective at:

- Preventing requests going to overloaded resources
- Preventing requests from going to resources that are down or unhealthy
- Prevent single point of failure for compute resources (in which they send requests)
- SSL termination; removing need for certs and their decryption on each backend resource
- Sticky sessions; route a user's request to the same resource instance via cookies

## Types of Routing

Traffic can be routed based on a variety of strategies:

- Random
- Least load
- Session based
- Round robin/weighted round robin
- Layer 4
- Layer 7

### Layer 4

This type of routing inspects information at the transport layer of the network protocol stack. This means it can act on things such as source and destination IP addresses and ports. Due to the level of the network stack that this routing protocol operates, it performs the network address translation (NAT) to upstream resources.

### Layer 7

This type of routing inspects information found at the application layer. This includes things such as request headers, body, and cookies. This makes Layer 7 routing much more flexible, but also requires marginally more computing resources to as compared to Layer 4.

## Configurations for Multiple Load Balancers

A single load balancer can be a single point of failure, so it is common to set up multiple. When setting up multiple, you commonly use either an [[Systems Design/Principles/Availability#Active-Active|active-active]] or [[Systems Design/Principles/Availability#Active-Passive|active-passive]] configuration.
