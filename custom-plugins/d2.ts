import path from "path"
import remarkD2 from "remark-d2"
import { PluggableList } from "unified"
import { QuartzTransformerPlugin } from "../quartz/plugins/types"

export interface Options {}

export const D2: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  return {
    name: "Replace D2 Code Blocks with PNG Images",
    markdownPlugins() {
      const plugins: PluggableList = []

      // Add rehype-citation to the list of plugins
      plugins.push([
        remarkD2,
        {
          compilePath: path.join("public/d2"),
          ext: "svg",
          defaultImageAttributes: {
            width: "100%",
          },
        },
      ])

      return plugins
    },
  }
}
