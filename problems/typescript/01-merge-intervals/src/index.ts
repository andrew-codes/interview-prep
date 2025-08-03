const merge = (intervals: Array<[number, number]>) => {
  return intervals
    .sort(([a], [b]) => {
      return a - b
    })
    .reduce(
      (acc, [start, end]) => {
        const lastInterval = acc.pop()
        if (!lastInterval) {
          return acc.concat([[start, end]])
        }
        const [prevStart, prevEnd] = lastInterval
        if (start <= prevEnd) {
          return acc.concat([[prevStart, Math.max(prevEnd, end)]])
        }

        return acc.concat([
          [prevStart, prevEnd],
          [start, end],
        ])
      },
      [] as Array<[number, number]>,
    )
}

export default merge
