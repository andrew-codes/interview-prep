import { useState } from "react"
import { Dialog } from "."

describe("modal", () => {
  beforeEach(() => {
    cy.get("body").invoke("css", "overflow", "initial")
  })

  it(`Opening/closing modal.
    - Shows scrim behind modal contents.
    - Removes scrollbar.`, () => {
    cy.mount(<ModalApp />)

    cy.get("button").first().click()

    cy.get("[data-test-id=dialog]")
    cy.compareSnapshot("open-modal")
    cy.get("[data-test-id=scrim]").click({ force: true })

    cy.get("[data-test-id=dialog]").should("not.exist")
    cy.compareSnapshot("closed-modal")
  })

  it(`Clicking modal does not close modal.`, () => {
    cy.mount(<ModalApp />)

    cy.get("button").first().click()
    cy.get("[data-test-id=dialog]").click({ force: true })
    cy.get("[data-test-id=dialog]")
  })

  it(`Escape key closes modal.`, () => {
    cy.mount(<ModalApp />)

    cy.get("button").first().click()
    cy.focused().trigger("keydown", { key: "Escape", force: true })
    cy.get("[data-test-id=dialog]").should("not.exist")

    cy.get("button").first().click()
    cy.get("[data-test-id=dialog]")
      .click({ force: true })
      .trigger("keydown", { key: "Escape", force: true })
    cy.get("[data-test-id=dialog]").should("not.exist")
  })

  it(`Tab cycles within modal when open.`, () => {
    cy.mount(<ModalApp />)

    cy.get("button").first().click()
    cy.press(Cypress.Keyboard.Keys.TAB)

    cy.get("input").first().should("be.focused")
    cy.press(Cypress.Keyboard.Keys.TAB)
    cy.get("input").last().should("be.focused")
    cy.press(Cypress.Keyboard.Keys.TAB)
    cy.press(Cypress.Keyboard.Keys.TAB)
    cy.get("input").first().should("be.focused")
  })

  it(`Closing opening/closing modal does not impact scroll.`, () => {
    cy.mount(<ModalApp />)

    cy.get("button").first().scrollIntoView()
    cy.window().then((win) => {
      expect(win.scrollY).to.equal(150)
    })

    cy.get("button").first().click()
    cy.get("[data-test-id=scrim").click()

    cy.window().then((win) => {
      expect(win.scrollY).to.equal(150)
    })
  })
})

const ModalApp = () => {
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)

  return (
    <div>
      <p style={{ marginTop: "150px" }} />
      <button onClick={() => setOpen1(true)}>Open Modal</button>
      <button onClick={() => setOpen2(true)}>Open Second Modal</button>
      <p style={{ marginTop: "150vh" }}>Scrollable content</p>
      <Dialog
        open={open1}
        onClose={() => {
          setOpen1(false)
        }}
      >
        <div style={{ background: "white", padding: "1.5rem", width: "350px" }}>
          <h1>Contact Form</h1>
          <input type="text" />
          <input type="text" />
        </div>
      </Dialog>
      <Dialog open={open2} onClose={() => setOpen2(false)}>
        <div style={{ background: "white", padding: "1.5rem" }}>
          <h1>Another Form</h1>
          <input type="text" />
        </div>
      </Dialog>
    </div>
  )
}
