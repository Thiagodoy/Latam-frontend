<template >
    <div>
        <div class="all-sidebar">
            <!-- Component -->
            <localization></localization> 

            <div v-if="!(getIsFirstAccess == true)" class="x-menu">
                <li style="cursor:pointer" class="x-item" id="">
                    <router-link class="x-btn" tag="li" to="/home"><i class="fas fa-home "></i>&nbsp;{{$t('lang.home')}}</router-link>
                    
                </li>    
                <li  class="x-item" id="cadastro">
                    <a href="#cadastro"   class="x-btn"><i class="far fa-clone"></i>&nbsp;{{$t('lang.register')}} &nbsp; <i class="fas fa-caret-down"></i></a>
                    <div class="x-smenu">
                        <router-link  v-if="$can('manage', 'User')"  class="pl-4" tag="li" to="/users-register"><i class="fas fa-user"></i>&nbsp;<span>{{$t('lang.users')}}</span></router-link>
                        <router-link v-if="$can('manage', 'Agency')" class="pl-4" tag="li" to="/company"><i class="fas fa-building"></i>&nbsp;{{$t('lang.table_view_file_company_name')}}</router-link>
                        <router-link v-if="$can('manage', 'Profile')" class="pl-4" tag="li" to="/users-profile"><i class="fas fa-users"></i>&nbsp;{{$t('lang.profile')}}</router-link>
                        <router-link v-if="$can('manage', 'Profile')" class="pl-4" tag="li" to="/hollidays"><i class="far fa-calendar-check"></i>&nbsp;{{$t('lang.holidays_register')}}</router-link>
                        <router-link v-if="$can('manage', 'Profile')" class="pl-4" tag="li" to="/calenders"><i class="far fa-calendar-alt"></i>&nbsp;{{$t('lang.research_calendar')}}</router-link>
                    </div>
                </li>
                <li class="x-item" id="mensagem">
                    <a href="#mensagem" class="x-btn"><i class="fas fa-arrow-alt-circle-up"></i>&nbsp;Upload &nbsp; <i class="fas fa-caret-down "></i></a>
                        <div class="x-smenu">
                            <router-link  v-if="$can('manage', 'Upload')" class="pl-5 " style="" tag="li" to="/upload"><i class="fas fa-file-upload"></i>&nbsp;{{$t('lang.save_file')}}</router-link>    
                            <router-link v-if="$can('manage', 'Valid')" class="pl-5" tag="li" to="/file"><i class="fas fa-file-medical-alt"></i>&nbsp;{{$t('lang.file')}}</router-link> 
                        </div>
                </li>
                <!-- <li class="x-item" id="dash">
                    <a href="#dash" class="x-btn"><i class="fas fa-chart-pie"></i>&nbsp;DashBoard &nbsp; <i class="fas fa-caret-down "></i></a>
                        <div class="x-smenu">
                            <router-link  v-if="$can('manage', 'Upload')" class="pl-5 " style="" tag="li" to="/dashboard"><i class="fas fa-chart-line"></i>&nbsp;Arquivos</router-link>                                
                        </div>
                </li> -->
                <li class="x-item" id="senha" v-if="$can('manage', 'Opcao')">
                    <a href="#senha" class="x-btn"><i class="fas fa-cog"></i>&nbsp;{{$t('lang.options')}} &nbsp; <i class="fas fa-caret-down "></i></a>
                        <div class="x-smenu">
                            <router-link   class="pl-5" tag="li" to="/change-pass"><i class="fas fa-key"></i>&nbsp;{{$t('lang.change_password')}}</router-link>                        
                        </div>
                         <div class="x-smenu">
                            <router-link   class="pl-5" tag="li" to="/termo-uso"><i class="fas fa-list"></i>&nbsp;{{$t('lang.terms')}}</router-link>                        
                        </div>
                        
                        <div class="x-smenu">
                            <li style="margin: -15px;margin-left:15px;"><a class="linkPdf" :href="urlTutorial " target="_blank"><i class="fas fa-info-circle"></i>&nbsp;Tutorial</a></li>
                        </div>     
                </li>
                 <li class="x-item" id="scorecard" v-if="$can('manage', 'Opcao')">
                    <a href="#scorecard" class="x-btn"><i class="fas fa-table"></i>&nbsp;Scorecard &nbsp; <i class="fas fa-caret-down "></i></a>
                        <div class="x-smenu">
                            <router-link   class="pl-4" tag="li" to="/entrega_im"><i class="fas fa-check-square"></i>&nbsp; Entrega IM</router-link>                        
                        </div>
                        <div class="x-smenu">
                            <router-link   class="pl-4" tag="li" to="/frequencia_detalhada"><i class="fas fa-file-contract"></i>&nbsp; Frequência detalhada</router-link>                        
                        </div>
                       
                         <div class="x-smenu">
                            <router-link   class="pl-4" tag="li" to="/informacoes_detalhada"><i class="fas fa-file-alt"></i>&nbsp; Informações detalhada</router-link>                        
                        </div>
                         <div class="x-smenu">
                            <router-link   class="pl-4" tag="li" to="/qualidade_detalhada"><i class="fas fa-file-download"></i>&nbsp; Qualidade</router-link>                        
                        </div>
                        <div class="x-smenu">
                            <router-link   class="pl-4" tag="li" to="aprovar"><i class="fas fa-check"></i>&nbsp;Aprovar apuração</router-link>                        
                        </div>
                        <div class="x-smenu">
                            <router-link   class="pl-4" tag="li" to="revisar"><i class="fas fa-check-double"></i>&nbsp;Revisar apuração</router-link>                        
                        </div>
                        <div class="x-smenu">
                            <router-link   class="pl-4" tag="li" to="controle"><i class="fas fa-tasks"></i>&nbsp;Controle de apuração</router-link>                        
                        </div>
                        
                      
                        
                        
                </li>
                <li style="cursor:pointer" class="x-item" id="">
                    <router-link class="x-btn" tag="li" to="/job"><i class="fas fa-toolbox"></i>&nbsp;Job</router-link>
                </li> 
                
               
            </div>
        </div>
    </div>  
