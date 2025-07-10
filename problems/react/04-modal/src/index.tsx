import { FC, PropsWithChildren, useCallback, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

const Dialog: FC<PropsWithChildren<{ onClose?: () => void; open: boolean }>> = ({
  children,
  onClose,
  open,
}) => {
  const handleClose = useCallback(() => {
    onClose?.()
  }, [onClose])

  const overflowStyle = useRef<string | null>(null)
  useEffect(() => {
    overflowStyle.current = document.body.style.overflow
  }, [])
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      return
    }
    if (overflowStyle.current) {
      document.body.style.overflow = overflowStyle.current
    } else {
      document.body.style.overflow = "initial"
    }
  }, [open])

  useEffect(() => {
    function handleKeyDown(evt: KeyboardEvent) {
      if (open && evt.key === "Escape") {
        handleClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleClose, open])

  const tabStart = useRef<HTMLDivElement>(null)
  const tabStop = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) {
      return
    }

    tabStart.current?.focus()
  }, [open])

  return (
    <>
      {open &&
        createPortal(
          <>
            <div
              data-test-id="scrim"
              onClick={handleClose}
              style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0, 0.5)",
              }}
            >
              <div
                tabIndex={0}
                ref={tabStart}
                onKeyDown={(evt) => {
                  if (evt.key === "Tab" && evt.shiftKey) {
                    tabStop.current?.focus()
                  }
                }}
              />
              <div
                data-test-id="dialog"
                onClick={(evt) => {
                  evt.stopPropagation()
                }}
                style={{
                  margin: "auto auto",
                }}
              >
                {children}
              </div>
              <div
                tabIndex={0}
                ref={tabStop}
                onKeyDown={(evt) => {
                  if (evt.key === "Tab") {
                    tabStart.current?.focus()
                  }
                }}
              />
            </div>
          </>,
          document.body,
        )}
    </>
  )
}

export { Dialog }
