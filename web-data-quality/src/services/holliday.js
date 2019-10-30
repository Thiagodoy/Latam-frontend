import Service from './service';
class HollidayService extends Service {
    constructor(type,endpoint) {
        super(type,endpoint);
    }

    /**
     * @param  {} request
     */
    getHolliday(request) {
        this._url = ''
        return this.get(request, true);
    }

    /**
     * @param  {} request
     */
    saveHolliday(request) {
        this._url = '';
        return this.post(request);
    }

    /**
     * @param  {} request
     */
    updateHolliday(request) {
        return this.put(request);
    }

    deletar(request) {
        this._url = `${request.id}`;
        return this.delete(request);
    }
}

const instance = new HollidayService('scorecard','/holiday');
export default instance;