<template>
  <div>

    <div class="tool mb-4">
        <div   @click="$emit('back')" class="tool-view-item"><i class="fas fa-arrow-circle-left"></i>&nbsp;{{$t('lang.button_back')}}</div> &nbsp; &nbsp;&nbsp;
    </div> 

     <div class="row">
          <div class=" text-center col-md-12">
            <div class=" center-block box">
                <div class="box-title">Qualidade</div>
                <div class="box-label">Aproveitamento Linhas</div>
                <div class="box-result">97%</div>
            </div>
          </div>
        </div> 

   
   <!--
    <div class="box mb-3">
      <table class="table-box">
        <tr class="tr-title">
          <td>CIA_VOO</td>
          <td>Receita não aproveitada</td>
        </tr>
        <tr>
          <td>Empresa 1</td>
          <td>R$ 1.000</td>
        </tr>
      </table>
    </div>
-->
   
    <div class="wrapper-calender-detail">
      <div class="titles-day">
        <div class="title-day">DOMINGO</div>
        <div class="title-day">SEGUNDA</div>
        <div class="title-day">TERÇA</div>
        <div class="title-day">QUARTA</div>
        <div class="title-day">QUINTA</div>
        <div class="title-day">SEXTA</div>
        <div class="title-day">SÁBADO</div>
      </div>
      <div class="weeks" v-for="(week,i) in weeks" :key="i">
        <div class="week">
          <div class="week-date"> {{week.sunday | extractDay}}</div>
          <div class="week-status">
               <span>100%</span>
              <img style="cursor:pointer" v-if="week.sunday"  src="img/download.svg"/>
          </div>
        </div>
        <div class="week">
          <div class="week-date">{{week.monday | extractDay }}</div>
          <div class="week-status">
               <span>100%</span>
               <img style="cursor:pointer" v-if="week.monday" src="img/download.svg"/>
          </div>
        </div>
        <div class="week">
          <div class="week-date">{{week.tuesday | extractDay}}</div>
          <div class="week-status">
               <span>100%</span>
               <img style="cursor:pointer" v-if="week.tuesday"  src="img/download.svg"/>
          </div>
        </div>
        <div class="week">
          <div class="week-date">{{week.wednesday | extractDay}}</div>
          <div class="week-status">
               <span>100%</span>
               <img style="cursor:pointer" v-if="week.wednesday"  src="img/download.svg"/>
          </div>
        </div>
        <div class="week">
          <div class="week-date">{{week.thusday | extractDay}}</div>
          <div class="week-status">
               <span>100%</span>
               <img style="cursor:pointer" v-if="week.thusday"  src="img/download.svg"/>
          </div>
        </div>
        <div class="week">
          <div class="week-date">{{week.friday | extractDay}}</div>
          <div class="week-status">
               <span>100%</span>
               <img style="cursor:pointer" v-if="week.friday"  src="img/download.svg"/>
          </div>
        </div>
        <div class="week">
          <div class="week-date"> {{week.saturday | extractDay}}</div>
         <div class="week-status">
              <span>100%</span>
              <img style="cursor:pointer" v-if="week.saturday" src="img/download.svg"/>
          </div>
        </div>
      </div> 
      
      

    </div>
    <br>
      <!--Componente DataTable -->
           <div style="max-width:50%">
               <data-table
                :config="configTable"
                :data="data"
                
                 @rowPerPage="setRowPage"
                 @page="setPage">
            </data-table>
            </div> 
            
        

  </div>
</template>
<script>
import DataTable from '../../../components/data-table/data-table.vue';
import DataTableConfigFactory from '../../../components/data-table/data-config-factory';
export default {
  props:['dataObject'] , 
  data() {
    return {   
        weeks:[],
        configTable: DataTableConfigFactory.build('DATA-TABLE-RECEITA'),
        data:{
                conteudo:[
                    {cia_voo:"LA", receita:'R$ 1.000'} ,
                    {cia_voo:"G3", receita:'R$ 2.000'} ,
                    {cia_voo:"AD", receita:'R$ 1.500'} 
                    ],
                pagination:undefined
            },
    };
  },

 
 created() {
     console.log("teste",this.dataObject);
 },


  filters: {
    extractDay: function (value) {

        if(value){
      let x = value.split('-',3);
      let y = x[2].split('|',3)
      
      return y[0];
        }
    },

   
},


  mounted() {
  
    this.getWeeks();
  },

  

  methods: {
    getWeeks(){
      let response = [
         {week_of_year:43,
            sunday:'2019-10-1|1',
            monday:'2019-10-2|1',
            tuesday:'2019-10-3|1',
            wednesday:'2019-10-4|0',
            thusday:'2019-10-5|1',
            friday:'2019-10-6|1',
            saturday:'2019-10-7|0',
           
          },
          {week_of_year:44,
            sunday:'2019-10-8|1',
            monday:'2019-10-9|1',
            tuesday:'2019-10-10|2',
            wednesday:'2019-10-11|1',
            thusday:'2019-10-12|1',
            friday:'2019-10-13',
            saturday:'2019-10-14|1',
            
          },
          {week_of_year:43,
            sunday:'2019-10-15|1',
            monday:'2019-10-16|1',
            tuesday:'2019-10-17|1',
            wednesday:'2019-10-18|1',
            thusday:null,
            friday:null,
            saturday:null,
            
          },
              ];

          this.weeks = response;
        // console.log(this.weeks)   
    }


    
  },
  components:{
      DataTable,
  }
};
</script>


<style lang="scss" scoped>

//calender

.box{
display: flex;

margin-bottom: 10px;
justify-content: center

}
.box-title{
border: solid #fff 1px;
padding: 15px;
 background-color: rgba(0, 0, 0, 0.4);
}
.box-label{
border: solid #fff 1px;
padding: 15px;
 background-color: rgba(0, 0, 0, 0.4);
}
.box-result{
border: solid #fff 1px;
padding: 15px;
 background-color: rgba(0, 0, 0, 0.4);
}

.wrapper-calender-detail{
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
 
}

.titles-day{
  display: flex;
  width: 100%;
   background-color: rgba(0, 0, 0, 0.5);

}
.title-day{
  padding: 15px;
   width: 14.285%;
    border: #ddd 1px solid;
    text-align: center;

}

.weeks{
  display: flex;
 
}

.week{
  border: #ddd 1px solid;
   width: 14.285%;
   text-align: center;
   height: 100px
}

.week-date{
  font-size: 35px;
  padding: 10px 0 0 0;
}

.week-status{
 // background: #fff;
  display: flex;
  justify-content: space-between;
  padding:  0 10px 0 10px ;
}

.tool{
     background-color: rgba(0,0,0,0.5);
     width: 100%;
     display: flex;
     border-radius:5px;
     padding: 10px;
    

     .tool-view-item:hover{
         cursor: pointer;
         color: #ffed69;}
}


</style>

