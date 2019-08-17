import Service from './service';

class AssetService extends Service{
    constructor(url){
        super(url);
    }

    getVersao(){
        this._url = '/versao';
        return this.get();
    }
}


const instance = new AssetService('/asset');
export default instance;