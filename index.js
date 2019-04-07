const request = require('request');

class Client {
	constructor(apiKey, nameSpace, server) {
		var _this=this;
		this.apiKey=apiKey;
		this.nameSpace=nameSpace ? nameSpace : 'data';
		this.server=server ? server : 'api.bigdatacloud.net';

		return new Proxy(this,{
			get:function(t,p) {
				if (typeof t[p]!=='undefined') return t[p];
				return function(params) {
					var key=p;
					var method='GET';

					key=key.replace(/([A-Z])/g,function(m,c,o,i) {
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

	async communicate(endpoint,method,payload) {
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
		return new Promise((resolve, reject) => {
			var payload={url:url,json:true,method:method};
			if (method=='POST' || method=='PUT' || method=='PATCH') {
				payload.headers={'content-type' : 'application/x-www-form-urlencoded'};
			}
			if (data) payload.body=data;
			request(payload, (error, response, body) => {
				if (error) reject(error,0);
				if (response.statusCode != 200) {
					reject(body,code);
				}
				resolve(body);
			});
		});
	}
};

module.exports=function(apiKey,nameSpace,server) {
	return new Client(apiKey,nameSpace,server);
}