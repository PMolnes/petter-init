import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "petter-init",
	description: "TailwindCSS setup ready-to-code.",
	base: "/",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		search: {
			provider: "local",
		},
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Getting started", link: "/introduction" },
			{ text: "Releases", link: "https://github.com/PMolnes/petter-init/releases" },
		],

		sidebar: [
			{
				text: "Getting Started",
				items: [
					{ text: "Introduction", link: "/introduction" },
					{ text: "Quick Start", link: "/quick-start" },
				],
			},
		],

		footer: {
			message: "Made with ❤️ by PMolnes",
			copyright: "Copyright © 2023-present Petter Molnes",
		},

		socialLinks: [{ icon: "github", link: "https://github.com/PMolnes/petter-init" }],
	},
});
