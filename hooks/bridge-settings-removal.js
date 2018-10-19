module.exports = function(context) {
    var settingsFilePath = "connectplace-settings.plist";
    var fs = context.requireCordovaModule('fs'),
        path = context.requireCordovaModule('path'),
        deferral = context.requireCordovaModule('q').defer();

    var platformPath = path.join(context.opts.projectRoot, 'platforms/ios') + "/CordovaAppDemo/Resources/";
    var filePath = platformPath + settingsFilePath;

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        deferral.resolve();
    } else {
        deferral.resolve();
    }

    return deferral.promise;
};