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
    var detectionButton = document.getElementById("detection");
    var alertDiv = document.getElementById("inappaction");
    var optinButton = document.getElementById("optin");
    var optinResult = document.getElementById("optin-result");
    
    ConnecthingsBridge.askPermissions("ACCESS_FINE_LOCATION");
    
    detectionButton.addEventListener('click', function(){
        ConnecthingsBridge.registerInAppAction();
                                     
        ConnecthingsBridge.inAppAction.createInAppAction = function(pluginResult) {
            console.log("client createInAppAction");
            var placeInAppAction = pluginResult["placeInAppAction"];
            alertDiv.innerHTML = "";
            alertDiv.appendChild(displayContent(placeInAppAction));
        };
         
        ConnecthingsBridge.inAppAction.removeInAppAction = function(pluginResult) {
            console.log("client removeInAppAction");
            alertDiv.innerHTML = "";
        };
    }, false);
    
    optinButton.addEventListener('click', function(){
        if (confirm("Can I use your localisation ?")) {
            ConnecthingsBridge.updateOptin("USER_DATA", true);
            ConnecthingsBridge.updateOptin("STATUS", true);
        } else {
            ConnecthingsBridge.updateOptin("USER_DATA", false);
            ConnecthingsBridge.updateOptin("STATUS", true);
        }
        ConnecthingsBridge.allOptinsAreUpdated();
        ConnecthingsBridge.isOptinAuthorized("USER_DATA", function(pluginResult) {
            optinResult.innerHTML = "";
            optinResult.innerHTML = "USER_DATA: " + pluginResult["isOptinAuthorized"];
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
