<template>
    <div >
        <div class="x-navbar">

            
         


           <div v-html="getImage"  @click="show=!show" class="avatar text-left"></div>

       
          <transition name="fade">
            <div @mouseleave="show=false" v-if="show" class="box-menu-list"> 
               <div style="" class="row mb-2">
           
                   <div class="col-md-9 pl-4 pt-1" style="font-size:16px"> <b><span style="font-size:18px;">{{getUser.firstName}}</span></b>&nbsp;&nbsp;<span style="font-size:16px;">({{getUser.email}})</span></div>
                   <div @click="show=false" style="cursor:pointer" class="col-md-3 text-right pr-4" ><i class="far fa-times-circle"></i></div>

               </div>
                <ul>
                    <router-link   tag="li" :to="{ name: 'meu-perfil', params: {login:'logado',show:'view' } }"><i class="fas fa-user"></i>&nbsp;{{$t('lang.profile')}}&nbsp;-&nbsp;{{getUser.groups[0].name}}</router-link> 
                    <li @click="logout"><i class="fas fa-door-open"></i>&nbsp;{{$t('lang.exit')}}</li>
                </ul>
            </div>      
          </transition> 

          

       
                <div class="logo-box text-center">
                    <img id="logo" class="img-fluid" src="../../assets/images/headerbar.png"/>
                </div>
            
                <div class="menu-box" >
                    <div @click="$emit('OpenMenu')" class="menu-ham">
                        <div class="menu-bar"></div>
                        <div class="menu-bar"></div>
                        <div class="menu-bar"></div>
                    </div>
                </div>

              
                 <div class="latam">
                     
                     <img style="width:120px;"  class=" mx-auto d-block" src="../../assets/images/Login_Logo_Latam.png">
                </div>
                <div class="hello">
                   <span>{{$t('lang.label_hello')}} </span>&nbsp;{{getUser.firstName}}
                   
                </div>
                   
                   
               
           
        </div>

          

    </div>     
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import MockFactory from '../../utils/mock-factory';

export default {
    data(){
        return{           
            show:false,
            image:undefined    
       }
    },
    computed:{
        ...mapGetters(['getIsFirstAccess','getUser','getImage']),

    },
    methods:{  
        ...mapActions(['logout']),

        
    },      
    mounted(){ 
        this.image = this.getUser.pictureUrl ?  MockFactory.build('MAKE_IMAGE_PROFILE',this.getUser.pictureUrl) :  MockFactory.build('MOCK_IMAGE_PROFILE') ;   
        
        console.log("TESTE",this.getUser.groups[0].name);
    },
    watch:{
        getUser:{
            handler:function(newValue,oldValue){
               
            },
            deep:true
        }
    }  
}
</script>
<style lang="scss" scoped>

.hello{
    color: #eee;
    right: 100px;
    top:16px;
    position:absolute;
}

    .latam{
       // background: #ff0;
        align-self: center;
        width: 100%;
       
       
        padding-right:210px;
       
    }

  

 @media screen and (max-width: 1000px) {
  .latam{
         padding-right: 80px;      
  }
}

  @media screen and (max-width: 600px) {
  .latam{
         padding-right: 70px;      
  }
}

 
  

    .x-navbar{
        background-color: rgba(0, 0, 0, .5);
        position: fixed;
        display: flex;
        z-index: 904;
        box-shadow: 2px 0 3px rgba(0, 0, 0, .5);
        height: 53px;
        width: 100%;
        min-width: 320px;
        padding: 0 0 0 0;
      //  justify-content: space-between;
    }
    .logo-box{
        width: 180px;
        min-width: 180px;
        padding: 5px 0 5px 0;
       
    }
    #logo{
        max-height: 40px;
    }
    .row{
    

    }
    .menu-ham{
        width: 25px;
        height: 25px;
        margin-top:18px;
        cursor: pointer;
        
        }
    .menu-bar{
        width: 100%;
        margin-bottom: 4px;
        height: 4px;
        background: #fff;
        border-radius: 3px;
    } 
    
    .space{
        padding-top: 14px;
        padding-left: 20px;
    }

    .bar-options{
       width: 100%;
      
    }
    .logaut{
        padding-top: 15px;
        padding-right: 80px;
        color: #fff;
        cursor: pointer;
    }

    .avatar{
      max-height: 40px;
      max-width: 130px;
     
        border-radius: 25px;
        position: absolute;
        top:8px;
        right: -60px;
        cursor: pointer;
        
    }

    .box-menu-list{
      background-color: rgba(255, 255, 255, 1); 
      position: absolute;
      right: 5px;
      width: 400px;
      top:60px;
      z-index: 1000;
      font-size: 18px;
      color:#222;
      border-radius: 5px;

      ul{


          li{
              list-style-type:none;
              padding: 15px 0px 15px 10px;
              &:hover{
                
                  cursor: pointer;
                  background: #eee;
              }
             
          }
      }

     


    }

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
 
   top:60px;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
   
}

.avatar-view{
    max-width: 50%;
}


       
</style>