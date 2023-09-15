let projectInfo = {
	framework: "",
	packageManager: "",
	projectName: "",
	language: "",
};

function setFramework(framework) {
	projectInfo.framework = framework;
}

function setPackageManager(packageManager) {
	projectInfo.packageManager = packageManager;
}

function setProjectName(projectName) {
	projectInfo.projectName = projectName;
}

function setLanguage(language) {
	projectInfo.language = language;
}

function getProjectInfo() {
	return projectInfo;
}

export { setFramework, setLanguage, setPackageManager, setProjectName, getProjectInfo };
