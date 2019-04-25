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
}

const instance = new AuthenticationService("/auth");
export default instance;