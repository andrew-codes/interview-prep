import { Tab, TabList, TabPanel, TabPanels, Tabs } from "."

describe("tabs", () => {
  it(`Default activated tab is the first tab.`, () => {
    cy.mount(
      <Tabs>
        <div data-test-id="capture">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Contents 1</TabPanel>
            <TabPanel>Contents 2</TabPanel>
            <TabPanel>Contents 3</TabPanel>
          </TabPanels>
        </div>
      </Tabs>,
    )

    cy.get("[data-test-id=tab-panel]").should("have.text", "Contents 1")
    cy.get("[data-test-id=capture]").compareSnapshot("default-activated")
  })

  it(`Only one tab panel is visible at a time.`, () => {
    cy.mount(
      <Tabs>
        <div data-test-id="capture">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Contents 1</TabPanel>
            <TabPanel>Contents 2</TabPanel>
            <TabPanel>Contents 3</TabPanel>
          </TabPanels>
        </div>
      </Tabs>,
    )

    cy.get("[data-test-id=tab-panel]").should("have.length", 1)
  })

  it("A default tab can be set as the activated tab.", () => {
    cy.mount(
      <Tabs>
        <div data-test-id="capture">
          <TabList defaultIndex={1}>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Contents 1</TabPanel>
            <TabPanel>Contents 2</TabPanel>
            <TabPanel>Contents 3</TabPanel>
          </TabPanels>
        </div>
      </Tabs>,
    )

    cy.get("[data-test-id=tab-panel]").should("have.text", "Contents 2")
    cy.get("[data-test-id=tab-panel]").should("have.length", 1)
  })

  it("A tab panel can be activated by clicking on its corresponding tab.", () => {
    cy.mount(
      <Tabs>
        <div data-test-id="capture">
          <TabList defaultIndex={1}>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Contents 1</TabPanel>
            <TabPanel>Contents 2</TabPanel>
            <TabPanel>Contents 3</TabPanel>
          </TabPanels>
        </div>
      </Tabs>,
    )

    cy.get("[data-test-id=tab]").last().click()

    cy.get("[data-test-id=tab-panel]").should("have.text", "Contents 3")
    cy.get("[data-test-id=tab-panel]").should("have.length", 1)

    cy.get("[data-test-id=capture]").compareSnapshot("click-tab")
  })

  it("Mousing over a tab selects it.", () => {
    cy.mount(
      <Tabs>
        <div data-test-id="capture">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Contents 1</TabPanel>
            <TabPanel>Contents 2</TabPanel>
            <TabPanel>Contents 3</TabPanel>
          </TabPanels>
        </div>
      </Tabs>,
    )

    cy.get("[data-test-id=tab]").last().trigger("mouseover")
    cy.get("[data-test-id=capture]").compareSnapshot("mouse-over-selects")
  })

  it("Click a tab sets the selection to the clicked tab.", () => {
    cy.mount(
      <Tabs>
        <div data-test-id="capture">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Contents 1</TabPanel>
            <TabPanel>Contents 2</TabPanel>
            <TabPanel>Contents 3</TabPanel>
          </TabPanels>
        </div>
      </Tabs>,
    )

    cy.get("[data-test-id=tab]").last().trigger("mouseover")
    cy.get("[data-test-id=tab]").first().click()
  })

  describe("Keyboard navigation", () => {
    it(`Left arrow.
      - Moves tab selection to left tab.
      - Tab selection stops on left most tab.`, () => {
      cy.mount(
        <Tabs>
          <div data-test-id="capture">
            <TabList>
              <Tab>Tab 1</Tab>
              <Tab>Tab 2</Tab>
              <Tab>Tab 3</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>Contents 1</TabPanel>
              <TabPanel>Contents 2</TabPanel>
              <TabPanel>Contents 3</TabPanel>
            </TabPanels>
          </div>
        </Tabs>,
      )

      cy.get("[data-test-id=tab]").last().trigger("mouseover")
      cy.get("[data-test-id=tab-list]").focus()
      cy.focused().trigger("keydown", { key: "ArrowLeft" })
      cy.focused().trigger("keydown", { key: "ArrowLeft" })
      cy.focused().trigger("keydown", { key: "ArrowLeft" })
      cy.focused().trigger("keydown", { key: "ArrowLeft" })
      cy.get("[data-test-id=capture]").compareSnapshot("left-most-keyboard-nav")
    })

    it(`Right arrow.
      - Moves tab selection to right tab.
      - Tab selection stops on right most tab.`, () => {
      cy.mount(
        <Tabs>
          <div data-test-id="capture">
            <TabList>
              <Tab>Tab 1</Tab>
              <Tab>Tab 2</Tab>
              <Tab>Tab 3</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>Contents 1</TabPanel>
              <TabPanel>Contents 2</TabPanel>
              <TabPanel>Contents 3</TabPanel>
            </TabPanels>
          </div>
        </Tabs>,
      )

      cy.get("[data-test-id=tab]").first().trigger("mouseover")
      cy.get("[data-test-id=tab-list]").focus()
      cy.focused().trigger("keydown", { key: "ArrowRight" })
      cy.focused().trigger("keydown", { key: "ArrowRight" })
      cy.focused().trigger("keydown", { key: "ArrowRight" })
      cy.focused().trigger("keydown", { key: "ArrowRight" })
      cy.get("[data-test-id=capture]").compareSnapshot("right-most-keyboard-nav")
    })

    it(`Enter activates selected tab.`, () => {
      cy.mount(
        <Tabs>
          <div data-test-id="capture">
            <TabList>
              <Tab>Tab 1</Tab>
              <Tab>Tab 2</Tab>
              <Tab>Tab 3</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>Contents 1</TabPanel>
              <TabPanel>Contents 2</TabPanel>
              <TabPanel>Contents 3</TabPanel>
            </TabPanels>
          </div>
        </Tabs>,
      )

      cy.get("[data-test-id=tab]").last().trigger("mouseover")
      cy.get("[data-test-id=tab-list]").focus()
      cy.focused().trigger("keydown", { key: "Enter" })

      cy.get("[data-test-id=tab-panel]").should("have.text", "Contents 3")
      cy.get("[data-test-id=tab-panel]").should("have.length", 1)
    })

    it(`Space activates selected tab.`, () => {
      cy.mount(
        <Tabs>
          <div data-test-id="capture">
            <TabList>
              <Tab>Tab 1</Tab>
              <Tab>Tab 2</Tab>
              <Tab>Tab 3</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>Contents 1</TabPanel>
              <TabPanel>Contents 2</TabPanel>
              <TabPanel>Contents 3</TabPanel>
            </TabPanels>
          </div>
        </Tabs>,
      )

      cy.get("[data-test-id=tab]").last().trigger("mouseover")
      cy.get("[data-test-id=tab-list]").focus()
      cy.focused().trigger("keydown", { key: "Space" })

      cy.get("[data-test-id=tab-panel]").should("have.text", "Contents 3")
      cy.get("[data-test-id=tab-panel]").should("have.length", 1)
    })
  })

  describe("Tab stops.", () => {
    it("Tab next tab stop is the associated tab pane, followed by tab stops within pane.", () => {
      cy.mount(
        <Tabs>
          <div data-test-id="capture">
            <TabList>
              <Tab>Tab 1</Tab>
              <Tab>Tab 2</Tab>
              <Tab>Tab 3</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <span>Contents 1</span>
                <input type="text" />
              </TabPanel>
              <TabPanel>
                <span>Contents 2</span>
                <input type="text" data-test-id="inner-tab-stop" />
              </TabPanel>
              <TabPanel>
                <span>Contents 3</span>
                <input type="text" />
              </TabPanel>
            </TabPanels>
          </div>
        </Tabs>,
      )

      cy.get("[data-test-id=tab").eq(1).click()
      cy.get("[data-test-id=tab-list]").focus()
      cy.press(Cypress.Keyboard.Keys.TAB)

      cy.get("[data-test-id=tab-panel]").should("be.focused")
      cy.get("[data-test-id=capture]").compareSnapshot("tab-panel-focused")

      cy.press(Cypress.Keyboard.Keys.TAB)
      cy.get("[data-test-id=inner-tab-stop]").should("be.focused")
    })
  })
})
