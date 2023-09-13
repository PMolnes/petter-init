import helper from "./helper.js";

export default function setupSvelteKit(packageManager, projectName) {
	console.log("Setup your SvelteKit project...");
	helper.executeCommand(`${packageManager} create svelte@latest ${projectName}`);

	helper.initializeTailwindCSS(packageManager, projectName);

	helper.executeCommand(
		`cd ${projectName} && ${helper.copyTemplateFileString(
			"sveltekit",
			"tailwind.config.js"
		)} && ${helper.copyTemplateFileString("sveltekit", "app.css", "./src")} && ${helper.copyTemplateFileString(
			"sveltekit",
			"+layout.svelte",
			"./src/routes"
		)} && ${helper.copyTemplateFileString("sveltekit", "svelte.config.js")}`
	);
}
