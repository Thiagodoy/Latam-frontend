import Vue from 'vue'
import Router from 'vue-router';
import Login from '../pages/login';

import HomePage from '../pages/home.vue'
import TermoUso from '../pages/termo-uso.vue'
import UserHome from '../pages/register/users/users-home.vue'
import ProfileHome from '../pages/register/profile/profile-home.vue'
import FileHome from '../pages/file/file-home.vue'
import DashBoard from '../pages/dashboard/dashboard-home.vue'
import ChangePass from '../pages/register/change-pass/change-pass.vue'
import Upload from '../pages/file/upload.vue'
import CompanyHome from '../pages/register/company/company-home.vue'
import RouterGuard from './route-guard';
import MeuPerfil from '../pages/register/users/users-home.vue';



Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { name: 'login', path: '/', component: Login, display: 'Login' },
        {
            name: 'home',
            path: '/home',
            component: HomePage,
            display: 'Home',
            beforeEnter: RouterGuard.checkUserIsLogged.bind(RouterGuard),
            children: [
                { name: 'change-pass', path: '/change-pass', component: ChangePass },
                { name: 'users-register', path: '/users-register/', component: UserHome },
                { name: 'meu-perfil', path: '/meu-perfil/:login/:show', component: MeuPerfil },
                { name: 'file', path: '/file', component: FileHome },
                { name: 'users-profile', path: '/users-profile', component: ProfileHome },
                { name: 'upload', path: '/upload', component: Upload },
                { name: 'company', path: '/company', component: CompanyHome },
                {name: 'dashboard', path: '/dashboard', component:DashBoard},
                {name: 'termo-uso', path: '/termo-uso', component:TermoUso}
            ]

        }
    ]

})