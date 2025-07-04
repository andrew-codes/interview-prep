const { createProjectGraphAsync, getProjects } = require("@nx/devkit")
const { execSync } = require("child_process")

;(async () => {
  const args = process.argv
    .slice(2)
    .map((arg) => arg.replace("--", "").split("="))
    .reduce((acc, [key, value]) => {
      acc[key] = value

      return acc
    }, {})
  const { target, tag } = args
  if (!target || !tag) {
    throw new Error(`Missing one or more CLI arguments.
Required:
  - tag
  - target`)
  }

  const graph = await createProjectGraphAsync()

  const projects = await getProjects(graph)

  const filteredProjects = Object.entries(projects)
    .filter(([_, node]) => node.data.tags?.includes(tag) && node.data.tags?.includes("problem"))
    .map(([name]) => name)

  if (filteredProjects.length === 0) {
    throw new Error(`No projects tagged '${tag}'`)
  }

  const projectList = filteredProjects.join(",")
  console.log(`Running '${target}' on projects: ${projectList}`)

  execSync(`yarn nx run-many --target=${target} --projects=${projectList}`, {
    stdio: "inherit",
  })
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
