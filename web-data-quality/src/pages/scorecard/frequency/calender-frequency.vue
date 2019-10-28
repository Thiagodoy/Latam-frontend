<template>
  <div>

    <div class="tool mb-4">
        <div   @click="$emit('back')" class="tool-view-item"><i class="fas fa-arrow-circle-left"></i>&nbsp;{{$t('lang.button_back')}}</div> &nbsp; &nbsp;&nbsp;
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
        <div class="week">
          <div class="week-date"> {{week.sunday | extractDay}}</div>
          <div class="week-status">
            <img :src="week.sunday | extractStatus"/>
          </div>
        </div>
        <div class="week">
          <div class="week-date">{{week.monday | extractDay }}</div>
          <div class="week-status">
            <img :src="week.monday | extractStatus"/>
          </div>
        </div>
        <div class="week">
          <div class="week-date">{{week.tuesday | extractDay}}</div>
          <div class="week-status">
            <img :src="week.tuesday | extractStatus"/>
          </div>
        </div>
        <div class="week">
          <div class="week-date">{{week.wednesday | extractDay}}</div>
          <div class="week-status">
            <img :src="week.wednesday | extractStatus"/>
          </div>
        </div>
        <div class="week">
          <div class="week-date">{{week.thusday | extractDay}}</div>
          <div class="week-status">
            <img :src="week.thusday | extractStatus"/>
          </div>
        </div>
        <div class="week">
          <div class="week-date">{{week.friday | extractDay}}</div>
          <div class="week-status">
            <img :src="week.friday | extractStatus"/>
          </div>
        </div>
        <div class="week">
          <div class="week-date"> {{week.saturday | extractDay}}</div>
         <div class="week-status">
            <img :src="week.saturday | extractStatus"/>
          </div>
        </div>
      </div> 
      
      

    </div>


  </div>
</template>
<script>
export default {
  props:['dataObject'] , 
  data() {
    return {   
                weeks:[]
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

    extractStatus:function(value){
      if(value){
        let x = value.split("|",3)
        if(x[1] == '1'){
          return  "img/success.svg"
        }else{
          return  "img/error.svg"
        } 
      }
      else{ return ""}
    }
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
};
</script>


<style lang="scss" scoped>

//calender


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

