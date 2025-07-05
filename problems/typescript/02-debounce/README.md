# Typescript Debounce

## Problem Statement

### Description

Given a function `fn` and a time in milliseconds `t`, return a **debounced** version of that function.

A **debounced** function is a function whose execution is delayed by `t` milliseconds and whose execution is **cancelled** if it is called again within that window of time. The debounced function should also receive the passed parameters.

For example, let's say `t = 50ms`, and the function was called at `30ms`, `60ms`, and `100ms`. The first 2 function calls would be cancelled, and the 3rd function call would be executed at `150ms`.

If instead `t = 35ms`, the 1st call would be cancelled, the 2nd would be executed at `95ms`, and the 3rd would be executed at `135ms`.

Please solve it without using lodash's `_.debounce()` function.

### Example 1

**Input:**

```json
t = 50
calls = [
  {"t": 50, "inputs": [1]},
  {"t": 75, "inputs": [2]}
]
```
