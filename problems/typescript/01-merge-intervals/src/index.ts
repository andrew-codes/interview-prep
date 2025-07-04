const merge = (intervals: Array<[number, number]>) => {
  return intervals
    .sort(([a], [b]) => {
      return a - b
    })
    .reduce((acc, [start, end], i) => {
      if (i === 0) {
        return acc.concat([[start, end]])
      }

      const [prevStart, prevEnd] = acc.pop()
      if (start <= prevEnd) {
        return acc.concat([[prevStart, Math.max(prevEnd, end)]])
      }

      return acc.concat([
        [prevStart, prevEnd],
        [start, end],
      ])
    }, [])
}

export default merge
