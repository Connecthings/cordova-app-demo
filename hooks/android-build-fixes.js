const fs = require('fs');
const path = require('path');
const deferral = require('q').defer();

module.exports = function(context) {
    if (context.opts.platforms.indexOf('android') < 0) {
        return;
    }
    var platformPath = path.join(context.opts.projectRoot, 'platforms/android');

    // First, we remove minSDK in Manifest.xml 
    // writeNewManifest(platformPath + "/CordovaLib/AndroidManifest.xml");
    // writeNewManifest(platformPath + "/app/src/main/AndroidManifest.xml");

    // Then, we update the build.gradle to last version
    updateGradleVersion(platformPath + "/build.gradle");
    updateGradleVersion(platformPath + "/app/build.gradle");
    updateGradleVersion(platformPath + "/CordovaLib/build.gradle");

	// Update version
	updateBuildToolsVersion(platformPath + "/build.gradle");
	updateAttribute(platformPath + "/build.gradle", "defaultMinSdkVersion", 19);
	updateAttribute(platformPath + "/build.gradle", "defaultTargetSdkVersion", 29);
	updateAttribute(platformPath + "/build.gradle", "defaultCompileSdkVersion", 29);

    // Finally, we change the wrapper version to the last version 
    changeWrapperVersion(platformPath + "/gradle/wrapper/gradle-wrapper.properties");
	// var appPath = context.opts.projectRoot;
    // changeWrapperVersion(appPath + "/gradle/wrapper/gradle-wrapper.properties");

    deferral.resolve();
    return deferral.promise;
};


function writeNewManifest(manifestPath) {
    if (fs.existsSync(manifestPath)) {
        var usesSDKRegex = /<uses-sdk.+\/>/;
        var data = fs.readFileSync(manifestPath, 'utf8');
        var newData = data.replace(usesSDKRegex, "");
        fs.writeFileSync(manifestPath, newData, 'utf8');
    }
}


function updateGradleVersion(gradlePath) {
    if (fs.existsSync(gradlePath)) {
        var gradleRegex = /com\.android\.tools\.build:gradle:[0-9]+.[0-9]+.[0-9]+/;
		var gradleCompileVersion = "3.5.1";
        var data = fs.readFileSync(gradlePath, 'utf8');
        var newData = data.replace(gradleRegex, "com\.android\.tools\.build:gradle:" + gradleCompileVersion);
        fs.writeFileSync(gradlePath, newData, 'utf8');
    }
}


function updateBuildToolsVersion(gradlePath) {
    if (fs.existsSync(gradlePath)) {
		var buildToolsRegex = /defaultBuildToolsVersion\=\"[0-9]+\.[0-9]+\.[0-9]+\"/;
		var newBuildToolsVersion = "29.0.2";
        var data = fs.readFileSync(gradlePath, 'utf8');
        var newData = data.replace(buildToolsRegex, "defaultBuildToolsVersion\=\"" + newBuildToolsVersion + "\"");
        fs.writeFileSync(gradlePath, newData, 'utf8');
	}
}


function updateAttribute(gradlePath, name, newVersion) {
    if (fs.existsSync(gradlePath)) {
		var attributeRegex = new RegExp(name + "\=[0-9]{1,3}");
        var data = fs.readFileSync(gradlePath, 'utf8');
        var newData = data.replace(attributeRegex, name + "\=" + newVersion);
        fs.writeFileSync(gradlePath, newData, 'utf8');
	}
}


function changeWrapperVersion(wrapperPath) {
    if (fs.existsSync(wrapperPath)) {
		var wrapperRegex = /gradle-([0-9]{1,3}\.?){1,3}-all\.zip/;
		var gradleWrapperLastVersion = "gradle-5.4.1-all.zip";
        var data = fs.readFileSync(wrapperPath, 'utf8');
        var newData = data.replace(wrapperRegex, gradleWrapperLastVersion);
        fs.writeFileSync(wrapperPath, newData, 'utf8');
    }
}
