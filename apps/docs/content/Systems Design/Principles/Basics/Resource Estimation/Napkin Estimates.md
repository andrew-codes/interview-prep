---
aliases: [Napkin Estimates]
date created: Saturday, June 21st 2025, 3:01:13 pm
date modified: Saturday, June 21st 2025, 8:37:26 pm
linter-yaml-title-alias: Napkin Estimates
tags: []
title: Napkin Estimates
---

## Equations

### Throughput

$$
\begin{align}
\text{RWRatio} = 5 \\
\text{AvgRequestSize}_\mathrm{read} = 50\, \mathrm{Kb}
\\
\text{AvgRequestSize}_\mathrm{write} = 50\, \mathrm{Kb}
\\
\\
\\
\text{RPS}_\mathrm{i} = \text{DAU} \times \text{RWRatio} \div 86,400
\\
\text{Throughput}_\mathrm{i} = \text{RPS}_\mathrm{i} \times \text{AvgRequestSize}_\mathrm{i}
\\
\text{QPS}_\mathrm{n} = \text{RPS} \times \text{QueriesPerRequest}
\end{align}
$$
