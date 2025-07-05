import { debounce } from "."

jest.useFakeTimers()

describe("debounce", () => {
  const mockFn = jest.fn()
  let fn

  beforeEach(() => {
    fn = debounce(mockFn, 50)
  })

  test(`Invokes only the latest fn invocation after timeout as been met.`, () => {
    fn("hello", "world")
    fn("hi", "there")
    fn("invokes", "me")

    jest.runAllTimers()
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith("invokes", "me")
  })
})
