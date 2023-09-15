import helper from "./helper.js";
import { getProjectInfo } from "./projectInfo.js";

export default function setupReact() {
	const { projectName, language } = getProjectInfo();
	console.log(`Setting up project: ${projectName}`);
	helper.initializeViteProject();

	console.log("Initializing tailwindcss...");

	helper.initializeTailwindCSS();

	helper.copyFile("tailwind.config.js", ["tailwind.config.js"]);
	helper.copyFile("index.css", ["src", "index.css"]);
	helper.copyFile("App.jsx", ["src", `App.${language === "ts" ? "tsx" : "jsx"}`]);

	helper.removeFile(["src", "App.css"]);
}
