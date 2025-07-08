import sut from "./"

describe("longest common prefix length", () => {
  test(`Test case 1.`, () => {
    expect(sut([1, 10, 100], [1000])).toEqual(3)
  })

  test(`Test case 1.`, () => {
    expect(sut([1, 2, 3], [4, 4, 4])).toEqual(0)
  })

  test(`Test case 1.`, () => {
    expect(sut([1, 33], [32, 22])).toEqual(1)
  })

  test(`Test case 1.`, () => {
    expect(sut([13], [30])).toEqual(0)
  })

  test(`Test case 1.`, () => {
    expect(sut([10], [17, 11])).toEqual(1)
  })
})
