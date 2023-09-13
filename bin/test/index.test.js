import helper from "../helper.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test("copy template file string", () => {
	expect(helper.copyTemplateFileString("sveltekit", "tailwind.config.js")).toBe(
		`cp ${path.join(__dirname, "..", "sveltekit", "tailwind.config.js")} .`
	);

	expect(helper.copyTemplateFileString("sveltekit", "app.css", "./src")).toBe(
		`cp ${path.join(__dirname, "..", "sveltekit", "app.css")} ./src`
	);

	expect(helper.copyTemplateFileString("vue", "tailwind.config.js")).toBe(
		`cp ${path.join(__dirname, "..", "vue", "tailwind.config.js")} .`
	);
});
