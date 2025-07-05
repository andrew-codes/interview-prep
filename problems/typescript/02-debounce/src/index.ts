interface F {
  (...args: Array<unknown>): void
}

const debounce = (fn: F, t: number) => {
  let timeoutId

  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(fn, t, ...args)
  }
}

export { debounce }
