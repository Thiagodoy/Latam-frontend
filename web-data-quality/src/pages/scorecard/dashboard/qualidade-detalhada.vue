<template>
  <div>

    <div class="tool mb-4">
        <div   @click="$emit('back')" class="tool-view-item"><i class="fas fa-arrow-circle-left"></i>&nbsp;{{$t('lang.button_back')}}</div> &nbsp; &nbsp;&nbsp;
    </div> 

     <div class="row">
          <div class=" text-center col-md-12">
            <div class=" center-block box">
               <div class="box-title">{{periodo}}</div>
                <div class="box-title">{{dataInicial}} - {{dataFinal}}</div><br>
                <div class="box-title">Qualidade</div>
                <div class="box-label">% de linhas aproveitadas</div>
                <div class="box-result">{{qualidade.linhasAprovadas}}%</div>
            </div>
          </div>
        </div> 

   
 
   
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
        <!--Domingos -->
        <div class="week">
          <div v-if="typeof(week.sunday) == 'string'" class="week-date">  {{week.sunday | extractDay}}</div>
          <div v-if="typeof(week.sunday) == 'object'" class="week-date-feriado">  {{week.sunday | extractDay}}</div>
          <div style="color:#0F0;font-size:18px;" v-if="typeof(week.sunday) == 'string'" class="week-status">
           {{ week.sunday | extractStatusPositivo}}
          </div>
          
          <div style="color:#F00;font-size:18px;" v-if="typeof(week.sunday) == 'string'" class="week-status">
           {{ week.sunday | extractStatusNegativo}}
          </div>
          <div v-if=" week.sunday && typeof(week.sunday) == 'object' ">Feriado</div>
        </div>

        <!--Segundas -->
        <div class="week">
          <div v-if="typeof(week.monday) == 'string'" class="week-date">  {{week.monday | extractDay }}</div>
          <div v-if="typeof(week.monday) == 'object'" class="week-date-feriado">  {{week.monday | extractDay }}</div>
          <div style="color:#0F0;font-size:18px;" v-if="typeof(week.monday) == 'string'" class="week-status">
          {{week.monday | extractStatusPositivo}}
          </div>
          <div style="color:#F00;font-size:18px;" v-if="typeof(week.monday) == 'string'" class="week-status">
          {{week.monday | extractStatusNegativo}}
          </div>
          <div v-if="week.monday && typeof(week.monday) == 'object'">Feriado</div>
        </div>

        <!--Terças -->
        <div class="week">
          <div v-if="typeof(week.tuesday) == 'string'" class="week-date">  {{week.tuesday | extractDay}}</div>
          <div v-if="typeof(week.tuesday) == 'object'" class="week-date-feriado">  {{week.tuesday | extractDay }}</div>
          <div style="color:#0F0;font-size:18px;" v-if="typeof(week.tuesday) == 'string'" class="week-status">
            {{week.tuesday | extractStatusPositivo}}
          </div>
           <div style="color:#F00;font-size:18px;" v-if="typeof(week.tuesday) == 'string'" class="week-status">
            {{week.tuesday | extractStatusNegativo}}
          </div>
          <div v-if="week.tuesday && typeof(week.tuesday) == 'object'">Feriado</div>
        </div>

        <!--Quartas -->
        <div class="week">
          <div v-if="typeof(week.wednesday) == 'string'" class="week-date">  {{week.wednesday | extractDay }}</div>
          <div v-if="typeof(week.wednesday) == 'object'" class="week-date-feriado">  {{week.wednesday | extractDay }}</div>
          <div style="color:#0F0;font-size:18px;"  v-if="typeof(week.wednesday) == 'string'" class="week-status">
            {{week.wednesday | extractStatusPositivo}}
          </div> 
           <div style="color:#F00;font-size:18px;"  v-if="typeof(week.wednesday) == 'string'" class="week-status">
            {{week.wednesday | extractStatusNegativo}}
          </div>   
           <div v-if="week.wednesday && typeof(week.wednesday) == 'object'">Feriado</div>
        </div>

        <!--Quintas -->
        <div class="week">
          <div v-if="typeof(week.thursday) == 'string'" class="week-date">  {{week.thursday | extractDay }}</div>
          <div v-if="typeof(week.thursday) == 'object'" class="week-date-feriado">  {{week.thursday | extractDay }}</div>
          <div style="color:#0F0;font-size:18px;" v-if="typeof(week.thursday) == 'string'" class="week-status">
           {{week.thursday | extractStatusPositivo}}
          </div>
           <div style="color:#F00;font-size:18px;" v-if="typeof(week.thursday) == 'string'" class="week-status">
           {{week.thursday | extractStatusNegativo}}
          </div>
           <div v-if="week.thursday && typeof(week.thursday) == 'object'">Feriado</div>
        </div>

        <!--Sextas -->
        <div class="week">
          <div v-if="typeof(week.friday) == 'string'" class="week-date">  {{week.friday | extractDay }}</div>
            <div v-if="typeof(week.friday) == 'object'" class="week-date-feriado">  {{week.friday | extractDay}}</div>
            <div style="color:#0F0;font-size:18px;"  v-if="typeof(week.friday) == 'string'" class="week-status">
             {{week.friday | extractStatusPositivo}}
            </div>
            <div style="color:#F00;font-size:18px;"  v-if="typeof(week.friday) == 'string'" class="week-status">
             {{week.friday | extractStatusNegativo}}
            </div>
            <div v-if="week.friday && typeof(week.friday) == 'object'">Feriado</div>
        </div>

        <!--Sábados -->
        <div class="week">
            <div v-if="typeof(week.saturday) == 'string'" class="week-date">  {{week.saturday | extractDay }}</div>
            <div v-if="typeof(week.saturday) == 'object'" class="week-date-feriado">  {{week.saturday | extractDay }}</div>
            <div style="color:#0F0;font-size:18px;"  v-if="typeof(week.saturday) == 'string'" class="week-status">
              <label style="">{{week.saturday | extractStatusPositivo}}</label>
            </div>
             <div style="color:#F00;font-size:18px;"  v-if="typeof(week.saturday) == 'string'" class="week-status">
              <label style="">{{week.saturday | extractStatusNegativo}}</label>
            </div>   
            <div v-if="week.saturday && typeof(week.saturday) == 'object'">Feriado</div>
        </div>
      </div> 
      
















     <!-- <div class="weeks" v-for="(week,i) in weeks" :key="i">
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
      </div>  -->
      
      

    </div>
    <br>
     
     
      <!--Componente DataTable 
           <div style="max-width:50%">
               <data-table
                :config="configTable"
                :data="data"
                
               >
                
            </data-table>
            </div> -->
            
        

  </div>
