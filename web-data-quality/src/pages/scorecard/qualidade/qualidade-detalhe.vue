<template>
  <div>
    <div v-if="show=='home'" class="home">
      <div class="topo text-center">
        <i class="fas fa-file-alt"></i>&nbsp;&nbsp;Qualidade detalhada
      </div>
     
       <!--Componente DataTable -->
            <data-table
                :config="configTable"
                :data="data"
                 @view="view"
                 @rowPerPage="setRowPage"
                 @page="setPage">
            </data-table>
     
    </div> <!--home-->

    <div v-if="show=='calender'" class="calender-frequency">
      <calender-qualidade  :dataObject="dataObject" @back="show = 'home'"></calender-qualidade>
    </div>

  </div>
</template>
<script>
import DataTable from '../../../components/data-table/data-table.vue';
import DataTableConfigFactory from '../../../components/data-table/data-config-factory';
import CalenderQualidade from './calender-qualidade.vue'
import HollidayService from '../../../services/holliday.js'
export default {
  data(){
    return {
      show:'home',
      dataObject:undefined,
      configTable: DataTableConfigFactory.build('DATA-TABLE-FREQUENCY-DETAIL'),
     // configToolbar: ToolbarConfigFactory.build('TOOLBAR-COMPANY-VISUALIZATION'),
      loading:undefined,
      data:{
          conteudo:[
             {codigo:545454, company: "Agência 1", periodo: "01/2020", entrega: true },
            {codigo:545454, company: "Agência 2", periodo: "02/2020", entrega: false },
          ],
          pagination:undefined
      },
        filter:{page:0,size:10}  ,        
    };
  },

  created() {
console.log("teste");
    HollidayService.getHolliday({page:0,size:10}).then((response)=>{
      console.log(response);
    })
    
  },

  methods: {
  
     view(data){
            this.show = 'calender';
            this.dataObject = data;
        },        
        
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
    CalenderQualidade,
    DataTable,
  }
};
</script>


<style lang="scss" scoped>

.topo {
  background-color: rgba(0, 0, 0, 0.3);
  margin: 0px;
  color: #ddd;
  padding: 15px;
  margin-bottom: 20px;
}




</style>

