export const TEMPLATES = [
	{
		name: 'basic',
		initCommand: (packageManager, projectName) =>
			`${packageManager} create svelte${
				packageManager !== 'yarn' ? '@latest' : ''
			} ${projectName}`,
		files: [
			{ source: 'tailwind.config.js', destination: ['tailwind.config.js'] },
			{ source: 'svelte.config.js', destination: ['svelte.config.js'] },
			{ source: 'app.css', destination: ['src', 'app.css'] },
			{
				source: '+layout.svelte',
				destination: ['src', 'routes', '+layout.svelte'],
			},
		],
		libraries: [
			{
				name: 'tailwindcss',
				dependencies: 'tailwindcss postcss autoprefixer',
				initCommand: 'npx tailwindcss init -p',
				dev: true,
			},
		],
	},
];
