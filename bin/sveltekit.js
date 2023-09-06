const { installFramework, projectName } = require("./index");

function setupSvelteKit() {
  console.log("Setting up Tailwind CSS for SvelteKit...");
  // Add setup steps for SvelteKit here
  installFramework("sveltekit", projectName);
}

function installSvelteKit() {}

module.exports = {
  setupSvelteKit,
};
