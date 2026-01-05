const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");

// Get environment from command line or default to 'dev'
const environment = process.env.CYPRESS_ENVIRONMENT || "dev";
const configFile = path.join(__dirname, "cypress/config", `${environment}.env.json`);

// Load environment-specific configuration
let envConfig = {};
if (fs.existsSync(configFile)) {
  envConfig = JSON.parse(fs.readFileSync(configFile, "utf8"));
} else {
  console.warn(`Environment config file not found: ${configFile}`);
}

module.exports = defineConfig({
  e2e: {
    baseUrl: envConfig.baseUrl || "http://localhost",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    environment: envConfig.environment || environment,
    appName: envConfig.appName || "OrangeHRM",
  },
  requestTimeout: envConfig.timeout || 5000,
});
