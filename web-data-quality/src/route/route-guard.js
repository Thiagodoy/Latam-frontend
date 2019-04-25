import Vue from 'vue'

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
        return JSON.parse(sessionStorage.getItem('user'));
    }
}


const instance = new RouterGuard();
export default instance;