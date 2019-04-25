<template>
    <div>
        <div class="x-navbar">
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
            <div class="bar-options container-fluid">
                <div class="row" v-if="!(getIsFirstAccess == true)">
                    <div class="col-md-6"></div>
                    <div class="col-md-6 text-right logaut" @click="logout"><i class="fas fa-door-open"></i>&nbsp;{{$t('lang.exit')}}</div>

                </div>
            </div>           
        </div>
    </div>     
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    data(){
        return{
       
       }
    },
    computed:{
        ...mapGetters(['getIsFirstAccess'])
    },
    methods:{  

        logout(){
            this.$router.push({name:'login'});
        }
       
    },    
}
</script>
<style scoped>
    .x-navbar{
        background-color: rgba(0, 0, 0, .5);
        position: fixed;
        display: flex;
        z-index: 904;
        box-shadow: 2px 0 3px rgba(0, 0, 0, .5);
        height: 53px;
        width: 100%;
        min-width: 320px;
        padding: 0 0 0 0
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
        padding-right: 40px;
        color: #fff;
        cursor: pointer;
    }
       
</style>