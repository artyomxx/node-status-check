## node-status-check

#### Simplest example:
```js
const fs = require('fs');
const status = require('node-status-check');

const check = () => fs.existsSync('/path/to/file'); // can return a Promise as well

status(check, { // default options below
	host: 'localhost',
	path: '/status',
	port: 9000,
	pass: {	// can be a simple string
		code: 200,
		text: 'pass'
	},
	fail: {
		code: 500,
		text: 'fail'
	},
	timeout: 10000 // msec to wait for the response of the check function
});
```

