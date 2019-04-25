import AuthService from '../services/auth';

// TYPES
const MAIN_LOGIN = 'MAIN_SET_LOGIN';

const userStore = {

    state: {
        user: undefined
    },
    mutations: {
        [MAIN_LOGIN](state, obj) {
            state.user = obj
        }
    },
    getters: {
        getUser: (state, getters) => {
            return state.user ? state.user : { matricula: '', nome: '' };
        },
        getIsFirstAccess: (state, getters) => {
            return Boolean(state.user.info.find(e => e.key == 'primeiro_acesso').value);
        },
        getCheckPermission: (state) => (chave) => {


        }
    },
    actions: {
        loginStore({ commit }, payload) {
            return AuthService.login(payload).then(response => {
                commit(MAIN_LOGIN, response);
                return response;
            });
        },
        logout({ commit, dispatch }) {

        },
    }

}


export default userStore;