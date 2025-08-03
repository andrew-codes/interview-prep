import compareSnapshotCommand from "cypress-image-diff-js"
import mount from "./mount"

Cypress.Commands.add("mount", mount)

compareSnapshotCommand()
