import helper from "./helper.js";
import { getProjectInfo } from "./projectInfo.js";
import chalk from "chalk";
import { TEMPLATES } from "./templates/sveltekit/definitions.js";
import path from "path";
import inquirer from "inquirer";

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

function setupProject(template) {
	const { packageManager, projectName } = getProjectInfo();

	console.log("Setup your SvelteKit project...");

	helper.executeCommand(template.initCommand(packageManager, projectName));
	template.libraries.forEach((lib) => addLibrary(packageManager, projectName, lib));
	copyTemplateFiles(TEMPLATES[0]);

	console.log(chalk.green("\nπ Completed."));
}

function addLibrary(packageManager, projectName, library) {
	console.log(chalk.yellowBright(`\nπ Initializing ${library.name}...\n`));
	library.commands.forEach((command) => {
		helper.executeCommand(`cd ${projectName} && ${command(packageManager)}`)
	})
}

/**
 * Copy files for a specific template
 * @param {*} template to copy files from
 */
export const copyTemplateFiles = (template) => {
	console.log(chalk.yellowBright("\nπ Copying template files...\n"));
	const name = template.name;
	template.files.forEach((file) => {
		helper.copyFile(path.join(name, file.source), file.destination);
	});
};
