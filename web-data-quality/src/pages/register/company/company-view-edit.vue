
<template>  
    <div >
        <div  v-async="loading"> </div>
        
         <div v-if="show == 'SAVED'"  class="alert alert-success text-center" role="alert">
           {{$t('lang.msg_success_agency')}}
        </div>


        <div class="tool mb-2">
            <div   @click="$emit('back')" class="tool-view-item"><i class="fas fa-arrow-circle-left"></i>&nbsp;{{$t('lang.button_back')}}</div> &nbsp; &nbsp;&nbsp;
        </div>

        

        <div v-if="viewAgency || typeAction=='new' " class="wrapper">
            <div class="row">
               <div class="col-md-6">
                    <div class="col-md-12">
                        <div class="form-group" :class="{'has-error':errors.has('agenciaName')}" >
                            <label class="" >{{$t('lang.table_agency_name')}}</label>
                            <input :disabled="typeAction=='view'" v-model="viewAgency.name" name="agenciaName" v-validate="'required'" type="text" class="form-control campos" :placeholder="$t('lang.table_agency_name')"  >
                            <div class="help-block">{{errors.first('agenciaName')}}</div> 
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group" :class="{'has-error':errors.has('cnpj')}" >
                            <label class="" >CNPJ</label>
                            <input v-mask="maskCnpj" :disabled="typeAction=='view'" name="cnpj" v-model="viewAgency.cnpj" v-validate="'required'" type="text" class="form-control campos" placeholder="99.999.999/9999-99"  >
                            <div class="help-block">{{errors.first('cnpj')}}</div> 
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group" :class="{'has-error':errors.has('imput-path')}" >
                            <label >{{$t('lang.table_agency_input_path')}}</label>
                            <input :disabled="typeAction=='view'" v-model="viewAgency.inputPath" name="imput-path" v-validate="'required'" type="text" class="form-control campos" :placeholder="$t('lang.table_agency_input_path')"   >
                            <div class="help-block">{{errors.first('imput-path')}}</div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group" :class="{'has-error':errors.has('processed_path')}" >
                            <label >{{$t('lang.table_agency_processed_path')}}</label>
                            <input :disabled="typeAction=='view'" v-model="viewAgency.processedPath" name="processed_path" v-validate="'required'" type="text" class="form-control campos" :placeholder="$t('lang.table_agency_processed_path')"   >
                            <div class="help-block">{{errors.first('processed_path')}}</div>
                        </div>
                    </div>
                     
                     <!-- Novo campo PERFIL -->
                     <div class="col-md-12">
                            <div class="form-group" :class="{'has-error':errors.has('profile')}" >
                                <label for="s3-imput" >{{$t('lang.profile')}}</label>
                                <select v-model="viewAgency.profile" :disabled="typeAction == 'view'" name="profile" class="form-control campos" v-validate="'required'"   id="profile" style="opacity:.7" >
                                    <option selected value="CONSOLIDATORS">Consolidators</option>
                                    <option value="CORPORATE">Corporate</option>
                                   
                                </select>
                                <div class="help-block">{{errors.first('profile')}}</div> 
                            </div>
                        </div>
                   
                    </div>
                    <div class="col-md-6">
                        <div class="col-md-12">
                            <div class="form-group" :class="{'has-error':errors.has('file_path')}"  >
                                <label >{{$t('lang.table_agency_local_file_path')}}</label>
                                <input :disabled="typeAction=='view'" v-model="viewAgency.localFilePath" name="file_path" v-validate="'required'" type="text" class="form-control campos" :placeholder="$t('lang.table_agency_local_file_path')"   >
                                <div class="help-block">{{errors.first('file_path')}}</div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group" :class="{'has-error':errors.has('agency_code')}" >
                                <label >{{$t('lang.table_agency_code')}}</label>
                                <input :disabled="typeAction=='view'" v-model="viewAgency.agencyCode" name="agency_code" v-validate="'required'" type="text" class="form-control campos" :placeholder="$t('lang.table_agency_code')"   >
                                <div class="help-block">{{errors.first('agency_code')}}</div>
                            </div>
                        </div>

                         <div class="col-md-12">
                            <div class="form-group" :class="{'has-error':errors.has('s3-imput')}" >
                                <label for="s3-imput" >{{$t('lang.table_agency_s3')}}</label>
                                <input :disabled="typeAction=='view'" v-validate="'required'" name="s3-imput" v-model="viewAgency.s3Path"  type="text" class="form-control campos" :placeholder="$t('lang.table_agency_s3')"   >
                                <div class="help-block">{{errors.first('s3-imput')}}</div>  
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group" :class="{'has-error':errors.has('layout')}" >
                                <label for="s3-imput" >Layout</label>
                                <select v-model="viewAgency.layoutFile" :disabled="typeAction == 'view'" name="layout" class="form-control campos" v-validate="'required'"   id="profile" style="opacity:.7" >
                                    <option selected value="0">Layout livre</option>                                    
                                    <option value="2">Layout completo</option>
                                </select>
                                <div class="help-block">{{errors.first('layout')}}</div> 
                            </div>
                        </div>

                        <!-- nOVO CAMPO CATEGORIA DA AGENCIA -->
                         <div class="col-md-12">
                            <div class="form-group" :class="{'has-error':errors.has('category')}" >
                                <label for="s3-imput" >{{$t('lang.label_agency_category')}}</label>
                                <select v-model="viewAgency.category" :disabled="typeAction == 'view'" name="category" class="form-control campos" v-validate="'required'"   id="profile" style="opacity:.7" >
                                    <option selected value="RM1">RM1</option>
                                    <option value="RM2">RM2</option>
                                    <option value="RM3">RM3</option>
                                </select>
                                <div class="help-block">{{errors.first('category')}}</div> 
                            </div>
                        </div>

                    </div>

                    <div class="col-md-6 pt-2">
                        <div class="checks ml-3 mb-3">
                            
                            <span class="mt-3">{{$t('lang.table_agency_flag_monthly')}}:</span>&nbsp;
                            <input id="m" :disabled="typeAction=='view'"  class="ml-2" v-model="viewAgency.flagMonthly" type="radio" value="M"  /><label>Mensal</label>&nbsp;&nbsp;
                            <input id="s" :disabled="typeAction=='view'" class="ml-2 campo-check" v-model="viewAgency.flagMonthly" type="radio" value="S"     /><label>Semanal</label>&nbsp;&nbsp;
                            <input id="d" :disabled="typeAction=='view'" class="ml-2 campo-check" v-model="viewAgency.flagMonthly" type="radio" value="D"     /><label>Diário</label>
                            <br><br>
                            <input :disabled="typeAction=='view'" class="ml-2 campo-check" type="checkbox" v-model="viewAgency.odFlag" value="0"   true-value="1" false-value="0" />
                            <label   class="checkboxtext mr-3" for="od">{{$t('lang.table_Agency_od_flag')}}</label>&nbsp;
                           
                          
                            <input :disabled="typeAction=='view'" v-model="viewAgency.flagApproved" type="checkbox" value="0"  true-value="1" false-value="0" />
                            <label for="approved">{{$t('lang.table_agency_flag_approved')}}</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                 
                            
                        </div>

                    </div>


                    <div class="col-md-6 pt-2">
                        <div class="checks ml-3 mb-3">
                            <input :disabled="typeAction=='view'" class="ml-2 campo-check" type="checkbox" v-model="viewAgency.sendDailyUpload" value="0"   true-value="1" false-value="0" />
                            <label   class="checkboxtext mr-3" for="od">Notificação de upload</label>&nbsp;
                        </div>

                        <div class="form-group col-md-12 " :class="{'has-error':errors.has('hora-limite')}" >
                                <label v-if="viewAgency.sendDailyUpload == 1"   class="checkboxtext mr-3" for="hora-limite">Hora limite</label>&nbsp;
                                <input v-if="typeAction=='view'" :disabled="typeAction=='view'" name="hora-limite" v-model="viewAgency.timeLimit"  type="text" class="form-control campos"  >
                                <vue-timepicker v-validate="'required'" v-if="viewAgency.sendDailyUpload == 1 && typeAction !='view'" class="form-control " v-model="timeLimit" name="hora-limite" ></vue-timepicker>
                                <div class="help-block">{{errors.first('hora-limite')}}</div>  
                            </div>
                            <div class="form-group col-md-12 " :class="{'has-error':errors.has('hora-antecedencia')}" >
                                 <label v-if="viewAgency.sendDailyUpload == 1"   class="checkboxtext mr-3" for="hora-limite">Horas antecedência</label>&nbsp;                            
                                <input v-if="viewAgency.sendDailyUpload == 1" :disabled="typeAction=='view'" v-validate="'required|min:1'" name="hora-antecedencia" v-model="viewAgency.hoursAdvance"  type="number" class="form-control campos" :placeholder="''"   >
                                <div class="help-block">{{errors.first('hora-antecedencia')}}</div>  
                            </div>

                    </div>

                    <div v-if="typeAction == 'edit' || typeAction == 'new'" class="col-md-6 mt-3 ml-3">                        
                        <button   style="color:#fff" @click="saveAgency" :disabled="(errors.items.length > 0)" class="btn btn-default btn-large" >{{$t('lang.button_save')}}</button>
                        <button  style="color:#fff" @click="$emit('back')" class="btn btn-default btn-large ml-3 ">{{$t('lang.button_cancel')}}</button>  
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
            maskCnpj: "##.###.###/####-##",
            odchecked: undefined,
            approvedChecked: undefined,
            viewAgency: {},
            loading: undefined,

            configTable: DataTableConfigFactory.build('DATA-TABLE-USER-AGENCY'),

            data: {
                conteudo: [],
                pagination: undefined
            },
            filter: {
                page: 0,
                size: 10
            },
        }
    },
    computed:{
        timeLimit:{
            set:function(data){
                this.viewAgency.timeLimit =`${data.HH}:${data.mm}`
            },
            get:function(){
                if(!this.viewAgency.timeLimit)
                return {HH:'00',mm:'00'};
                let temp = this.viewAgency.timeLimit.split(':');
                return {HH:temp[0],mm:temp[1]}
            }
        }
    },
    mounted() {
        this.viewAgency = this.currentObject || {
            name: ''
        };

        if(!this.currentObject)
        return;
        
        this.loading = AgenciaService.listUserByAgency({
            id: this.currentObject.id
        }).then(response => {

            this.currentObject.users = response.map(a => {
                a.group = a.groups[0].id;
                return a;
            });

            this.data.conteudo = this.currentObject.users;
        }).catch(erro => {
            this.mxShowModalError(erro);
        });
    },
    methods: {

        saveAgency() {
            let promise = [];





            this.$validator.validateAll().then(response => {
                
                if (!response) return;

                if (this.typeAction == 'new') {
                    console.log('Salvando');
                    console.log('request',this.viewAgency)
                    this.loading = AgenciaService.save(this.viewAgency).then(() => {
                        this.savedSuccess();
                    }).catch(erro => {
                        this.mxShowModalError(erro);
                    });
                
                } else {
                    this.loading = AgenciaService.update(this.viewAgency).then(() => {
                        this.savedSuccess();
                    }).catch(erro => {
                        this.mxShowModalError(erro);
                    });
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

input[type=checkbox]
{
  /* Double-sized Checkboxes */
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  padding: 10px;
  margin-right: 10px;
  background: #ffed69;
}

input[type=radio]
{
  /* Double-sized Checkboxes */
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  padding: 10px;
  margin-right: 10px;
}

/* Might want to wrap a span around your checkbox text */
.checkboxtext
{
  /* Checkbox text */
  font-size: 110%;
  display: inline;
}

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

.campo-check{
    background: red;
}

.labels{
    color:#ccc;
}


option{
    color:#222;
}


</style>


