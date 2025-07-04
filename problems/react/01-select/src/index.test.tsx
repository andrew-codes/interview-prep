import { Option, Select } from "."

describe("select", () => {
  it(`No selected value.`, () => {
    cy.mount(
      <Select>
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
        <Option value="3">Option 3</Option>
      </Select>,
    )

    cy.get("[data-test-id=option]").parent().should("not.be.visible")
  })

  it(`Selected value set.`, () => {
    cy.mount(
      <Select defaultValue="2">
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
        <Option value="3">Option 3</Option>
      </Select>,
    )

    cy.get('[data-test-id="selected-value"]').should("have.text", "Option 2")
    cy.get("[data-test-id=option]").parent().should("not.be.visible")
  })

  it(`Select a new selected value.`, () => {
    cy.mount(
      <Select defaultValue="2">
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
        <Option value="3">Option 3</Option>
      </Select>,
    )

    cy.get('[data-test-id="select"]').click()
    cy.get("[data-test-id=option]").parent().should("be.visible")
    cy.get("[data-test-id=option]").last().click()
    cy.get('[data-test-id="selected-value"]').should("have.text", "Option 3")
    cy.get("[data-test-id=option]").parent().should("not.be.visible")
  })

  describe("Keyboard navigation.", () => {
    it(`Pressing down arrow key moves active selection to next option.
        - Stops at the last option.`, () => {
      cy.mount(
        <Select defaultValue="2">
          <Option value="1">Option 1</Option>
          <Option value="2">Option 2</Option>
          <Option value="3">Option 3</Option>
        </Select>,
      )

      cy.get('[data-test-id="select"]').focus()
      cy.focused().trigger("keydown", { key: "Enter" })
      cy.get('[data-test-id="selected-value"]').should("have.text", "Option 2")
      cy.get("[data-test-id=option]").parent().should("not.be.visible")

      cy.focused().trigger("keydown", { key: "ArrowDown" })
      cy.get("[data-test-id=option]").parent().should("be.visible")

      cy.focused().trigger("keydown", { key: "ArrowDown" })
      cy.focused().trigger("keydown", { key: "ArrowDown" })
      cy.focused().trigger("keydown", { key: "ArrowDown" })
      cy.focused().trigger("keydown", { key: "ArrowDown" })
      cy.focused().trigger("keydown", { key: "Enter" })

      cy.get("[data-test-id=option]").parent().should("not.be.visible")
      cy.get('[data-test-id="selected-value"]').should("have.text", "Option 3")
    })

    it(`Pressing up arrow key moves active selection to previous option.
        - Stops at the first option.`, () => {
      cy.mount(
        <Select defaultValue="2">
          <Option value="1">Option 1</Option>
          <Option value="2">Option 2</Option>
          <Option value="3">Option 3</Option>
        </Select>,
      )

      cy.get('[data-test-id="select"]').focus()

      cy.focused().trigger("keydown", { key: "ArrowDown" })
      cy.get("[data-test-id=option]").parent().should("be.visible")

      cy.focused().trigger("keydown", { key: "ArrowDown" })
      cy.focused().trigger("keydown", { key: "ArrowUp" })
      cy.focused().trigger("keydown", { key: "ArrowUp" })
      cy.focused().trigger("keydown", { key: "ArrowUp" })
      cy.focused().trigger("keydown", { key: "Enter" })

      cy.get("[data-test-id=option]").parent().should("not.be.visible")
      cy.get('[data-test-id="selected-value"]').should("have.text", "Option 1")
    })

    it(`Pressing escape key closes the select menu.`, () => {
      cy.mount(
        <Select defaultValue="2">
          <Option value="1">Option 1</Option>
          <Option value="2">Option 2</Option>
          <Option value="3">Option 3</Option>
        </Select>,
      )

      cy.get('[data-test-id="select"]').focus()

      cy.focused().trigger("keydown", { key: "ArrowDown" })
      cy.focused().trigger("keydown", { key: "ArrowDown" })
      cy.focused().trigger("keydown", { key: "Escape" })
      cy.get("[data-test-id=option]").parent().should("not.be.visible")
      cy.get('[data-test-id="selected-value"]').should("have.text", "Option 2")
    })

    it(`Pressing tab key closes menu and moves to next tab stop.`, () => {
      cy.mount(
        <>
          <Select defaultValue="2">
            <Option value="1">Option 1</Option>
            <Option value="2">Option 2</Option>
            <Option value="3">Option 3</Option>
          </Select>
          <input type="text" />
        </>,
      )

      cy.get('[data-test-id="select"]').focus()
      cy.focused().trigger("keydown", { key: "ArrowDown" })
      cy.focused().trigger("keydown", { key: "ArrowDown" })
      cy.press(Cypress.Keyboard.Keys.TAB)
      cy.get("[data-test-id=option]").parent().should("not.be.visible")
      cy.get("input").should("be.focused")
    })
  })

  describe("Mouse interactions", () => {
    it(`Mousing over an option sets it as the active item`, () => {
      cy.mount(
        <Select defaultValue="2">
          <Option value="1">Option 1</Option>
          <Option value="2">Option 2</Option>
          <Option value="3">Option 3</Option>
        </Select>,
      )

      cy.get('[data-test-id="select"]').focus()
      cy.focused().trigger("keydown", { key: "ArrowDown" })
      cy.focused().trigger("keydown", { key: "ArrowDown" })
      cy.focused().trigger("keydown", { key: "ArrowDown" })
      cy.focused().trigger("keydown", { key: "ArrowDown" })
      cy.get('[data-test-id="option"]').first().trigger("mouseover")
      cy.focused().trigger("keydown", { key: "Enter" })
      cy.get("[data-test-id=option]").parent().should("not.be.visible")
      cy.get('[data-test-id="selected-value"]').should("have.text", "Option 1")
    })
  })
})
