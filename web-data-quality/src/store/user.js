import AuthService from '../services/auth';
import { instance } from '../main'
// TYPES
const MAIN_LOGIN = 'MAIN_SET_LOGIN';

const userStore = {

    state: {
        user: undefined
    },
    mutations: {
        [MAIN_LOGIN](state, obj) {
            state.user = obj;
            sessionStorage.setItem('user', JSON.stringify(state.user));
        }
    },
    getters: {
        getUser: (state, getters) => {
            return state.user ? state.user : { matricula: '', nome: '' };
        },
        getIsFirstAccess: (state, getters) => {

            if (!state.user) return false;
            let value = state.user.info.find(e => e.key == 'primeiro_acesso').value
            return !(value == 'false');
        },

        getCheckPermission: (state) => (chave) => {


        }
    },
    actions: {
        loginStore({ commit }, payload) {
            return AuthService.login(payload).then(response => {
                commit(MAIN_LOGIN, response);
                instance.$session.set('user', response);
                console.log('session-id', instance.$session.id());
                return response;
            });
        },

        logout({ commit, dispatch }) {
            instance.$session.destroy();
            instance.$router.push({ name: 'login' });
            commit(MAIN_LOGIN, undefined);
        },
    }

}


export default userStore;