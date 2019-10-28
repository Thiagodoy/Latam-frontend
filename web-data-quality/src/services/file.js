import Service from './service';
class FileService extends Service {
    constructor(type,endpoint) {
        super(type,endpoint);
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

    listStatusProcess(request){
        this._url = '/status/files';
        return this.get(request, true)
    }

    listLogSintetico(request){
        this._url = `/errors/sintetico/${request.fileId}/${request.field}`;
        return this.get(request,false);
    }

    generateFileReturn(request){
        this._url = '/generate/arquivo-retorno';
        return this.get(request,true);
    }


}

const instance = new FileService('behavior',"/file");
export default instance;