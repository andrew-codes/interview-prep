import { ExecutorContext } from "@nx/devkit"

import { UpdateVisualRegressionBaselinesExecutorSchema } from "./schema"
import executor from "./update-visual-regression-baselines"

const options: UpdateVisualRegressionBaselinesExecutorSchema = {}
const context: ExecutorContext = {
  root: "",
  cwd: process.cwd(),
  isVerbose: false,
  projectGraph: {
    nodes: {},
    dependencies: {},
  },
  projectsConfigurations: {
    projects: {},
    version: 2,
  },
  nxJsonConfiguration: {},
}

describe("UpdateVisualRegressionBaselines Executor", () => {
  it("can run", async () => {
    const output = await executor(options, context)
    expect(output.success).toBe(true)
  })
})
