<template>
    <div class="all-user-home">
        <div v-if="show =='home'">
            <!-- Conponente Toolbar -->
            <toolbar 
                :config="configToolbar"
                @filter="setFilter"
                @new="show = 'new'" 
            ></toolbar>
            <!--Componente DataTable -->
            <data-table
                :config="configTable"
                :data="data"
                @page="setPage"
                @view="viewUser"
                @edit="editUser"
            ></data-table>   
            

        </div>

        <!--Componentes Options -->             
        <user-new-edit-view :userEdit="currentObject" :typeAction="typeAction"  @back="show = 'home'" v-if="show=='new'"></user-new-edit-view>    


    </div> 
</template>



<script>



import UserNewEditView from './user-new-edit-view.vue';
import Toolbar from '../../../components/toolbar/toolbar.vue';
import ToolbarConfigFactory from '../../../components/toolbar/toolbar-config-factory';
import DataTable from '../../../components/data-table/data-table.vue';
import DataTableConfigFactory from '../../../components/data-table/data-config-factory';
import UserService from '../../../services/user';
import MockFactory from '../../../utils/mock-factory';
import _ from 'lodash';

export default {

    data(){
        return{
            currentObject:undefined,
            configTable: DataTableConfigFactory.build('DATA-TABLE-USER-VISUALIZATION'),
            configToolbar: ToolbarConfigFactory.build('TOOLBAR-USER-VISUALIZATION'),
            loading:undefined,
            show:'home',
            typeAction:undefined,
            data:{
                conteudo:[],
                pagination:undefined
            },
            filter:{
                page:0,
                size:10
            }
        }
    },  
    mounted(){         
      this.getUsers();
    },
    methods:{
        editUser(data){
            this.currentObject = data;
            this.show = 'new';
            this.typeAction = 'EDIT';
        },   
        viewUser(data){
            this.currentObject = data;
            this.show = 'new';
            this.typeAction = 'VIEW';
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
        getUsers(){
            //FIXME: Implementar o loading
            
            UserService.getUsers(this.filter).then((response)=>{
             
                response.content.forEach((e)=>{                     
                    e.picture = e.picture ? MockFactory.build('MAKE_IMAGE_PROFILE',e.picture) :  MockFactory.build('MOCK_IMAGE_PROFILE') ;                  
                });
                
                this.data.conteudo = response.content;
                this.data.pagination = response
            }); 
        },               
    },
    watch:{
        filter:{
            handler:function(newValue, oldValue){
                this.getUsers();
            },
            deep:true
        },
        show(newValue, oldValue){
            if(newValue == 'home'){
                this.currentObject = undefined;
                this.typeAction = undefined;
                this.getUsers();
            }
        }
    },
    components:{
        Toolbar,
        DataTable,        
        UserNewEditView,
    }
    
}


</script>
<style>
h1,p{
     font-family: Roboto, sans-serif;    
}
</style>

