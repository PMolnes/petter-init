import helper from './helper.js';
import { getProjectInfo } from './projectInfo.js';
import chalk from 'chalk';
import { TEMPLATES } from './templates/sveltekit/definitions.js';
import path from 'path';

export default function setupSvelteKit() {
	const { packageManager, projectName } = getProjectInfo();
	console.log('Setup your SvelteKit project...');
	helper.executeCommand(
		`${packageManager} create svelte${
			packageManager !== 'yarn' ? '@latest' : ''
		} ${projectName}`
	);

	helper.initializeTailwindCSS();

	copyTemplateFiles(TEMPLATES[0]);
	console.log(chalk.green('\nπ Completed.'));
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
