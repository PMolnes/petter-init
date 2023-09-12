const helper = require("./helper");
const fs = require("fs");
const path = require("path");

function setupVue(packageManager, projectName) {
	helper.executeCommand(`${packageManager} create vue@latest ${projectName}`);

	console.log("Initializing tailwindcss...");
	helper.initializeTailwindCSS(packageManager, projectName);

	helper.executeCommand(
		`cd ${projectName} && ${helper.copyTemplateFileString(
			"vue",
			"tailwind.config.js"
		)} && ${helper.copyTemplateFileString("vue", "style.css", "./src")} && ${helper.copyTemplateFileString(
			"vue",
			"App.vue",
			"./src"
		)}`
	);

	importStyleInMainFile(projectName);

	console.log("Removing boilerplate files...");
	removeBoilerPlateFiles(projectName);
}

function removeBoilerPlateFiles(projectName) {
	const projectPath = helper.getProjectPath(projectName);
	helper.emptyFolder(path.join(projectPath, "src", "assets"));
	helper.emptyFolder(path.join(projectPath, "src", "components"));
	helper.emptyFolder(path.join(projectPath, "src", "views"));
}

function findPathToMainFile(projectName) {
	const files = fs.readdirSync(helper.getProjectPath(projectName) + "/src");

	const main = files.find((fileName) => fileName.includes("main"));

	return path.join(helper.getProjectPath(projectName), "src", main);
}

function importStyleInMainFile(projectName) {
	const path = findPathToMainFile(projectName);
	let fileContent = fs.readFileSync(path);
	fileContent = fileContent.toString().replace("import './assets/main.css'", "");
	fileContent = 'import("./style.css");\n' + fileContent;

	fs.writeFileSync(path, fileContent, "utf-8");
}

module.exports = {
	setupVue,
};
