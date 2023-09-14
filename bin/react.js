import helper from "./helper.js";
import { copyFileSync } from "fs";
import path from "path";

export default function setupReact(packageManager, projectName, language) {
	const isTypeScript = language === "ts";
	helper.executeCommand(
		`${packageManager} create vite@latest ${projectName} -- --template react${isTypeScript ? "-ts" : ""}`
	);

	console.log("Initializing tailwindcss...");

	helper.initializeTailwindCSS(packageManager, projectName);

	copyFileSync(
		path.join(helper.getPathToTemplates("react"), "tailwind.config.js"),
		path.join(helper.getProjectPath(projectName), "tailwind.config.js")
	);
	copyFileSync(
		path.join(helper.getPathToTemplates("react"), "index.css"),
		path.join(helper.getProjectPath(projectName), "src", "index.css")
	);
	copyFileSync(
		path.join(helper.getPathToTemplates("react"), "App.jsx"),
		path.join(helper.getProjectPath(projectName), "src", `App.${isTypeScript ? "tsx" : "jsx"}`)
	);
}
