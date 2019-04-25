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
                @view="viewAgency"
                @edit="editAgency"
               
              
                
            ></data-table>   
            <!--
                 @page="setPage"-->
            

        </div>

        <!--Componentes Options -->   
        <agency-new @back="show = 'home'" v-if="show=='new'"></agency-new>
        <agency-view @back="show = 'home'" v-if="show=='view'"></agency-view> 
        <agency-edit @back="show = 'home'" v-if="show=='edit'"></agency-edit>         
     

    
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
import Modal from '../../../components/modal/message-dialog.vue';

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
              
            },
           
        }
    },


    methods:{

         editAgency(data){
            this.show = 'new';
            this.editAgency = data;
           
        },   
        viewAgency(data){
            this.show = 'new';
            this.viewAgency =data;
           
        },     

        getAgency(){
             AgencyService.list().then((response)=>{
                this.data.conteudo = response ;
                console.log("DATA.CONTEUDO:",this.data.conteudo) 
            }); 

        }

       
     
    },
    mounted(){

        this.getAgency();


        Modal.show({title: "Informação",message: "Teste de Modal",type: "OK"}).then(() => {
                   
                  });

           

    },

     watch:{
       
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


