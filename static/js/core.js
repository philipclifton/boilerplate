/* =======================================================
> /static/js/core.js
==========================================================
You should not need to make any changes to this file. Ever.
========================================================== */

var Core = {};

Core = (function()
{
	var fn = {};
	var settings = {};

	/**
	 * Initialisation function. Loads in any settings passed to the script
	 * @param  {Object} obj
	 * @return none
	 */
	fn.init = function(obj)
	{
		Core.settings = obj;
		console.log('Script loaded: '+Core.settings.staticUrl+'js/core.js');
		Core.globalConsole();
		Core.initModules();
	};

	/**
	 * List of Modules to load into the dom if the selector exists
	 * @return {null}
	 */
	fn.initModules = function() {
		Core.loadModule('innerpage', 'body');
	}

	fn.loadModule = function(moduleName, selector)
	{
		if (!selector || $(selector).length ) {
			Core.loadScript('modules/core.' + moduleName + '.js', function(){
				window['Core'][moduleName].init();
			});
		}
	}

	/**
	 * Function to load third party scripts
	 * @param  {string}   url - URL to the script to load
	 * @param  {function} callback - Function to run after script is loaded
	 * @return none
	 */
	fn.loadScript = function(url, callback, external)
	{
		if(external)
		{

		}
		else
		{
			url = Core.settings.staticUrl + 'js/' + url;
		}

		var script = document.createElement("script");
		script.type = "text/javascript";

		if(script.readyState) { // IE
			script.onreadystatechange = function() {
				if(script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					if (callback) {
						callback();
					};
				}
			}
		} else { // Proper browsers
			script.onload = function() {
				console.log('Script loaded: ' + url);
				if (callback) {
					callback();
				};
			}
		}

		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	};


	/**
	 * Function to prevent console.log errors on IE
	 * @return none
	 */
	fn.globalConsole = function()
	{
		var method;
		var noop = function noop(){};
		var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
		var length = methods.length;
		var console = (window.console = window.console || {});
		while (length--) {
			method = methods[length];
			if (!console[method]) {
				console[method] = noop;
			}
		}
	};

	return fn;
}());