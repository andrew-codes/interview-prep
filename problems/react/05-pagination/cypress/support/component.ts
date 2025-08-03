import "cypress-cdp"
import compareSnapshotCommand from "cypress-image-diff-js"
import { mount } from "cypress/react"

Cypress.Commands.add("mount", (component, options) => {
  cy.CDP("Emulation.setDeviceMetricsOverride", {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2,
    mobile: false,
  })

  return mount(component, options)
})

compareSnapshotCommand()
