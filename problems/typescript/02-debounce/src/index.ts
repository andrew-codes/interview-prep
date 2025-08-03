interface F {
  (...args: Array<unknown>): void
}

const debounce = (fn: F, t: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(fn, t, ...args)
  }
}

export { debounce }
