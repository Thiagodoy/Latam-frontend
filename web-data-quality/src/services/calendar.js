import Service from './service';
class CalendarService extends Service {
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

    /**
     * @param  {} request
     */
    salvar(request) {
        this._url = '';
        return this.post(request);
    }

    /**
     * @param  {} request
     */
    update(request) {
        this._url = '';
        return this.put(request);
    }

    deletar(request) {
        this._url = `${request.id}`;
        return this.delete({});
    }
}

const instance = new CalendarService('scorecard','/calendar');
export default instance;