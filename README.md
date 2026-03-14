# BigDataCloud NodeJS API Client

A NodeJS client for connecting to the API services provided by [BigDataCloud](https://www.bigdatacloud.com).

## What API services does BigDataCloud offer?

BigDataCloud offers a range of extremely useful and fast APIs that can be utilised in both backend and frontend scenarios. From validating customer input live to the next generation of IP Geolocation technology, BigDataCloud has an API suitable to your needs.

You can access any and all BigDataCloud APIs with a free API Key. To get your API Key, just access your account and retrieve it from your [Account Dashboard](https://www.bigdatacloud.com/account).

If you are not yet a customer, it is completely free to join — sign up at [bigdatacloud.com/login](https://www.bigdatacloud.com/login).

### BigDataCloud API Packages

All BigDataCloud APIs are bundled into API packages, each with its own subscription plans and pricing:

- [IP Geolocation Package](https://www.bigdatacloud.com/ip-geolocation)
- [Reverse Geocoding Package](https://www.bigdatacloud.com/reverse-geocoding)
- [Phone & Email Verification Package](https://www.bigdatacloud.com/phone-email-verification)
- [Network Engineering Package](https://www.bigdatacloud.com/network-engineering)

## Installation

```bash
npm install @bigdatacloudapi/client
```

## Quick Start

```javascript
const client = require('@bigdatacloudapi/client')('YOUR_API_KEY');

// IP Geolocation
const geo = await client.getIpGeolocationFull({ ip: '8.8.8.8' });
console.log(geo.location.city); // "Mountain View"

// Reverse Geocoding
const address = await client.getReverseGeocode({ latitude: -34.9285, longitude: 138.6007 });
console.log(address.locality); // "Adelaide"

// ASN Info
const asn = await client.getAsnInfo({ asn: 'AS13335' });
console.log(asn.organisation); // "Cloudflare, Inc."
```

## Usage

All API endpoints are accessed via magic methods in camelCase format: `method` + `endpoint`.

The endpoint name is converted from camelCase to kebab-case automatically. For example:

| Method call | HTTP Request |
|---|---|
| `client.getIpGeolocation({ ip: '1.1.1.1' })` | `GET /data/ip-geolocation?ip=1.1.1.1` |
| `client.getIpGeolocationFull({ ip: '1.1.1.1' })` | `GET /data/ip-geolocation-full?ip=1.1.1.1` |
| `client.getReverseGeocode({ latitude: 0, longitude: 0 })` | `GET /data/reverse-geocode?latitude=0&longitude=0` |
| `client.getPhoneNumberValidate({ number: '+1234567890' })` | `GET /data/phone-number-validate?number=...` |
| `client.getEmailVerify({ emailAddress: 'test@example.com' })` | `GET /data/email-verify?emailAddress=...` |

All methods return a Promise that resolves to the JSON response.

### Available Endpoints

- **IP Geolocation:** `getIpGeolocation`, `getIpGeolocationFull`, `getIpGeolocationWithConfidence`
- **Reverse Geocoding:** `getReverseGeocode`, `getReverseGeocodeWithTimezone`
- **Network:** `getAsnInfo`, `getNetworkByIp`, `getCountryByIp`
- **Timezone:** `getTimezoneByIp`, `getTimezoneByLocation`
- **Validation:** `getPhoneNumberValidate`, `getEmailVerify`
- **Security:** `getHazardReport`, `getUserAgentInfo`, `getTorExitNodesList`

### Custom Server

```javascript
// Use a specific API server
const client = require('@bigdatacloudapi/client')('YOUR_API_KEY', 'data', 'api-bdc.net');
```

## TypeScript

TypeScript type definitions are included. Import with:

```typescript
import createClient from '@bigdatacloudapi/client';

const client = createClient('YOUR_API_KEY');
const result = await client.getIpGeolocationFull({ ip: '8.8.8.8' });
```

## Error Handling

```javascript
try {
    const result = await client.getIpGeolocationFull({ ip: '8.8.8.8' });
    console.log(result);
} catch (error) {
    console.error('Error:', error.error);
    console.error('Status:', error.code);
}
```

## Migration from v1.x

- **Breaking:** Requires Node.js 18+ (uses native `fetch` instead of `node-fetch`)
- **Breaking:** Default API server changed from `api.bigdatacloud.net` to `api-bdc.net`
- Removed `node-fetch` dependency (zero dependencies!)
- Added TypeScript type definitions

If you need to continue using the old server:
```javascript
const client = require('@bigdatacloudapi/client')('KEY', 'data', 'api.bigdatacloud.net');
```

## About BigDataCloud

[BigDataCloud](https://www.bigdatacloud.com) provides next-generation IP geolocation powered by [patented technology](https://www.bigdatacloud.com/insights/ip-geolocation-accuracy-report). Our system continuously collects ground-truth location data and uses proprietary algorithms to deliver industry-leading accuracy.

- 🏆 Patented technology — US Patent 11,792,110 B2
- 📊 Transparent accuracy — [public daily benchmark vs. competitors](https://www.bigdatacloud.com/insights/ip-geolocation-accuracy-report)
- 🌍 Global coverage — IPv4 and IPv6
- ⚡ Ultra-fast — edge-deployed flat-file architecture

### Also available

- **MCP Server** for AI assistants: [`@bigdatacloudapi/mcp-server`](https://www.npmjs.com/package/@bigdatacloudapi/mcp-server)

## License

MIT
