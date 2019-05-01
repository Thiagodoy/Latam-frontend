<template>
    <div class="all-user-home">
        <div v-if="show =='home'">
           
           
            <!-- Conponente Toolbar -->
            <toolbar 
                :config="configToolbar" 
                @new="show = 'new';typeAction = 'new'">
            </toolbar>          
           
            <!--Componente DataTable -->
            <data-table
                :config="configTable"
                :data="data"
                 @view="view"
                 @edit="edit"
                 @delete="del"
                 @page="setPage">
            </data-table>
        </div>
        <!--Componentes Options --> 
        <agency-view-edit v-else-if="show=='view' || show=='new' || show=='edit'" :typeAction="typeAction" :currentObject="currentObject" @back="show = 'home'"></agency-view-edit>
    </div> 
</template>

<script>

import AgencyViewEdit from './company-view-edit.vue';

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

         del(data){
            Modal.show({title:"Informação", message:`Deseja deletar Agencia ? `, type:'YES-NO'}).then(response =>{
                 if(response == 'YES'){
                    //Corrigir o loading
                  // AgencyService.delete({id:data.id}).then(response=>{
                     //  this.getAgency()
                    //   }).catch(erro=>{
                     //   Modal.show({title:"Erro", message:erro.message, type:'OK'})
                   //}) 
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
        setFilter(filter){ 
            this.filter = _.merge({...filter},{
                page:0,
                size:10
            });            
        },

        getAgency(){
              AgencyService.getAgency(this.filter).then((response)=>{                
                this.data.conteudo = response.content;
                this.data.pagination = response
            }).catch(erro=>{
                console.info(erro);
                let message = this.$t(`lang.msg_error_${erro.codeMessage}`)          
                Modal.show({title:"Erro", message:message});
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
        AgencyViewEdit,
    }



}







</script>
<style <style lang="scss" scoped>

</style>


