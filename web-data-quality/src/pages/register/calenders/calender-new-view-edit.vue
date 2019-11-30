
<template>  
    <div >
        <div  v-async="loading"> </div>
        
         <div v-if="show == 'SAVED'"  class="alert alert-success text-center" role="alert">
           {{$t('lang.msg_success_calendar')}}
        </div>


        <div class="tool mb-2">
            <div   @click="$emit('back')" class="tool-view-item"><i class="fas fa-arrow-circle-left"></i>&nbsp;{{$t('lang.button_back')}}</div> &nbsp; &nbsp;&nbsp;
        </div>

       
         <div  class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <div class="col-md-12">
                        <div class="form-group" :class="{'has-error':errors.has('table-period')}" >
                            <label >{{$t('lang.table_period')}}</label>
                            <input :disabled="typeAction=='view'" v-model="periodo" name="table-period" v-validate="'required|max:7'" type="text" class="form-control campos" :placeholder="$t('lang.table_period')"   >
                            <div class="help-block">{{errors.first('table-period')}}</div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-6">
                            <div class="form-group" :class="{'has-error':errors.has('date-start')}" >
                                <label >{{$t('lang.table_date_start')}}</label>
                                <datepicker :disabled="typeAction=='view'" :clear-button="true" :clear-button-icon="'fas fa-backspace'"  input-class="input-date"  v-model="date_start"  name="date-start" style="color:#222; min-width:200px" class="form-control  "  placeholder="DD/MM/YYY" format="dd/MM/yyyy"></datepicker> 
                                <div class="help-block">{{errors.first('date-start')}}</div>
                            </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group" :class="{'has-error':errors.has('date-end')}" >
                                    <label class="ml-1" >{{$t('lang.table_date_end')}}</label>
                                    <datepicker :disabled="typeAction=='view'" :clear-button="true" :clear-button-icon="'fas fa-backspace'"  input-class="input-date"  v-model="date_end"  name="date-end" style="color:#222; min-width:200px" class="form-control  "  placeholder="DD/MM/YYY" format="dd/MM/yyyy"></datepicker> 
                                    <div class="help-block">{{errors.first('date-end')}}</div>
                                </div>
                            </div>
                        </div> 
                    </div>
                   
                     <div v-if="typeAction == 'edit' || typeAction == 'new'" class="col-md-6 mt-3 ml-3">                        
                        <button @click="save"  style="color:#fff"  :disabled="(errors.items.length > 0)" class="btn btn-default btn-large" >{{$t('lang.button_save')}}</button>
                        <button  style="color:#fff" @click="$emit('back')" class="btn btn-default btn-large ml-3 ">{{$t('lang.button_cancel')}}</button>  
                    </div>
                </div>    
            </div>
        </div>    
        

       



    </div>
</template>
<script>
import AgenciaService from '../../../services/agency';
import Modal from '../../../components/modal/message-dialog.vue';
import DataTable from '../../../components/data-table/data-table.vue';
import DataTableConfigFactory from '../../../components/data-table/data-config-factory';
import VueTimepicker from 'vue2-timepicker'
import CalendarService from '../../../services/calendar.js';
import moment from 'moment';
import {dateDay,dateMonth,dateYear,date} from "../../../filter/date";

export default {

    props: ['currentObject', 'typeAction'],

    data() {
        return {
            show:'',
            loading: undefined,
            configTable: DataTableConfigFactory.build('DATA-TABLE-USER-AGENCY'),
           
            periodo:undefined,
            date_start:undefined,
            date_end:undefined,
        
        }
    },
    
   mounted() {       

        if(this.typeAction == "view" || this.typeAction == "edit"){           
           this.periodo = this.currentObject.period;
           let ini = this.currentObject.dateInit.split('/');
           let fim = this.currentObject.dateEnd.split('/');          
          
          this.date_start = new Date(parseInt(ini[2]),parseInt(ini[1]) - 1,parseInt(ini[0]))
           this.date_end = new Date(parseInt(fim[2]),parseInt(fim[1]) - 1,parseInt(fim[0]))
        }


        
            
        
    },
    methods: {

        save() {
            let promise = [];

            this.$validator.validateAll().then(response => {
                
                if (!response) return;

                if (this.typeAction == 'new') {

                    let request = {
                        
                        "dateEnd": date(this.date_end),
                        "dateInit": date(this.date_start),
                        "id": 0,
                        "period": this.periodo,
                        //"workDays": 0
                   }

                     
                   this.loading = CalendarService.salvar(request).then(()=>{
                        this.savedSuccess();
                    }).catch(e=>{
                        this.mxShowModal({title:'Erro', message:'Erro ao processar sua solicitação.',  type:'OK', width:'100%' });
                    })   
                   
                } else {

                     let requestEdit = {
                        
                        "dateEnd": date(this.date_end),
                        "dateInit": date(this.date_start),
                        "id": this.currentObject.id,
                        "period": this.periodo,
                        "workDays": this.currentObject.workDays,
                   }

                   console.log(requestEdit);

                   this.loading = CalendarService.update(requestEdit).then(()=>{
                        this.savedSuccess();
                    }).catch(e=>{
                        this.mxShowModal({title:'Erro', message:'Erro ao processar sua solicitação.',  type:'OK', width:'100%' });
                    })   

                  
                   
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


