import Service from './service';
class FileService extends Service {
    constructor(endpoint) {
        super(endpoint);
    }

    /**
     * @param  {Object} request
     */
    listFile(request) {
        this._url = '';
        return this.get(request, true)
    }

    uploadFile(file, userId, company, callbackProgress) {
        return this._api.post(`/${company}/${userId}`, file, {
            onUploadProgress: callbackProgress
        })
    }
}

const instance = new FileService("http://10.93.1.139:8001/file");
export default instance;