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

---

#### MIT License
```
Copyright (c) 2018

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
