const fs = require('fs');
const path = require('path');
const deferral = require('q').defer();

module.exports = function(context) {
    if (context.opts.cordova.platforms.indexOf('ios') < 0) {
        return;
    }
    var settingsFilePath = "connectplace-settings.plist";
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
