<template>  
    <div >
        <div class="tool mb-2">
            <div   @click="$emit('back')" class="tool-view-item"><i class="fas fa-arrow-circle-left"></i>&nbsp;{{$t('lang.button_back')}}</div> &nbsp; &nbsp;&nbsp;
        </div>

        <div  class="wrapper">

        </div>
    </div>
</template>
<script>

export default {

    props: ['dataObject'],

    data() {
        return {
           
            request:{
                descricao:undefined,
                date:undefined
            }
        }
    },
    computed:{
       
    },
    mounted() {

        
    },

    components: {
       
       
    }
}
</script>

<style lang="scss" scoped>

.wrapper{
     background-color: rgba(0,0,0,0.5);
     width: 100%;
    
     padding:60px;

}

.tool{
     background-color: rgba(0,0,0,0.5);
     width: 100%;
     display: flex;
     border-radius:5px;
     padding: 10px;

     .tool-view-item:hover{
         cursor: pointer;
         color: #ffed69;}
}

.alert{
     background-color: rgba(37,239,147,0.4);
     color:#eee;
     border: none;

}


.campos{
    color:#fff;
     font-size: 18px;
    &:disabled{
        color: #111;
        font-size:18px;
    }
    &:focus{
       color:#fff;  
    }
    &:active{
       
    }
}

.labels{
    color:#ccc;
}


option{
    color:#222;
}


</style>


