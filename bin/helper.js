import path from "path";
import { execSync } from "child_process";
import fs from "fs";
import { fileURLToPath } from "url";

/*
  Return a string based on the framework selected and which template to copy.
*/
const copyTemplateFileString = (framework, templateToCopy, destination = ".") => {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	let templatePath = path.join(__dirname, framework);
	return `cp ${path.join(templatePath, templateToCopy)} ${destination}`;
};

const getProjectPath = (projectName) => {
	return path.resolve(projectName);
};

const executeCommand = (command) => {
	try {
		execSync(command, { stdio: "inherit" });
	} catch (error) {
		console.log("Failed to execute command: ", error.message);
	}
};

const initializeTailwindCSS = (packageManager, projectName) => {
	executeCommand(
		`cd ${projectName} && ${generateInstallDependencyCommand(
			packageManager,
			"tailwindcss postcss autoprefixer"
		)} && npx tailwindcss init -p`
	);
};

const emptyFolder = (dirPath) => {
	fs.rmSync(dirPath, { recursive: true, force: true });
	fs.mkdirSync(dirPath);
};

const generateInstallDependencyCommand = (packageManager, packageName, dev = true) => {
	let installKeyword = "install";

	if (packageManager === "yarn") installKeyword = "add";

	return `${packageManager} ${installKeyword} ${dev === true ? "-D" : ""} ${packageName}`;
};

export default {
	copyTemplateFileString,
	executeCommand,
	generateInstallDependencyCommand,
	initializeTailwindCSS,
	getProjectPath,
	emptyFolder,
};
