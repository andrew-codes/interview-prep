import remarkD2 from "remark-d2"
import { PluggableList } from "unified"
import { QuartzTransformerPlugin } from "../quartz/plugins/types"

export interface Options {}

export const Citations: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  return {
    name: "Replace D2 Code Blocks with PNG Images",
    markdownPlugins() {
      const plugins: PluggableList = []

      // Add rehype-citation to the list of plugins
      plugins.push([
        remarkD2,
        {
          defaultImageAttributes: {
            width: "100%",
          },
        },
      ])

      return plugins
    },
  }
}
