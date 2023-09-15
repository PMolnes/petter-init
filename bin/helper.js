import path from "path";
import { execSync } from "child_process";
import fs, { copyFileSync } from "fs";
import { fileURLToPath } from "url";
import { getProjectInfo } from "./projectInfo.js";

/*
  Return a string based on the framework selected and which template to copy.
*/
const copyTemplateFileString = (framework, templateToCopy, destination = ".") => {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	let templatePath = path.join(__dirname, framework);
	return `cp ${path.join(templatePath, templateToCopy)} ${destination}`;
};

const copyFile = (templateToCopy, destination) => {
	const { projectName } = getProjectInfo();
	const pathToTemplate = path.join(getPathToTemplates(), templateToCopy);
	const pathToDestination = path.join(getProjectPath(projectName), ...destination);
	copyFileSync(pathToTemplate, pathToDestination);
};

const getPathToTemplates = () => {
	const { framework } = getProjectInfo();
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	return path.join(__dirname, "templates", framework);
};

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

const initializeTailwindCSS = () => {
	const { projectName } = getProjectInfo();
	executeCommand(
		`cd ${projectName} && ${generateInstallDependencyCommand(
			"tailwindcss postcss autoprefixer"
		)} && npx tailwindcss init -p`
	);
};

const initializeViteProject = () => {
	const { packageManager, projectName, framework, language } = getProjectInfo();
	const extraDash = packageManager === "npm" ? "-- " : "";
	const template = `--template ${framework}${language === "ts" ? "-ts" : ""}`;
	executeCommand(
		`${packageManager} create${packageManager !== "yarn" ? "@latest" : ""} vite ${projectName} ${extraDash}${template}`
	);
};

const emptyFolder = (dirPath) => {
	fs.rmSync(dirPath, { recursive: true, force: true });
	fs.mkdirSync(dirPath);
};

const removeFile = (pathToFile) => {
	const { projectName } = getProjectInfo();
	fs.rmSync(path.join(getProjectPath(projectName), ...pathToFile));
};

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
