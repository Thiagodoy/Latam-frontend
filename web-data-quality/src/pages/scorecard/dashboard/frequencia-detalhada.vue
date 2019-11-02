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
                <div class="box-title">Frequência</div>
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
          <div v-if="typeof(week.monday) == 'string'" class="week-date">  {{week.monday | extractDay}}</div>
          <div v-if="typeof(week.monday) == 'object'" class="week-date-feriado">  {{week.monday | extractDay}}</div>
          <div  v-if="typeof(week.monday) == 'string'" class="week-status">
            <img :src="week.monday | extractStatus"/>
          </div>
          <div v-if="week.monday && typeof(week.monday) == 'object'">Feriado</div>
        </div>

        <!--Terças -->
        <div class="week">
          <div v-if="typeof(week.tuesday) == 'string'" class="week-date">  {{week.tuesday | extractDay}}</div>
          <div v-if="typeof(week.tuesday) == 'object'" class="week-date-feriado">  {{week.tuesday | extractDay}}</div>
          <div  v-if="typeof(week.tuesday) == 'string'" class="week-status">
            <img :src="week.tuesday | extractStatus"/>
          </div>
          <div v-if="week.tuesday && typeof(week.tuesday) == 'object'">Feriado</div>
        </div>

        <!--Quartas -->
        <div class="week">
          <div v-if="typeof(week.wednesday) == 'string'" class="week-date">  {{week.wednesday | extractDay}}</div>
          <div v-if="typeof(week.wednesday) == 'object'" class="week-date-feriado">  {{week.wednesday | extractDay}}</div>
          <div  v-if="typeof(week.wednesday) == 'string'" class="week-status">
            <img :src="week.wednesday | extractStatus"/>
          </div>
           <div v-if="week.wednesday && typeof(week.wednesday) == 'object'">Feriado</div>
        </div>

        <!--Quintas -->
        <div class="week">
          <div v-if="typeof(week.thursday) == 'string'" class="week-date">  {{week.thursday | extractDay}}</div>
          <div v-if="typeof(week.thursday) == 'object'" class="week-date-feriado">  {{week.thursday | extractDay}}</div>
          <div  v-if="typeof(week.thursday) == 'string'" class="week-status">
            <img :src="week.thursday | extractStatus"/>
          </div>
           <div v-if="week.thursday && typeof(week.thursday) == 'object'">Feriado</div>
        </div>

        <!--Sextas -->
        <div class="week">
          <div v-if="typeof(week.friday) == 'string'" class="week-date">  {{week.friday | extractDay}}</div>
            <div v-if="typeof(week.friday) == 'object'" class="week-date-feriado">  {{week.friday | extractDay}}</div>
            <div  v-if="typeof(week.friday) == 'string'" class="week-status">
              <img :src="week.friday | extractStatus"/>
            </div>
            <div v-if="week.friday && typeof(week.friday) == 'object'">Feriado</div>
        </div>

        <!--Sábados -->
        <div class="week">
            <div v-if="typeof(week.saturday) == 'string'" class="week-date">  {{week.saturday | extractDay}}</div>
            <div v-if="typeof(week.saturday) == 'object'" class="week-date-feriado">  {{week.saturday | extractDay}}</div>
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
  props:['dataObject','calenderFrequencia'] , 
  data() {
    return {   
                weeks:[],
                feriados:[],
                dataInicial:this.calenderFrequencia.weeks[0].calendar.dateInit,
                dataFinal:this.calenderFrequencia.weeks[0].calendar.dateEnd,
                periodo:this.calenderFrequencia.weeks[0].calendar.period,

    };
  },

 
 created() {
     console.log("teste",this.dataObject);
     console.log("aqui ->",this.calenderFrequencia);
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

    invertDate(value){
      let data = value;
      data = data.split("/");
      data = data[2] + "/" + data[1] + "/" + data[0];
      return data
    },



    showDaysInCalender(){
     let feriados = this.calenderFrequencia.holidays;
      feriados = feriados.map(g=>{     
        g.semanaDoAno = moment(this.invertDate(g.date)).week();
        g.diaDaSemana = moment(this.invertDate(g.date)).day();
        return g;      
     });

     
     let semanas = this.calenderFrequencia.weeks
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
                      g.wednesday = [e.day,e.description]
                 }
                  if(e.diaDaSemana == 5){
                      g.friday = [e.day,e.description]
                 }  
            }    
           });
            
            
            
           
        return g;
      })
   
   console.log("semanas:",semanas)
  
  
   this.weeks = this.calenderFrequencia.weeks;
   

   
   
   
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
  padding:  0 8px 0 0 ;
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
