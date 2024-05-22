import helper from '../helper.js';
import path from 'path';
import {
	getProjectInfo,
	setFramework,
	setLanguage,
	setPackageManager,
	setProjectName,
} from '../projectInfo.js';
import setupVue from '../vue.js';
import setupReact from '../react.js';
import { copyTemplateFiles } from '../sveltekit.js';
import { readdirSync, rmSync } from 'fs';
import { create } from 'create-svelte';
import { TEMPLATES } from '../templates/sveltekit/definitions.js';
// TODO: Test cli tool
// import execa from 'execa';
// import stipAnsi from 'strip-ansi';

function setupProjectInfo(framework, language, packageManager, projectName) {
	setFramework(framework);
	setLanguage(language);
	setPackageManager(packageManager);
	setProjectName(projectName);
}

afterEach(() => {
	rmSync(helper.getProjectPath(), { recursive: true, force: true });
});

describe('vue', () => {
	test('vue.js successful setup', () => {
	// setup
	setupProjectInfo('vue', 'js', 'pnpm', 'my-test-app');
	setupVue();
	const projectPath = helper.getProjectPath();
	const files = readdirSync(projectPath);
	const srcFiles = readdirSync(path.join(projectPath, 'src'));

	// assertion
	expect(files.includes('tailwind.config.js')).toBeTruthy();
	expect(srcFiles.includes('style.css')).toBeTruthy();
	expect(srcFiles.includes('main.js')).toBeTruthy();
});

test('vue.ts successful setup', () => {
	// setup
	setupProjectInfo('vue', 'ts', 'npm', 'my-test-app');
	setupVue();
	const projectPath = helper.getProjectPath();
	const files = readdirSync(projectPath);
	const srcFiles = readdirSync(path.join(projectPath, 'src'));

	// assertion
	expect(files.includes('tailwind.config.js')).toBeTruthy();
	expect(srcFiles.includes('style.css')).toBeTruthy();
	expect(srcFiles.includes('main.ts')).toBeTruthy();
});
})

describe('react', () => {
	test('react.js successful setup', () => {
	setupProjectInfo('react', 'ts', 'yarn', 'my-test-app');
	setupReact();

	const projectPath = helper.getProjectPath();
	const files = readdirSync(path.join(projectPath));
	const srcFiles = readdirSync(path.join(projectPath, 'src'));

	expect(files.includes('tailwind.config.js')).toBeTruthy();
	expect(srcFiles.includes('App.tsx')).toBeTruthy();
	expect(srcFiles.includes('index.css')).toBeTruthy();
});
})

describe('sveltekit', () => {
	it('should contain two templates', async () => {
		expect(TEMPLATES.length).toBe(2);
	})

	test('sveltekit basic successful setup', async () => {
	setupProjectInfo('sveltekit', '', '', 'my-test-app');
	await create(getProjectInfo().projectName, {
		name: getProjectInfo().projectName,
		template: 'skeleton',
		types: null,
		prettier: false,
		eslint: false,
		playwright: false,
		vitest: false,
	});
	copyTemplateFiles(TEMPLATES[0]);

	const projectPath = helper.getProjectPath();
	const files = readdirSync(path.join(projectPath));
	const srcFiles = readdirSync(path.join(projectPath, 'src'));
	const routes = readdirSync(path.join(projectPath, 'src', 'routes'));

	expect(files.includes('tailwind.config.js')).toBeTruthy();
	expect(srcFiles.includes('app.css')).toBeTruthy();
	expect(routes.includes('+layout.svelte')).toBeTruthy();
});

	// TODO: Uncomment and continue when cli testing is ready
	// it('should create basic sveltekit project', async () => {
	// 	const cliPath = path.join(__dirname, '../index.js');

	// 	const inputs = [
	// 		'1\n', // sveltekit
	// 		'3\n', // pnpm
	// 		'my-test-app\n', // project name
	// 		'2\n', // JSMKit
	// 		'2\n', // Skeleton project
	// 		'1\n', // Yes, using TypeScript syntax
	// 		'\u001B[B', // Arrow down
	// 		'\x20', // Prettier
	// 		'\u001B[B', // Arrow down
	// 		'\x20', // Playwright
	// 		'\u001B[B', // Arrow down
	// 		'\x20', // Vitest
	// 		'\x0D', // Enter
	// 	]
	// 	const { stdout } = await execa('node', [cliPath], {
	// 		input: inputs.join(''),
	// 	});

	// 	const cleanOutput = stripAnsi(stdout);

	// 	expect(cleanOutput).toContain('sveltekit');
	// 	expect(cleanOutput).toContain('pnpm');
	// 	expect(cleanOutput).toContain('my-test-app');
	// 	expect(cleanOutput).toContain('JKMKit');
	// 	expect(cleanOutput).toContain('Skeleton project');
	// 	expect(cleanOutput).toContain('Yes, using TypeScript syntax');
	// 	expect(cleanOutput).toContain('Prettier');
	// 	expect(cleanOutput).toContain('Playwright');
	// 	expect(cleanOutput).toContain('Vitest');
	// })
})