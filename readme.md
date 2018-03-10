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
	pass: {	// what to return on pass — can be a simple string
		code: 200,
		text: 'pass'
	},
	fail: { // what to return on fail
		code: 500,
		text: 'fail'
	},
	timeout: 10000 // msec to wait for the response of the check function
});
```

#### Response when check passed:
```sh
curl -v http://localhost:9000/status
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 9000 (#0)
> GET /status HTTP/1.1
> Host: localhost:9000
> User-Agent: curl/7.47.0
> Accept: */*
> 
< HTTP/1.1 200 Internal Server Error
< Date: Sat, 10 Mar 2018 12:29:38 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
< 
pass
```


#### Response when check failed:
```sh
curl -v http://localhost:9000/status
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 9000 (#0)
> GET /status HTTP/1.1
> Host: localhost:9000
> User-Agent: curl/7.47.0
> Accept: */*
> 
< HTTP/1.1 500 Internal Server Error
< Date: Sat, 10 Mar 2018 12:29:38 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
< 
fail
```


#### Response when timeout exceeded:
```sh
curl -v http://localhost:9000/status
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 9000 (#0)
> GET /status HTTP/1.1
> Host: localhost:9000
> User-Agent: curl/7.47.0
> Accept: */*
> 
< HTTP/1.1 503 Gateway Timeout
< Date: Sat, 10 Mar 2018 12:29:38 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
< 
```
