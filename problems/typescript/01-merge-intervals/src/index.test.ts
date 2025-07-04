import sut from "./"

describe("merge intervals", () => {
  test(`Case 1`, () => {
    expect(
      sut([
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18],
      ]),
    ).toEqual([
      [1, 6],
      [8, 10],
      [15, 18],
    ])
  })

  test(`Case 2`, () => {
    expect(
      sut([
        [1, 4],
        [4, 5],
      ]),
    ).toEqual([[1, 5]])
  })
})
