import { addProjectConfiguration, formatFiles, generateFiles, Tree } from "@nx/devkit"
import * as path from "path"
import { CreateNewGeneratorSchema } from "./schema"

export async function createNewGenerator(tree: Tree, options: CreateNewGeneratorSchema) {
  const projectRoot = `libs/${options.name}`
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: "library",
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  })
  generateFiles(tree, path.join(__dirname, "files"), projectRoot, options)
  await formatFiles(tree)
}

export default createNewGenerator
