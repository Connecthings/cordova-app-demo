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

That's all folks.
