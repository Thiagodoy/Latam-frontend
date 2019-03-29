import Service from './service';
class FileService extends Service {
    constructor(endpoint) {
        super(endpoint);
    }


    uploadFile(file) {
        return this._api.post("", file, {
            onUploadProgress: (event) => {
                console.log('onUploadProgress', event);
            }
        })
    }
}

const instance = new FileService("http://localhost:8001/file");
export default instance;