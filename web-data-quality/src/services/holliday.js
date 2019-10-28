import ServiceScore from './service-score';
class HollidayService extends ServiceScore {
    constructor(endpoint) {
        super(endpoint);
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
}

const instance = new HollidayService('/holliday');
export default instance;