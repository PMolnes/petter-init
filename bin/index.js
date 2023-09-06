#! /usr/bin/env node

const yargs = require("yargs");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const options = yargs
	.option("framework", {
		alias: "f",
		description: "Framework to setup TailwindCSS for",
		demandOption: true,
		choices: ["react", "vue", "sveltekit"],
	})
	.option("package-manager", {
		alias: "p",
		description: "Package manager to use",
		demandOption: true,
		choices: ["npm", "yarn", "pnpm"],
	})
	.option("project-name", {
		alias: "pn",
		description: "Name of your project",
		type: yargs.string,
	})
	.help()
	.alias("help", "h").argv;

const framework = options.framework;
const packageManager = options.packageManager;
const projectName = options.projectName;

let installFramework = function (framework, projectName) {
	try {
		switch (framework) {
			case "sveltekit":
				// get the path of the tailwind config
				const templatePath = path.join(__dirname, "sveltekit");

				console.log("Setup your SvelteKit project ...");
				execSync(`npm create svelte@latest ${projectName}`, { stdio: "inherit" });
				execSync(
					`cd ${projectName} && ${generateInstallDependencyCommand(
						"tailwindcss postcss autoprefixer"
					)} && npx tailwindcss init -p && cp ${path.join(templatePath, "tailwind.config.js")} . && cp ${path.join(
						templatePath,
						"app.css"
					)} ./src && cp ${path.join(templatePath, "+layout.svelte")} "./src/routes"`,
					{
						stdio: "inherit",
					}
				);

				// const projectParentDir = execSync("pwd", { stdio: "pipe" }).toString().trim();
				// const projectDir = path.join(projectParentDir, projectName, "tailwind.config.js");
				// console.log("Project Parent Directory: " + projectParentDir);
				// console.log("Full project path: " + projectDir);

				// fs.copyFile(templatePath, projectDir, (err) => {
				// 	if (err) throw err;
				// 	console.log("successfully copied");
				// });
				break;
			case "react":
				break;
			case "vue":
				break;
		}
	} catch (error) {
		console.error(`Failed to create ${framework} app: `, error.message);
	}
};

function installVue() {
	try {
		console.log("Setup your Vue project ...");
		execSync("npm create vue@latest", { stdio: "inherit" });
	} catch (error) {
		console.error("Failed to create Vue app:", error.message);
	}
}

function generateInstallDependencyCommand(packageName, dev = true) {
	let installKeyword = "install";
	// cmd for yarn
	if (packageManager === "yarn") installKeyword = "add";
	// cmd for npm and pnpm
	return `${packageManager} ${installKeyword} ${dev === true ? "-D" : ""} ${packageName}`;
}

function installDependency(packageName, dev = true) {
	try {
		execSync(`${generateInstallDependencyCommand(packageName, dev)}`, { stdio: "inherit" });
		console.log(`${packageName} installed successfully.`);
	} catch (error) {
		console.error(`Failed to install ${packageName}:`, error.message);
	}
}

// export functions
module.exports = {
	installDependency,
	installFramework: installFramework,
	projectName,
};

const sveltekit = require("./sveltekit");

const frameworkSetup = {
	sveltekit: () => {
		console.log("Setting up Tailwind CSS for SvelteKit...");
		// Add setup steps for SvelteKit here
		installFramework(framework, projectName);
	},
	react: () => {
		console.log("Setting up Tailwind CSS for React...");
		// Add setup steps for React here
	},
	vue: () => {
		console.log("Setting up Tailwind CSS for Vue...");
		// Add setup steps for Vue here
		installVue();
	},
};

if (frameworkSetup[framework]) {
	frameworkSetup[framework]();
} else {
	console.error("Invalid framework choice. Supported frameworks: sveltekit, react, vue");
}
