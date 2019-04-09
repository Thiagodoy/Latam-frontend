<template>
    <div>

        <toolbar :config="configToolbar" @back="$emit('back')"></toolbar>
        <div class="row">
            
            <div class="col-md-6">
                <!--Data Table  -->
                <data-table 
                    :config="dataTableConfig" 
                    :data="data">
                </data-table>
            </div>
            <div class="col-md-6">
                <pie v-if="dataPier" :data="dataPier"></pie>
                <data-information 
                    :config="dataTableConfigInformation" 
                    :data="dataw"></data-information>
            </div>
        </div>
    </div>
</template>
<script>
import Toolbar from '../../components/toolbar/toolbar.vue';
import ToolbarFactory from '../../components/toolbar/toolbar-config-factory';
import DataTable from '../../components/data-table/data-table.vue';
import DataTableConfigFactory from '../../components/data-table/data-config-factory';
 import Pie from './pie'
export default {
   props:['file'],
   data(){
       return{
           configToolbar: ToolbarFactory.build('TOOLBAR-BACK') ,
           dataTableConfig: DataTableConfigFactory.build('DATA-TABLE-FILE-STATUS-VISUALIZATION'),
           dataTableConfigInformation: DataTableConfigFactory.build('DATA-TABLE-FILE-INFORMATION-VISUALIZATION'),
            data:{
                conteudo:[],
                pagination:{pageable:{}},
            },
            dataw:{
                conteudo:[],
                pagination:{pageable:{}},
            },
            dataPier:undefined
       }
   },

   mounted(){
       this.data.conteudo = this.file.statusProcess;
       
       let erros = 0;
        this.file.statusProcess.forEach((v)=> {        
            erros+= v.qtdErrors;
           });

       let information = new Array();
       information.push({information:'Arquivo',value:this.file.name}); 
       information.push({information:'Qtd de linhas',value:this.file.qtdTotalLines});
       //information.push({information:'Status',value:this.file.status});
       information.push({information:'Aprovado',value:this.file.qtdTotalLines - erros});
       information.push({information:'Reprovado',value:erros});

       this. dataPier = {
                labels:["Aprovado", "Reprovado"],
              datasets: [{
                backgroundColor: [
                 "#00CC66",
                 "#E54245",
                ],
                data:[this.file.qtdTotalLines - erros,erros],

              }]
            };
       
       this.dataw.conteudo = information; 
       this.$forceUpdate();
   },
   components:{
       DataTable,
       Toolbar,
       Pie,
       'data-information':DataTable
   }
}
</script>

