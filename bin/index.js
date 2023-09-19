#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

import setupSvelteKit from "./sveltekit.js";
import setupVue from "./vue.js";
import setupReact from "./react.js";
import { getProjectInfo, setFramework, setLanguage, setPackageManager, setProjectName } from "./projectInfo.js";

console.log(
	chalk.green(`
         #   #               #      #  #
### ### ### ### ### ###         ##    ###
# # ##   #   #  ##  #   ###  #  # # #  #
### ###  ##  ## ### #        ## # # ## ##
#
  `)
);

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
		when: (answers) => answers.framework === "react" || answers.framework === "vue",
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

setFramework(answers.framework);
setPackageManager(answers.packageManager);
setProjectName(answers.projectName);
setLanguage(answers.language);

const projectInfo = getProjectInfo();

try {
	switch (projectInfo.framework) {
		case "sveltekit":
			setupSvelteKit();
			break;
		case "react":
			setupReact();
			break;
		case "vue":
			setupVue();
			break;
		default:
			console.error("Invalid framework choice. Support frameworks are: sveltekit, react, vue.");
	}
} catch (error) {
	console.error(`Failed to create ${projectInfo.framework} app: `, error.message);
}
