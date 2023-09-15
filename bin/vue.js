import helper from "./helper.js";
import path from "path";
import { getProjectInfo } from "./projectInfo.js";

export default function setupVue() {
	const { projectName } = getProjectInfo();

	helper.initializeViteProject();

	console.log("Initializing tailwindcss...");
	helper.initializeTailwindCSS();

	helper.copyFile("tailwind.config.js", ["tailwind.config.js"]);
	helper.copyFile("App.vue", ["src", "App.vue"]);
	helper.copyFile("style.css", ["src", "style.css"]);

	console.log("Removing boilerplate files...");
	removeBoilerPlateFiles(projectName);
	console.log("Completed.");
}

function removeBoilerPlateFiles(projectName) {
	const projectPath = helper.getProjectPath(projectName);
	helper.emptyFolder(path.join(projectPath, "src", "assets"));
	helper.emptyFolder(path.join(projectPath, "src", "components"));
}
