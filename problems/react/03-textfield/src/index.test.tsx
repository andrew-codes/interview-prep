import { TextField } from "./"

describe("textfield", () => {
  it(`Accepts user input.`, () => {
    cy.mount(<TextField />)

    cy.get("input").type("abc")
    cy.get("input").should("have.value", "abc")
    cy.get("[data-test-id=textfield").compareSnapshot("accepts-user-input")
  })

  it(`Default value.`, () => {
    cy.mount(<TextField defaultValue={"hello"} />)

    cy.get("input").type(" abc")
    cy.get("input").should("have.value", "hello abc")
  })

  it(`Layout with other fields.`, () => {
    cy.mount(
      <div data-test-id="capture">
        <TextField />
        <div style={{ display: "inline-block", width: "50%" }}>
          <TextField />
        </div>
        <div style={{ display: "inline-block", width: "50%" }}>
          <TextField />
        </div>
      </div>,
    )

    cy.get("input").first().type("abc")
    cy.get("input").first().should("have.value", "abc")
    cy.get("[data-test-id=capture").compareSnapshot("layout-with-fields")
  })

  it(`Focus/blur`, () => {
    cy.mount(<TextField />)

    cy.get("input").focus()
    cy.get("[data-test-id=textfield").compareSnapshot("focused")

    cy.focused().blur()
    cy.get("[data-test-id=textfield").compareSnapshot("blurred")
  })

  it(`Hint text.`, () => {
    cy.mount(<TextField hintText="type your answer here" />)

    cy.get("[data-test-id=textfield").compareSnapshot("hint-text-no-value")
    cy.get("input").focus().type("abc")
    cy.get("[data-test-id=textfield").compareSnapshot("hint-text-with-value")
  })

  it(`Adornments.`, () => {
    cy.mount(
      <div data-test-id="capture">
        <TextField hintText="type your answer here" startAdornment={<span>$</span>} />
        <TextField hintText="type your answer here" endAdornment={"kg"} />
        <TextField
          hintText="type your answer here"
          startAdornment={<span>$</span>}
          endAdornment={"kg"}
        />
      </div>,
    )

    cy.get("[data-test-id=capture").compareSnapshot("adornments-no-value")
    cy.get("[data-test-id=textfield")
      .first()
      .find("[data-test-id=adornment]")
      .first()
      .click()
      .type("abc")
    cy.get("[data-test-id=textfield")
      .eq(1)
      .find("[data-test-id=adornment]")
      .last()
      .click()
      .type("abc")
    cy.get("[data-test-id=textfield").last().find("input").focus().type("abc")
    cy.get("[data-test-id=capture").compareSnapshot("adornments-with-value")
  })

  it(`Error state.`, () => {
    cy.mount(
      <div data-test-id="capture">
        <TextField
          hintText="type your answer here"
          startAdornment={<span>$</span>}
          endAdornment={"kg"}
          error
        />
        <TextField
          hintText="type your answer here"
          startAdornment={<span>$</span>}
          endAdornment={"kg"}
          error="this is invalid"
        />
      </div>,
    )

    cy.get("[data-test-id=capture").compareSnapshot("error-no-value")
    cy.get("input").first().focus().type("abc")
    cy.get("input").last().focus().type("abc")
    cy.get("[data-test-id=capture").compareSnapshot("error-with-value")
  })
})
