import { PACKAGE_MANAGER_MAP } from "../../helper.js";

export const TEMPLATES = [
	{
		name: "basic",
		initCommand: (packageManager, projectName) =>
			`${packageManager} create svelte${
				packageManager !== "yarn" ? "@latest" : ""
			} ${projectName}`,
		files: [
			{ source: "tailwind.config.js", destination: ["tailwind.config.js"] },
			{ source: "svelte.config.js", destination: ["svelte.config.js"] },
			{ source: "app.css", destination: ["src", "app.css"] },
			{
				source: "+layout.svelte",
				destination: ["src", "routes", "+layout.svelte"],
			},
		],
		libraries: [
			{
				name: "tailwindcss",
				commands: [
					(packageManager) => `${packageManager} ${PACKAGE_MANAGER_MAP[packageManager].installer} -D tailwindcss postcss autoprefixer`,
					(packageManager) => `${PACKAGE_MANAGER_MAP[packageManager].executor} tailwind css init -p`
				]
			},
		],
	},
  {
    name: "JKMKit",
    initCommand: (packageManager, projectName) =>
		`${packageManager} create svelte${
			packageManager !== "yarn" ? "@latest" : ""
		} ${projectName} --template skeleton`,
    files: [
			// tailwind / shadcn
			{ source: 'svelte.config.js', destination: [ 'svelte.config.js' ] },
			// mode-watcher / sonner / flash messages
			{ source: '+layout.svelte', destination: [ 'src', 'routes', '+layout.svelte' ] },
			// template intro
			{ source: '+page.svelte', destination: [ 'src', 'routes', '+page.svelte' ] },
			// flash message
			{ source: 'app.d.ts', destination: [ 'src', 'app.d.ts' ] },
			// flash message
			{ source: '+layout.server.ts', destination: [ 'src', 'routes', '+layout.server.ts' ] }
		],
    libraries: [
			{
				name: 'tailwindcss',
				commands: [
					(packageManager) => `${PACKAGE_MANAGER_MAP[packageManager].executor} @svelte-add/tailwindcss@latest`,
					(packageManager) => `${packageManager} ${PACKAGE_MANAGER_MAP[packageManager].installer}`
				]
			},
			{
				name: 'shadcn',
				commands: [
					(packageManager) => `${PACKAGE_MANAGER_MAP[packageManager].executor} shadcn-svelte@latest init`
				]
			},
			{
				name: 'mode-watcher',
				commands: [
					(packageManager) => `${packageManager} ${PACKAGE_MANAGER_MAP[packageManager].installer} mode-watcher`
				]
			},
			{
				name: 'sonner',
				commands: [
					(packageManager) => `${PACKAGE_MANAGER_MAP[packageManager].executor} shadcn-svelte@latest add sonner`
				]
			},
			{
				name: 'sveltekit-superforms w/ zod',
				commands: [
					(packageManager) => `${packageManager} ${PACKAGE_MANAGER_MAP[packageManager].installer} -D sveltekit-superforms zod`
				]
			},
			{
				name: 'svetlekit-flash-message',
				commands: [
					(packageManager) => `${packageManager} ${PACKAGE_MANAGER_MAP[packageManager].installer} -D sveltekit-flash-message`
				]
			},
			{
				name: 'lucide-svelte',
				commands: [
					(packageManager) => `${packageManager} ${PACKAGE_MANAGER_MAP[packageManager].installer} lucide-svelte`
				]
			}
		]
  }
];
