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
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "edge" && browser.isHeadless) {
          launchOptions.args.push("--window-size=1400,1200")
          launchOptions.args.push("--force-device-scale-factor=2")
        }
      })

      return getCompareSnapshotsPlugin(on, config)
    },
  },
})

export default config
