class Node {
  constructor(
    public id: string | null,
    public children: Array<Node> = [],
  ) {}
}

class PrefixTree {
  private root: Node
  constructor() {
    this.root = new Node(null)
  }

  public push(value: string): void {
    let current = this.root
    value.split("").forEach((c) => {
      let node = current.children.find((n) => n.id === c)
      if (!node) {
        node = new Node(c)
        current.children.push(node)
      }
      current = node
    })
  }

  public commonPrefix(value: string) {
    let current = this.root
    const chars = value.split("")
    const output = []
    for (const c of chars) {
      const node = current.children.find((n) => n.id === c)
      if (!node) {
        return output
      }
      output.push(c)
      current = node
    }

    return output
  }
}

const longestCommonPrefix = (nums1: Array<number>, nums2: Array<number>) => {
  const prefixTree = new PrefixTree()

  nums1.forEach((num) => {
    prefixTree.push(`${num}`)
  })

  let max = 0
  nums2.forEach((num) => {
    max = Math.max(max, prefixTree.commonPrefix(`${num}`).length)
  })

  return max
}

export default longestCommonPrefix
