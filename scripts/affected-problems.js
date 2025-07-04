const { createProjectGraphAsync } = require("@nx/devkit")
const { execSync } = require("child_process")

;(async () => {
  const args = process.argv
    .slice(2)
    .map((arg) => arg.replace("--", "").split("="))
    .reduce((acc, [key, value]) => {
      acc[key] = value

      return acc
    }, {})
  const { base, head, target, tag } = args
  if (!base || !head || !target || !tag) {
    throw new Error(`Missing one or more CLI arguments.
Required:
  - base
  - head
  - tag
  - target`)
  }

  const graph = await createProjectGraphAsync()
  const affectedProjects = execSync(
    `npx nx show projects --affected --base=${base} --head=${head}`,
    {
      encoding: "utf-8",
    },
  )
    .trim()
    .split("\n")

  const projects = Object.entries(graph.nodes)
    .filter(
      ([name, node]) =>
        affectedProjects.includes(name) &&
        node.data.tags?.includes(tag) &&
        node.data.tags?.includes("problem"),
    )
    .map(([name]) => name)

  if (projects.length === 0) {
    process.exit(0)
  }

  const projectList = projects.join(",")
  console.log(`Running '${target}' on projects: ${projectList}`)

  execSync(`yarn nx run-many --target=${target} --projects=${projectList}`, {
    stdio: "inherit",
  })
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
