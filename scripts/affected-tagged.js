const { createProjectGraphAsync, getAffectedGraph } = require("@nx/devkit")
const { execSync } = require("child_process")

;(async () => {
  const args = process.argv
    .slice(3)
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
  - tags
  - target`)
  }

  const graph = await createProjectGraphAsync()

  const affectedGraph = await getAffectedGraph(graph, {
    base,
    head,
  })

  const projects = Object.entries(affectedGraph.nodes)
    .filter(([_, node]) => node.data.tags?.includes(tag))
    .map(([name]) => name)

  if (projects.length === 0) {
    throw new Error(`No affected projects tagged '${tag}'`)
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
