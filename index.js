const fetch = require('node-fetch');

class Client {
	constructor(apiKey, nameSpace, server) {
		var _this=this;
		this.apiKey=apiKey;
		this.nameSpace=nameSpace ? nameSpace : 'data';
		this.server=server ? server : 'api.bigdatacloud.net';

		return new Proxy(this,{
			get:(t,p) => {
				if (typeof t[p]!=='undefined') return t[p];
				return params => {
					var key=p;
					var method='GET';

					key=key.replace(/([A-Z])/g,(m,c,o,i) => {
						return '-'+c.toLowerCase();
					});
					key=key.trim('-');
					key=key.split('-');

					if (key.length>1) {
						var methodTest=key[0].toUpperCase();
						switch (methodTest) {
							case 'GET':
							case 'POST':
							case 'PUT':
							case 'DELETE':
							case 'OPTIONS':
							case 'PATCH':
							case 'HEAD':
							method=methodTest;
							key.shift();
							break;
						}
					}
					var endpoint=key.join('-');
					return _this.communicate(endpoint,method,params);
				}
			}
		});
	}

	communicate(endpoint,method,payload) {
		var qs=[];
		var data=false;
		var hasKey=false;
		if (!method) method='GET';
		method=method.toUpperCase();

		var url='https://'+this.server+'/'+this.nameSpace+'/'+endpoint;

		if (payload) {
			for (var i in payload) {
				if (i=='key') hasKey=true;
				qs.push(encodeURIComponent(i)+'='+encodeURIComponent(payload[i]));
			}
		}
		if (!hasKey) qs.push('key='+this.apiKey);

		if (qs.length && method=='GET' || method=='HEAD' || method=='DELETE') {
			if (qs.length) {
				url+=(url.indexOf('?')==-1 ? '?' : '&')+qs.join('&');
			}
		} else if (qs.length) {
			data=qs.join('&');
		}

		return this.talk(method,url,data);
	}

	talk(method,url,data) {
		return new Promise(async (resolve, reject) => {
			var payload={method:method};
			if (method=='POST' || method=='PUT' || method=='PATCH') {
				payload.headers={'content-type' : 'application/x-www-form-urlencoded'};
			}
			if (data) payload.body=data;
			try {
				const res=await fetch(url,payload);
				var json=await res.json();
				if (!res.ok) {
					return reject({error:json,code:res.status});
				}
				if (json) {
					return resolve(json);
				}
				return reject({error:res.body,code:res.status});

			} catch (e) {
				reject({error:e,code:0});
			}
		});
	}
};

module.exports=(apiKey,nameSpace,server) => {
	return new Client(apiKey,nameSpace,server);
}