import { defineConfig } from "cypress"
import getCompareSnapshotsPlugin from "cypress-image-diff-js/plugin"

const config = defineConfig({
  component: {
    specPattern: "src/**/*.test.{js,jsx,ts,tsx}",
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    setupNodeEvents(on, config) {
      return getCompareSnapshotsPlugin(on, config)
    },
  },
})

export default config
