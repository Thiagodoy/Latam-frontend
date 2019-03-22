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
                v-on:view="show='view'"
                v-on:edit="show='edit'"
            ></data-table>     

        </div>
        <!--Componentes Options -->
        <user-view v-on:change="changeOption" v-if="show=='view'" ></user-view>
        <user-edit v-on:change="changeOption" v-if="show=='edit'"></user-edit>
        <user-new @back="show = 'home'" v-if="show=='new'"></user-new>    


    </div> 
</template>



<script>

import UserView from './user-view.vue'
import UserEdit from './user-edit.vue'
import UserNew from './user-new.vue'
import Toolbar from '../../../components/toolbar/toolbar.vue';
import ToolbarConfigFactory from '../../../components/toolbar/toolbar-config-factory';
import DataTable from '../../../components/data-table/data-table.vue';
import DataTableConfigFactory from '../../../components/data-table/data-config-factory';
import UserService from '../../../services/user';

export default {

    data(){
        return{
            configTable: DataTableConfigFactory.build('DATA-TABLE-USER-VISUALIZATION'),
            configToolbar: ToolbarConfigFactory.build('TOOLBAR-USER-VISUALIZATION'),
            loading:undefined,
            show:'home',
            data:{
                conteudo:[],
                pagination:undefined
            },
            filter:{}
        }
    },
    mounted(){  
       
      this.getUsers();

    },
    methods:{
        setFilter(filter){
            this.filter = {...filter}
        },
        getUsers(){
            //FIXME: Implementar o loading
            UserService.getUsers(this.filter).then((response)=>{

                response.forEach((e)=>{                     
                    e.pictureUrl =`<img class="img-fluid rounded-circle avatar-view" style="height:16%"  src="${e.pictureUrl}"/>`;                                                       
                });

                this.data.conteudo = response;
            }); 
        },               
    },
    watch:{
        filter(newValue, oldValue){
            this.getUsers();
        },
        show(newValue, oldValue){
            if(newValue == 'home'){
                this.getUsers();
            }
        }
    },
    components:{
        Toolbar,
        DataTable,
        UserView,
        UserEdit,
        UserNew,
    }
    
}


</script>
<style>
h1,p{
     font-family: Roboto, sans-serif;
    
}



</style>

