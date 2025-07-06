import { FC, ReactNode, useRef, useState } from "react"

const TextField: FC<{
  defaultValue?: string
  hintText?: ReactNode
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  error?: string | boolean
}> = ({ defaultValue = "", endAdornment, error, hintText, startAdornment }) => {
  const [focused, setFocused] = useState(false)

  const [value, setValue] = useState(defaultValue)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      data-test-id="textfield"
      style={{
        display: "flex",
        background: "white",
        flexDirection: "column",
        border: "none",
        margin: "0.25rem",
        padding: "0 0.25rem 0.25rem",
        boxSizing: "border-box",
        height: "3rem",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div
          data-test-id="adornment"
          onClick={() => {
            inputRef.current?.focus()
          }}
          style={{
            display: "inline-block",
            marginRight: "0.25rem",
          }}
        >
          {startAdornment}
        </div>
        <div
          style={{
            position: "relative",
            flex: "1",
            display: "flex",
          }}
        >
          <input
            ref={inputRef}
            onFocus={(evt) => {
              setFocused(true)
            }}
            onBlur={(evt) => {
              setFocused(false)
            }}
            onChange={(evt) => {
              setValue(evt.target.value)
            }}
            style={{
              flex: 1,
              background: "none",
              height: "1.75rem",
              outline: "none",
              border: "none",
            }}
            value={value}
          />
          <div
            onClick={() => {
              inputRef.current?.focus()
            }}
            style={{
              transition: "bottom 0.2s",
              position: "absolute",
              fontSize: "0.75rem",
              textAlign: "left",
              margin: "0 0.20rem",
              color: "gray",
              bottom: value === "" && !focused ? "0.5rem" : "-0.75rem",
              left: 0,
              right: 0,
            }}
          >
            {error && (
              <>
                <span
                  style={{
                    color: "red",
                  }}
                >
                  {error}
                </span>{" "}
              </>
            )}
            <span>{hintText}</span>
          </div>
        </div>
        <div
          data-test-id="adornment"
          onClick={() => {
            inputRef.current?.focus()
          }}
          style={{
            display: "inline-block",
            marginLeft: "0.25rem",
          }}
        >
          {endAdornment}
        </div>
        <hr
          style={{
            position: "absolute",
            bottom: "2px",
            left: 0,
            right: 0,
            margin: 0,
            borderColor: focused ? "lightblue" : error ? "red" : "black",
          }}
        />
      </div>
    </div>
  )
}

export { TextField }
