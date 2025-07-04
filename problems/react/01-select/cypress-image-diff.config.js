const config = {
  ROOT_DIR: "visual-tests",
  FAILURE_THRESHOLD: 0.05,
  CYPRESS_SCREENSHOT_OPTIONS: {
    capture: "viewport",
    padding: 8,
  },
  REPORT_DIR: "report",
  SCREENSHOTS_DIR: "screenshots",
  NAME_TEMPLATE: "[browserName]/[specName]/[givenName]",
}

module.exports = config
