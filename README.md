# Cordova app demo for Connecthings' SDK bridge

This app is an example to show you, how to use the [Cordova Bridge of the Connecthings' SDK](https://github.com/Connecthings/cordova-bridge-connecthings).

## Create a cordova application with our plugin 

```
cordova create yourFolder com.example.hello HelloWorld
cordova platform add android 
cordova platform add ios
cordova plugin add https://github.com/Connecthings/cordova-bridge-connecthings.git
```

## Configure your application to support the Connecthings' SDK

First, you need to edit the build.json file to add your ios team id :

```
{
	"ios": {
		"debug": {
			...
			"developmentTeam": "**yourTeamId**"
		},
		"release": {
			...
			"developmentTeam": "**yourTeamId**"
		}
	}
}
```

Then, you need to seize the Connecthings' SDK identifiers before being able to use the plugin. You can read more about this, on [the bridge repository](https://github.com/Connecthings/cordova-bridge-connecthings#initialization). 

## Android build

The last version of Cordova doesn't have the last build version of gradle and doesn't support [Android 10](https://www.android.com/android-10/), to be able to fix the compilation, we created a hook called **android-build-fixes.js**. But you still need to
update an environment variable called **CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL**. You need to change it, to be at least at the version 4.6 of gradle like this :

```
export CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL="https\\://services.gradle.org/distributions/gradle-4.6-all.zip"
```

And, if you want the modification to be permanent, you can update your .bashrc like this :

```
CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL="https\\://services.gradle.org/distributions/gradle-4.6-all.zip"
```

That's all folks.
