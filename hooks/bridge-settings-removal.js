const fs = require('fs');
const path = require('path');
const deferral = require('q').defer();

module.exports = function(context) {
    var settingsFilePath = "connecthings-settings.plist";

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
