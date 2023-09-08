const path = require("path");
const { execSync } = require("child_process");

/*
  Return a string based on the framework selected and which template to copy.
*/
const copyTemplateFileString = (framework, templateToCopy, destination = ".") => {
	let templatePath = path.join(__dirname, framework);
	return `cp ${path.join(templatePath, templateToCopy)} ${destination}`;
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

const generateInstallDependencyCommand = (packageManager, packageName, dev = true) => {
	let installKeyword = "install";

	if (packageManager === "yarn") installKeyword = "add";

	return `${packageManager} ${installKeyword} ${dev === true ? "-D" : ""} ${packageName}`;
};

module.exports = {
	copyTemplateFileString,
	executeCommand,
	generateInstallDependencyCommand,
	initializeTailwindCSS,
};
