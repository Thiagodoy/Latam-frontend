<template>
    <div v-async="loading"> 
            <toolbar  
                :config="configToolbar" 
               >
            </toolbar> 

            <div class="row mt-3 mb-5">
                <div style="" class="col-md-12 text-center">
                   <center>
                     <multiselect
                        v-model="company"
                        :options="options"
                        :label="'name'"                                
                        :track-by="'id'"
                        tag-placeholder="Add this as new tag"                                
                        :selectLabel="'Pressione para selecionar'"
                        :selectedLabel="'Selecionado'"
                        :deselectLabel="'Pressione para Deselecionar'"
                        :placeholder="'Selecione a agencia'" 
                        :limit="2"
                        :limit-text="(count)=>`Mais ${count}`"
                        :max-width="150"                                                              
                        :multiple="true">                        
                    </multiselect>
                   </center> 
                </div>
            </div>





            <graph-line/>     
    </div>     
</template>


<script>
import Toolbar from '../../components/toolbar/toolbar.vue';
import GraphLine from '../../components/graphics/graph-line'
import ToolbarFactory from '../../components/toolbar/toolbar-config-factory';
import Multiselect from 'vue-multiselect';
import AgencyService from '../../services/agency'; 
import FileService from '../../services/file';
import * as _ from 'lodash';


export default {
    
    data(){
        return {
            
            loading:undefined,
            configToolbar: ToolbarFactory.build('TOOLBAR-BACK') ,    
            company:[],   
            options:[],  
            agencys:[], 
            
            
   
        }
    },

    mounted(){

       
    
        
    },

    methods:{
        
    },


    components:{
        Toolbar,
        GraphLine,
        Multiselect,
    }
   
}
</script>

<style lang="scss" scoped>
</style>

