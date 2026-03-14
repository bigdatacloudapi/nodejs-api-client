/**
 * BigDataCloud API Client
 *
 * All API endpoints are accessed via magic methods in camelCase format:
 * method | endpoint
 *
 * Example: client.getIpGeolocationFull({ ip: '8.8.8.8' })
 *
 * @see https://www.bigdatacloud.com for API documentation
 */

interface BigDataCloudClient {
  /** IP Geolocation - Get geolocation data for an IP address */
  getIpGeolocation(params?: Record<string, any>): Promise<any>;

  /** IP Geolocation Full - Comprehensive geolocation with confidence and hazard data */
  getIpGeolocationFull(params?: Record<string, any>): Promise<any>;

  /** IP Geolocation with Confidence - Geolocation with confidence area */
  getIpGeolocationWithConfidence(params?: Record<string, any>): Promise<any>;

  /** Reverse Geocode - Convert coordinates to address */
  getReverseGeocode(params?: Record<string, any>): Promise<any>;

  /** Reverse Geocode with Timezone */
  getReverseGeocodeWithTimezone(params?: Record<string, any>): Promise<any>;

  /** Country by IP */
  getCountryByIp(params?: Record<string, any>): Promise<any>;

  /** ASN Info */
  getAsnInfo(params?: Record<string, any>): Promise<any>;

  /** Network by IP */
  getNetworkByIp(params?: Record<string, any>): Promise<any>;

  /** Timezone by IP */
  getTimezoneByIp(params?: Record<string, any>): Promise<any>;

  /** Timezone by Location */
  getTimezoneByLocation(params?: Record<string, any>): Promise<any>;

  /** Phone Number Validate */
  getPhoneNumberValidate(params?: Record<string, any>): Promise<any>;

  /** Email Verify */
  getEmailVerify(params?: Record<string, any>): Promise<any>;

  /** User Agent Info */
  getUserAgentInfo(params?: Record<string, any>): Promise<any>;

  /** IP Hazard Report */
  getHazardReport(params?: Record<string, any>): Promise<any>;

  /** Tor Exit Nodes List */
  getTorExitNodesList(params?: Record<string, any>): Promise<any>;

  /** Generic method call for any endpoint */
  [key: string]: (params?: Record<string, any>) => Promise<any>;
}

/**
 * Create a BigDataCloud API client
 * @param apiKey - Your BigDataCloud API key from https://www.bigdatacloud.com/account
 * @param nameSpace - API namespace (default: 'data')
 * @param server - API server hostname (default: 'api-bdc.net')
 */
declare function createClient(apiKey: string, nameSpace?: string, server?: string): BigDataCloudClient;

export = createClient;
export { BigDataCloudClient, createClient };
