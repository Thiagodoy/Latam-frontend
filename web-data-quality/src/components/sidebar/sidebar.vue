<template >
    <div>
        <div class="all-sidebar">
           <div class="lang text-center">
                <img @click="pt_BR" class="mr-2" style="width:20px; cursor:pointer" src="../../assets/images/brazil.png"/>
                <img @click="en_USA"  class="mr-2" style="width:20px;cursor:pointer" src="../../assets/images/united-states.png"/>
              <!--  <img  class="mr-1" style="width:20px;cursor:pointer" src="../../assets/images/united-kingdom.png"/> -->
                <img @click="spain"  class="mr-2" style="width:20px;cursor:pointer" src="../../assets/images/spain.png"/>
           </div>
            <div class="x-menu">
            <li class="x-item" id="">
                <a href="#" class="x-btn menu-active"><i class="fas fa-home "></i>&nbsp;Home</a>
                
            </li>    
            <li class="x-item" id="cadastro">
                <a href="#cadastro"  v-bind:class="{ active: menuActive }" class="x-btn"><i class="far fa-clone"></i>&nbsp;Cadastros &nbsp; <i class="fas fa-caret-down"></i></a>
                <div class="x-smenu">
                    <a href="#">Agências</a>
                    <a href="#">Usuários</a>
                </div>
            </li>
            <li class="x-item" id="mensagem">
                <a href="#mensagem" class="x-btn"><i class="fas fa-arrow-alt-circle-up"></i>&nbsp;Upload &nbsp; <i class="fas fa-caret-down "></i></a>
                    <div class="x-smenu">
                        <a href="#">Post</a>
                        <a href="#">Imagens</a>
                         <a href="#">Imagens</a>
                            <a href="#">Post</a>
                            <a href="#">Imagens</a>
                           
                    </div>
            </li>
                <li class="x-item" id="teste">
                    <a href="#teste" class="x-btn"><i class="far fa-chart-bar"></i>&nbsp;Gráficos &nbsp; <i class="fas fa-caret-down"></i></a>
                    <div class="x-smenu">
                        <a href="#">Post</a>
                        <a href="#">Imagens</a>
                    </div>
                </li>
                
        </div>

        </div>   
    </div>  
</template>
<script>

    import {i18n} from '../../main'

export default {

    data(){
        return{

            menuActive:true

        }
    },

    methods:{
         pt_BR(){
            i18n.locale="pt_BR";
        },
        en_USA(){
            i18n.locale="en_USA";
        },

        spain(){ 
            i18n.locale="esp";
        },

        menuActive(){

        }

    }
    
}
</script>
<style scoped>
.all-sidebar{
   background-color: rgba(0, 0, 0, .5);
    width: 180px;
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
    width: 180px;
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