</template>
<script>
import DataTable from '../../../components/data-table/data-table.vue';
import DataTableConfigFactory from '../../../components/data-table/data-config-factory';
import moment from 'moment'
export default {
  props:['calenderQualidade','qualidade'] , 
  data() {
    return {   
         weeks:[],
        feriados:[],
        dataInicial:this.calenderQualidade.weeks[0].calendar.dateInit,
        dataFinal:this.calenderQualidade.weeks[0].calendar.dateEnd,
        periodo:this.calenderQualidade.weeks[0].calendar.period,
        aproveitamentoMedio:undefined,
        percent:undefined,
        
        datas:[],
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
    // console.log("Objeto qualidade",this.calenderQualidade);
   // console.log("Objeto Info",this.calenderQualidade);
   // console.log("datas",this.datas)
    this.createDate(this.dataInicial,this.dataFinal);
    //this.createDate("19/08/2019","13/09/2019");
    this.showDaysInCalender();
      

     console.log("TESTEEEEEEEEEE",this.qualidade)


},


  filters: {
     extractDay: function (value,value2) {        
      if(value && typeof(value) == "string"){
          let x = value.split('-',3);
          let y = x[2].replace("]", "");
      return y;
        }

        if(value && typeof(value) == "object"){
          return  value[0]
        }

        else{
       }
   },

   extractStatusPositivo:function(value){
      if(value && typeof(value) == "string"){
        let x = value.split('-',4);
        x= x[3];
        if (x == "[3]"){
         return  ""
        }
        if (x != "[3]"){
          x= x.replace("[","");
          x = x.replace("]","")
          x=x*100;

          if(x >= 80){  return  x+"%"}
       
      
        }

      }

      else{ return ""}
    },

     extractStatusNegativo:function(value){
      if(value && typeof(value) == "string"){
        let x = value.split('-',4);
        x= x[3];
        if (x == "[3]"){
         return  ""
        }
        if (x != "[3]"){
          x= x.replace("[","");
          x = x.replace("]","")
          x=x*100;
       
       if(x < 80){  return  x+"%"}
        }

      }

      else{ return ""}
    }

    

   
},


  mounted() {
  
  
  },

  

  methods: {

   

     createDate(dateIni,dateFim){ // cria todos os dias do mes com base nas datas inicial e finais do periodo

      let g = moment(dateFim) < moment(dateIni)
     

      if(dateIni && dateFim && g == false ){
        

        this.datas = []  ;
        var dataInicial = dateIni; //pega data inicial
        var dataFinal = dateFim;   //pega data final
        dataInicial = this.invertDate(dataInicial); //invert format da data para YYYY-MM-DD
        dataFinal = this.invertDate(dataFinal);        //invert format da data para YYYY-MM-DD
        var mesData1 = moment(dataInicial).format("MM")  //pega o mes da data inicial
        var anoData1 = moment(dataInicial).format("YYYY") //pega o ano da data inicial
        var mesData2 = moment(dataFinal).format("MM")   //pega o mes da data final
        var anoData2 = moment(dataFinal).format("YYYY") // pega o ano da data final
        var startDayMes1 = moment(dataInicial).format("DD")  //pega o primeiro dia da data inicial
        var startDayMes2 = 1                                  //constante do primeiro dia do segundo mes caso houver
        var difDias = this.calculaDias(dataInicial,dataFinal); // diferença de dias da dta inicial para a data final
        var ultimoDiaMes1 = moment(dataInicial).endOf('month').format('DD')  //ultiom dia do mes da data inicial
        var ultimoDiaMes2 = moment(dataFinal).format("DD")       // dia final
        var qtdMes1 = ultimoDiaMes1 - startDayMes1 + 1;           //diferença de dias do ultimo dia dp mes (28,30 ou 31) para o dia da data inicial
        var qtdMes2 = ultimoDiaMes2 - startDayMes2 + 1;      // diferença de dias da constante 1 para o dia da data dinal
        var qtdMes1Mes1 = moment(dataFinal).format("DD") - moment(dataInicial).format("DD") + 1;
        var contMes1 = startDayMes1;
        var contMes2 = startDayMes2;
        var m1 = moment(dataInicial).format("MM-YYYY")
        var m2 = moment(dataFinal).format("MM-YYYY")


        if( m1 == m2){
          // gera os dias quando data inicial e data final estão no mesmo mes
          for (var i = 0; i < qtdMes1Mes1 ; i++) {
           let data = anoData1+"-"+mesData1+"-"+contMes1
           
           this.datas.push({data:data,semanaDoAno:moment(data).week(),diaDaSemana:moment(data).day()} )
            contMes1++
          }
          console.log("Datas",this.datas)
        }else{
            // gera os dias quando data final tem o  mes posterio a data inicial
          for (var i = 0; i < qtdMes1 ; i++) {
           let data = anoData1+"-"+mesData1+"-"+contMes1
           
           this.datas.push({data:data,semanaDoAno:moment(data).week(),diaDaSemana:moment(data).day()} )
            contMes1++
          }
          for (var i = 0; i < qtdMes2 ; i++) {
              let data = anoData2+"-"+mesData2+"-"+contMes2
           
           this.datas.push({data:data,semanaDoAno:moment(data).week(),diaDaSemana:moment(data).day()} )
              contMes2++
          }
         // console.log("Datas",this.datas);
        } 
      }else{
        console.log("datas inseridas, incorretas")
     }
    },

    calculaDias(date1, date2){
      var data1 = moment(date1,'DD/MM/YYYY');
      var data2 = moment(date2,'DD/MM/YYYY');
      var diff  = data2.diff(data1, 'days');
      return diff + 1;
    },


  invertDate(value){
    let data = value;
    data = data.split("/");
    data = data[2] + "/" + data[1] + "/" + data[0];
    return data
  },

   showDaysInCalender(){
     let feriados = this.calenderQualidade.holidays;
      feriados = feriados.map(g=>{     
        g.semanaDoAno = moment(this.invertDate(g.date)).week();
        g.diaDaSemana = moment(this.invertDate(g.date)).day();
        return g;      
     });

     
     let semanas = this.calenderQualidade.weeks
      semanas = semanas.map(g=>{
          feriados.forEach(e => {
               if(g.weekOfYear == e.semanaDoAno){
                 if(e.diaDaSemana == 1){
                      g.monday= [e.day,e.description]
                 }
                  if(e.diaDaSemana == 2){
                      g.tuesday = [e.day,e.description]
                 }
                  if(e.diaDaSemana == 3){
                      g.wednesday = [e.day,e.description]
                 }
                  if(e.thursday == 4){
                      g.thursday = [e.day,e.description]
                 }
                  if(e.diaDaSemana == 5){
                      g.friday = [e.day,e.description]
                 }  
            }    
           }); 

          this.datas.forEach(data => {
             if(g.weekOfYear == data.semanaDoAno){
                if(data.diaDaSemana == 0 &&  g.sunday==null){
                    g.sunday=  "["+ data.data + "]-[3]"
                }
                 if(data.diaDaSemana == 1 &&  g.monday==null){
                      g.monday=  "["+ data.data + "]-[3]"
                 }
                  if(data.diaDaSemana == 2 && g.tuesday == null ){
                      g.tuesday =  "["+ data.data + "]-[3]"
                 }
                  if(data.diaDaSemana == 3 && g.wednesday == null ){
                      g.wednesday =  "["+ data.data + "]-[3]"
                 }
                 if(data.diaDaSemana == 4 && g.thursday == null ){
                      g.thursday =  "["+ data.data + "]-[3]"
                 }
                  
                  if(data.diaDaSemana == 5 &&  g.friday == null  ){
                      g.friday =  "["+ data.data + "]-[3]"
                 } 
                  if(data.diaDaSemana == 6 &&  g.saturday == null){
                      g.saturday =  "["+ data.data + "]-[3]"
                 } 
            }    
             
           });

          
         
           
           


        return g;
      })
   
   console.log("semanas:",semanas)
  
  
   this.weeks = this.calenderQualidade.weeks;
   

   
   
   
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

.week-date-feriado{
  font-size: 35px;
   padding: 10px 0 0 0;
   color:red
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

