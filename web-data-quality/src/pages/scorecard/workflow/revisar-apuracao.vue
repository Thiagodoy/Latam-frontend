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

import DataTable from '../../../components/data-table/data-table.vue';
import DataTableConfigFactory from '../../../components/data-table/data-config-factory';
import _ from 'lodash';
import Modal from '../../../components/modal/message-dialog.vue';


export default {
    data(){
        return{
            show:'home',
          
            configTable: DataTableConfigFactory.build('DATA-TABLE-REVISAR'),
            loading:undefined,
            dataObject:undefined,
           data:{
                conteudo:[
                       {agency:"Agência 1",cluster:"RM1",bda:"0",im:"30",scorecard:"Não recebe SC",comentario:"Agência ficou sem energia 5 Dias",ajust:"Recebe RM1",ajustBy:""},
                        {agency:"Agência 2",cluster:"RM2",bda:"40",im:"30",scorecard:"Não recebe SC",comentario:"Não Recebe SC",ajust:"Não recebe SC",ajustBy:""},
                         {agency:"Agência 3",cluster:"RM3",bda:"60",im:"0",scorecard:"Recebe RM2",comentario:"",ajust:"Recebe RM2",ajustBy:""},




                   
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
       
        DataTable, 
       
    }
}
</script>
<style <style lang="scss" scoped>



</style>

