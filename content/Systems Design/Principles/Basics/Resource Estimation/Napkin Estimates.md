---
aliases: [Napkin Estimates]
date created: Friday, June 20th 2025, 1:13:34 pm
date modified: Friday, June 20th 2025, 2:37:00 pm
linter-yaml-title-alias: Napkin Estimates
tags: []
title: Napkin Estimates
---

## Numbers You Should Know

### Time

```text
1 ns = 10^-9 seconds
1 us = 10^-6 seconds = 1,000 ns
1 ms = 10^-3 seconds = 1,000 us = 1,000,000 ns
1s   = 10^1 seconds  = 1,000 ms = 1,00,000 us  = 1,000,000,000 ns
1d   = 84,600s 
```

### Powers of Two

```text
Power           Exact Value         Approx Value        Bytes
---------------------------------------------------------------
7                             128
8                             256
10                           1024   1 thousand           1 KB
16                         65,536                       64 KB
20                      1,048,576   1 million            1 MB
30                  1,073,741,824   1 billion            1 GB
32                  4,294,967,296                        4 GB
40              1,099,511,627,776   1 trillion           1 TB
```

### Latency

## Equations

$$
\begin{align}
\text{RWRatio} = 5 \\
\text{AvgRequestSize}_\mathrm{read} = 50\, \mathrm{Kb}
\\
\text{AvgRequestSize}_\mathrm{write} = 50\, \mathrm{Kb}
\\
\\
\\
\text{RPS}_\mathrm{i} = \text{DAU} \cdot \text{RWRatio} \div 86,400
\\
\text{Throughput}_\mathrm{i} = \text{RPS}_\mathrm{i} \cdot \text{AvgRequestSize}_\mathrm{i}
\\
\text{QPS}_\mathrm{n} = \text{RPS} \cdot \text{QueriesPerRequest}
\end{align}
$$
