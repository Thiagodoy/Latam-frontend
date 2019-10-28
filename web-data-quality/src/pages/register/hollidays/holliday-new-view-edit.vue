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
                            <label >{{$t('lang.table_description')}}</label>
                            <input v-model="request.descricao" :disabled="typeAction=='view'"  name="imput-path" v-validate="'required'" type="text" class="form-control campos" :placeholder="$t('lang.table_description')"   >
                            <div class="help-block">{{errors.first('imput-path')}}</div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div :disabled="typeAction=='view'" class="form-group" :class="{'has-error':errors.has('imput-path')}" >
                            <label >{{$t('lang.table_date')}}</label>
                             <datepicker :disabled="typeAction=='view'" :clear-button="true" :clear-button-icon="'fas fa-backspace'"  input-class="input-date"  v-model="request.date"  name="date-init" style="color:#222;max-width:50%; min-width:200px" class="form-control  ml-2"  placeholder="DD/MM/YYY" format="dd/MM/yyyy"></datepicker>  
                            <div class="help-block">{{errors.first('imput-path')}}</div>
                        </div>
                    </div>
                     <div v-if="typeAction == 'edit' || typeAction == 'new'" class="col-md-6 mt-3 ml-3">                        
                        <button   style="color:#fff"  :disabled="(errors.items.length > 0)" class="btn btn-default btn-large" >{{$t('lang.button_save')}}</button>
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

export default {

    props: ['currentObject', 'typeAction'],

    data() {
        return {
            show: '',
            loading: undefined,
            configTable: DataTableConfigFactory.build('DATA-TABLE-USER-AGENCY'),
            request:{
                descricao:undefined,
                date:undefined
            }
        }
    },
    computed:{
       
    },
    mounted() {

        if(this.typeAction == 'view' || this.typeAction == 'edit'){
            this.request.descricao = this.currentObject.descricao;
            this.request.date = this.currentObject.data;
        }

        console.log("Type",this.typeAction);
        console.log("Objeto",this.currentObject);
        
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



