# Overview

These are my notes and study guide I've compiled to prepare me for staff engineering interviews. These are ever changing and being updated as I learn and record more.

## Systems Design

This is best consumed by visiting the published [web version](https://andrew-codes.github.io/interview-prep/).

## Code Problems

See the [problems](./problems/) directory. Problems are categorized by language.

To run tests or see a problem (in the case of React), you can use the following commands. Note the problem ID is the `{{language}}-{{number}}`, e.g., `react-01`.

```shell
yarn

# Run tests for development via:
yarn nx start react-01

# All problems can be run via:
yarn nx test react-01
```

### Create a New Problem

```shell
yarn nx g interview-prep:new-problem
# Follow prompts
yarn
```
