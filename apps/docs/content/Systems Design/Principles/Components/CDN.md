---
aliases: [CDN]
date created: Saturday, June 21st 2025, 1:18:48 pm
date modified: Saturday, June 21st 2025, 1:29:32 pm
linter-yaml-title-alias: CDN
tags: []
title: CDN
---

## Push CDN

You are fully responsible for pushing and updating content on CDN; including any URL rewriting that needs to occur.

> This works well for smaller sites or for content that rarely changes.

## Pull CDN

Pull CDN grabs content from upstream server (yours) on the first user request for a given content item. You leave the content on your server and rewrite URLs to point to the CDN.

Time-to-live (TTL) determines how long content is cached. This type of CDN minimizes the amount of content stored on the CDN, but can also create additional traffic as content's TTL expires and is re-pulled despite it not having changed.

> This works well for sites with heavy traffic. Traffic is more evenly distributed and only recently accessed content is cached on CDN.

## Disadvantages

1. CDN costs could be high based on traffic; however, this should be compared to costs incurred by not using a CDN
2. Stale content could be served; due to TTL causing content to be re-pulled despite it not having changed
3. Requires URL rewriting for static content to point to CDN
