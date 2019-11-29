import Service from './service';
import md5 from 'md5';

class AgencyService extends Service {
    constructor(type,endpoint) {
        super(type,endpoint);
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
    deleteCompany(request) {
        this._url = `${request.id}`;
        return this.delete(request);
    }

    /**
     * @param  {} request
     */
    update(request) {
        this._url = '';
        return this.put(request);
    }

    listUserByAgency(request){
        this._url = `/users/${request.id}`;
        return this.get(request, true);
    }
}



const instance = new AgencyService('behavior','/agency');
export default instance;