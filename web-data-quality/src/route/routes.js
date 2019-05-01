import Vue from 'vue'
import Router from 'vue-router';
import Login from '../pages/login';

import HomePage from '../pages/home.vue'
import UserHome from '../pages/register/users/users-home.vue'
import ProfileHome from '../pages/register/profile/profile-home.vue'
import FileHome from '../pages/file/file-home.vue'
import ChangePass from '../pages/register/change-pass/change-pass.vue'
import Upload from '../pages/file/upload.vue'
import CompanyHome from '../pages/register/company/company-home.vue'
import RouterGuard from './route-guard';



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
                { name: 'users-register', path: '/users-register', component: UserHome },
                { name: 'file', path: '/file', component: FileHome },
                { name: 'users-profile', path: '/users-profile', component: ProfileHome },
                { name: 'upload', path: '/upload', component: Upload },
                { name: 'company', path: '/company', component: CompanyHome },
            ]

        }
    ]

})