const fs = require('fs');
const path = require('path');
const deferral = require('q').defer();

module.exports = function(context) {
    if (context.opts.platforms.indexOf('android') < 0) {
        return;
    }
    var platformPath = path.join(context.opts.projectRoot, 'platforms/android');

    // First, we remove minSDK in Manifest.xml 
    writeNewManifest(platformPath + "/CordovaLib/AndroidManifest.xml");
    writeNewManifest(platformPath + "/app/src/main/AndroidManifest.xml");

    // Then, we update the build.gradle version to 3.3.0
    updateBuildVersion(platformPath + "/build.gradle");
    updateBuildVersion(platformPath + "/app/build.gradle");
    updateBuildVersion(platformPath + "/CordovaLib/build.gradle");

    // Finally, we change the wrapper version to at least the gradle-4.10.3-all.zip
    // changeWrapperVersion(platformPath + "/gradle/wrapper/gradle-wrapper.properties");

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


function updateBuildVersion(gradlePath) {
    if (fs.existsSync(gradlePath)) {
        var gradleRegex = /com\.android\.tools\.build:gradle:[0-9]+.[0-9]+.[0-9]+/;
        var data = fs.readFileSync(gradlePath, 'utf8');
        var newData = data.replace(gradleRegex, "com\.android\.tools\.build:gradle:3.3.0");
        fs.writeFileSync(gradlePath, newData, 'utf8');
    }
}


function changeWrapperVersion(wrapperPath) {
    if (fs.existsSync(wrapperPath)) {
        var wrapperRegex = /gradle-([0-9]\.?){1,3}-all\.zip/;
        var data = fs.readFileSync(wrapperPath, 'utf8');
        var newData = data.replace(wrapperRegex, "gradle-4.10.3-all.zip");
        fs.writeFileSync(wrapperPath, newData, 'utf8');
    }
}