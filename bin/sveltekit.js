const helper = require("./helper");

function setupSvelteKit(packageManager, projectName) {
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
		)}`
	);
}

module.exports = {
	setupSvelteKit,
};
