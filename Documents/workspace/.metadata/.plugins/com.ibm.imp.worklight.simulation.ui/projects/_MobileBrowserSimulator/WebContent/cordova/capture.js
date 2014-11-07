/*
 * Cordova is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2010-2011, IBM Corporation
 */

if (!Cordova.hasResource("capture")) {
	Cordova.addResource("capture");
	(function(){

		/**
		 * Represents a single file.
		 * 
		 * name {DOMString} name of the file, without path information fullPath
		 * {DOMString} the full path of the file, including the name type
		 * {DOMString} mime type lastModifiedDate {Date} last modified date size
		 * {Number} size of the file in bytes
		 */

		MediaFile = function(name, fullPath, type, lastModifiedDate, size){
			this.name = name || null;
			this.fullPath = fullPath || null;
			this.type = type || null;
			this.lastModifiedDate = lastModifiedDate || null;
			this.size = size || 0;
		};

		/**
		 * Launch device camera application for recording video(s).
		 * 
		 * @param {Function}
		 *            successCB
		 * @param {Function}
		 *            errorCB
		 */
		MediaFile.prototype.getFormatData = function(successCallback, errorCallback){
			Cordova.exec(successCallback, errorCallback, "Capture", "getFormatData", [this.fullPath, this.type]);
		};

		/**
		 * MediaFileData encapsulates format information of a media file.
		 * 
		 * @param DOMString
		 *            codecs
		 * @param long
		 *            bitrate
		 * @param long
		 *            height
		 * @param long
		 *            width
		 * @param float
		 *            duration
		 */
		MediaFileData = function(codecs, bitrate, height, width, duration){
			this.codecs = codecs || null;
			this.bitrate = bitrate || 0;
			this.height = height || 0;
			this.width = width || 0;
			this.duration = duration || 0;
		};

		/**
		 * The CaptureError interface encapsulates all errors in the Capture
		 * API.
		 */
		CaptureError = function(err) {
			this.code = (err !== undefined ? err : null);
		};

		// Capture error codes
		CaptureError.CAPTURE_INTERNAL_ERR = 0;
		CaptureError.CAPTURE_APPLICATION_BUSY = 1;
		CaptureError.CAPTURE_INVALID_ARGUMENT = 2;
		CaptureError.CAPTURE_NO_MEDIA_FILES = 3;
		CaptureError.CAPTURE_NOT_SUPPORTED = 20;

		/**
		 * The Capture interface exposes an interface to the camera and
		 * microphone of the hosting device.
		 */
		Capture = function(){
			this.supportedAudioModes = [];
			this.supportedImageModes = [];
			this.supportedVideoModes = [];
		};

		/**
		 * Launch audio recorder application for recording audio clip(s).
		 * 
		 * @param {Function}
		 *            successCB
		 * @param {Function}
		 *            errorCB
		 * @param {CaptureAudioOptions}
		 *            options
		 */
		Capture.prototype.captureAudio = function(successCallback, errorCallback, options){
              var fail = function(code) {
                  var ce = new CaptureError(code);
                  errorCallback(ce);
              };
			Cordova.exec(successCallback, fail, "Capture", "captureAudio", [options]);
		};

		/**
		 * Launch camera application for taking image(s).
		 * 
		 * @param {Function}
		 *            successCB
		 * @param {Function}
		 *            errorCB
		 * @param {CaptureImageOptions}
		 *            options
		 */
		Capture.prototype.captureImage = function(successCallback, errorCallback, options){
              var fail = function(code) {
                  var ce = new CaptureError(code);
                  errorCallback(ce);
              };
			Cordova.exec(successCallback, fail, "Capture", "captureImage", [options]);
		};

		/**
		 * Launch device camera application for recording video(s).
		 * 
		 * @param {Function}
		 *            successCB
		 * @param {Function}
		 *            errorCB
		 * @param {CaptureVideoOptions}
		 *            options
		 */
		Capture.prototype.captureVideo = function(successCallback, errorCallback, options){
              var fail = function(code) {
                  var ce = new CaptureError(code);
                  errorCallback(ce);
              };
			Cordova.exec(successCallback, fail, "Capture", "captureVideo", [options]);
		};

		/**
		 * Encapsulates a set of parameters that the capture device supports.
		 */
		var ConfigurationData = function(){
			// The ASCII-encoded string in lower case representing the media
			// type.
			this.type = null;
			// The height attribute represents height of the image or video in
			// pixels.
			// In the case of a sound clip this attribute has value 0.
			this.height = 0;
			// The width attribute represents width of the image or video in
			// pixels.
			// In the case of a sound clip this attribute has value 0
			this.width = 0;
		};

		/**
		 * Encapsulates all image capture operation configuration options.
		 */
		CaptureImageOptions = function(){
			// Upper limit of images user can take. Value must be equal or
			// greater than 1.
			this.limit = 1;
			// The selected image mode. Must match with one of the elements in
			// supportedImageModes array.
			this.mode = null;
		};

		/**
		 * Encapsulates all video capture operation configuration options.
		 */
		CaptureVideoOptions = function(){
			// Upper limit of videos user can record. Value must be equal or
			// greater than 1.
			this.limit = 1;
			// Maximum duration of a single video clip in seconds.
			this.duration = 0;
			// The selected video mode. Must match with one of the elements in
			// supportedVideoModes array.
			this.mode = null;
		};

		/**
		 * Encapsulates all audio capture operation configuration options.
		 */
		CaptureAudioOptions = function(){
			// Upper limit of sound clips user can record. Value must be equal
			// or greater than 1.
			this.limit = 1;
			// Maximum duration of a single sound clip in seconds.
			this.duration = 0;
			// The selected audio mode. Must match with one of the elements in
			// supportedAudioModes array.
			this.mode = null;
		};

		Cordova.addConstructor(function(){
			_consoleLog("@bc -------- capture.js: nav.dev=" + navigator.device);
			if (typeof navigator.device === "undefined") {
				navigator.device = window.device = new Device();
				_consoleLog("@bc -------- capture.js: device=" + navigator.device);
			}
			navigator.device.capture = window.device.capture = new Capture();
			_consoleLog("@bc -------- capture.js: device.capture=" + navigator.device.capture);
		});
	}());
}