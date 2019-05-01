<template>

     <div >
        <div v-if="show =='home'">

            <!-- Conponente Toolbar -->
            <toolbar 
                :config="configToolbar" 
               >
            </toolbar>   

              <!--Componente DataTable -->
            <data-table
                :config="configTable"
                :data="data"
                >
            </data-table>      
        
      
        </div>
           
       
    </div> 



    
</template>

<script>
import Toolbar from '../../../components/toolbar/toolbar.vue';
import ToolbarConfigFactory from '../../../components/toolbar/toolbar-config-factory';
import DataTable from '../../../components/data-table/data-table.vue';
import DataTableConfigFactory from '../../../components/data-table/data-config-factory';

export default {

    data(){
        return{
            show:"home",
           
             currentObject:undefined,
             configToolbar: ToolbarConfigFactory.build('TOOLBAR-COMPANY-VISUALIZATION'),
             configTable: DataTableConfigFactory.build('DATA-TABLE-USER-AGENCY'),
            loading:undefined,
            show:'home',
            typeAction:undefined,
           data:{
                conteudo:[

                   


                ],
                pagination:undefined
            },
             filter:{page:0,size:10}
        }
    },
    components:{
        Toolbar,
        DataTable,
    }

}
</script>

<style>

</style>
