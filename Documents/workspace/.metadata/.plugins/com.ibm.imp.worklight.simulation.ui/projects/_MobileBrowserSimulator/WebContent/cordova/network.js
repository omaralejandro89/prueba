/*
 * Cordova is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2010-2011, IBM Corporation
 */

if (!Cordova.hasResource("network")) {
Cordova.addResource("network");

/**
 * This class contains information about the current network Connection.
 * @constructor
 */
Connection = function() {
    this.type = null;
    this._firstRun = true;
    this._timer = null;
    this.timeout = 500;

    var me = this;
    this.getInfo(
        function(type) {
            // Need to send events if we are on or offline
            if (type == "none") {
                // set a timer if still offline at the end of timer send the offline event
                me._timer = setTimeout(function(){
                    me.type = type;
                    Cordova.onOffline.fire();
                    me._timer = null;
                    }, me.timeout);
            } else {
                // If there is a current offline event pending clear it
                if (me._timer != null) {
                    clearTimeout(me._timer);
                    me._timer = null;
                }
                me.type = type;
                Cordova.onOnline.fire();
            }
            
            // should only fire this once
            if (me._firstRun) {
                me._firstRun = false;
                Cordova.onCordovaConnectionReady.fire();
            }            
        },
        function(e) {
            // If we can't get the network info we should still tell Cordova
            // to fire the deviceready event.
            if (me._firstRun) {
                me._firstRun = false;
                Cordova.onCordovaConnectionReady.fire();
            }            
            _consoleLog("Error initializing Network Connection: " + e);
        });
};

Connection.UNKNOWN = "unknown";
Connection.ETHERNET = "ethernet";
Connection.WIFI = "wifi";
Connection.CELL_2G = "2g";
Connection.CELL_3G = "3g";
Connection.CELL_4G = "4g";
Connection.CELL = "cellular";
Connection.NONE = "none";


/**
 * Get connection info
 *
 * @param {Function} successCallback The function to call when the Connection data is available
 * @param {Function} errorCallback The function to call when there is an error getting the Connection data. (OPTIONAL)
 */
Connection.prototype.getInfo = function(successCallback, errorCallback) {
    // Get info
    Cordova.exec(successCallback, errorCallback, "Network Status", "getConnectionInfo", []);
};


Cordova.addConstructor(function() {
	_consoleLog("Adding network="+navigator.network);
    navigator.connection = new Connection();
    _consoleLog(" -- connection now ="+navigator.connection);
    //navigator.network.connection is deprecated but we will support it in MBS until it is taken out of Cordova
    if (typeof navigator.network === "undefined") {
        navigator.network = new Object();
    }
    if (typeof navigator.network.connection === "undefined") {
        navigator.network.connection = new Connection();
        _consoleLog(" -- connection now ="+navigator.network.connection);
    }
});

};
