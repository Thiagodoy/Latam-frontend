<template>
    <div v-async="loading" class="all-user-home">
        <div v-if="show =='home'">
     
             
            <!-- Conponente Toolbar -->
            <toolbar 
                :config="configToolbar" 
                @filter="setFilter"
                @new="show = 'new';typeAction = 'new'">
            </toolbar>   
           
            <!--Componente DataTable -->
            <data-table
                :config="configTable"
                :data="data"
                 @view="view"
                 @edit="edit"
                 @delete="del"
                 @rowPerPage="setRowPage"
                 @page="setPage">
            </data-table>
        </div>
        <!--Componentes Options --> 
         <calender-view-edit v-else-if="show=='view' || show=='new' || show=='edit'" :typeAction="typeAction" :currentObject="currentObject" @back="show = 'home'"></calender-view-edit>
    </div> 
</template>

<script>



import Toolbar from '../../../components/toolbar/toolbar.vue';
import ToolbarConfigFactory from '../../../components/toolbar/toolbar-config-factory';
import DataTable from '../../../components/data-table/data-table.vue';
import DataTableConfigFactory from '../../../components/data-table/data-config-factory';
import AgencyService from '../../../services/agency.js';
import _ from 'lodash';
import Modal from '../../../components/modal/message-dialog.vue';
import CalenderViewEdit from './calender-new-view-edit'


export default {
    data(){
        return{
            currentObject:undefined,
            configToolbar: ToolbarConfigFactory.build('TOOLBAR-CALENDER-VISUALIZATION'),
            configTable: DataTableConfigFactory.build('DATA-TABLE-DATA-TABLE-CALENDER-VISUALIZATION'),
            loading:undefined,
            show:'home',
            typeAction:undefined,
           data:{
                conteudo:[
                    {periodo:"Janeiro/2019",data_inicial:"17/12/2018",data_final:"13/01/2019"},
                     {periodo:"Fevereiro/2019",data_inicial:"14/01/2019",data_final:"17/02/2019"},
                      {periodo:"Março/2019",data_inicial:"18/02/2019",data_final:"17/03/2019"},
                       {periodo:"Abril/2019",data_inicial:"18/03/2019",data_final:"14/4/2019"},
                        {periodo:"Maio/2019",data_inicial:"15/04/2019",data_final:"12/05/2019"},
                       
                  
                    ],
                pagination:undefined
            },
             filter:{page:0,size:10}           
        }
    },


    methods:{

         del(data){
            Modal.show({title:"Informação", message:`Deseja deletar Agencia ? `, type:'YES-NO'}).then(response =>{
                 if(response == 'YES'){
                    
                   this.loading = AgencyService.deleteCompany({id:data.id}).then(response=>{
                       
                       this.getAgency();
     
                       }).catch(erro=>{
                           this.mxShowModalError(erro);                        
                   }) 
                   
                }
            })
        },

         edit(data){
            this.show = 'edit';
             this.typeAction = 'edit';
            this.currentObject = data;           
        }, 

        view(data){
            this.show = 'view';
            this.typeAction = 'view';
            this.currentObject = data;
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
   
   
   
   mounted(){
       
    },

    

    components:{
        Toolbar,
        DataTable,  
        CalenderViewEdit    
       
    }



}







</script>
<style <style lang="scss" scoped>

.teste{
   width: 100%;
    height: 100vh;
    background: #ff0;
    position:fixed;
    top:0px;
    left:0px;
    opacity: .5;
}

</style>

