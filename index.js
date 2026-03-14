class Client {
	constructor(apiKey, nameSpace, server) {
		this.apiKey = apiKey;
		this.nameSpace = nameSpace || 'data';
		this.server = server || 'api-bdc.net';

		return new Proxy(this, {
			get: (target, prop) => {
				if (typeof target[prop] !== 'undefined') return target[prop];
				return (params) => {
					let key = prop;
					let method = 'GET';

					key = key.replace(/([A-Z])/g, (m) => '-' + m.toLowerCase());
					key = key.replace(/^-/, '');
					const parts = key.split('-');

					if (parts.length > 1) {
						const methodTest = parts[0].toUpperCase();
						if (['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'].includes(methodTest)) {
							method = methodTest;
							parts.shift();
						}
					}

					const endpoint = parts.join('-');
					return this.communicate(endpoint, method, params);
				};
			}
		});
	}

	communicate(endpoint, method, payload) {
		const qs = [];
		let data = false;
		let hasKey = false;
		method = (method || 'GET').toUpperCase();

		let url = 'https://' + this.server + '/' + this.nameSpace + '/' + endpoint;

		if (payload) {
			for (const key in payload) {
				if (key === 'key') hasKey = true;
				qs.push(encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]));
			}
		}
		if (!hasKey) qs.push('key=' + this.apiKey);

		if (qs.length && (method === 'GET' || method === 'HEAD' || method === 'DELETE')) {
			url += (url.indexOf('?') === -1 ? '?' : '&') + qs.join('&');
		} else if (qs.length) {
			data = qs.join('&');
		}

		return this.talk(method, url, data);
	}

	async talk(method, url, data) {
		const options = { method };

		if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
			options.headers = { 'content-type': 'application/x-www-form-urlencoded' };
		}
		if (data) options.body = data;

		const res = await fetch(url, options);
		const json = await res.json();

		if (!res.ok) {
			throw { error: json, code: res.status };
		}

		return json;
	}
}

// Support both CJS and ESM
module.exports = (apiKey, nameSpace, server) => new Client(apiKey, nameSpace, server);
module.exports.Client = Client;
module.exports.default = module.exports;
