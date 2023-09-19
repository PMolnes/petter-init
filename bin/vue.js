import helper from "./helper.js";
import path from "path";
import chalk from "chalk";
import { getProjectInfo } from "./projectInfo.js";

export default function setupVue() {
	const { projectName } = getProjectInfo();

	helper.initializeViteProject();

	helper.initializeTailwindCSS();

	helper.copyFile("tailwind.config.js", ["tailwind.config.js"]);
	helper.copyFile("App.vue", ["src", "App.vue"]);
	helper.copyFile("style.css", ["src", "style.css"]);

	removeBoilerPlateFiles(projectName);
	console.log(chalk.green("\nπ Completed."));
}

function removeBoilerPlateFiles(projectName) {
	console.log(chalk.yellowBright("\nπ Removing boilerplate files..."));
	const projectPath = helper.getProjectPath(projectName);
	helper.emptyFolder(path.join(projectPath, "src", "assets"));
	helper.emptyFolder(path.join(projectPath, "src", "components"));
}
