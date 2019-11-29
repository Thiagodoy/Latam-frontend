import Service from './service';

class AssetService extends Service{
    constructor(type,url){
        super(type,url);
    }

    getVersao(){
        this._url = '/versao';
        return this.get();
    }
}


const instance = new AssetService('behavior','/asset');
export default instance;