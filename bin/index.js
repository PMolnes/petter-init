#! /usr/bin/env node

const yargs = require("yargs");

const { setupSvelteKit } = require("./sveltekit");
const { setupVue } = require("./vue");

const options = yargs
	.option("framework", {
		alias: "f",
		description: "Framework to setup TailwindCSS for",
		demandOption: true,
		choices: ["react", "vue", "sveltekit"],
	})
	.option("package-manager", {
		alias: "p",
		description: "Package manager to use",
		demandOption: true,
		choices: ["npm", "yarn", "pnpm"],
	})
	.option("project-name", {
		alias: "n",
		description: "Name of your project",
		type: yargs.string,
	})
	.help()
	.alias("help", "h").argv;

const framework = options.framework;
const packageManager = options.packageManager;
const projectName = options.projectName;

let installFramework = function (framework, projectName) {
	try {
		switch (framework) {
			case "sveltekit":
				setupSvelteKit(packageManager, projectName);
				break;
			case "react":
				break;
			case "vue":
				setupVue(packageManager, projectName);
				break;
		}
	} catch (error) {
		console.error(`Failed to create ${framework} app: `, error.message);
	}
};

// export functions
module.exports = {
	installFramework: installFramework,
	projectName,
	packageManager,
};

const frameworkSetup = {
	sveltekit: () => {
		console.log("Setting up Tailwind CSS for SvelteKit...");
		// Add setup steps for SvelteKit here
		installFramework(framework, projectName);
	},
	react: () => {
		console.log("Setting up Tailwind CSS for React...");
		// Add setup steps for React here
	},
	vue: () => {
		console.log("Setting up Tailwind CSS for Vue...");
		// Add setup steps for Vue here
		installFramework(framework, projectName);
	},
};

if (frameworkSetup[framework]) {
	frameworkSetup[framework]();
} else {
	console.error("Invalid framework choice. Supported frameworks: sveltekit, react, vue");
}
