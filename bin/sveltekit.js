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
			choices: ["basic", "devkit"],
		},
	]);

	const template = TEMPLATES.find((t) => t.name === choice.name);
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
	helper.executeCommand(`cd ${projectName}`);
	template.libraries.forEach((lib) => addLibrary(lib, lib.dev || true));
	copyTemplateFiles(TEMPLATES[0]);

	console.log(chalk.green("\nπ Completed."));
}

function addLibrary(library, dev) {
	console.log(chalk.yellowBright(`\nπ Initializing ${library.name}...\n`));
	const installCommand = helper.generateInstallDependencyCommand(library, dev);
	helper.executeCommand(installCommand);

	if (library.initCommand) {
		helper.executeCommand(library.initCommand);
	}
}

/**
 * Copy files for a specific template
 * @param {*} template to copy files from
 */
export const copyTemplateFiles = (template) => {
	const name = template.name;
	template.files.forEach((file) => {
		helper.copyFile(path.join(name, file.source), file.destination);
	});
};
