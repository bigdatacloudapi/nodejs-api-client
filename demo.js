const client = require('./index')('XXX'); // XXX being your api key found at: https://www.bigdatacloud.com/account

/*
 * All api endpoints can be accessed via magic methods in the following camelised format:
 * method | endpoint
 * For example: an asynchronous "GET" call to the "ip-geolocation-full" endpoint would be: client.getIpGeolocationFull();
 * All endpoints return a promise
 */

//Asynchronous example using 'then':
client
.getIpGeolocationFull({ip:'8.8.8.8'})
.then(jsonResult => {
    console.log('Asynchronous "then" result:',jsonResult);
}).catch(exception => {
	console.log(exception);
});

//Asynchronous example using 'await':
(async () => {
    try {
        var jsonResult = await client.getIpGeolocationFull({ip:'8.8.8.8'});
        console.log('Asynchronous "await" result:',jsonResult);
    } catch (error) {
        console.error('Asynchronous "await" error:', error);
    }
})();