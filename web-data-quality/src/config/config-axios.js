import axios from 'axios';

// axios.defaults.timeout = 10000000;
// axios.defaults.headers = { "Access-Control-Allow-Origin": "*" };

function configure() {

    return [function(response) {
        if (environment.type == 'development') {
            console.log('INTERCEPTOR-SUCESS', response)
        }
        return response.data.resultado;
    }, function(error) {
        if (environment.type == 'development') {
            console.log('INTERCEPTOR-ERROR', error);
        }
        let msg = (error.response && error.response.data.mensagem) || error.message;
        console.log('msg', msg);
        return Promise.reject(msg);
    }];

}

export default {
    configure
}