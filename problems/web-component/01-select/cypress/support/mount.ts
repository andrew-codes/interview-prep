import { getContainerEl } from "@cypress/mount-utils"
import "cypress-cdp"
import { html, LitElement, render } from "lit"
import { unsafeHTML } from "lit/directives/unsafe-html.js"

const mount = (_element: typeof LitElement, template: string) => {
  cy.CDP("Emulation.setDeviceMetricsOverride", {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2,
    mobile: false,
  })

  const target = getContainerEl()

  render(html`${unsafeHTML(template)}`, target)

  return cy
    .wait(0, { log: false })
    .then(() => {
      const mountMessage = `
        <${String(_element.constructor.name)} ... />
      `

      Cypress.log({
        name: "mount",
        message: [mountMessage],
      })
        .snapshot("mounted")
        .end()
    })
    .get("[data-cy-root]")
    .children()
    .first()
    .shadow()
}

export default mount
