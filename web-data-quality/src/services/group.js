import Service from './service';
class GroupService extends Service {
    constructor(endpoint) {
        super(endpoint);
    }

    /**
     * @param  {} request
     */
    getGroups(request) {
        this._url = ''
        return this.get(request, true);
    }

    /**
     * @param  {} request
     */
    saveGroup(request) {
        this._url = '';
        return this.post(request);
    }

    /**
     * @param  {} request
     */
    updateGroup(request) {
        return this.put(request);
    }
}

const instance = new GroupService('http://localhost:8001/group');
export default instance;