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
        request.password = md5('123456');
        return this.post(request);
    }

    /**
     * @param  {} request
     */
    deleteUser(request) {
        this._url = `?id=${request.id}`;
        return this.delete(request);
    }

    /**
     * @param  {} request
     */
    updateUser(request) {
        this._url = '';
        return this.put(request);
    }

    /**
     * @param  {} value
     */
    checkCpfCnpj(value) {
        this._url = `/userExists/${value}`;
        return this.get();
    }

    /**
     * @param  {} value
     */
    resendAcces(value) {
        this._url = `/resendPassword`;
        return this.get({ email: value }, true);
    }
}



const instance = new UserService('/user');
export default instance;