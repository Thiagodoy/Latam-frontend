<template>
    <div class="all-user-home">
        <div v-if="show =='home'">
           
           
            <!-- Conponente Toolbar -->
            <toolbar 
                :config="configToolbar" 
                @new="show = 'new'" 
            ></toolbar>

            <!-- @filter="setFilter" 
                @new="show = 'new'"  -->
           
           
           
           
            <!--Componente DataTable -->
            <data-table
                :config="configTable"
                :data="data"
                 @view="view"
                 @edit="edit"
             
                 @page="setPage"
               
              
                
            ></data-table>   
            <!--
                 @page="setPage"-->
            

        </div>

        <!--Componentes Options -->   
        <agency-new @back="show = 'home'" v-if="show=='new'"></agency-new>
        <agency-view v-bind:viewAgency="viewAgency" @back="show = 'home'" v-if="show=='view'"></agency-view> 
        <agency-edit v-bind:editAgency="editAgency" @back="show = 'home'" v-if="show=='edit'"></agency-edit>         
     

    
    </div> 
</template>

<script>
import AgencyNew from './company-new.vue';
import AgencyView from './company-view.vue';
import AgencyEdit from './company-edit.vue';
import Toolbar from '../../../components/toolbar/toolbar.vue';
import ToolbarConfigFactory from '../../../components/toolbar/toolbar-config-factory';
import DataTable from '../../../components/data-table/data-table.vue';
import DataTableConfigFactory from '../../../components/data-table/data-config-factory';
import AgencyService from '../../../services/agency.js';
import _ from 'lodash';


export default {

    data(){
        return{
            viewAgency:undefined,
            editAgency:undefined,
            currentObject:undefined,
            configTable: DataTableConfigFactory.build('DATA-TABLE-COMPANY-VISUALIZATION'),
            configToolbar: ToolbarConfigFactory.build('TOOLBAR-COMPANY-VISUALIZATION'),
            loading:undefined,
            show:'home',
            typeAction:undefined,
           data:{
                conteudo:[],
                pagination:undefined
            },
             filter:{page:0,size:10}
           
        }
    },


    methods:{

         edit(data){
            this.show = 'edit';
            this.editAgency = data;
           
        }, 

        view(data){
            this.show = 'view';
            this.viewAgency = data;
        },  
        
        
         setPage(page){
            
            let temp = {...this.filter};
            temp.page = page;
            this.filter = temp;
            // this.getUsers();
        },
        setFilter(filter){    
            
            this.filter = _.merge({...filter},{
                page:0,
                size:10
            })
            
        },

        getAgency(){
              AgencyService.getAgency(this.filter).then((response)=>{
                
                this.data.conteudo = response.content;
                this.data.pagination = response
            }); 
        }

       
     
    },
    mounted(){

        this.getAgency();

       


           

    },

     watch:{
        filter:{
            handler:function(newValue, oldValue){
                this.getAgency();
            },
            deep:true
        },
        show(newValue, oldValue){
            if(newValue == 'home'){
                this.currentObject = undefined;
                this.typeAction = undefined;
                this.getAgency();
            }
        }
    },

    components:{

        Toolbar,
        DataTable,
        AgencyNew,
        AgencyView,
        AgencyEdit,
        

    }



}







</script>
<style <style lang="scss" scoped>

</style>


