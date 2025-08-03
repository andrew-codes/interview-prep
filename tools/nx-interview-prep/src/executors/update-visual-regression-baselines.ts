import { PromiseExecutor } from "@nx/devkit"
import { runCommands } from "nx/src/executors/run-commands/run-commands.impl"
import { UpdateVisualRegressionBaselinesExecutorSchema } from "./schema"

const run: PromiseExecutor<UpdateVisualRegressionBaselinesExecutorSchema> = async (
  options,
  ctx,
) => {
  if (!ctx.projectName) {
    throw new Error("The project name is required. Please specify it in the executor options.")
  }
  if (!options.testTarget) {
    throw new Error(
      "The 'testTarget' option is required. Please specify it in the executor options.",
    )
  }

  await (
    await runCommands(
      {
        command: `nx ${options.testTarget} ${ctx.projectName}`,
        cwd: options.cwd,
        __unparsed__: [],
      },
      ctx,
    )
  ).getResults()

  const result = await runCommands(
    {
      command: `cypress-image-diff-html-report start --reportJsonDir visual-tests/report --autoOpen`,
      cwd: options.cwd,
      __unparsed__: [],
    },
    ctx,
  )

  return {
    success: (await result.getResults()).code === 0,
  }
}

export default run
