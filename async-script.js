(function(global) {
	if (typeof global.angular !== 'undefined' && global.angular.module) {
		angular.module('async-script', []).factory('asyncScript', ['$document', '$q', '$timeout', factory]);
	} else if (typeof define === 'function' && define.amd) {
		define(browserFactory);
	} else {
		global.asyncScript = browserFactory();
	}

	function browserFactory() {
		return factory([global.document], global.Q, global.setTimeout);
	}

	function factory($document, $q, $timeout) {
		'use strict';
		var document = $document[0];

		function loadScript(scriptUrl, callback, errback) {
			var scriptTag = document.createElement('script');
			scriptTag.type = 'text/javascript';
			scriptTag.async = true;
			scriptTag.src = scriptUrl;

			// See http://www.nczonline.net/blog/2009/06/23/loading-javascript-without-blocking/
			scriptTag.onreadystatechange = function() {
				if (this.readyState === 'loaded' || this.readyState === 'complete') {
					callback();
					scriptTag.onreadystatechange = null;
				}
			};

			scriptTag.onload = callback;
			scriptTag.onerror = errback;

			document.body.appendChild(scriptTag);
		}

		function loadScriptAsync(scriptUrl) {
			var deferred = $q.defer();

			function resolve() {
				deferred.resolve();
			}

			function reject() {
				deferred.reject();
			}

			loadScript(scriptUrl, function() {
				$timeout(resolve);
			}, function() {
				$timeout(reject);
			});

			return deferred.promise;
		}

		return {
			load: loadScriptAsync,
			$load: loadScript
		};
	}

})(this);
