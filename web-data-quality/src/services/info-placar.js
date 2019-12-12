import Service from './service';
class InfoPlacarService extends Service {
    constructor(type,endpoint) {
        super(type,endpoint);
    }

    /**
     * @param  {} request
     */
    listar(request) {
        this._url = '/consolidate/company'
        return this.get(request, true);
    }

   
}

const instance = new InfoPlacarService('scorecard','/week');
export default instance;