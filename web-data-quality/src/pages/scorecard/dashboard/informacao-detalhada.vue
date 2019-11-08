<template>
  <div>

    <div class="tool mb-4">
        <div   @click="$emit('back')" class="tool-view-item"><i class="fas fa-arrow-circle-left"></i>&nbsp;{{$t('lang.button_back')}}</div> &nbsp; &nbsp;&nbsp;
    </div> 

      <div class="row">
          <div class=" text-center col-md-12">
            <div class=" center-block box">
                <div class="box-title">Janeiro</div>
                <div class="box-title">Informações</div>
                <div class="box-label">Dias Entregues / Dias uteis</div>
                <div class="box-result">25/28</div>
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
          <div  v-if="typeof(week.sunday) == 'string'" class="week-status">
            <img :src="week.sunday | extractStatus"/>
          </div>
          <div v-if=" week.sunday && typeof(week.sunday) == 'object' ">Feriado</div>
        </div>

        <!--Segundas -->
        <div class="week">
          <div v-if="typeof(week.monday) == 'string'" class="week-date">  {{week.monday | extractDay }}</div>
          <div v-if="typeof(week.monday) == 'object'" class="week-date-feriado">  {{week.monday | extractDay }}</div>
          <div  v-if="typeof(week.monday) == 'string'" class="week-status">
            <img :src="week.monday | extractStatus"/>
          </div>
          <div v-if="week.monday && typeof(week.monday) == 'object'">Feriado</div>
        </div>

        <!--Terças -->
        <div class="week">
          <div v-if="typeof(week.tuesday) == 'string'" class="week-date">  {{week.tuesday | extractDay}}</div>
          <div v-if="typeof(week.tuesday) == 'object'" class="week-date-feriado">  {{week.tuesday | extractDay }}</div>
          <div  v-if="typeof(week.tuesday) == 'string'" class="week-status">
            <img :src="week.tuesday | extractStatus"/>
          </div>
          <div v-if="week.tuesday && typeof(week.tuesday) == 'object'">Feriado</div>
        </div>

        <!--Quartas -->
        <div class="week">
          <div v-if="typeof(week.wednesday) == 'string'" class="week-date">  {{week.wednesday | extractDay }}</div>
          <div v-if="typeof(week.wednesday) == 'object'" class="week-date-feriado">  {{week.wednesday | extractDay }}</div>
          <div  v-if="typeof(week.wednesday) == 'string'" class="week-status">
            <img :src="week.wednesday | extractStatus"/>
          </div>
           <div v-if="week.wednesday && typeof(week.wednesday) == 'object'">Feriado</div>
        </div>

        <!--Quintas -->
        <div class="week">
          <div v-if="typeof(week.thursday) == 'string'" class="week-date">  {{week.thursday | extractDay }}</div>
          <div v-if="typeof(week.thursday) == 'object'" class="week-date-feriado">  {{week.thursday | extractDay }}</div>
          <div  v-if="typeof(week.thursday) == 'string'" class="week-status">
            <img :src="week.thursday | extractStatus"/>
          </div>
           <div v-if="week.thursday && typeof(week.thursday) == 'object'">Feriado</div>
        </div>

        <!--Sextas -->
        <div class="week">
          <div v-if="typeof(week.friday) == 'string'" class="week-date">  {{week.friday | extractDay }}</div>
            <div v-if="typeof(week.friday) == 'object'" class="week-date-feriado">  {{week.friday | extractDay}}</div>
            <div  v-if="typeof(week.friday) == 'string'" class="week-status">
              <img :src="week.friday | extractStatus"/>
            </div>
            <div v-if="week.friday && typeof(week.friday) == 'object'">Feriado</div>
        </div>

        <!--Sábados -->
        <div class="week">
            <div v-if="typeof(week.saturday) == 'string'" class="week-date">  {{week.saturday | extractDay }}</div>
            <div v-if="typeof(week.saturday) == 'object'" class="week-date-feriado">  {{week.saturday | extractDay }}</div>
            <div  v-if="typeof(week.saturday) == 'string'" class="week-status">
              <img :src="week.saturday | extractStatus"/>
            </div>
            <div v-if="week.saturday && typeof(week.saturday) == 'object'">Feriado</div>
        </div>
      </div> 
      
      
      

    </div>


  </div>
</template>
<script>
import moment from 'moment';
export default {
  props:['calenderInfo'] , 
  data() {
    return {   
                weeks:[],
                feriados:[],
                dataInicial:this.calenderInfo.weeks[0].calendar.dateInit,
                dataFinal:this.calenderInfo.weeks[0].calendar.dateEnd,
                periodo:this.calenderInfo.weeks[0].calendar.period,
               
                datas:[]
    };
  },

 created() {
    console.log("Objeto Info",this.calenderInfo);
    console.log("datas",this.datas)
    this.createDate(this.dataInicial,this.dataFinal);
    //this.createDate("19/08/2019","13/09/2019");
    this.showDaysInCalender();
   
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

    

    extractStatus:function(value){
      if(value && typeof(value) == "string"){
        let x = value.split('-',4);
        x= x[3];
        if (x == "[1]"){
         return  "img/success.svg"
        }
        if (x == "[0]"){
       return  "img/error.svg"
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
          console.log("Datas",this.datas);
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
     let feriados = this.calenderInfo.holidays;
      feriados = feriados.map(g=>{     
        g.semanaDoAno = moment(this.invertDate(g.date)).week();
        g.diaDaSemana = moment(this.invertDate(g.date)).day();
        return g;      
     });

     
     let semanas = this.calenderInfo.weeks
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
  
  
   this.weeks = this.calenderInfo.weeks;
   

   
   
   
   }
   

    
  },
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
  padding: 0px;
  text-align: right;
  padding:  5px 8px 0 0 ;
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

