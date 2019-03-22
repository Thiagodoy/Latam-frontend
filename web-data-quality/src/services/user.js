import Service from './service';
import md5 from 'md5';

class UserService extends Service {
    constructor(endpoint) {
        super(endpoint);
    }

    /**
     * @summary Endpoint get a list of Users
     * @param  {Object} request parameters put on url
     */
    getUsers(request) {
        this._url = '';
        return this.get(request, true);
    }

    /**
     * @summary Endpoint save a User
     * @param  {Object} request Object tha represents a User
     */
    saveUser(request) {
        this._url = '';
        request.password = md5(request.password);
        return this.post(request);
    }
}



const instance = new UserService('http://localhost:8001/user');
export default instance;