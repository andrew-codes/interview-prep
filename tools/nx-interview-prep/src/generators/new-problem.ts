import {
  addProjectConfiguration,
  detectPackageManager,
  formatFiles,
  generateFiles,
  getPackageManagerCommand,
  Tree,
} from "@nx/devkit"
import { execSync } from "child_process"
import fs from "fs/promises"
import { startCase, toLower } from "lodash"
import * as path from "path"
import { NewProblemGeneratorSchema } from "./schema"

export async function createNewGenerator(tree: Tree, options: NewProblemGeneratorSchema) {
  console.debug(options)
  try {
    const ghOutput = execSync("gh auth status", {
      cwd: tree.root,
      stdio: "pipe",
    }).toString()

    if (ghOutput.includes("not logged in") && !options.skipGh) {
      throw new Error(
        "You are not logged in to GitHub CLI. Please run `gh auth login` to authenticate. Alternatively, you can run this generator with the `--skip-gh` flag to skip GitHub-related commands.",
      )
    }
  } catch (error) {
    if (!options.skipGh) {
      throw new Error(
        "You are not logged in to GitHub CLI. Please run `gh auth login` to authenticate. Alternatively, you can run this generator with the `--skip-gh` flag to skip GitHub-related commands.",
      )
    }
  }
  const projectRootPrefix = path.join("problems", options.language)
  await fs.mkdir(projectRootPrefix, { recursive: true })

  const lastProblemPrefix =
    (await fs.readdir(projectRootPrefix))
      .sort((a, b) => {
        const aNum = parseInt(a.split("-")[0], 10)
        const bNum = parseInt(b.split("-")[0], 10)
        return aNum - bNum
      })
      ?.pop()
      ?.split("-")?.[0] || "00"
  const nextProblemNumber = String(parseInt(lastProblemPrefix, 10) + 1).padStart(2, "0")

  const problemId = `${options.language}-${nextProblemNumber}`
  const projectRoot = path.join(
    projectRootPrefix,
    `${nextProblemNumber}-${options.name.replace(" ", "-")}`,
  )

  let targets = {}
  switch (options.language) {
    case "react":
      targets = {
        start: {
          executor: "nx:run-commands",
          options: {
            command: "yarn cypress open --component --browser edge",
            cwd: "{projectRoot}",
          },
        },
        test: {
          executor: "nx:run-commands",
          options: {
            command: "yarn cypress run --component --browser edge",
            cwd: "{projectRoot}",
          },
        },
      }
      break
    case "typescript":
      targets = {
        start: {
          executor: "@nx/jest:jest",
          outputs: ["{workspaceRoot}/coverage/{projectRoot}"],
          defaultConfiguration: "run",
          options: {
            jestConfig: "{projectRoot}/jest.config.ts",
            watch: true,
          },
        },
        test: {
          executor: "@nx/jest:jest",
          outputs: ["{workspaceRoot}/coverage/{projectRoot}"],
          options: {
            jestConfig: "{projectRoot}/jest.config.ts",
          },
        },
      }
      break
  }

  addProjectConfiguration(tree, problemId, {
    root: projectRoot,
    projectType: "library",
    sourceRoot: path.join(projectRoot, "src"),
    tags: [options.language, "problem"],
    targets,
  })
  generateFiles(tree, path.join(__dirname, `${options.language}-problem-files`), projectRoot, {
    ...options,
    problemId,
    pathToRoot: path.relative(projectRoot, tree.root),
    title: startCase(toLower(`${options.language} ${options.name}`)),
  })
  await formatFiles(tree)

  return async () => {
    execSync(getPackageManagerCommand(detectPackageManager(tree.root)).install, {
      cwd: tree.root,
      stdio: "inherit",
    })

    if (!options.skipGh) {
      execSync(
        `git checkout -b ${problemId}; git add .; git commit -m "${options.name} ${problemId} creation"; git push -u origin ${problemId};`,
        {
          cwd: tree.root,
          stdio: "inherit",
        },
      )

      execSync(
        `gh pr create --title "${options.name} ${problemId}" --body "Problem created for ${options.language} interview preparation." --label "practice problem";`,
        {
          cwd: tree.root,
          stdio: "inherit",
        },
      )
    }
  }
}

export default createNewGenerator
