import Service from './service';
class HollidayService extends Service {
    constructor(type,endpoint) {
        super(type,endpoint);
    }

    /**
     * @param  {} request
     */
    listar(request) {
        this._url = ''
        return this.get(request, true);
    }

}

const instance = new HollidayService('scorecard','/week');
export default instance;