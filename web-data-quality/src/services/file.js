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

    deleteFile(request) {
        this._url = '/{id}'
        return this.delete(request)
    }

}

const instance = new FileService("/file");
export default instance;