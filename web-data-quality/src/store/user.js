import AuthService from '../services/auth';
import { instance } from '../main';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import AbilityFactory from '../security/ability-factory';
import Vue from 'vue';
import { abilitiesPlugin } from '@casl/vue'
import MockFactory from '../utils/mock-factory'
import * as _ from "lodash"

const moment = extendMoment(Moment);

// TYPES
const MAIN_LOGIN = 'MAIN_SET_LOGIN';
const MAIN_UPDATE_PHOTO = 'MAIN_UPDATE_PHOTO';
const MAIN_PASS_WORD = 'MAIN_PASS_WORD';
const MAIN_ABILITY = 'MAIN_ABILITY';

const userStore = {

    state: {
        user: undefined,
        picture:undefined,
        pass: undefined,
        ability:undefined
    },
    mutations: {
        [MAIN_LOGIN](state, obj) {
           
            state.user = obj;

            if(!obj)
            return;

            state.picture = state.user.pictureUrl
            sessionStorage.setItem('user', JSON.stringify(state.user));
        },
        [MAIN_UPDATE_PHOTO](state,obj){
            if(!obj)
            return;
            state.user.pictureUrl = obj;
            state.picture = obj;
        },
        [MAIN_PASS_WORD](state,obj){
            state.pass = obj;
            
        },
        [MAIN_ABILITY](state,obj){
            state.ability = obj
        }
    },
    getters: {
        getGroups:(state,getters)=>{
            return state.user ? state.user.groups : [];
        },
        getImage:(state, getters)=>{
           return state.picture && state.picture ?  MockFactory.build('MAKE_IMAGE_PROFILE',state.picture) :  MockFactory.build('MOCK_IMAGE_PROFILE') ;
        },
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
            value[1] = value[1] - 1;           
            
            return (180 - moment.range(moment(value).toDate(),  moment().toDate()).diff('days'));
        }
    },
    actions: {
        loginStore({ commit, getters }, payload) {
            return AuthService.login(payload).then(response => {
                commit(MAIN_LOGIN, response);
                commit(MAIN_PASS_WORD,payload.password)
                instance.$session.set('user', response);  
                let ability = AbilityFactory.build(response);
                
                commit(MAIN_ABILITY,ability)              
                Vue.use(abilitiesPlugin, ability);
                instance.$forceUpdate();   
                console.log('instance',instance)             
                return response;
            });
        },

        updatePhoto({ commit, getters }, payload){
            
            commit(MAIN_UPDATE_PHOTO, payload);            
            instance.$forceUpdate(); 
        },
        updateUser({ commit, getters,dispatch,state  }, payload){            
            dispatch('loginStore', {email:payload.email,password:state.pass})
            //commit(MAIN_LOGIN, payload);                     
            instance.$forceUpdate(); 
        },
        logout({ commit, dispatch }) {
            instance.$session.destroy();
            instance.$router.push({ name: 'login' });
            commit(MAIN_LOGIN, undefined);
            commit(MAIN_UPDATE_PHOTO, undefined);
            Vue.use(abilitiesPlugin, null);
            //workaround
            location.reload();
        },
    }

}


export default userStore;