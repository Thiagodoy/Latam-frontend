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
import CalendarService from '../../../services/calendar.js';
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
                conteudo:[],
                pagination:undefined
            },
             filter:{page:0,size:10}           
        }
    },

created(){
    console.log("teste")
    this.getCalendar();
},

    methods:{

         del(data){
            Modal.show({title:"Informação", message:`Deseja deletar Agencia ? `, type:'YES-NO'}).then(response =>{
                 if(response == 'YES'){
                    
                   this.loading = CalendarService.deletar({id:data.id}).then(response=>{
                       
                       this.getCalendar();
     
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
            this.getCalendar();          
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

        getCalendar(){
            console.log("teste")
            this.loading = CalendarService.listar(this.filter).then(response=>{
                console.log(response);
                this.data.conteudo = response.content;
                this.data.pagination =response;
            })
        }



        
       
     
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

