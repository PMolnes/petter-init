import helper from "./helper.js";

export default function setupReact(packageManager, projectName, language) {
	const isTypeScript = language === "ts";

	console.log(`Setting up project: ${projectName}`);
	helper.executeCommand(
		`${packageManager} create vite@latest ${projectName} -- --template react${isTypeScript ? "-ts" : ""}`
	);

	console.log("Initializing tailwindcss...");

	helper.initializeTailwindCSS(packageManager, projectName);

	helper.copyFile("react", "tailwind.config.js", projectName, ["tailwind.config.js"]);
	helper.copyFile("react", "index.css", projectName, ["src", "index.css"]);
	helper.copyFile("react", "App.jsx", projectName, ["src", `App.${isTypeScript ? "tsx" : "jsx"}`]);
}
