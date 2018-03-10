'use strict';

const defaultOptions = {
	host: 'localhost',
	path: '/status',
	port: 9000,
	pass: {
		code: 200,
		text: 'pass'
	},
	fail: {
		code: 500,
		text: 'fail'
	},
	timeout: 10000
};

const r = require('./response');

module.exports = (cb, options = {}) => {
	options = Object.assign({}, defaultOptions, options);

	const handler = (req, res) => {
		if(req.url !== options.path)
			return r.status(res, 404, 'Not Found');

		return Promise.resolve(cb())
		.catch(() => false)
		.then(result => {
			let mode = result ? 'pass' : 'fail';

			if(options[mode].code)
				return r.status(res, options[mode].code, options[mode].text);
			else
				return r.text(res, options[mode]);
		});
	};

	return require('http')
	.createServer(handler)
	.setTimeout(options.timeout, socket => {
		socket._httpMessage.writeHead(504, 'Gateway Timeout'); // socket.write() and .end() didin't work for some weird reason
		return socket._httpMessage.end();
	})
	.listen({port: options.port, host: options.host}, error => {
		if(error)
			return console.error('Could not launch status server', error);

		console.log(`Status server is listening on ${options.port} at ${options.path}`);
	});
};
