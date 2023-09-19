import helper from "./helper.js";
import { getProjectInfo } from "./projectInfo.js";
import chalk from "chalk";

export default function setupReact() {
	const { projectName, language } = getProjectInfo();
	console.log(`Setting up project: ${projectName}`);
	helper.initializeViteProject();

	helper.initializeTailwindCSS();

	helper.copyFile("tailwind.config.js", ["tailwind.config.js"]);
	helper.copyFile("index.css", ["src", "index.css"]);
	helper.copyFile("App.jsx", ["src", `App.${language === "ts" ? "tsx" : "jsx"}`]);

	helper.removeFile(["src", "App.css"]);
	console.log(chalk.green("\nπ Completed."));
}
