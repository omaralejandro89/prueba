/*
 * Cordova is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2010-2011, IBM Corporation
 */

if (!Cordova.hasResource("accelerometer")) {
Cordova.addResource("accelerometer");
(function() {

/** @constructor */
Acceleration = function(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.timestamp = new Date().getTime();
};

/**
 * This class provides access to device accelerometer data.
 * @constructor
 */
var Accelerometer = function() {

    /**
     * The last known acceleration.  type=Acceleration()
     */
    this.lastAcceleration = null;

    /**
     * List of accelerometer watch timers
     */
    this.timers = {};
};

Accelerometer.ERROR_MSG = ["Not running", "Starting", "", "Failed to start"];

/**
 * Asynchronously aquires the current acceleration.
 *
 * @param {Function} successCallback    The function to call when the acceleration data is available
 * @param {Function} errorCallback      The function to call when there is an error getting the acceleration data. (OPTIONAL)
 * @param {AccelerationOptions} options The options for getting the accelerometer data such as timeout. (OPTIONAL)
 */
Accelerometer.prototype.getCurrentAcceleration = function(successCallback, errorCallback, options) {

    // successCallback required
    if (typeof successCallback !== "function") {
        _consoleLog("Accelerometer Error: successCallback is not a function");
        return;
    }

    // errorCallback optional
    if (errorCallback && (typeof errorCallback !== "function")) {
        _consoleLog("Accelerometer Error: errorCallback is not a function");
        return;
    }

    // Get acceleration
    Cordova.exec(successCallback, errorCallback, "Accelerometer", "getAcceleration", []);
};

/**
 * Asynchronously aquires the acceleration repeatedly at a given interval.
 * 
 * @param {Function}
 *            successCallback The function to call each time the acceleration
 *            data is available
 * @param {Function}
 *            errorCallback The function to call when there is an error getting
 *            the acceleration data. (OPTIONAL)
 * @param {AccelerationOptions}
 *            options The options for getting the accelerometer data such as
 *            timeout. (OPTIONAL)
 * @return String The watch id that must be passed to #clearWatch to stop
 *         watching.
 */
Accelerometer.prototype.watchAcceleration = function(successCallback, errorCallback, options) {

    // Default interval (10 sec)
    var frequency = (options !== undefined)? options.frequency : 10000;

    // successCallback required
    if (typeof successCallback !== "function") {
        _consoleLog("Accelerometer Error: successCallback is not a function");
        return;
    }

    // errorCallback optional
    if (errorCallback && (typeof errorCallback !== "function")) {
        _consoleLog("Accelerometer Error: errorCallback is not a function");
        return;
    }

    // Make sure accelerometer timeout > frequency + 10 sec
    Cordova.exec(
        function(timeout) {
            if (timeout < (frequency + 10000)) {
                Cordova.exec(null, null, "Accelerometer", "setTimeout", [frequency + 10000]);
            }
        },
        function(e) { }, "Accelerometer", "getTimeout", []);

    // Start watch timer
    var id = Cordova.createUUID();
    navigator.accelerometer.timers[id] = setInterval(function() {
        Cordova.exec(successCallback, errorCallback, "Accelerometer", "getAcceleration", []);
    }, (frequency ? frequency : 1));

    return id;
};

/**
 * Clears the specified accelerometer watch.
 *
 * @param {String} id       The id of the watch returned from #watchAcceleration.
 */
Accelerometer.prototype.clearWatch = function(id) {

    // Stop javascript timer & remove from timer list
    if (id && navigator.accelerometer.timers[id] !== undefined) {
        clearInterval(navigator.accelerometer.timers[id]);
        delete navigator.accelerometer.timers[id];
    }
};

Cordova.addConstructor(function() {
    navigator.accelerometer = new Accelerometer();
});
}());
}
