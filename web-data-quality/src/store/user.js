import AuthService from '../services/auth';
import { instance } from '../main';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import AbilityFactory from '../security/ability-factory';
import Vue from 'vue';
import { abilitiesPlugin } from '@casl/vue'

const moment = extendMoment(Moment);

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

        getIsMaster: (state) => {
            if (!state.user) return false;
            return state.user.groups.some(g => g.id == 'master latam' || g.id == 'suporte behavior');
        },
        getAgencysFromUser: (state) => {
            if (!state.user) return [];
            return state.user.info.filter(e => e.key == 'agencia');
        },
        getCheckChangePassword: (state) => {
            if (!state.user) return -1;
            let value = state.user.info.find(e => e.key == 'trocar_senha').value.split('-');
            let d = moment(value).toDate();
            let dateInit = Date.UTC(...[d.getUTCFullYear(), d.getUTCMonth() - 1, d.getUTCDate()]);
            let dateNow = moment().toDate();
            let dateEnd = Date.UTC(...[dateNow.getUTCFullYear(), dateNow.getUTCMonth(), dateNow.getUTCDate()]);

            return (45 - moment.range(dateInit, dateEnd).diff('days'));
        }
    },
    actions: {
        loginStore({ commit, getters }, payload) {
            return AuthService.login(payload).then(response => {
                commit(MAIN_LOGIN, response);
                instance.$session.set('user', response);
                console.log('session-id', instance.$session.id());
                Vue.use(abilitiesPlugin, AbilityFactory.build(response));
                instance.$forceUpdate();
                console.log('rules', AbilityFactory.getAbilities().rules);
                return response;
            });
        },

        logout({ commit, dispatch }) {
            instance.$session.destroy();
            instance.$router.push({ name: 'login' });
            commit(MAIN_LOGIN, undefined);
            //workaround
            location.reload();
        },
    }

}


export default userStore;