<template>
  <div>
    <toolbar :config="configToolbar" @back="$emit('back')"></toolbar>
    <div class="row">
      <div class="col-md-12">
        <status-bar :hasError="haserror" :status="filecurrent.stage" :config="['Upload','Validação Layout','Validação Conteúdo','Concluído']"></status-bar>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-md-6 scroll">
        <!--table mock -->
        <div id="table-scroll">
            <data-table 
                :config="dataTableConfig" 
                :data="data">
            </data-table>
        </div>

        <!-- grafico mock -->
      </div>
      <div class="col-md-6 pt-3">
         Erros<br><br>
        <graph-pizza :data="filecurrent.statusProcess" />
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-6 scroll">
        <!--table mock -->
       <!-- <data-information 
          :config="dataTableConfigInformation" 
          :data="dataw">
       </data-information> -->
      </div>
      <!-- grafico mock -->
      <div class="col-md-6">
        <!-- Status -->
        <!-- <graph-pizza-r :data="filecurrent.statusProcess" /> -->
        <!-- <graph-bar/> -->
       <!-- <graph-line/> -->
      </div>
    </div>
  </div>
</template>

<script>
import StatusBar from "../../components/status-bar-progress/statusBarProgress";
import Toolbar from '../../components/toolbar/toolbar.vue';
import GraphPizza from "../../components/graphics/graph-pizza";
import ToolbarFactory from '../../components/toolbar/toolbar-config-factory';
import GraphBar from "../../components/graphics/graph-bar";
import GraphLine from "../../components/graphics/graph-line";
import {dateTime} from "../../filter/date";
import DataTable from '../../components/data-table/data-table.vue';
import DataTableConfigFactory from '../../components/data-table/data-config-factory';
export default {
  props:['filecurrent'],
  data(){
    return {
      information:[],
      status:[],      
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
      haserror:false
    }
  },

  mounted(){

        let erros = 0;
        this.filecurrent.statusProcess.forEach((v)=> {erros+= v.qtdErrors;});  
        this.haserror = this.filecurrent.statusProcess.some(v=>v.qtdErrors>0);
       this.dataw.conteudo.push({information:'Responsável',value:this.filecurrent.userId});
       this.dataw.conteudo.push({information:'Data',value:dateTime(this.filecurrent.createdDate)});
       this.dataw.conteudo.push({information:'Arquivo',value:this.filecurrent.name}); 
       this.dataw.conteudo.push({information:'Qtd de linhas',value:this.filecurrent.qtdTotalLines});
       this.dataw.conteudo.push({information:'Aprovado',value:this.filecurrent.qtdTotalLines - erros});
       this.dataw.conteudo.push({information:'Reprovado',value:erros});
       this.data.conteudo =  this.filecurrent.statusProcess;

       this.data.conteudo.sort((a,b)=>{
         return a.qtdErrors > b.qtdErrors ? -1 : 1;
       })

  },
  components: {
    StatusBar,
    GraphPizza,
    GraphLine,
    'graph-pizza-r':GraphPizza,
    DataTable,
    Toolbar,
    'data-information':DataTable
  }
};
</script>

<style lang="scss">

#table-scroll {
  height:400px;
  overflow:auto;  
  margin-top:20px;
}

::-webkit-scrollbar {
    width: 6px;
    height: 0px;
}
::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    cursor: pointer
}
</style>
