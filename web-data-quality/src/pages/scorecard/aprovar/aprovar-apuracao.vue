<template>
    <div v-async="loading" class="all-user-home">
        <div v-if="show == 'home'" >
            <!-- Conponente Toolbar -->
            <toolbar 
                :config="configToolbar" 
                @filter="setFilter"
                @new="show = 'new';typeAction = 'new'">
            </toolbar>   
           
            <!--Componente DataTable -->
            <data-table
                @view="view"
                :data="data"
                :config="configTable"
                @rowPerPage="setRowPage"
                @page="setPage">
            </data-table>
        </div>
         <!--Componentes Options --> 
         
         <checked v-else-if="show=='view'" :dataObject="dataObject" @back="show = 'home'"></checked>
    </div> 
</template>
<script>
import Toolbar from '../../../components/toolbar/toolbar.vue';
import ToolbarConfigFactory from '../../../components/toolbar/toolbar-config-factory';
import DataTable from '../../../components/data-table/data-table.vue';
import DataTableConfigFactory from '../../../components/data-table/data-config-factory';
import _ from 'lodash';
import Modal from '../../../components/modal/message-dialog.vue';
import Checked from './aprovar-check';

export default {
    data(){
        return{
            show:'home',
            configToolbar: ToolbarConfigFactory.build('TOOLBAR-HOLLIDAY-VISUALIZATION'),
            configTable: DataTableConfigFactory.build('DATA-TABLE-APROVAR'),
            loading:undefined,
            dataObject:undefined,
           data:{
                conteudo:[
                    { agency:"Agência 1",periodo:"1/2020",im:"10", frequencia:"90",result:"Maximo" },
                    { agency:"Agência 2",periodo:"1/2020",im:"10", frequencia:"90",result:"Máximo" },
                    { agency:"Agência 3",periodo:"1/2020",im:"10",frequencia:"90",result:"0" },
                    { agency:"Agência 4",periodo:"1/2020",im:"10",frequencia:"90",result:"Mininmo"},
                    { agency:"Agência 5",periodo:"1/2020",im:"10",frequencia:"90",result:"Mininmo"}
                    ],
                pagination:undefined
            },
             filter:{page:0,size:10}           
        }
    },

    methods:{

         view(data){
            this.show = 'view';
            this.dataObject = data;
            console.log("click")
        },    

        setPage(page){            
            let temp = {...this.filter};
            temp.page = page;
            this.filter = temp;            
        },
        setRowPage(rowPage){            
             let temp = {...this.filter};
            temp.size = rowPage;
            this.filter = temp;
        },
        setFilter(filter){ 
            this.filter = _.merge({...filter},{
                page:0,
                size:10
            });            
        },

    },
   


    components:{
        Toolbar,
        DataTable, 
        Checked
      
       
    }



}







</script>
<style <style lang="scss" scoped>



</style>