</template>
<script>
import {i18n} from '../../main'
import Localization from '../local/localization.vue';
import {mapGetters} from 'vuex';

export default {

    data(){
        return{
            urlTutorial:`${process.env.VUE_APP_BASE_PATH}/asset/download/documents/Tutorial_V6.pdf`
            
        }
    },

    computed:{
        ...mapGetters(['getIsFirstAccess','getUser']),
        isAgencia(){
            let agencia = this.getUser.groups.find(g=> g.name == 'AGENCIA');
            return !!agencia;
        }
    },

    methods:{
        openTerms(){
           this.mxShowModal({title:'Termos de uso',  type:'TERMO-USO', width:'100%' });
        },
    },
    components:{
        Localization
    }
    
}
</script>

<style lang="scss" scoped>

.linkPdf{

margin: -15px;
}




.all-sidebar{
   background-color: rgba(0, 0, 0, .5);
    width: 210px;
    height:calc(100vh - 53px);
    overflow: auto;
   
   
   
}

::-webkit-scrollbar {
    width: 6px;
    height: 0px;
}

::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    cursor: pointer
}

::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    cursor: pointer
}


.menu-sanfona li ul{
    display:none;
}
.menu-sanfona li:focus ul{
    display:block;
}

.link-menu{
    
    
    list-style-type: none;
     background-color: rgba(0, 0, 0, .2);
    cursor:pointer;
    padding: 10px;
     color: #ccc;
  
}


.link-subMenu{
     padding: 10px 0 10px 20px;
      width: 100%;
      list-style-type: none;
       background-color: rgba(0, 0, 0, .1);
       color: #ccc;
      cursor:pointer;
}
.link-subMenu:hover{
    background: #ffed69;
    color:#222;
}

.wrapper-sub{
    background: #555;
    opacity: .8

}



/* //////////////////////// */ 



*{
        margin:0;
        padding: 0;
        list-style: none;
        text-decoration: none;

    }

   

.lang{
    padding-top: 8px;
    padding-bottom:20px; 
    width: 170px;
    padding-left: 5px;
}    

a:hover{text-decoration-line: none;}  



.x-menu{
    width: 210px;
}



.x-item{
    border-top:1px;
    overflow: hidden;
}





.x-btn{
    display:block;
    padding: 8px 20px;
    background-color: rgba(0, 0, 0, .0);
    color:white;
    position: relative;



}



.x-btn i{
    margin-right:10px;
    overflow: hidden;

}

.x-smenu{
    background: #555;
    overflow: hidden;
    transition: max-height 0.5s;
    max-height: 0;
    opacity: .5;
}

.x-smenu:hover > a{
  
}

.x-item:hover > a{
    color: #ffed69;
    
}

.x-smenu a{
    display: block;
    padding: 16px 16px;
    color: white;
    font-size: 16px;
    margin:  4px 0;
    position: relative;

}

.x-smenu li{
    display: block;
    padding: 16px 16px;
    font-size: 16px;
    margin:  4px 0;
    position: relative;
    transition: all .1s ease-in-out;
    &:hover{
        cursor: pointer;
        transform: scale(1.1)
    }

}





.x-smenu li:before{
    content: "";
    position: absolute;
    width: 6px;
    height: 100%;
    background:#3498db;
    left: 0;
    top:0;
    transition: 0.3s;
    opacity: 0;
}

.x-smenu a:hover:before{
    opacity: 1 ;
}

.x-item:target .x-smenu{
    max-height: 100em;
}





</style>
