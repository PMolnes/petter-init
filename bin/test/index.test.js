const { copyTemplateFileString } = require("../helper");
const path = require("path");

test("copy template file string", () => {
	expect(copyTemplateFileString("sveltekit", "tailwind.config.js")).toBe(
		`cp ${path.join(__dirname, "..", "sveltekit", "tailwind.config.js")} .`
	);

	expect(copyTemplateFileString("sveltekit", "app.css", "./src")).toBe(
		`cp ${path.join(__dirname, "..", "sveltekit", "app.css")} ./src`
	);

	expect(copyTemplateFileString("vue", "tailwind.config.js")).toBe(
		`cp ${path.join(__dirname, "..", "vue", "tailwind.config.js")} .`
	);
});
