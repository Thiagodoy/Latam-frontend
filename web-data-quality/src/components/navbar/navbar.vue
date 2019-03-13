<template>
<div>
    <div class="x-navbar">
        <div class="logo-box text-center"><img id="logo" class="img-fluid" src="../../assets/images/headerbar.png"/></div>
        <div class="menu">
            <div @click="$emit('OpenMenu')" class="menu-ham">
                <div class="menu-bar"></div>
                <div class="menu-bar"></div>
                <div class="menu-bar"></div>
            </div>
        </div>
        <div class=""></div>
        <div class="options"></div>

    </div>
</div>    
    
</template>
<script>
export default {
    data(){
        return{
        
         
        }
    },

    methods:{
       
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
        width: 200px;
        
        padding: 5px 0 5px 0;
    }
    #logo{
        max-height: 40px;
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
       
</style>