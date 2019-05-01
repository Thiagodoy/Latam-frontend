import Service from './service';
import md5 from 'md5';

class AuthenticationService extends Service {
    constructor(endpoint) {
        super(endpoint);
    }

    /**
     * @param  {} request
     */
    changePassword(request) {
        this._url = '/change';
        let temp = {};
        temp.password = md5(request.password);
        temp.newPassword = md5(request.newPassword);
        temp.email = request.email;
        temp.firstAccess = request.isFirstAcces;
        return this.post(temp);
    }

    /**
     * @summary Login
     * @param  {Object} request parameters put on url
     */
    login(request) {
        this._url = '';
        let temp = {}
        temp.email = request.email;
        temp.password = md5(request.password);

        return this.post(temp);
    }

    /**
     * @param  {} request
     */
    forgot(request) {
        this._url = '/forgot';
        return this.post(request);
    }

    /**
     * @param  {} request
     */
    expired(request) {
        this._url = `/expired?email=${request}`;
        return this.post(null);
    }
}

const instance = new AuthenticationService("/auth");
export default instance;