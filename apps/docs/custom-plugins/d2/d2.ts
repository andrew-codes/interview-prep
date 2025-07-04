import path from "path"
import { PluggableList } from "unified"
import { visit } from "unist-util-visit"
import { QuartzTransformerPlugin } from "../../quartz/plugins/types"
import remarkD2 from "./remark"

export interface Options {
  imageType?: "png" | "svg"
}

export const D2: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  return {
    name: "Replace D2 Code Blocks with PNG Images",
    markdownPlugins() {
      const plugins: PluggableList = []

      // Add rehype-citation to the list of plugins
      plugins.push([
        remarkD2,
        {
          defaultD2Opts: ["--theme", "0", "--dark-theme", "200"],
          compilePath: path.join("public/static/d2"),
          ext: userOpts?.imageType || "svg",
          defaultImageAttributes: {
            width: "100%",
          },
        },
      ])

      return plugins
    },
    htmlPlugins(ctx) {
      const baseUrlParts = ctx.cfg.configuration.baseUrl?.split("/")
      const suffix = baseUrlParts?.[baseUrlParts.length - 1] || ""

      const searchMatch = /^(\.\.\/)*d2\/content/
      return [
        () => {
          return (tree) => {
            visit(tree, "element", (node) => {
              if (node.tagName === "img" && node.properties?.src) {
                const src = String(node.properties.src)
                if (src.endsWith(`.${userOpts?.imageType ?? "svg"}`) && src.match(searchMatch)) {
                  node.properties.src = src.replace(searchMatch, `/${suffix}/static/d2/content`)
                }
              }
            })
          }
        },
      ]
    },
  }
}
