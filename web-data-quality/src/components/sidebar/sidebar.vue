<template >
    <div>
        <div class="all-sidebar">
            <!-- Component -->
            <localization></localization> 

            <div class="x-menu">
            <li class="x-item" id="">
                 <router-link class="x-btn" tag="a" to="/home"><i class="fas fa-home "></i>&nbsp;Home</router-link>
                
            </li>    
            <li class="x-item" id="cadastro">
                <a href="#cadastro"   class="x-btn"><i class="far fa-clone"></i>&nbsp;{{$t('lang.register')}} &nbsp; <i class="fas fa-caret-down"></i></a>
                <div class="x-smenu">
                    <router-link class="pl-5" tag="a" to="/users-register"><i class="fas fa-user"></i>&nbsp;{{$t('lang.users')}}</router-link>
                    <router-link class="pl-5" tag="a" to="/users-profile"><i class="fas fa-users"></i>&nbsp;{{'Profile'}}</router-link>
                    <router-link class="pl-5" tag="a" to="/change-pass"><i class="fas fa-key"></i>&nbsp;{{$t('lang.change_password')}}</router-link>
                                    
                </div>
            </li>
            <li class="x-item" id="mensagem">
                <a href="#mensagem" class="x-btn"><i class="fas fa-arrow-alt-circle-up"></i>&nbsp;Upload &nbsp; <i class="fas fa-caret-down "></i></a>
                    <div class="x-smenu">
                        <router-link class="pl-5" tag="a" to="/upload"><i class="fas fa-file-upload"></i>&nbsp;Upload</router-link>    
                        <router-link class="pl-5" tag="a" to="/file"><i class="fas fa-file-alt"></i>&nbsp;File</router-link>                           
                    </div>
            </li>
               
                
        </div>

        </div>   
    </div>  
</template>
<script>
import {i18n} from '../../main'
import Localization from '../local/localization.vue'

export default {

    data(){
        return{

          

        }
    },

    
    components:{
        Localization
    }
    
}
</script>
<style scoped>
.all-sidebar{
   background-color: rgba(0, 0, 0, .5);
    width: 200px;
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
    width: 200px;
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
    color:white;
    font-size: 16px;
    margin:  4px 0;
    position: relative;

}

.x-smenu a:before{
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
