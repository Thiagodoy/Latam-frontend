<template>  
    <div >
        <div  v-async="loading"> </div>
        
         <div v-if="show == 'SAVED'"  class="alert alert-success text-center" role="alert">
          Feriado salvo com sucesso
        </div>


        <div class="tool mb-2">
            <div   @click="$emit('back')" class="tool-view-item"><i class="fas fa-arrow-circle-left"></i>&nbsp;{{$t('lang.button_back')}}</div> &nbsp; &nbsp;&nbsp;
        </div>

        

        <div  class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <div class="col-md-12">
                        <div class="form-group" :class="{'has-error':errors.has('table-description')}" >
                            <label >{{$t('lang.table_description')}}</label>
                            <input v-model="description" :disabled="typeAction=='view'"  name="table-description" v-validate="'required'" type="text" class="form-control campos" :placeholder="$t('lang.table_description')"   >
                            <div class="help-block">{{errors.first('table-description')}}</div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div :disabled="typeAction=='view'" class="form-group" :class="{'has-error':errors.has('date-init')}" >
                            <label >{{$t('lang.table_date')}}</label>
                             <datepicker :disabled="typeAction=='view'" :clear-button="true" :clear-button-icon="'fas fa-backspace'"  input-class="input-date"  v-model="date"  name="date-init" style="color:#222;max-width:50%; min-width:200px" class="form-control  ml-2"  placeholder="DD/MM/YYYY" format="dd/MM/yyyy"></datepicker>  
                            <div class="help-block">{{errors.first('date-init')}}</div>
                        </div>
                    </div>
                     <div v-if="typeAction == 'edit' || typeAction == 'new'" class="col-md-6 mt-3 ml-3">                        
                        <button @click="save"  style="color:#fff"  :disabled="(errors.items.length > 0)" class="btn btn-default btn-large" >{{$t('lang.button_save')}}</button>
                        <button  style="color:#fff" @click="$emit('back')" class="btn btn-default btn-large ml-3 ">{{$t('lang.button_cancel')}}</button>  
                    </div>
                </div>    
            </div>
        </div>

     
     
     
      <div v-if="typeAction=='view' && currentObject.users" class="wrapper-users mt-4">
            
            <data-table
                :config="configTable"
                :data="data"
            ></data-table>   

        </div>



    </div>
</template>
<script>

import Modal from '../../../components/modal/message-dialog.vue';
import DataTable from '../../../components/data-table/data-table.vue';
import DataTableConfigFactory from '../../../components/data-table/data-config-factory';
import VueTimepicker from 'vue2-timepicker'
import HollidayService from '../../../services/holliday.js'
import {dateDay,dateMonth,dateYear,date} from "../../../filter/date";
import moment from 'moment';

export default {

    props: ['currentObject', 'typeAction'],

    data() {
        return {
            show: '',
            loading: undefined,
            configTable: DataTableConfigFactory.build('DATA-TABLE-USER-AGENCY'),
            
                description:undefined,
                date:undefined,
            
        }
    },
    computed:{
       
    },
    mounted() {

        if(this.typeAction == 'view' || this.typeAction == 'edit'){
            this.description = this.currentObject.description;
            this.date = Date.now();// this.currentObject.date ;

            let dat = this.currentObject.date.split('/');
           this.date =  new Date(parseInt(dat[2]),parseInt(dat[1]) - 1,parseInt(dat[0]))
           console.log("Data ->",this.currentObject.date)
           
       
       }

      
       // console.log("Objeto ->",this.currentObject.date);
        
    },
    methods: {

        save() {
            let promise = [];

            this.$validator.validateAll().then(response => {
                
                if (!response) return;

                if (this.typeAction == 'new') {

                    let DataATual = moment().format('YYYY/MM/DD');
                    let Data = moment(this.date).format('YYYY/MM/DD');

                    if(Data < DataATual){
                         this.mxShowModal({ type:"OK",title:'Informação', message:'Não é possivel inserir Feriados em datas passadas'})

                    }else{
                        let request = {
                        date: date(this.date),
                        day : dateDay(this.date),
                        month:dateMonth(this.date),
                        year:dateYear(this.date),
                        description:this.description
                        }
                        this.loading = HollidayService.saveHolliday(request).then(()=>{
                            this.savedSuccess();
                        }).catch(e=>{ })   

                    }
                   
                } else {

                     let requestEdit = {
                        date: date(this.date),
                        day : dateDay(this.date),
                        month:dateMonth(this.date),
                        year:dateYear(this.date),
                        description:this.description,
                        id:this.currentObject.id
                        }
                        this.loading = HollidayService.updateHolliday(requestEdit).then(()=>{
                            this.savedSuccess();
                        }).catch(e=>{ })  

                    



                   
                }
            });
        },
        savedSuccess() {
            this.show = 'SAVED';
            setInterval(() => {
                this.$emit('back')
            }, 1500);
        },
    },

    components: {
        DataTable,
        VueTimepicker 
       
    }
}
</script>

<style lang="scss" scoped>

.wrapper{
     background-color: rgba(0,0,0,0.5);
     width: 100%;
    
     padding:60px;

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

.alert{
     background-color: rgba(37,239,147,0.4);
     color:#eee;
     border: none;

}


.campos{
    color:#fff;
     font-size: 18px;
    &:disabled{
        color: #111;
        font-size:18px;
    }
    &:focus{
       color:#fff;  
    }
    &:active{
       
    }
}

.labels{
    color:#ccc;
}


option{
    color:#222;
}


</style>



