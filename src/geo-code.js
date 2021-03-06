import { Bing } from './providers/bing.js';
import { Google } from './providers/google.js';
import { OpenStreet } from './providers/open-street.js';

export class GeoCode {

  /**
   * @param {string} provider. default 'osm'. 'osm', 'google', or 'bing'
   * @param {object} options for each provider. api key as in 'key' is required for 'google',  or 'bing'
   */
  constructor(provider = 'osm', options = {}) {
    this.provider = provider;
    this.options = options;
    this.klasses = {osm: OpenStreet, bing: Bing, google: Google};
  }

  /**
   * @param {string} address. e.g. 'brampton, on'
   * @returns {Promise} with an array format when successful
   */
  geolookup(address) {
    let klass = this.klasses[this.provider];
    let instance = new klass(this.options);
    return instance.geolookup(address);
  }

  /**
   * @param {number} lat, latitude
   * @param {number} lng, latitude
   * @returns {Promise} with an object format when successful
   */
  reverse(lat, lng) {
    let klass = this.klasses[this.provider];
    let instance = new klass(this.options);
    return instance.reverse(lat, lng);
  }

}
(typeof window !== 'undefined') && (window.GeoCode = GeoCode);