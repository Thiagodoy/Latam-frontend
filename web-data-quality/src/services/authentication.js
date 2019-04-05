import Service from './service';
import md5 from 'md5';
import axios from 'axios'

class Authentication extends Service {
    constructor(endpoint) {
        super(endpoint);
    }

    login(request) {
        this._url = '/user/login';

        request.password = md5(request.password);
        return this.post(request);
    }
}
let url = 'http://localhost:8001';
const singleton = new Authentication(url);
export default singleton;