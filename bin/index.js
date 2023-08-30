#! /usr/bin/env node

const yargs = require("yargs");
const { execSync } = require("child_process");

// Define command-line options
const options = yargs.options("framework", {
  description: "Framework to setup TailwindCSS for",
  demandOption: true,
  choices: ["react", "vue", "sveltekit"],
}).argv;

// Setup logic for each framework
const frameworkSetup = {
  sveltekit: () => {
    console.log("Setting up Tailwind CSS for SvelteKit...");
    // Add setup steps for SvelteKit here
    installDependency("tailwindcss");
  },
  react: () => {
    console.log("Setting up Tailwind CSS for React...");
    // Add setup steps for React here
  },
  vue: () => {
    console.log("Setting up Tailwind CSS for Vue...");
    // Add setup steps for Vue here
  },
};

function installDependency(packageName) {
  try {
    execSync(`npm install -D ${packageName}`, { stdio: "inherit" });
    console.log(`${packageName} installed successfully.`);
  } catch (error) {
    console.error(`Failed to install ${packageName}:`, error.message);
  }
}

const selectedFramework = options.framework;
if (frameworkSetup[selectedFramework]) {
  frameworkSetup[selectedFramework]();
} else {
  console.error("Invalid framework choice. Supported frameworks: sveltekit, react, vue");
}
