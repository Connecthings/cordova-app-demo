/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('pause', this.onPause.bind(this), false);
        document.addEventListener('resume', this.onResume.bind(this), false);
    },
        
    onDeviceReady: function() {
        var locationPermissionButton = document.getElementById("location-permission");
        var registerInAppButton = document.getElementById("register-inapp");
        var unregisterInAppButton = document.getElementById("unregister-inapp");
        var inAppDiv = document.getElementById("result-inapp");
        var optinButton = document.getElementById("optin");
        var optinResult = document.getElementById("optin-result");
        var registerForPush = document.getElementById("register-push");
        var customIdInput = document.getElementById("custom-id");
        var setCustomId = document.getElementById("set-custom-id");
        var removeCustomId = document.getElementById("remove-custom-id");
        var appGroupNameInput = document.getElementById("app-group-name");
        var setGroupName = document.getElementById("set-app-group-name");
        var registerForGeofence = document.getElementById("register-geofence");


        locationPermissionButton.addEventListener('click', function(){
            ConnecthingsBridge.askPermissions("ACCESS_FINE_LOCATION");
        }, false);

        registerForPush.addEventListener('click', function(){
            ConnecthingsBridge.registerForPush(function(pluginResult) {
                console.log(pluginResult);
            });
        }, false);

        setCustomId.addEventListener('click', function(){
            ConnecthingsBridge.setCustomId(customIdInput.value, function(pluginResult) {
                alert(pluginResult);
            });
        }, false);

        removeCustomId.addEventListener('click', function(){
            ConnecthingsBridge.removeCustomId(function(pluginResult) {
                customIdInput.value = '';
                alert(pluginResult);
            });
        }, false);

        setGroupName.addEventListener('click', function(){
            ConnecthingsBridge.setGroupName(appGroupNameInput.value, function(pluginResult) {
                alert(pluginResult);
            });
        }, false);

        registerInAppButton.addEventListener('click', function(){
            ConnecthingsBridge.registerInAppAction();
                                         
            ConnecthingsBridge.inAppAction.createInAppAction = function(pluginResult) {
                console.log("client createInAppAction");
                var placeInAppAction = pluginResult["placeInAppAction"];
                inAppDiv.innerHTML = "";
                inAppDiv.appendChild(displayContent(placeInAppAction));
            };
             
            ConnecthingsBridge.inAppAction.removeInAppAction = function(pluginResult) {
                console.log("client removeInAppAction");
                inAppDiv.innerHTML = "";
            };
        }, false);

        unregisterInAppButton.addEventListener('click', function(){
            inAppDiv.innerHTML = "";
            ConnecthingsBridge.unregisterInAppAction();
        }, false);
		
        registerForGeofence.addEventListener('click', function(){
            ConnecthingsBridge.registerForGeofence(function(pluginResult) {
                console.log(pluginResult);
            });
        }, false);

        optinButton.addEventListener('click', function(){
            ConnecthingsBridge.hasOptinsBeenAsked(function(pluginResult) {
                console.log("hasOptinsBeenAsked: " + pluginResult["hasOptinsBeenAsked"]);
            });

            var privacyNote = "This app collects your location data\nto enable us to showcase the\ncapability of our HEROW\nAugmented Location technology.\n\n";
            privacyNote += "The data collected will not be used\nfor commercial purposes and will\nnot be shared with any third party.";
            if (confirm(privacyNote)) {
                ConnecthingsBridge.updateOptin("USER_DATA", true);
                ConnecthingsBridge.updateOptin("STATUS", true);
            } else {
                ConnecthingsBridge.updateOptin("USER_DATA", false);
                ConnecthingsBridge.updateOptin("STATUS", true);
            }
            ConnecthingsBridge.allOptinsAreUpdated();
            ConnecthingsBridge.isOptinAuthorized("USER_DATA", function(pluginResult) {
                optinResult.innerHTML = "";
                optinResult.innerHTML = "<div class='mbs'>isOptinAuthorized: " + pluginResult["isOptinAuthorized"] + "</div>";
            });
        }, false);

        this.receivedEvent('deviceready');
    },
        
    onPause: function() {
        console.log("onPause");
    },
        
    onResume: function () {
        console.log("onResume");
    },
        
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        
        console.log('Received Event: ' + id);
    }
};

function displayContent(placeInAppAction) {
    var divPlace = document.createElement("div");
    divPlace.setAttribute("class", "clearfix");
    
    var name = placeInAppAction.poiName;
    var divPoiTitle = document.createElement("div");
    divPoiTitle.setAttribute("class", "left w33");
    divPoiTitle.innerHTML = placeInAppAction.title.capitalize();
    
    var divPoiDescription = document.createElement("div");
    divPoiDescription.setAttribute("class", "left w33");
    divPoiDescription.innerHTML = placeInAppAction.description.capitalize();
    
    var divRange = document.createElement("div");
    divRange.setAttribute("class", "left w33");
    divRange.innerHTML = placeInAppAction.placeProximity.capitalize();
    
    divPlace.appendChild(divPoiTitle);
    divPlace.appendChild(divPoiDescription);
    divPlace.appendChild(divRange);
    
    return divPlace;
}

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

app.initialize();