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
## :warning: Target version 

Android O makes mandatory to use a JobScheduler to execute a background job. But the JobSchedulers limit what is possible to do in background, mainly in term of frequency of jobs.
So, if you set 26 (for Android O) as android target for your application, you may notice that it is necessary to wait between 5 to 10 minutes to get a beacon notification.
A solution is to set the android target to 25 and still compile with the last Sdk Version to take advantages of last android features while having great beacon scan performance. 

That's all folks.
