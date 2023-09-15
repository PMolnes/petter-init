import helper from "./helper.js";

export default function setupReact(packageManager, projectName, framework, language) {
	console.log(`Setting up project: ${projectName}`);
	helper.initializeViteProject(packageManager, projectName, framework, language);

	console.log("Initializing tailwindcss...");

	helper.initializeTailwindCSS(packageManager, projectName);

	helper.copyFile("react", "tailwind.config.js", projectName, ["tailwind.config.js"]);
	helper.copyFile("react", "index.css", projectName, ["src", "index.css"]);
	helper.copyFile("react", "App.jsx", projectName, ["src", `App.${language === "ts" ? "tsx" : "jsx"}`]);

	helper.removeFile(projectName, ["src", "App.css"]);
}
