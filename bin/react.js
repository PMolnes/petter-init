import helper from "./helper.js";
import fs from "fs";
import path from "path";

export default function setupReact(packageManager, projectName, language) {
	helper.executeCommand(
		`${packageManager} create vite@latest ${projectName} -- --template react${language === "ts" ? "-ts" : ""}`
	);

	console.log("Initializing tailwindcss...");
	helper.initializeTailwindCSS(packageManager, projectName);

	helper.executeCommand(
		`cd ${projectName} && ${helper.copyTemplateFileString(
			"react",
			"tailwind.config.js"
		)} && ${helper.copyTemplateFileString("react", "index.css", "./src")} && ${helper.copyTemplateFileString(
			"react",
			"App.jsx",
			"./src"
		)}`
	);
}