import mount from "./cypress/support/mount"

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}
