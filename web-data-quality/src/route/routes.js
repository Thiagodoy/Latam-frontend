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
import EntregaIm from '../pages/scorecard/entrega/entrega-im.vue'
import FrequenciaDetalhada from '../pages/scorecard/frequency/frequency-detalhe.vue'
import InformacoesDetalhada from '../pages/scorecard/informacoes/informacoes-detalhe.vue'
import QualidadeDetalhada from '../pages/scorecard/qualidade/qualidade-detalhe.vue'
import Job from '../pages/job/job.vue'
import Controle from '../pages/scorecard/controle/controle-apuracao.vue'
import Aprovar from '../pages/scorecard/aprovar/aprovar-apuracao.vue'
import Revisar from '../pages/scorecard/revisar/revisar-apuracao.vue'

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
                {name: 'entrega_im', path: '/entrega_im', component:EntregaIm},
                {name: 'frequencia_detalhada', path: '/frequencia_detalhada', component:FrequenciaDetalhada},
                {name: 'informacoes_detalhada', path: '/informacoes_detalhada', component:InformacoesDetalhada},
                {name: 'qualidade_detalhada', path: '/qualidade_detalhada', component:QualidadeDetalhada},
                {name: 'job', path: '/job', component:Job},
                {name: 'controle', path: '/controle', component:Controle},
                {name: 'aprovar', path: '/aprovar', component:Aprovar},
                {name: 'revisar', path: '/revisar', component:Revisar},
                
            ]

        }
    ]

})