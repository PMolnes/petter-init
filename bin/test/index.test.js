const { copyTemplateFile } = require("../helper");
const path = require("path");

test("copy template file string", () => {
	expect(copyTemplateFile("sveltekit", "tailwind.config.js")).toBe(
		`cp ${path.join(__dirname, "..", "sveltekit", "tailwind.config.js")} .`
	);

	expect(copyTemplateFile("sveltekit", "app.css", "./src")).toBe(
		`cp ${path.join(__dirname, "..", "sveltekit", "app.css")} ./src`
	);

	expect(copyTemplateFile("vue", "tailwind.config.js")).toBe(
		`cp ${path.join(__dirname, "..", "vue", "tailwind.config.js")} .`
	);
});
