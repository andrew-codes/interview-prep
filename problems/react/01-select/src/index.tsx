import { Children, FC, PropsWithChildren, useState } from "react"

const Option: FC<PropsWithChildren<{ value: string }>> = ({ children, value }) => {
  return (
    <div
      style={{
        cursor: "pointer",
      }}
      data-test-id="option"
      data-value={value}
    >
      {children}
    </div>
  )
}

const Select: FC<PropsWithChildren<{ defaultValue?: string }>> = ({ children, defaultValue }) => {
  const [open, setOpen] = useState(false)

  const [value, setValue] = useState<string | undefined>(defaultValue)
  const selectedItem = Children.toArray(children).find((child) => {
    return child.props.value === value
  })

  const [activeIndex, setActiveIndex] = useState(-1)

  return (
    <div
      data-test-id="select"
      style={{
        minHeight: `1.25rem`,
        position: "relative",
        border: "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: "0.25rem",
      }}
      onClick={() => setOpen(!open)}
      onKeyDown={(evt) => {
        if (!open && evt.key === "ArrowDown") {
          setOpen(true)
          return
        }

        if (open && evt.key === "ArrowDown") {
          setActiveIndex((prevIndex) => Math.min(prevIndex + 1, Children.count(children) - 1))
          return
        }

        if (open && evt.key === "ArrowUp") {
          setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0))
          return
        }

        if ((open && evt.key === "Enter") || evt.key === " ") {
          setValue(Children.toArray(children)[activeIndex].props.value)
          setActiveIndex(-1)
          setOpen(false)
          return
        }

        if ((open && evt.key === "Escape") || evt.key === "Tab") {
          setOpen(false)
          return
        }
      }}
      tabIndex={0}
    >
      <div
        data-test-id="selected-value"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          padding: "0 0.5rem",
          cursor: "pointer",
        }}
      >
        {selectedItem && selectedItem.props.children}
      </div>
      <div
        style={{
          height: "100%",
          backgroundColor: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Select an option
      </div>
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: "white",
          border: "1px solid #ccc",
          zIndex: 1000,
          display: open ? "block" : "none",
        }}
        onClick={(evt) => {
          const newValue = (evt.target as HTMLElement).attributes.getNamedItem("data-value")?.value
          setValue(newValue)
        }}
      >
        {Children.map(children, (child, i) => {
          return (
            <div
              key={i}
              onMouseEnter={(evt) => {
                setActiveIndex(i)
              }}
              style={{
                background: i === activeIndex ? "lightgray" : "white",
              }}
            >
              {child}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { Option, Select }
