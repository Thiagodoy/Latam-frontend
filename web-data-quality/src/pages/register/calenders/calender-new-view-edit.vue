
<template>  
    <div >
        <div  v-async="loading"> </div>
        
         <div v-if="show == 'SAVED'"  class="alert alert-success text-center" role="alert">
           {{$t('lang.msg_success_agency')}}
        </div>


        <div class="tool mb-2">
            <div   @click="$emit('back')" class="tool-view-item"><i class="fas fa-arrow-circle-left"></i>&nbsp;{{$t('lang.button_back')}}</div> &nbsp; &nbsp;&nbsp;
        </div>

         <div  class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <div class="col-md-12">
                        <div class="form-group" :class="{'has-error':errors.has('imput-path')}" >
                            <label >{{$t('lang.table_period')}}</label>
                            <input :disabled="typeAction=='view'" v-model="request.periodo" name="imput-path" v-validate="'required'" type="text" class="form-control campos" :placeholder="$t('lang.table_period')"   >
                            <div class="help-block">{{errors.first('imput-path')}}</div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-6">
                            <div class="form-group" :class="{'has-error':errors.has('imput-path')}" >
                                <label >{{$t('lang.table_date_start')}}</label>
                                <datepicker :disabled="typeAction=='view'" :clear-button="true" :clear-button-icon="'fas fa-backspace'"  input-class="input-date"  v-model="request.date_start"  name="date-start" style="color:#222; min-width:200px" class="form-control  "  placeholder="DD/MM/YYY" format="dd/MM/yyyy"></datepicker> 
                                <div class="help-block">{{errors.first('imput-path')}}</div>
                            </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group" :class="{'has-error':errors.has('imput-path')}" >
                                    <label class="ml-1" >{{$t('lang.table_date_end')}}</label>
                                    <datepicker :disabled="typeAction=='view'" :clear-button="true" :clear-button-icon="'fas fa-backspace'"  input-class="input-date"  v-model="request.date_end"  name="date-init" style="color:#222; min-width:200px" class="form-control  "  placeholder="DD/MM/YYY" format="dd/MM/yyyy"></datepicker> 
                                    <div class="help-block">{{errors.first('imput-path')}}</div>
                                </div>
                            </div>
                        </div> 
                    </div>
                   
                     <div v-if="typeAction == 'edit' || typeAction == 'new'" class="col-md-6 mt-3 ml-3">                        
                        <button   style="color:#fff"  :disabled="(errors.items.length > 0)" class="btn btn-default btn-large" >{{$t('lang.button_save')}}</button>
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

export default {

    props: ['currentObject', 'typeAction'],

    data() {
        return {
            show: '',
            loading: undefined,
            configTable: DataTableConfigFactory.build('DATA-TABLE-USER-AGENCY'),
            request:{
                periodo:undefined,
                date_start:undefined,
                date_end:undefined,
            }
        }
    },
    computed:{
       
    },
    mounted() {

            console.log(this.currentObject);

        if(this.typeAction == "view" || this.typeAction == "edit"){
            this.request.periodo = this.currentObject.periodo;
            this.request.date_start = this.currentObject.data_inicial;
            this.request.date_end = this.currentObject.data_final;
        }
        
    },
    methods: {

        save() {
            let promise = [];

            this.$validator.validateAll().then(response => {
                
                if (!response) return;

                if (this.typeAction == 'new') {
                   
                } else {
                   
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


