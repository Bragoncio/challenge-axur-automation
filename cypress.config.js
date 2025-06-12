const { defineConfig } = require('cypress');
const installLogsPrinter = require('cypress-log-to-output').install;


module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.amazon.com.br",
    viewportWidth: 1920,
    viewportHeight: 1080,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // Eventos personalizados aqui, se necessário
    }
  }
});