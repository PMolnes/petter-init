import helper from "./helper.js";
import path from "path";

export default function setupVue(packageManager, projectName, framework, language) {
	helper.initializeViteProject(packageManager, projectName, framework, language);

	console.log("Initializing tailwindcss...");
	helper.initializeTailwindCSS(packageManager, projectName);

	helper.copyFile("vue", "tailwind.config.js", projectName, ["tailwind.config.js"]);
	helper.copyFile("vue", "App.vue", projectName, ["src", "App.vue"]);
	helper.copyFile("vue", "style.css", projectName, ["src", "style.css"]);

	console.log("Removing boilerplate files...");
	removeBoilerPlateFiles(projectName);
	console.log("Completed.");
}

function removeBoilerPlateFiles(projectName) {
	const projectPath = helper.getProjectPath(projectName);
	helper.emptyFolder(path.join(projectPath, "src", "assets"));
	helper.emptyFolder(path.join(projectPath, "src", "components"));
}
