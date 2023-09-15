import helper from "./helper.js";

export default function setupSvelteKit(packageManager, projectName) {
	console.log("Setup your SvelteKit project...");
	helper.executeCommand(`${packageManager} create svelte@latest ${projectName}`);

	console.log("Initializing tailwindcss...");
	helper.initializeTailwindCSS(packageManager, projectName);

	helper.copyFile("sveltekit", "tailwind.config.js", projectName, ["tailwind.config.js"]);
	helper.copyFile("sveltekit", "svelte.config.js", projectName, ["svelte.config.js"]);
	helper.copyFile("sveltekit", "app.css", projectName, ["src", "app.css"]);
	helper.copyFile("sveltekit", "+layout.svelte", projectName, ["src", "routes", "+layout.svelte"]);
}
