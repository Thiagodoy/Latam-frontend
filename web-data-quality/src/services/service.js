import axios from 'axios';
import Interceptor from '../config-axios';
export default class Service {
    constructor(url) {

        this._api = axios.create({
            baseURL: url,
            timeout: 100000,
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
        this._api.interceptors.response.use(...Interceptor.configure());
        this._url = '';
    }

    /**
     * @param  {} request
     */
    createQueryParams(request) {

        if (!request) return;

        let keys = Object.keys(request);
        this._url += '?';
        let count = 0
        for (let key of keys) {
            if (!request[key] || request[key] === undefined || request[key] === 'undefined') {
                continue;
            }
            this._url += `${((count > 0) ? '&' : '')}${key}=${request[key]}`;
            count++;
        }
    }

    /**
     * @param  {} request
     */
    replaceParameters(request) {

        let keys = Object.keys(request);
        for (let key of keys) {
            this._url = this._url.replace(`\{${key}\}`, request[key]);
        }

    }

    /**
     */
    hasParameters() {
        return /(\{[a-zA-Z]\})+/.test(this._url);
    }

    /**
     * @param  {} request=null
     */
    get(request = null, queryParam = false) {



        if (this.hasParameters() && !queryParam) {
            this.replaceParameters(request);
        } else if (queryParam) {
            this.createQueryParams(request);
        }

        return this._api.get(this._url);
    }

    /**
     * @param  {} request
     */
    post(request) {
        return this._api.post(this._url, request);
    }

    /**
     * @param  {} request
     */
    put(request) {
        return this._api.put(this._url, request);
    }

    /**
     * @param  {} request
     */
    delete(request) {
        this.replaceParameters(request);
        return this._api.delete(this._url);
    }

}