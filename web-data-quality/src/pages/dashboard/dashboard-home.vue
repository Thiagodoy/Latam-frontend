<template>
    <div v-async="loading"> 
            <toolbar  
                :config="configToolbar" 
               >
            </toolbar> 
            <graph-line/>     
    </div>     
</template>


<script>
import Toolbar from '../../components/toolbar/toolbar.vue';
import GraphLine from '../../components/graphics/graph-line'
import ToolbarFactory from '../../components/toolbar/toolbar-config-factory';



export default {
    
    data(){
        return {
            
            loading:undefined,
            configToolbar: ToolbarFactory.build('TOOLBAR-BACK') ,                     
   
        }
    },
    components:{
        Toolbar,
        GraphLine
    }
   
}
</script>

<style lang="scss" scoped>
</style>

