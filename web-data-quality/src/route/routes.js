import Vue from 'vue'
import Router from 'vue-router';
import Login from '../pages/login'
import HomePage from '../pages/home.vue'
import UsersRegister from '../pages/register/users/users-home.vue'

Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
        {name:'login',path:'/',component:Login, display:'Login'},
        {
            name:'home',
            path:'/home',
            component:HomePage,
            display:'Home',
            children:[
                {name:'users-register',path:'/users-register',component:UsersRegister}
            ]
             
            }
    ]

})