import Sut from "./"

describe("zigzag iterator", () => {
  let output: Array<number> = []
  beforeEach(() => {
    output = []
  })

  test(`Test case 1.`, () => {
    const sut = new Sut([], [])
    while (sut.hasNext()) {
      output.push(sut.next())
    }
    expect(output).toEqual([])
  })

  test(`Test case 2.`, () => {
    const sut = new Sut([1, 2], [3, 4, 5, 6])
    while (sut.hasNext()) {
      output.push(sut.next())
    }
    expect(output).toEqual([1, 3, 2, 4, 5, 6])
  })

  test(`Test case 3.`, () => {
    const sut = new Sut([1], [])
    while (sut.hasNext()) {
      output.push(sut.next())
    }
    expect(output).toEqual([1])
  })

  test(`Test case 4.`, () => {
    const sut = new Sut([], [1])
    while (sut.hasNext()) {
      output.push(sut.next())
    }
    expect(output).toEqual([1])
  })

  test(`Test case 5.`, () => {
    const sut = new Sut([3, 4, 5, 6], [1, 2])
    while (sut.hasNext()) {
      output.push(sut.next())
    }
    expect(output).toEqual([3, 1, 4, 2, 5, 6])
  })
})
