import helper from "../helper.js";
import path from "path";
import { getProjectInfo, setFramework, setLanguage, setPackageManager, setProjectName } from "../projectInfo.js";
import setupVue from "../vue.js";
import setupReact from "../react.js";
import { copyFiles } from "../sveltekit.js";
import { readdirSync, rmSync } from "fs";
import { create } from "create-svelte";

function setupProjectInfo(framework, language, packageManager, projectName) {
	setFramework(framework);
	setLanguage(language);
	setPackageManager(packageManager);
	setProjectName(projectName);
}

afterEach(() => {
	rmSync(helper.getProjectPath(), { recursive: true, force: true });
});

test("vue.js successful setup", () => {
	// setup
	setupProjectInfo("vue", "js", "pnpm", "my-test-app");
	setupVue();
	const projectPath = helper.getProjectPath();
	const files = readdirSync(projectPath);
	const srcFiles = readdirSync(path.join(projectPath, "src"));

	// assertion
	expect(files.includes("tailwind.config.js")).toBeTruthy();
	expect(srcFiles.includes("style.css")).toBeTruthy();
	expect(srcFiles.includes("main.js")).toBeTruthy();
});

test("vue.ts successful setup", () => {
	// setup
	setupProjectInfo("vue", "ts", "npm", "my-test-app");
	setupVue();
	const projectPath = helper.getProjectPath();
	const files = readdirSync(projectPath);
	const srcFiles = readdirSync(path.join(projectPath, "src"));

	// assertion
	expect(files.includes("tailwind.config.js")).toBeTruthy();
	expect(srcFiles.includes("style.css")).toBeTruthy();
	expect(srcFiles.includes("main.ts")).toBeTruthy();
});

test("react.js successful setup", () => {
	setupProjectInfo("react", "ts", "yarn", "my-test-app");
	setupReact();

	const projectPath = helper.getProjectPath();
	const files = readdirSync(path.join(projectPath));
	const srcFiles = readdirSync(path.join(projectPath, "src"));

	expect(files.includes("tailwind.config.js")).toBeTruthy();
	expect(srcFiles.includes("App.tsx")).toBeTruthy();
	expect(srcFiles.includes("index.css")).toBeTruthy();
});

test("sveltekit successful setup", async () => {
	setupProjectInfo("sveltekit", "", "", "my-test-app");
	await create(getProjectInfo().projectName, {
		name: getProjectInfo().projectName,
		template: "skeleton",
		types: null,
		prettier: false,
		eslint: false,
		playwright: false,
		vitest: false,
	});
	copyFiles();

	const projectPath = helper.getProjectPath();
	const files = readdirSync(path.join(projectPath));
	const srcFiles = readdirSync(path.join(projectPath, "src"));
	const routes = readdirSync(path.join(projectPath, "src", "routes"));

	expect(files.includes("tailwind.config.js")).toBeTruthy();
	expect(srcFiles.includes("app.css")).toBeTruthy();
	expect(routes.includes("+layout.svelte")).toBeTruthy();
});
