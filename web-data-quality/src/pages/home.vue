<template>
    <div>
       
        <div class="header">
            <navbar 
            v-on:OpenMenu="OpenMenu"
            ></navbar>
        </div>
        <section>
            <div class="corpo">
                <div v-if="menuStatus" class=" menu-lateral"> 
                 <sidebar></sidebar>
                </div>
               
                <div  v-bind:class="{ active: isActive }"  class="conteudo"  >
                    <div class="content">
                        <p>Conteudo</p><br><br><br><br><br>
                        <p>Conteudo</p><br><br><br><br><br>
                        <p>Conteudo</p><br><br><br><br><br>
                        <p>Conteudo</p><br><br><br><br><br>
                        <p>Conteudo</p><br><br><br><br><br>
                        <p>Conteudo</p><br><br><br><br><br>
                        <p>Conteudo</p><br><br><br><br><br>


                    </div>
                   
                   
                  
                  
                </div>
            </div>    
        </section>
    </div>
</template>

<script>

import Navbar from '../components/navbar/navbar.vue'
import Sidebar from '../components/sidebar/sidebar.vue'

export default { 
    data(){
        return{
            menuStatus:true,
            isActive:true, 
        }
    },

    methods:{
        OpenMenu(){
           if(this.menuStatus==true){this.menuStatus=false}else{this.menuStatus=true}
           this.isActive = this.menuStatus;
          
        }
    },

    created(){
        this.menuStatus == this.isActive;

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
    width: 180px;
    min-width: 180px;
    position: fixed;
  
    
    
   
}
.conteudo{
    
    width: 100%;
 
   overflow: scroll;
    
    
   
    
     
   
}

.content{
     
     overflow: auto;
     width: 100%;
     overflow: auto;
     padding: 20px;
   
}

.active{
     margin-left: 180px;

}


::-webkit-scrollbar {
    width: 6px;
    height: 0px;
}

::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    cursor: pointer
}








    

</style>