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
import Hollidays from '../pages/register/hollidays/hollidays.vue';
import Calenders from '../pages/register/calenders/calenders';

import Job from '../pages/job/job.vue'
import ScoreDashboard from '../pages/scorecard/dashboard/dashboard.vue'

import Workflow from '../pages/scorecard/workflow/workflow.vue'

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
                {name: 'termo-uso', path: '/termo-uso', component:TermoUso},
                {name: 'calender', path: '/calenders', component:Calenders},
                {name: 'hollidays', path: '/hollidays', component:Hollidays},
                {name: 'job', path: '/job', component:Job},
                {name: 'score-dash', path: '/score-dash', component:ScoreDashboard},
                {name: 'workflow', path: '/workflow', component:Workflow},
                
            ]

        }
    ]

})