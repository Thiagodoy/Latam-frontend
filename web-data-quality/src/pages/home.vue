<template>
    <div> 
        <nav style="z-index:10" class="header">
            <navbar 
            v-on:OpenMenu="openMenu"
            ></navbar>
        </nav>
        <section>
            <div class="corpo">
                 <transition name="slide">
                    <div v-if="menuStatus" class=" menu-lateral"> 
                        <sidebar></sidebar>
                    </div>
                 </transition>    
                <div  v-bind:class="{ active: isActive }"  class="conteudo"  >
                    <div class="render-content">

                           <router-view/>
                           
                           
                    </div>
                </div>
            </div>    
        </section>
    </div>
</template>

<script>

import Navbar from '../components/navbar/navbar.vue';
import Sidebar from '../components/sidebar/sidebar.vue';
import {mapGetters} from 'vuex';
import AuthService from '../services/auth';


export default { 



    data(){
        return{
            menuStatus:true,
            isActive:true, 
        }
    },

    computed:{
        ...mapGetters(['getCheckChangePassword','getUser','getIsMaster'])
    },
    mounted(){

        let value = Math.sign(this.getCheckChangePassword) < 0 ? 0 : this.getCheckChangePassword;        
        if(!(this.getIsMaster) && value >= 1 && value <= 10){
            
            if(value == 10 || value == 5 || value == 1){
                
            let message = value == 1 ? `${value} dia` : `${value} dias`;
                this.mxShowModal({title:'Informação', message:`Sua senha expira em ${message}.</br>Favor altere as sua senha.`});
            }
                
        }else if(!(this.getIsMaster) && value <= 0){
            this.mxShowModal({title:'Informação', message:this.$t('lang.msg_error_3')}).then(()=>{
                return AuthService.expired(this.getUser.email).then(()=>{
                    this.$router.push({name:'login'});
                });
            }).catch((erro)=>{
                this.$router.push({name:'login'});
                this.mxShowModalError(erro);
            });
        }

        
    },

    methods:{
        openMenu(){
           if(this.menuStatus==true){this.menuStatus=false}else{this.menuStatus=true}
           this.isActive = this.menuStatus; 
           var windowWidth = window.innerWidth;           
        }
    },

    created(){
        this.menuStatus == this.isActive;

        if( window.innerWidth < 769){
            this.menuStatus=false;
            this.isActive=false;
        }



    },

    components:{
        Navbar,
        Sidebar,
    }    
}
</script>
    
<style scoped>

.header{
    position: fixed;
    }
.corpo{
    padding-top: 53px;
    display: flex;
    color:white;
    height: 100vh;  
}
.menu-lateral{
    width: 200px;
    min-width: 200px;
    position: fixed; 
    
}
.conteudo{
    width: 100%;
    overflow: scroll;  
    transition: margin .6s;
    -webkit-transition:margin .6s;
}
.render-content{
    overflow: auto;
    width: 100%;
    overflow: auto;
    padding: 20px; 
    min-height: 600px;
}
.active{
    margin-left: 210px;
}
::-webkit-scrollbar {
    width: 6px;
    height: 0px;
}
::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    cursor: pointer
}


.slide-enter-active {
  transition: all .6s ;
}
.slide-leave-active {
  transition: all .6s 
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active em versões anteriores a 2.1.8 */ {
  transform: translateX(-215px);
  
}


</style>