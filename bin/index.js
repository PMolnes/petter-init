#! /usr/bin/env node

import inquirer from "inquirer";

import setupSvelteKit from "./sveltekit.js";
import setupVue from "./vue.js";
import setupReact from "./react.js";

const answers = await inquirer.prompt([
	{
		name: "framework",
		message: "Select the framework you would like to use.",
		type: "list",
		choices: ["sveltekit", "vue", "react"],
	},
	{
		name: "language",
		message: "JavaScript or TypeScript?",
		type: "list",
		choices: ["js", "ts"],
		when: (answers) => answers.framework === "react",
	},
	{
		name: "packageManager",
		message: "Select the package manager you want to use.",
		type: "list",
		choices: ["npm", "yarn", "pnpm"],
	},
	{
		name: "projectName",
		message: "Select the name for your project.",
		type: "input",
	},
]);

const framework = answers.framework;
const packageManager = answers.packageManager;
const projectName = answers.projectName;
const language = answers.language;

let installFramework = function () {
	try {
		switch (framework) {
			case "sveltekit":
				setupSvelteKit(packageManager, projectName);
				break;
			case "react":
				setupReact(packageManager, projectName, language);
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
export { installFramework, projectName, packageManager };

const frameworkSetup = {
	sveltekit: () => {
		console.log("Setting up Tailwind CSS for SvelteKit...");
		// Add setup steps for SvelteKit here
		installFramework();
	},
	react: () => {
		installFramework();
	},
	vue: () => {
		console.log("Setting up Tailwind CSS for Vue...");
		// Add setup steps for Vue here
		installFramework();
	},
};

if (frameworkSetup[framework]) {
	frameworkSetup[framework]();
} else {
	console.error("Invalid framework choice. Supported frameworks: sveltekit, react, vue");
}
