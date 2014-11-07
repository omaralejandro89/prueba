
/* JavaScript content from js/main.js in folder common */
function wlCommonInit(){
	
	console.log("Using ionic workshop!")
	angular.element(document).ready(function() {
		angular.bootstrap(document, ["App"]);		
	});
}

/* JavaScript content from js/main.js in folder iphone */
// This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}