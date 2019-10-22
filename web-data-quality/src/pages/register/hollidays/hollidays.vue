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
         <holliday-view-edit v-else-if="show=='view' || show=='new' || show=='edit'" :typeAction="typeAction" :currentObject="currentObject" @back="show = 'home'"></holliday-view-edit>
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
import HollidayViewEdit from './holliday-new-view-edit'


export default {
    data(){
        return{
            currentObject:undefined,
            configToolbar: ToolbarConfigFactory.build('TOOLBAR-HOLLIDAY-VISUALIZATION'),
            configTable: DataTableConfigFactory.build('DATA-TABLE-DATA-TABLE-HOLLIDAY-VISUALIZATION'),
            loading:undefined,
            show:'home',
            typeAction:undefined,
           data:{
                conteudo:[
                    {descricao:"Ano Novo",data:"01/01/2020"},
                    {descricao:"7 Setembro",data:"07/09/2020"},
                    {descricao:"Dia das crianças",data:"12/10/2020"},
                    {descricao:"Finados",data:"02/11/2020"},
                    {descricao:"Proclamação da republica",data:"15/11/1986"},
                    {descricao:"Natal",data:"25/08/2020"},
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
        HollidayViewEdit   ,   
       
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

