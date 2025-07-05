import {
  Children,
  cloneElement,
  createContext,
  EventHandler,
  FC,
  memo,
  MouseEvent,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

const tabsContext = createContext<{
  selectionIndex: number
  selectedIndex: number
  activateTab: null | ((v: number) => void)
  selectTab: null | ((v: number) => void)
}>({
  selectionIndex: -1,
  selectedIndex: 0,
  activateTab: null,
  selectTab: null,
})

const Tab: FC<PropsWithChildren<{ tabIndex?: number }>> = ({ children, tabIndex }) => {
  const { selectedIndex, selectionIndex, selectTab } = useContext(tabsContext)

  const handleSelectionSet = useCallback<EventHandler<MouseEvent>>((evt) => {
    if (!tabIndex) {
      return
    }

    selectTab?.(tabIndex)
  }, [])

  return (
    <li
      data-test-id="tab"
      data-tab-index={tabIndex}
      onMouseEnter={handleSelectionSet}
      style={{
        cursor: "pointer",
        display: "inline-flex",
        padding: "1rem",
        background:
          selectionIndex === tabIndex
            ? "lightgray"
            : selectedIndex === tabIndex
              ? "lightblue"
              : "white",
      }}
    >
      {children}
    </li>
  )
}

const Tabs: FC<PropsWithChildren<object>> = memo(
  ({ children }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectionIndex, setSelectionIndex] = useState(-1)

    const activateTab = useCallback((i: number) => {
      setSelectedIndex(i)
      setSelectionIndex(i)
    }, [])
    const selectTab = useCallback((i: number) => {
      setSelectionIndex(i)
    }, [])

    return (
      <tabsContext.Provider
        value={{
          selectionIndex,
          selectedIndex,
          activateTab,
          selectTab,
        }}
      >
        {children}
      </tabsContext.Provider>
    )
  },
  () => false,
)

const TabList: FC<PropsWithChildren<{ defaultIndex?: number }>> = ({
  children,
  defaultIndex = 0,
}) => {
  const { selectionIndex, activateTab, selectTab } = useContext(tabsContext)

  useEffect(() => {
    activateTab?.(defaultIndex)
  }, [defaultIndex])

  const ref = useRef<HTMLOListElement>(null)
  const handleTabActivationClick = useCallback<EventHandler<MouseEvent>>((evt) => {
    const tabIndex = (evt.target as HTMLElement).attributes.getNamedItem("data-tab-index")?.value
    if (!tabIndex) {
      return
    }

    const i = parseInt(tabIndex, 10)
    activateTab?.(i)
    ref.current?.focus()
  }, [])

  const handleKeyDown = useCallback(
    (evt) => {
      switch (evt.key) {
        case "ArrowLeft":
          selectTab?.(Math.max(0, selectionIndex - 1))
          break
        case "ArrowRight":
          selectTab?.(Math.min(Children.toArray(children).length - 1, selectionIndex + 1))
          break
        case "Enter":
        case "Space":
          activateTab?.(selectionIndex)
          break
      }
    },
    [selectionIndex],
  )

  return (
    <ol
      ref={ref}
      data-test-id="tab-list"
      tabIndex={0}
      style={{
        margin: 0,
        padding: 0,
        listStyle: "none",
        display: "flex",
        borderBottom: "1px solid black",
        outline: "none",
      }}
      onClick={handleTabActivationClick}
      onKeyDown={handleKeyDown}
    >
      {Children.map(children, (child, i) => {
        return cloneElement(child, { key: i, tabIndex: i })
      })}
    </ol>
  )
}

const TabPanel: FC<PropsWithChildren<object>> = ({ children }) => {
  return (
    <div data-test-id="tab-panel" tabIndex={0}>
      {children}
    </div>
  )
}

const TabPanels: FC<PropsWithChildren<object>> = ({ children }) => {
  const { selectedIndex } = useContext(tabsContext)

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        background: "white",
      }}
    >
      {Children.toArray(children)?.[selectedIndex]}
    </div>
  )
}

export { Tab, TabList, TabPanel, TabPanels, Tabs }
