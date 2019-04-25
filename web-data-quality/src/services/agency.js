import Service from './service';
import md5 from 'md5';

class AgencyService extends Service {
    constructor(endpoint) {
        super(endpoint);
    }

    /**
     * @summary Endpoint get a list of Users
     * @param  {Object} request parameters put on url
     */
    getAgency(request) {
        this._url = '';
        return this.get(request, true);
    }

    /**
     * @summary Lista as agencias
     */
    list(request) {
        this._url = ''
        return this.get(request, true);
    }

    /**
     * @summary Endpoint save a User
     * @param  {Object} request Object tha represents a User
     */
    save(request) {
        this._url = '';
        return this.post(request);
    }

    /**
     * @param  {} request
     */
    delete(request) {
        this._url = '/{id}'
        return this.delete(request);
    }

    /**
     * @param  {} request
     */
    updateUser(request) {
        this._url = '';
        return this.put(request);
    }
}



const instance = new AgencyService('/agency');
export default instance;