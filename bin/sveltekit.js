import helper from "./helper.js";
import { getProjectInfo } from "./projectInfo.js";
import chalk from "chalk";

export default function setupSvelteKit() {
	const { packageManager, projectName } = getProjectInfo();
	console.log("Setup your SvelteKit project...");
	helper.executeCommand(`${packageManager} create svelte${packageManager !== "yarn" ? "@latest" : ""} ${projectName}`);

	helper.initializeTailwindCSS();

	copyFiles();
	console.log(chalk.green("\nπ Completed."));
}

export const copyFiles = () => {
	helper.copyFile("tailwind.config.js", ["tailwind.config.js"]);
	helper.copyFile("svelte.config.js", ["svelte.config.js"]);
	helper.copyFile("app.css", ["src", "app.css"]);
	helper.copyFile("+layout.svelte", ["src", "routes", "+layout.svelte"]);
};
