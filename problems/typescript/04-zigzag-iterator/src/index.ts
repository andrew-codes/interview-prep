function* zigzag(v1: Array<number>, v2: Array<number>) {
  while (v1.length > 0 || v2.length > 0) {
    if (v1.length > 0) {
      const v = v1.shift()
      yield v
    }
    if (v2.length > 0) {
      const v = v2.shift()
      yield v
    }
  }
}

class ZigzagIterator {
  private iterator: ReturnType<typeof zigzag>
  private nextValue: IteratorResult<number> | null
  constructor(v1: number[], v2: number[]) {
    this.iterator = zigzag(v1, v2)
  }

  next(): number {
    let output
    if (this.nextValue) {
      output = this.nextValue
      this.nextValue = null
    } else {
      output = this.iterator.next()
    }
    return output.value
  }

  hasNext(): boolean {
    this.nextValue = this.iterator.next()
    return !this.nextValue.done
  }
}

export default ZigzagIterator
