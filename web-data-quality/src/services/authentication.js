import Service from './service';
import md5 from 'md5';
import axios from 'axios'

class Authentication extends Service {
    constructor(type,endpoint) {
        super(type,endpoint);
    }

    login(request) {
        this._url = '/login';

        request.password = md5(request.password);
        return this.post(request);
    }    
}
let url = '/user';
const singleton = new Authentication('behavior',url);
export default singleton;