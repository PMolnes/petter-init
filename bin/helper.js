import path from "path";
import { execSync } from "child_process";
import fs, { copyFileSync } from "fs";
import { fileURLToPath } from "url";

/*
  Return a string based on the framework selected and which template to copy.
*/
const copyTemplateFileString = (framework, templateToCopy, destination = ".") => {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	let templatePath = path.join(__dirname, framework);
	return `cp ${path.join(templatePath, templateToCopy)} ${destination}`;
};

const copyFile = (framework, templateToCopy, projectName, destination) => {
	const pathToTemplate = path.join(getPathToTemplates(framework), templateToCopy);
	const pathToDestination = path.join(getProjectPath(projectName), ...destination);
	copyFileSync(pathToTemplate, pathToDestination);
};

const getPathToTemplates = (framework) => {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	return path.join(__dirname, framework);
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

const removeFile = (projectName, pathToFile) => {
	fs.rmSync(path.join(getProjectPath(projectName), ...pathToFile));
};

const generateInstallDependencyCommand = (packageManager, packageName, dev = true) => {
	let installKeyword = "install";

	if (packageManager === "yarn") installKeyword = "add";

	return `${packageManager} ${installKeyword} ${dev === true ? "-D" : ""} ${packageName}`;
};

export default {
	copyTemplateFileString,
	executeCommand,
	initializeTailwindCSS,
	getProjectPath,
	emptyFolder,
	copyFile,
	removeFile,
};
