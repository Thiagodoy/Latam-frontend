import Service from './service'

class AgencyService extends Service {
    constructor(endpoint) {
        super(endpoint);
    }

    /**
     * @summary Lista as agencias
     */
    list() {
        return this.get(null, false);
    }
}

const instance = new AgencyService('/agency');
export default instance;