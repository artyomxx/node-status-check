'use strict';

module.exports = {
	text: (res, text) => res.end(text),
	status: (res, code, text) => { res.writeHead(code); return res.end(text); }
};
