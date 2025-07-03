---
aliases: [Interview Strategy]
date created: Friday, June 20th 2025, 9:44:27 am
date modified: Saturday, June 28th 2025, 5:25:34 pm
linter-yaml-title-alias: Interview Strategy
tags: []
title: Interview Strategy
---

## Overview

This guide provides a framework for breaking down and answering systems design related questions during an interview.

|     | Step                 | Time         |
| --: |:------------------- |:----------- |
|   1 | Feature Expectations | 5 mins       |
|   2 | Resource estimations | 5 mins       |
|   3 | Design goals         | 5 mins       |
|   4 | High level design    | 5 - 10 mins  |
|   5 | Deep dive            | 15 - 20 mins |
|   6 | Justification        | 5 mins       |

## Problem Approach

### Step 1: Feature Expectations

The first step is ask questions to clarify system uses cases (functional requirements).

- Who are the users (personas) of the system?
  - What are their goals in using the system?
  - Which of these goals is most important (prioritize user actions)
- What does this system do?
  - Are there any goals that are not tied to end-users (needs of the business)?
- Are there any use cases that are excluded?
- How many users will use the system?
  - How many concurrent users does the system need to support?
- What are users' usage patterns
- Are there any parts of this system already in place?
  - If so, what are they?

### Step 2: Estimations

Based on the answers from above, focus on estimating the resources required to sustain the system. Considerations include:

1. Expected **read to write ratio** based on use cases and patterns
2. Throughput required (for read and write queries)
3. Expected latency (for read and write operations)
4. Estimated traffic (for read and write operations)
5. Storage estimations (including RAM)

> [!NOTE] RAM considerations
> RAM usage estimations are typically important situations that utilize a cache. This introduces additional considerations, such as what and how many things are being cached. Also, how much is ok to be stored on disk versus in memory.

Read to write ratio can be inferred from the system's intended purpose and primary use cases. Lean into this intuition as understanding this ratio will play a role in driving decisions.

From there, you can now formulate estimations for required resources.

> [!TIP] Resource estimations
> You may need to demonstrate estimation of these values by hand; such as QPS or storage sizes See [[Systems Design/Principles/Basics/Resource Estimation|Resource Estimation]] for a guide on doing this.

### Step 3: Design Goals

Next, communicate the system's design goals. This includes goals relating to [[Systems Design/Principles/Basics/Non-Functional Requirements|non-functional requirements]]. These may be inferable from the system's domain. These derive directly from trade-offs found in the [[Systems Design/Principles|system design principles]].

If inferring, ensure you communicate your findings and validate the assumptions are correct before proceeding. Otherwise, ask for any specific goals the system should achieve.

### Step 4: High Level Design

Identify the major domains of the system and their relationships to one another. These can be sketched out in a diagram.

> [!TIP] Focus on data flow
> The purpose of this is to think about how users' requests will flow through the system and identify big rocks that need to be addressed.

You'll want to strike a balance between low level details and the high level design. Focus only on low level details that set you up for solid explanation in the deep dive (next phase) section **OR** are crucial to understand for the implementation of the system as a whole.

Primary details to focus on:

- Flow of data for read requests
- Flow of data for write requests

Details to secondarily focus on:

- APIs (for crucial components)
- Database schemas
- Algorithm choice for domains

You can also start to identify big rocks, or major challenges the design will need to overcome to strike the right balance to meet the needs of the system given its constraints. You do not need to dive into detail into any of these big rocks; simply note their existence so you can speak more to them in the deep dive.

> [!NOTE]
> Keep the high-level design to domains of responsibility and use [[Systems Design/Principles/Components#Simple Components|simple components]] to represent them. Remember, the design needs to be understandable and executable by engineers of varying levels.

### Step 5. Deep Dive

In this step, you'll focus on:

1. How each component works
2. Scaling
   1. Availability and consistency story for each component
   2. Consistency and availability patterns leveraged
3. Introduce more [[Systems Design/Principles/Components#Advanced Components|advanced components]] and how they fit into the overall system

Discuss not only how each component will work, but also the challenges that engineering teams need to be aware of and their solutions.

> [!TIP] Focus on tradeoffs
> The key here is to identify trade-offs in variations of the design; aligning and communicating those that most match the constraints and requirements of the system.

#### Prepare for Questions

See [[Systems Design/Interview Prep/Prepare for Questions|Prepare for Questions]] to see common questions and answers about used components.

### Step 6: Justification for Decisions

- Throughput of each tier
- Latency induced at each tier
- Summarize trade-offs and why each decision was made
