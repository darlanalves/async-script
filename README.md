## async-script

Load a JS file and run something once it is done (via Promises)

```
// inject "loadScriptAsync" function anywhere
function (loadScriptAsync) {
	loadScriptAsync('http://the.script.com/script.js').then(
		function() {
			// called when the script is loaded
		},
		function() {
			// called if the script fails to load
		});
}
```

## Code
- [Download it here](https://raw.github.com/darlanalves/ng-modules/master/async-script/async-script.js)