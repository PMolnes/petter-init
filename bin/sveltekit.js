import helper from "./helper.js";
import { getProjectInfo } from "./projectInfo.js";
import chalk from "chalk";
import { TEMPLATES } from "./templates/sveltekit/definitions.js";
import path from "path";
import inquirer from "inquirer";

/**
 * Prompt the user to choose a SvelteKit template
 */
export default async function chooseSvelteKitTemplate() {
	const choice = await inquirer.prompt([
		{
			name: "template",
			message: "Select SvelteKit template",
			type: "list",
			choices: TEMPLATES.map((t) => t.name),
		},
	]);

	const template = TEMPLATES.find((t) => t.name === choice.template);
	if (!template) {
		console.log(`Error: Could not find template ${template}`);
		return;
	}

	setupProject(template);
}

/**
 * Setup project based on selected template
 * @param {*} template selected template
 */
function setupProject(template) {
	const { packageManager, projectName } = getProjectInfo();

	console.log("Setup your SvelteKit project...");

	initProject(packageManager, projectName, template);
	installLibraries(packageManager, projectName, template);
	copyTemplateFiles(template);

	console.log(chalk.green("\nπ Completed."));
}

/**
 * Initializes the project with the selected template
 * @param {*} packageManager to initialize with
 * @param {*} projectName name of the project
 * @param {*} template template to initialize with
 */
function initProject(packageManager, projectName, template) {
	helper.executeCommand(template.initCommand(packageManager, projectName));
}

/**
 * Installs the libraries for the project
 * @param {*} packageManager package manager to install the libraries with
 * @param {*} projectName name of the project to install the libraries to
 * @param {*} template template to install the libraries for
 */
function installLibraries(packageManager, projectName, template) {
	template.libraries.forEach((library) => {
		console.log(chalk.yellowBright(`\nπ Initializing ${library.name}...\n`));
		library.commands.forEach((command) => {
			helper.executeCommand(`cd ${projectName} && ${command(packageManager)}`)
		})
	})
}

/**
 * Copy files for a specific template
 * @param {*} template to copy files from
 */
export const copyTemplateFiles = (template) => {
	console.log(chalk.yellowBright("\nπ Copying template files...\n"));
	const name = template.name.toLowerCase();
	template.files.forEach((file) => {
		helper.copyFile(path.join(name, file.source), file.destination);
	});
};
