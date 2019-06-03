<template>
    <div v-async="loading">
        <!-- toolbar -->
       <toolbar 
            v-if="show == 'HOME'" 
            @new="show='EDIT'" 
            :config="configToolBar"
            @filter="setFilter">
        </toolbar> 
       
       <!-- data-table -->
        <data-table 
            v-if="show == 'HOME'"
            :data="data"
            @edit="editGroup" 
            @view="viewGroup"
            @page="setPage"
            :config="configDataTable">
        </data-table>

        <profile-edit-view :group="currentGroup" :type="typeAction"  @back="show = 'HOME'" v-if="show == 'EDIT' || show == 'VIEW' "></profile-edit-view>

    </div>
</template>
<script>
import Toolbar from '../../../components/toolbar/toolbar.vue'; 
import ToolbarFactory from '../../../components/toolbar/toolbar-config-factory';
import DataTable from '../../../components/data-table/data-table.vue';
import DataTableFactory from '../../../components/data-table/data-config-factory';
import GroupService from '../../../services/group';
import ProfileEditView from './profile-edit-view.vue';
import _ from 'lodash';
export default {
    data(){
        return {
            show:'HOME',
            configDataTable:DataTableFactory.build('DATA-TABLE-GROUP-VISUALIZATION'),
            configToolBar:ToolbarFactory.build('TOOLBAR-GROUP-VISUALIZATION'),
            loading:undefined,
            data:{
                conteudo:[],
                pagination:undefined
            },
            currentGroup:undefined,
            typeAction:undefined,
            filter:{page:0,size:10}
        }
    },
    mounted(){
        this.getGroups();
    },
    methods:{
        setPage(page){
          
            let temp = {...this.filter};
            temp.page = page;
            this.filter = temp;           
        },
        setFilter(data){
           this.filter =  _.merge({page:0,size:10},data);            
        },
        getGroups(){
            this.loading = GroupService.getGroups(this.filter).then((response=>{
                this.data.conteudo = response.content;
                this.data.pagination = response;
            }))
        },
        editGroup(data){
           this.show = 'EDIT';
           this.typeAction = 'EDIT';
           this.currentGroup = data;     
        },
        viewGroup(data){
           this.show = 'VIEW';
           this.typeAction = 'VIEW';
           this.currentGroup = data;     
        }

        
    },
    watch:{
        show(newValue, oldValue){
            if(newValue == 'HOME'){
                this.getGroups();
                this.currentGroup = undefined;
                this.typeAction = undefined;
            }
        },
        filter:{
            handler:function(nelValue,oldValue){
                this.getGroups();
            },
            deep:true
        }
    },
    components:{
        Toolbar,
        DataTable,
        ProfileEditView
    }
}
</script>

