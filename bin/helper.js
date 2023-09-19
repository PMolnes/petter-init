import path from "path";
import { execSync } from "child_process";
import fs, { copyFileSync } from "fs";
import { fileURLToPath } from "url";
import { getProjectInfo } from "./projectInfo.js";
import chalk from "chalk";

/*
  Return a string based on the framework selected and which template to copy.
*/
const copyTemplateFileString = (framework, templateToCopy, destination = ".") => {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	let templatePath = path.join(__dirname, framework);
	return `cp ${path.join(templatePath, templateToCopy)} ${destination}`;
};

const copyFile = (templateToCopy, destination) => {
	const pathToTemplate = path.join(getPathToTemplates(), templateToCopy);
	const pathToDestination = path.join(getProjectPath(), ...destination);
	copyFileSync(pathToTemplate, pathToDestination);
};

/*
  Returns the path to the templates for the selected framework.
*/
const getPathToTemplates = () => {
	const { framework } = getProjectInfo();
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	return path.join(__dirname, "templates", framework);
};

/*
  Get the path to the newly created project.
*/
const getProjectPath = () => {
	const { projectName } = getProjectInfo();
	return path.resolve(projectName);
};

const executeCommand = (command) => {
	try {
		execSync(command, { stdio: "inherit" });
	} catch (error) {
		console.log("Failed to execute command: ", error.message);
	}
};

/*
  Installs tailwindcss, postcss, and autoprefixer dependencies, and initializes
  tailwindcss in the newly created project.
*/
const initializeTailwindCSS = () => {
	console.log(chalk.yellowBright("\nπ Initializing tailwindcss...\n"));
	const { projectName } = getProjectInfo();
	executeCommand(
		`cd ${projectName} && ${generateInstallDependencyCommand(
			"tailwindcss postcss autoprefixer"
		)} && npx tailwindcss init -p`
	);
};

/*
  Creates a vite project with the selected options for your projects.
*/
const initializeViteProject = () => {
	const { packageManager, projectName, framework, language } = getProjectInfo();
	const extraDash = packageManager === "npm" ? "-- " : "";
	const template = `--template ${framework}${language === "ts" ? "-ts" : ""}`;
	executeCommand(
		`${packageManager} create vite${packageManager !== "yarn" ? "@latest" : ""}  ${projectName} ${extraDash}${template}`
	);
};

/*
  Deletes the folder in the path, and recreates it without any files in it.
*/
const emptyFolder = (dirPath) => {
	fs.rmSync(dirPath, { recursive: true, force: true });
	fs.mkdirSync(dirPath);
};

/*
  Removes a file in the newly created project.
*/
const removeFile = (pathToFile) => {
	fs.rmSync(path.join(getProjectPath(), ...pathToFile));
};

/*
  Returns the correct install dependency command based on the selected
  packageManager.
*/
const generateInstallDependencyCommand = (packageName, dev = true) => {
	const { packageManager } = getProjectInfo();
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
	initializeViteProject,
};
