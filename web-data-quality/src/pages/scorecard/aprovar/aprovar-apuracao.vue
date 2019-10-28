<template>
    <div v-async="loading" class="all-user-home">
        <div >
            <!-- Conponente Toolbar -->
            <toolbar 
                :config="configToolbar" 
                @filter="setFilter"
                @new="show = 'new';typeAction = 'new'">
            </toolbar>   
           
            <!--Componente DataTable -->
            <data-table
                 :data="data"
                :config="configTable"
                 @rowPerPage="setRowPage"
                 @page="setPage">
            </data-table>
        </div>
        <!--Componentes Options --> 
    </div> 
</template>
<script>
import Toolbar from '../../../components/toolbar/toolbar.vue';
import ToolbarConfigFactory from '../../../components/toolbar/toolbar-config-factory';
import DataTable from '../../../components/data-table/data-table.vue';
import DataTableConfigFactory from '../../../components/data-table/data-config-factory';
import _ from 'lodash';
import Modal from '../../../components/modal/message-dialog.vue';

export default {
    data(){
        return{
            configToolbar: ToolbarConfigFactory.build('TOOLBAR-HOLLIDAY-VISUALIZATION'),
            configTable: DataTableConfigFactory.build('DATA-TABLE-APROVAR'),
            loading:undefined,
           data:{
                conteudo:[
                    { job_name:"Job 1",sched_name:"job Sched 1",description:"Descrição 1",trigguer_state:"true", cron_expression:"teste", next_fire_time:"teste", prev_fire_time:"teste"},
                    { job_name:"Job 2",sched_name:"job Sched 1",description:"Descrição 1",trigguer_state:"true", cron_expression:"teste", next_fire_time:"teste", prev_fire_time:"teste"},
                    { job_name:"Job 3",sched_name:"job Sched 1",description:"Descrição 1",trigguer_state:"true", cron_expression:"teste", next_fire_time:"teste", prev_fire_time:"teste"},
                    { job_name:"Job 4",sched_name:"job Sched 1",description:"Descrição 1",trigguer_state:"true", cron_expression:"teste", next_fire_time:"teste", prev_fire_time:"teste"},
                    { job_name:"Job 5",sched_name:"job Sched 1",description:"Descrição 1",trigguer_state:"true", cron_expression:"teste", next_fire_time:"teste", prev_fire_time:"teste"}
                    ],
                pagination:undefined
            },
             filter:{page:0,size:10}           
        }
    },

    methods:{

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
   


    components:{
        Toolbar,
        DataTable, 
      
       
    }



}







</script>
<style <style lang="scss" scoped>



</style>

