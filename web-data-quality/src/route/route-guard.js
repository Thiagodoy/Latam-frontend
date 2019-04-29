import Vue from 'vue'
import { instance } from '../main';

class RouterGuard extends Vue {

    constructor() {
        super();
    }

    checkUserIsLogged(to, from, next) {

        console.log('checkUserIsLogged', this.isLogged());
        if (to.name == 'login') {
            if (!!this.isLogged()) {
                next({ name: 'home' });
                console.log('direcionando para home');
            }
            console.log('direcionando para o login');
            next()
            return
        }
        if (!this.isLogged()) {
            next({ name: 'login' });
        } else {
            next();
        }
    }
    isLogged() {
        return instance.$session.exists();
    }
}


const instancee = new RouterGuard();
export default instancee;