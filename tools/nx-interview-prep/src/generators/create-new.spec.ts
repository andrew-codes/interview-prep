import { createTreeWithEmptyWorkspace } from "@nx/devkit/testing"
import { Tree, readProjectConfiguration } from "@nx/devkit"

import { createNewGenerator } from "./create-new"
import { CreateNewGeneratorSchema } from "./schema"

describe("create-new generator", () => {
  let tree: Tree
  const options: CreateNewGeneratorSchema = { name: "test" }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it("should run successfully", async () => {
    await createNewGenerator(tree, options)
    const config = readProjectConfiguration(tree, "test")
    expect(config).toBeDefined()
  })
})
