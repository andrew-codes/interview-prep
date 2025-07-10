import { FC, useEffect, useReducer } from "react"

const Pagination: FC<{
  total: number
  count?: number
  onChange?: (pageNumber: number) => void
}> = ({ count = 10, onChange, total }) => {
  const [{ current, bottom, step }, dispatch] = useReducer(
    (state, action) => {
      let current = state.current
      let step = state.step
      let bottom = state.bottom
      let left = false
      let right = false
      switch (action.type) {
        case "set":
          current = action.payload
          left = current >= count - 1
          right = current < total - 2 || current + count < total
          if (!left && right) {
            bottom = 2
            step = count - 2
          } else if (left && right) {
            if (current === count - 1) {
              bottom = count - 1
              step = count - 4
            } else if (current === bottom + step) {
              bottom = Math.min(bottom + step, total - step - 1)
            } else if (current < bottom) {
              bottom = Math.max(1, bottom - step)
            }
          } else {
            if (current === total) {
              bottom = total - (count - 3)
              step = count - 4
            } else if (current === bottom - step) {
              bottom -= step
            }
          }

          break
      }

      if (current < 1 && current > total) {
        return state
      }

      return { ...state, current, bottom, step }
    },
    { current: 1, bottom: 2, step: count - 4 },
  )

  useEffect(() => {
    onChange?.(current)
  }, [current])

  const leftSideEllipsis = current >= count - 1
  const rightSideEllipsis = current <= total - step || current + count < total
  let length = count - 2
  if (leftSideEllipsis) {
    length--
  }
  if (rightSideEllipsis) {
    length--
  }
  const pageButtons = Array.from({ length })

  return (
    <div
      data-test-id="pagination"
      style={{
        display: "flex",
        boxSizing: "border-box",
      }}
    >
      <button
        onClick={(evt) => {
          dispatch({ type: "set", payload: current - 1 })
        }}
        style={{
          height: "2rem",
          backgroundColor: "white",
          border: "1px solid black",
          margin: "0 0.25rem",
        }}
      >
        prev
      </button>
      <button
        onClick={(evt) => {
          dispatch({ type: "set", payload: 1 })
        }}
        style={{
          width: "2rem",
          height: "2rem",
          backgroundColor: current === 1 ? "lightblue" : "white",
          border: "1px solid black",
          margin: "0 0.25rem",
        }}
      >
        {1}
      </button>
      {leftSideEllipsis && (
        <span
          style={{
            display: "inline-flex",
            background: "white",
            width: "2rem",
            height: "2rem",
            boxSizing: "border-box",
            border: "1px solid black",
            margin: "0 0.25rem",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          ...
        </span>
      )}
      {pageButtons.map((p, i, list) => {
        const index = i + bottom

        return (
          <button
            key={index}
            onClick={(evt) => {
              dispatch({ type: "set", payload: index })
            }}
            style={{
              width: "2rem",
              height: "2rem",
              backgroundColor: current === index ? "lightblue" : "white",
              border: "1px solid black",
              margin: "0 0.25rem",
            }}
          >
            {index}
          </button>
        )
      })}
      {rightSideEllipsis && (
        <span
          style={{
            display: "inline-flex",
            background: "white",
            width: "2rem",
            height: "2rem",
            boxSizing: "border-box",
            border: "1px solid black",
            margin: "0 0.25rem",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          ...
        </span>
      )}
      <button
        onClick={(evt) => {
          dispatch({ type: "set", payload: total })
        }}
        style={{
          width: "2rem",
          height: "2rem",
          backgroundColor: current === total ? "lightblue" : "white",
          border: "1px solid black",
          margin: "0 0.25rem",
        }}
      >
        {total}
      </button>
      <button
        onClick={(evt) => {
          dispatch({ type: "set", payload: current + 1 })
        }}
        style={{
          height: "2rem",
          backgroundColor: "white",
          border: "1px solid black",
          margin: "0 0.25rem",
        }}
      >
        next
      </button>
    </div>
  )
}

export { Pagination }
