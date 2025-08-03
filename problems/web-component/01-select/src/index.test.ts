import { Select } from "."

describe("select", () => {
  it(`First test should not fail.`, () => {
    cy.mount(Select, "<p-select></p-select>")
  })
})

describe("select", () => {
  let options: Array<{ display: string; value: number }> = []
  beforeEach(() => {
    options = [
      {
        display: "Option 1",
        value: 1,
      },
      {
        display: "Option 2",
        value: 2,
      },
      {
        display: "Option 3",
        value: 3,
      },
    ]
  })

  it(`No selected value.`, () => {
    cy.mount(Select, `<p-select options='${JSON.stringify(options)}' />`).as("sut")

    cy.get("@sut").find("[data-test-id=option]").parent().should("not.be.visible")
    // cy.get("[data-test-id=select").compareSnapshot("no-value")
  })

  it(`Selected value set.`, () => {
    cy.mount(Select, `<p-select options='${JSON.stringify(options)}' value="2" />`).as("sut")
  })

  it(`Select a new selected value.`, () => {
    cy.mount(Select, `<p-select options='${JSON.stringify(options)}' value="2" />`).as("sut")

    cy.get("@sut").find('[data-test-id="select"]').click()
    cy.get("@sut").find("[data-test-id=option]").parent().should("be.visible")

    cy.get("@sut").find("[data-test-id=option]").last().click()
    cy.get("@sut").find(".selected").should("have.text", "Option 3")
    cy.get("@sut").find("[data-test-id=option]").parent().should("not.be.visible")
  })

  // it(`Focused indication`, () => {
  //   cy.mount(
  //     <Select defaultValue="2">
  //       <Option value="1">Option 1</Option>
  //       <Option value="2">Option 2</Option>
  //       <Option value="3">Option 3</Option>
  //     </Select>,
  //   )

  //   cy.get("body").press(Cypress.Keyboard.Keys.TAB)
  //   cy.get("[data-test-id=select]").compareSnapshot("focused")
  // })

  // describe("Keyboard navigation.", () => {
  //   it(`Pressing down arrow key moves active selection to next option.
  //       - Stops at the last option.`, () => {
  //     cy.mount(
  //       <Select defaultValue="2">
  //         <Option value="1">Option 1</Option>
  //         <Option value="2">Option 2</Option>
  //         <Option value="3">Option 3</Option>
  //       </Select>,
  //     )

  //     cy.get('[data-test-id="select"]').focus()
  //     cy.focused().trigger("keydown", { key: "Enter" })
  //     cy.get('[data-test-id="selected-value"]').should("have.text", "Option 2")
  //     cy.get("[data-test-id=option]").parent().should("not.be.visible")

  //     cy.focused().trigger("keydown", { key: "ArrowDown" })
  //     cy.get("[data-test-id=option]").parent().should("be.visible")

  //     cy.focused().trigger("keydown", { key: "ArrowDown" })
  //     cy.focused().trigger("keydown", { key: "ArrowDown" })
  //     cy.focused().trigger("keydown", { key: "ArrowDown" })
  //     cy.focused().trigger("keydown", { key: "ArrowDown" })
  //     cy.compareSnapshot({
  //       name: "open-arrow-down-bottom",
  //       cypressScreenshotOptions: {
  //         clip: { x: 0, y: 0, width: 500, height: 100 },
  //       },
  //     })

  //     cy.focused().trigger("keydown", { key: "Enter" })

  //     cy.get("[data-test-id=option]").parent().should("not.be.visible")
  //     cy.get('[data-test-id="selected-value"]').should("have.text", "Option 3")
  //   })

  //   it(`Pressing up arrow key moves active selection to previous option.
  //       - Stops at the first option.`, () => {
  //     cy.mount(
  //       <Select defaultValue="2">
  //         <Option value="1">Option 1</Option>
  //         <Option value="2">Option 2</Option>
  //         <Option value="3">Option 3</Option>
  //       </Select>,
  //     )

  //     cy.get('[data-test-id="select"]').focus()

  //     cy.focused().trigger("keydown", { key: "ArrowDown" })
  //     cy.get("[data-test-id=option]").parent().should("be.visible")

  //     cy.focused().trigger("keydown", { key: "ArrowDown" })
  //     cy.focused().trigger("keydown", { key: "ArrowUp" })
  //     cy.focused().trigger("keydown", { key: "ArrowUp" })
  //     cy.focused().trigger("keydown", { key: "ArrowUp" })
  //     cy.compareSnapshot({
  //       name: "open-arrow-up-top",
  //       cypressScreenshotOptions: {
  //         clip: { x: 0, y: 0, width: 500, height: 100 },
  //       },
  //     })

  //     cy.focused().trigger("keydown", { key: "Enter" })

  //     cy.get("[data-test-id=option]").parent().should("not.be.visible")
  //     cy.get('[data-test-id="selected-value"]').should("have.text", "Option 1")
  //   })

  //   it(`Pressing escape key closes the select menu.`, () => {
  //     cy.mount(
  //       <Select defaultValue="2">
  //         <Option value="1">Option 1</Option>
  //         <Option value="2">Option 2</Option>
  //         <Option value="3">Option 3</Option>
  //       </Select>,
  //     )

  //     cy.get('[data-test-id="select"]').focus()

  //     cy.focused().trigger("keydown", { key: "ArrowDown" })
  //     cy.focused().trigger("keydown", { key: "ArrowDown" })
  //     cy.focused().trigger("keydown", { key: "Escape" })
  //     cy.get("[data-test-id=option]").parent().should("not.be.visible")
  //     cy.get('[data-test-id="selected-value"]').should("have.text", "Option 2")
  //   })

  //   it(`Pressing tab key closes menu and moves to next tab stop.`, () => {
  //     cy.mount(
  //       <>
  //         <Select defaultValue="2">
  //           <Option value="1">Option 1</Option>
  //           <Option value="2">Option 2</Option>
  //           <Option value="3">Option 3</Option>
  //         </Select>
  //         <input type="text" />
  //       </>,
  //     )

  //     cy.get('[data-test-id="select"]').focus()
  //     cy.focused().trigger("keydown", { key: "ArrowDown" })
  //     cy.focused().trigger("keydown", { key: "ArrowDown" })
  //     cy.press(Cypress.Keyboard.Keys.TAB)
  //     cy.get("[data-test-id=option]").parent().should("not.be.visible")
  //     cy.get("input").should("be.focused")
  //   })
  // })

  // describe("Mouse interactions", () => {
  //   it(`Mousing over an option sets it as the active item`, () => {
  //     cy.mount(
  //       <Select defaultValue="2">
  //         <Option value="1">Option 1</Option>
  //         <Option value="2">Option 2</Option>
  //         <Option value="3">Option 3</Option>
  //       </Select>,
  //     )

  //     cy.get('[data-test-id="select"]').focus()
  //     cy.focused().trigger("keydown", { key: "ArrowDown" })
  //     cy.focused().trigger("keydown", { key: "ArrowDown" })
  //     cy.focused().trigger("keydown", { key: "ArrowDown" })
  //     cy.focused().trigger("keydown", { key: "ArrowDown" })
  //     cy.get('[data-test-id="option"]').first().trigger("mouseover")
  //     cy.focused().trigger("keydown", { key: "Enter" })
  //     cy.get("[data-test-id=option]").parent().should("not.be.visible")
  //     cy.get('[data-test-id="selected-value"]').should("have.text", "Option 1")
  //   })
  // })
})
