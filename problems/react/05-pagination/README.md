# React Pagination

## Problem Statement

Create a pagination component.

## Requirements

- [x] Given a total number of pages, shows navigation page number buttons ranging from start (1) page to total page number; with a maximum of 10 page buttons shown at once.
- [x] Optional maximum number of navigation buttons can be specified.
- [x] First page number button is always shown
- [x] Last page number button is always shown
- [x] An ellipsis is used in place of a page button to bridge the gap between 1 and total page number when there are more than the maximum number of page buttons
  - [x] End list ellipsis placement as immediately before the first end page button range. Defaults to end page range being 1 (last page)
  - [x] Start list ellipsis placement as immediately after the last first page button range. Defaults to first page range being 1 (first page)
  - [x] When the `(current page) > (total pages) - (maximum page buttons)`, then the start ellipsis is used (current page is too far away to count back to first page with remaining buttons)
  - [x] When the `(current page) < (total pages) - ((total pages) - (maximum page buttons))`, then the end ellipsis is used (current page is not close enough count to end page with remaining buttons)
- [x] Defaults to being on page 1
- [x] Visual indication of current page number
- [x] Clicking on a page number button moves current page to clicked page number
- [x] Page navigation event callback notifies consumers of current page number
- [x] Left and right navigation buttons; navigate forward/backwards 1 page at a time
- [x] Page buttons are focus-able and accessible
  - [ ] Screen readers know which page button is currently active and currently focused
