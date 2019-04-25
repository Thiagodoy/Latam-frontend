/*

import Service from './service';
import md5 from 'md5';

class AgencyService extends Service {
    constructor(endpoint) {
        super(endpoint);
    }

    /**
     * @summary Endpoint get a list of Users
     * @param  {Object} request parameters put on url
     
    getAgency(request) {
        this._url = '';
        return this.get(request, true);
    }

    /**
     * @summary Endpoint save a User
     * @param  {Object} request Object tha represents a User
    
    saveUser(request) {
        this._url = '';
        request.password = md5('123456');
        return this.post(request);
    }

    /**
     * @param  {} request
     
    deleteUser(request) {
        this._url = '/{id}'
        return this.delete(request);
    }

    /**
     * @param  {} request
     
    updateUser(request) {
        this._url = '';
        return this.put(request);
    }
}



const instance = new AgencyService('/agency');
export default instance;


*/





import Service from './service'

class AgencyService extends Service {
    constructor(endpoint) {
        super(endpoint);
    }

    /**
     * @summary Lista as agencias
     */
    list(request) {
        return this.get(request, true);
    }
}

const instance = new AgencyService('/agency');
export default instance;