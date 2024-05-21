export const TEMPLATES = [
	{
		name: 'basic',
		files: [
			{ source: 'tailwind.config.js', destination: ['tailwind.config.js'] },
			{ source: 'svelte.config.js', destination: ['svelte.config.js'] },
			{ source: 'app.css', destination: ['src', 'app.css'] },
			{
				source: '+layout.svelte',
				destination: ['src', 'routes', '+layout.svelte'],
			},
		],
	},
];
