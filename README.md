# BigDataCloud NodeJS API Client


A NodeJS client for connecting to the API services provided by [BigDataCloud](https://www.bigdatacloud.com).


## What API services does [BigDataCloud](https://www.bigdatacloud.com) offer?

BigDataCloud offers a range of extremely useful and fast APIs that can be utilised in both backend and frontend scenarios.
From validating customer input live to the next generation of IP Geolocation technology, BigDataCloud has an API suitable to your needs.

For a full list of APIs, visit our [documentation area](https://www.bigdatacloud.com/docs).

You can access any and all BigDataCloud APIs with a free API Key.
To get your API Key, just access your account and retrieve it from your [Account Dashboard](https://www.bigdatacloud.com/account).
If you are not yet a customer, it is completely free to join.

### BigDataCloud API Packages

All BigDataCloud APIs are bundled into five different API packages. Each API package has its own subscription plans and pricings. 

You can find more details on the respective API packages page.
- [IP Geolocation Package](https://www.bigdatacloud.com/packages/ip-geolocation)
- [Reverse Geocoding Package](https://www.bigdatacloud.com/packages/reverse-geocoding)
- [Phone & Email Verification Package](https://www.bigdatacloud.com/packages/phone-email-verification)
- [Network Engineering Package](https://www.bigdatacloud.com/packages/network-engineering), and
- [Free API Package](https://www.bigdatacloud.com/packages/free-api) (doesn't require account creation and API key)

## Documentation

For documentation specific to this api client, please read below.
For more specific documentation to the APIs available, including endpoints, request and response data, please visit our [documentation area](https://www.bigdatacloud.com/docs/ip-geolocation).


## Update Notes

- This repository now utilises `node-fetch` rather than the deprecated `request` module.
- Calls to the API will return a JSON object as a successful response, see below for an example
- Exceptions return a single object: `{error:json_object || error_string,code:http_status_code}`



## Authentication / Identification

To use this API client you must have a BigDataCloud API Key.
To get your personal key, just access your account and retrieve it from your [Account Dashboard](https://www.bigdatacloud.com/account).
If you are not yet a customer, it is completely free to join.

Simply provide this key when initiating the api client, and it will be included in all requests to the BigDataCloud API Server.
See the example below.



## Installation

`npm install @bigdatacloudapi/client`



## Example usage

The below example is found in the included demo.js.

```javascript
    const client = require('@bigdatacloudapi/client')('XXX'); // XXX being your api key found at: https://www.bigdatacloud.com/account

    /*
     * All api endpoints can be accessed via magic methods in the following camelised format:
     * method | endpoint
     * For example: an asynchronous "GET" call to the "ip-geolocation-full" endpoint would be: client.getIpGeolocationFull();
     * All endpoints return a promise
     */

    //Asynchronous example using 'then':
    client
    .getIpGeolocationFull({ip:'8.8.8.8'})
    .then((jsonResult=> {
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
        "isKnownAsVpn": false,
        "isKnownAsProxy": false,
        "isSpamhausDrop": false,
        "isSpamhausEdrop": false,
        "isSpamhausAsnDrop": false,
        "isBlacklistedUceprotect": false,
        "isBlacklistedBlocklistDe": false,
        "isKnownAsMailServer": false,
        "isKnownAsPublicRouter": false,
        "isBogon": false,
        "isUnreachable": false,
        "hostingLikelihood": 0,
        "isHostingAsn": false,
        "isCellular": false,
        "iCloudPrivateRelay": false
    }
}
```


## Error Handling

Utilize standard error handling practices as shown in the above example.

Wrap any synchronous calls in a try/catch handler, and ensure to include the .catch() method on any async calls.

```javascript
   
    //Asynchronous error handling
    client
    .getIpGeolocationFull({ip:'8.8.8.8'})
    .then((jsonResult=> {
        //success
    })
    .catch(function(error) {
        console.error('Asynchronous "then" error:', error);
    });

    //Synchronous error handling
    (async function() {
        try {
            //success
        } catch (error) {
            console.error('Asynchronous "await" error:', error);
        }
    })();

```
