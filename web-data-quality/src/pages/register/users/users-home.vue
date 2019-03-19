<template>
    <div class="all-user-home">
        <div v-if="Show =='home'">
            <!-- Conponente Toolbar -->
            <toolbar 
            v-on:change="changeOption"

               
            ></toolbar>
            <!--Componente DataTable -->
            <data-table
                v-on:view="view"
                v-on:edit="edit"
            ></data-table>
           





        </div>
        <!--Componentes Options -->
        <user-view v-on:change="changeOption" v-if="Show=='view'" ></user-view>
        <user-edit v-on:change="changeOption" v-if="Show=='edit'"></user-edit>
        <user-new v-on:change="changeOption" v-if="Show=='new'"></user-new>    


    </div> 
</template>



<script>

import UserView from './user-view.vue'
import UserEdit from './user-edit.vue'
import UserNew from './user-new.vue'
import Toolbar from '../../../components/toobar/toobar.vue';
import DataTable from '../../../components/data-table/data-table.vue';

export default {

    data(){
        return{

            Show:'home',
            
        

        }
    },

    methods:{
        view(value){
        this.Show = 'view';
     },

      edit(value){
        this.Show = 'edit';
     },

    changeOption(data){
        this.Show = data;
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

