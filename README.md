# BigDataCloud NodeJS API Client


A NodeJS client for connecting to the API services provided by [BigDataCloud](https://www.bigdatacloud.net)


## What API services does [BigDataCloud](https://www.bigdatacloud.net) offer?

BigDataCloud offers a range of extremely useful and fast APIs that can be utilised in both backend and frontend scenarios.
From validating customer input live to the next generation of IP Geolocation technology, BigDataCloud has an API suitable to your needs.

For a full list of APIs, visit our [documentation area](https://www.bigdatacloud.net/ip-geolocation-apis).

You can access any and all BigDataCloud APIs with a free API Key.
To get your API Key, just access your account and retrieve it from your [Account Dashboard](https://www.bigdatacloud.net/customer/account).
If you are not yet a customer, it is completely free to join.



## Documentation

For documentation specific to this api client, please read below.
For more specific documentation to the APIs available, including endpoints, request and response data, please visit our [documentation area](https://www.bigdatacloud.net/ip-geolocation-apis).



## Authentication / Identification

To use this API client you must have a BigDataCloud API Key.
To get your personal key, just access your account and retrieve it from your [Account Dashboard](https://www.bigdatacloud.net/customer/account).
If you are not yet a customer, it is completely free to join.

Simply provide this key when initiating the api client, and it will be included in all requests to the BigDataCloud API Server.
See the example below.



## Installation

`npm install @bigdatacloudapi/client`



## Example usage

```javascript
	const client = require('@bigdatacloudapi/client')('XXX'); // XXX being your api key found at: https://www.bigdatacloud.net/customer/account

    /*
     * All api endpoints can be accessed via magic methods in the following camelised format:
     * method | endpoint
     * For example: an asynchronous "GET" call to the "ip-geolocation-full" endpoint would be: client.getIpGeolocationFull();
     * All endpoints return a promise
     */

    //Asynchronous example using 'then':
    client
    .getIpGeolocationFull({ip:'8.8.8.8'})
    .then(function(jsonResult) {
        console.log('Asynchronous "then" result:',jsonResult);
    })
    .catch(function(error) {
        console.error('Asynchronous "then" error:', error);
    });

    //Asynchronous example using 'await':
    (async function() {
        try {
            var jsonResult = await client.getIpGeolocationFull({ip:'8.8.8.8'});
            console.log('Asynchronous "await" result:',jsonResult);
        } catch (error) {
            console.error('Asynchronous "await" error:', error);
        }
    })();

</script>
```


## Example output

```javascript
{
    "ip": "8.8.8.8",
    "country": {
        "isoAlpha2": "US",
        "isoAlpha3": "USA",
        "m49Code": 840,
        "isoName": "United States of America (the)",
        "isoAdminLanguages": [
            {
                "isoAlpha3": "eng",
                "isoAlpha2": "en",
                "isoName": "English"
            }
        ],
        "unRegion": "Americas/Northern America",
        "currency": {
            "numericCode": 840,
            "code": "USD",
            "name": "US Dollar",
            "minorUnits": 2
        },
        "wbRegion": {
            "id": "NAC",
            "iso2Code": "XU",
            "value": "North America"
        },
        "wbIncomeLevel": {
            "id": "HIC",
            "iso2Code": "XD",
            "value": "High income"
        },
        "callingCode": "1",
        "countryFlagEmoji": "🇺🇸"
    },
    "location": {
        "isoPrincipalSubdivision": "California",
        "isoPrincipalSubdivisionCode": "US-CA",
        "city": "Mountain View",
        "postcode": "94043",
        "latitude": 37.42,
        "longitude": -122.09,
        "timeZone": {
            "ianaTimeId": "America/Los_Angeles",
            "displayName": "(UTC-08:00) Pacific Time (US & Canada)",
            "effectiveTimeZoneFull": "Pacific Daylight Time",
            "effectiveTimeZoneShort": "PDT",
            "UtcOffsetSeconds": -25200,
            "UtcOffset": "-07",
            "isDaylightSavingTime": true,
            "localTime": "2019-04-06T04:06:39.1691744"
        }
    },
    "lastUpdated": "2019-04-06T09:09:36.1877959Z",
    "network": {
        "registry": "ARIN",
        "registryStatus": "assigned",
        "registeredCountry": "US",
        "registeredCountryName": "United States of America (the)",
        "organisation": "Google LLC",
        "isReachableGlobally": true,
        "isBogon": false,
        "bgpPrefix": "8.8.8.0/24",
        "bgpPrefixNetworkAddress": "8.8.8.0",
        "bgpPrefixLastAddress": "8.8.8.255",
        "totalAddresses": 256,
        "carriers": [
            {
                "asn": "AS15169",
                "asnNumeric": 15169,
                "organisation": "Google LLC",
                "name": "GOOGLE",
                "registry": "ARIN",
                "registeredCountry": "US",
                "registeredCountryName": "United States of America (the)",
                "registrationDate": "2000-03-30",
                "registrationLastChange": "2012-02-25",
                "totalIpv4Addresses": 8698103,
                "totalIpv4Prefixes": 435,
                "totalIpv4BogonPrefixes": 0,
                "rank": 53,
                "rankText": "#53 out of 62,872"
            }
        ],
        "viaCarriers": [
            {
                "asn": "AS7018",
                "asnNumeric": 7018,
                "organisation": "ATT Services Inc.",
                "registeredCountry": "US",
                "registeredCountryName": "United States of America (the)",
                "rank": 2
            },
       		/*........*/
            {
                "asn": "AS31019",
                "asnNumeric": 31019,
                "organisation": "Paulus M. Hoogsteder trading as Meanie",
                "registeredCountry": "NL",
                "registeredCountryName": "Netherlands (the)",
                "rank": 51153
            }
        ]
    },
    "confidence": "low",
    "confidenceArea": [
        {
            "latitude": 18.0256672,
            "longitude": -66.5275345
        },
        /*........*/
        {
            "latitude": 18.0256672,
            "longitude": -66.5275345
        }
    ],
    "securityThreat": "unknown",
    "hazardReport": {
        "isKnownAsTorServer": false,
        "isKnownAsProxy": false,
        "isKnownAsMailServer": false,
        "isKnownAsPublicRouter": false,
        "isBogon": false,
        "isUnreachable": false
    }
}
```
