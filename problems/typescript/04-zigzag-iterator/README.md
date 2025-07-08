# Typescript Zigzag Iterator

## Problem Statement

Given two vectors of integers `v1` and `v2`, implement an iterator to return their elements alternately.

### Implement the `ZigzagIterator` class:

- `ZigzagIterator(List<int> v1, List<int> v2)` initializes the object with the two vectors `v1` and `v2`.
- `boolean hasNext()` returns `true` if the iterator still has elements, and `false` otherwise.
- `int next()` returns the current element of the iterator and moves the iterator to the next element.

## Example 1

**Input:**
`v1 = [1,2]`, `v2 = [3,4,5,6]`
**Output:**
`[1,3,2,4,5,6]`
**Explanation:**
By calling `next()` repeatedly until `hasNext()` returns false, the order of elements returned by `next()` should be: `[1,3,2,4,5,6]`.

## Example 2

**Input:**
`v1 = [1]`, `v2 = []`
**Output:**
`[1]`

## Example 3

**Input:**
`v1 = []`, `v2 = [1]`
**Output:**
`[1]`
