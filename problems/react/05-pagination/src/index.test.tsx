import { Pagination } from "./"

describe("pagination", () => {
  it(`Renders page buttons.`, () => {
    cy.mount(<Pagination total={20} />)
  })

  it("Set page to 1.", () => {
    cy.mount(<Pagination total={20} />)

    cy.contains("button", "1").click()

    cy.get("button").eq(1).should("contain.text", "1")
    cy.get("button").eq(2).should("have.text", "2")
    cy.get("button").eq(3).should("have.text", "3")
    cy.get("button").eq(9).should("have.text", "20")
    cy.get("[data-test-id=pagination]").compareSnapshot("set-first-page")
  })

  it("Set page to last page.", () => {
    cy.mount(<Pagination total={20} />)

    cy.contains("button", "20").click()

    cy.get("button").eq(1).should("contain.text", "1")
    cy.get("button").eq(2).should("have.text", "13")
    cy.get("button").eq(8).should("have.text", "19")
    cy.get("button").eq(9).should("have.text", "20")
    cy.get("[data-test-id=pagination]").compareSnapshot("set-last-page")
  })

  it("Forward to end.", () => {
    cy.mount(<Pagination total={20} />)

    for (let i = 1; i <= 20; i++) {
      cy.contains("button", "next").click()
    }

    cy.get("button").eq(1).should("contain.text", "1")
    cy.get("button").eq(8).should("have.text", "19")
    cy.get("button").eq(9).should("contain.text", "20")
  })

  it("Previous to beginning.", () => {
    cy.mount(<Pagination total={20} />)

    for (let i = 1; i <= 20; i++) {
      cy.contains("button", "next").click()
    }
    for (let i = 1; i <= 20; i++) {
      cy.contains("button", "prev").click()
    }

    cy.get("button").eq(1).should("contain.text", "1")
    cy.get("button").eq(2).should("contain.text", "2")
    cy.get("button").eq(8).should("have.text", "8")
  })

  it("Forward through pages.", () => {
    cy.mount(<Pagination total={20} />)

    cy.contains("button", "8").click()

    cy.get("button").eq(1).should("contain.text", "1")
    cy.get("button").eq(2).should("have.text", "2")
    cy.get("button").eq(3).should("have.text", "3")
    cy.get("button").eq(8).should("have.text", "8")
    cy.get("button").eq(9).should("have.text", "20")

    for (let i = 1; i <= 6; i++) {
      cy.contains("button", "next").click()
    }

    cy.get("[data-test-id=pagination]").compareSnapshot("left-right-ellipsis")

    cy.get("button").eq(1).should("contain.text", "1")
    cy.get("button").eq(2).should("have.text", "9")
    cy.get("button").eq(7).should("have.text", "14")
    cy.get("button").eq(8).should("have.text", "20")

    cy.contains("button", "next").click()

    cy.get("button").eq(1).should("contain.text", "1")
    cy.get("button").eq(2).should("have.text", "13")
    cy.get("button").eq(8).should("have.text", "19")
    cy.get("button").eq(9).should("have.text", "20")
  })

  it("Previous through pages.", () => {
    cy.mount(<Pagination total={20} />)

    cy.contains("button", "20").click()
    cy.contains("button", "13").click()

    cy.get("button").eq(1).should("contain.text", "1")
    cy.get("button").eq(2).should("have.text", "13")
    cy.get("button").eq(8).should("have.text", "20")

    cy.contains("button", "prev").click()

    cy.get("button").eq(1).should("contain.text", "1")
    cy.get("button").eq(2).should("have.text", "7")
    cy.get("button").eq(7).should("have.text", "12")
    cy.get("button").eq(8).should("have.text", "20")

    for (let i = 1; i <= 6; i++) {
      cy.contains("button", "prev").click()
    }

    cy.get("button").eq(1).should("contain.text", "1")
    cy.get("button").eq(2).should("have.text", "2")
    cy.get("button").eq(3).should("have.text", "3")
    cy.get("button").eq(9).should("have.text", "20")
  })
})
