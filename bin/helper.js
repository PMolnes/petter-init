const path = require("path");

/*
  Return a string based on the framework selected and which template to copy.
*/
let copyTemplateFile = function (framework, templateToCopy, destination = ".") {
	let templatePath = path.join(__dirname, framework);
	return `cp ${path.join(templatePath, templateToCopy)} ${destination}`;
};

module.exports = {
	copyTemplateFile: copyTemplateFile,
};
