<template>
    <div v-async="loading">
       <div v-if="show =='home'">
            <div class="row">
                <div class="col-md-12">
                    <div class="wrapper-filtros">
                        <div class="  form-group mr-3">
                          <label >Mês</label> 
                            <multiselect
                            v-model="periodo"
                            :options="periodos"
                            :label="'period'"                                
                            :track-by="'id'"
                            tag-placeholder="Add this as new tag"                                
                            :selectLabel="''"
                            :selectedLabel="''"
                            :deselectLabel="''"
                            :placeholder="'Selecione o Mês'" 
                            :limit="2"
                            :limit-text="(count)=>`Mais ${count}`"
                            :max-width="150" 
                            :showNoResults="false"                                                                                                                           
                            :multiple="false">                      
                            </multiselect>
                        </div>
                        <div class="  form-group" v-if="$can('manage', 'Score-Dashboard-agency')">
                          <label >Agência</label> 
                            <multiselect
                            v-model="agencia"
                            :options="agencias"
                            :label="'name'"                                
                            :track-by="'id'"
                            tag-placeholder="Add this as new tag"                                
                            :selectLabel="''"
                            :selectedLabel="''"
                            :deselectLabel="''"
                            :placeholder="'Selecione a Agência'" 
                            :limit="2"
                            :limit-text="(count)=>`Mais ${count}`"
                            :max-width="150" 
                            :showNoResults="false"                                                                                                                           
                            :multiple="false">                      
                            </multiselect>
                        </div>
                        <div class="form-group mt-4 ml-3">
                            <button v-if="!masterAgencia" @click="buscarStatusScore"  style="color:#fff" class="btn btn-default btn-large" >Buscar</button>
                            <button v-if="masterAgencia" @click="buscarScoreMasterAgrncia"  style="color:#fff" class="btn btn-default btn-large" >Buscar</button>

                        </div>

                    </div>
                </div>
            </div>
            <div class="wrapper-card mt-4">
            
                    <div class="card">
                        <div class="card-title">Frequência</div>
                        <div class="card-icone">
                            <img v-if="frequencia.response==true" @click="show ='frequencia'" style="cursor:pointer" src="img/success_large.svg">      
                        </div>
                        <div class="card-body">
                            <div><span style="font-size:18px;"> Envio diário</span><br><small style="color:#888;font-size:10px;">(Dias entregues/Dias Uteis)</small></div>
                            <div style="font-size:20px; color:#ffed69;">{{frequencia.diasEntregues}}/{{frequencia.diasUteis}}</div>    
                        </div>
                    </div>
            
                
                    <div class="card">
                        <div class="card-title">Informações</div>
                        <div class="card-icone">
                            <img v-if="info.response==true" @click="show ='info'" style="cursor:pointer" src="img/success_large.svg">   
                        </div>
                        <div class="card-body">
                            <div>
                                <div><span style="font-size:18px;">Emissão diária</span><br><small style="color:#888;font-size:10px;">(Dias entregues/Dias de emissão</small></div> 
                                <div style="font-size:20px; color:#ffed69;">{{info.diasEntregues}}/{{info.diasEmit}}</div>
                            </div>
                           
                           <!--
                            <div>
                                <div><span  style="font-size:18px;" >Info Empresas</span><br><small style="color:#888;font-size:10px;">(Pontos)</small></div> 
                                <div style="font-size:20px; color:#ffed69;">10/10</div>
                            </div> -->

                        </div>
                        
                    </div>
            
                
                    <div class="card">
                        <div class="card-title">Qualidade</div>
                        <div class="card-icone">
                            <img v-if="qualidade.response==true" @click="show ='qualidade'" style="cursor:pointer" src="img/success_large.svg">   
                        </div>
                        <div class="card-body">
                            <div><span style="font-size:18px;">Aproveitamento</span><br><small style="color:#888;font-size:10px;margin-top:-10px">(% de linhas aproveitadas)</small></div>
                            <div style="font-size:20px; color:#ffed69;">{{qualidade.linhasAprovadas}}%</div>    
                        </div>
                    
                    </div>
   
            </div>

      
         

        </div> <!--home-->  

        <!-- Detalhes -->
        <frequencia-detalhada  :calender-frequencia = "calenderFrequencia" v-if="show == 'frequencia'" @back="show = 'home'"></frequencia-detalhada> 
        <informacao-detalhada :calender-info = "calenderInfo" v-if="show == 'info'" @back="show = 'home'"></informacao-detalhada> 
        <qualidade-detalhada :calender-qualidade = "calenderQualidade" v-if="show == 'qualidade'" @back="show = 'home'"></qualidade-detalhada> 
   
   
   
   
    </div>
</template>



<script>
import FrequenciaDetalhada from './frequencia-detalhada'
import InformacaoDetalhada from './informacao-detalhada'
import QualidadeDetalhada from './qualidade-detalhada'
import ServicePeriodo from '../../../services/periodos'
import ServiceAgency from '../../../services/agency'
import ServiceWeeks from '../../../services/weeks'
import Multiselect from 'vue-multiselect';
import {mapGetters} from 'vuex'
import moment from 'moment';
export default {
    data(){
        return{
            loading:undefined,
            show:'home',
            periodos:[],
            periodo:undefined,
            agencias:[],
            agencia:undefined,
            calenderFrequencia:undefined,
            calenderInfo:undefined,
            calenderQualidade:undefined,

            frequencia:{
                semanas:undefined,
                diasUteis:0,
                diasEntregues:0,
                response:false,    
            },
            info:{
                diasEntregues:0,
                diasEmit:0, 
                response:false,  
            },
            qualidade:{
                linhasAprovadas:0,
                response:false,  
            },

            masterAgencia: undefined,
            
            
            
            filtrosMes:{
                page:0,
                size:1000
            },
            filtrosScore:{
                periodo:undefined,
                agencia:undefined
            }
        }
    },

    computed:{
      ...mapGetters(['getUser','getAgencysFromUser','getIsMaster']),

    },


    mounted() {
        this.getPeriodos();
        //this.getAgency();
        this.agency();

        if(this.getUser.groups[0].id == "master agência") {
         this.masterAgencia = true;
        }else{
            this.masterAgencia = false;
        }
       

       
               
        
       
       
    },

    

    methods:{

        invertDate(value){
            let data = value;
            data = data.split("/");
            data = data[2] + "/" + data[1] + "/" + data[0];
            return data
        },

        reset(){
            this.calenderFrequencia= undefined;
            this.frequencia.semanas=undefined;
            this.frequencia.diasUteis=0;
            this.frequencia.diasEntregues=0;
            this.info.diasEntregues=0;
            this.info.diasEmissao=0; 
            this.info.linhasAprovadas=0 ;
            this.frequencia.response = false;
            this.info.response = false;
             this.qualidade.response = false;


        },

       buscarScoreMasterAgrncia(){
            this.reset();  

            console.log(this.agencias[0].id)

            let frequencia = {agency:this.agencias[0].id,calendar:this.periodo.id,type:"FREQUENCY"}
            let info = {agency:this.agencias[0].id,calendar:this.periodo.id,type:"INFORMATION"}
            let qualidade = {agency:this.agencias[0].id,calendar:this.periodo.id,type:"QUALITY"}
            
            this.getCalenderFrequencia(frequencia);
            this.getCalenderInfo(info);
            this.getCalenderQualidade(qualidade);
        },

        buscarStatusScore(){

            if(!this.agencia || !this.periodo){
                alert("Seleciona o Periodo e a agência")
            }else{

            this.reset();  

            let frequencia = {agency:this.agencia.id,calendar:this.periodo.id,type:"FREQUENCY"}
            let info = {agency:this.agencia.id,calendar:this.periodo.id,type:"INFORMATION"}
            let qualidade = {agency:this.agencia.id,calendar:this.periodo.id,type:"QUALITY"}
            
            this.getCalenderFrequencia(frequencia);
            this.getCalenderInfo(info);
            this.getCalenderQualidade(qualidade);
            }
        },

        calcularDiasUteis(){
         

        },

        getPeriodos(){
            this.loading = ServicePeriodo.listar({page:0,size:1000}).then(response=>{
               // console.log(response);
                this.periodos = response.content;
            }).catch(e=>{
                console.log(e);
            })
        },

        getAgency(){
             this.loading = ServiceAgency.list({page:0,size:1000}).then(response=>{ 
              //
                this.agencias = response.content;
            }).catch(e=>{
                console.log(e);
            })
        },

         agency(){
            this.loading =  ServiceAgency.list({page:0,size:1000}).then(response=>{            

              let temp = undefined;               
              if(!this.getIsMaster){
                  temp = response.content.filter(a=> this.getAgencysFromUser.some(e=> e.value == a.id));
              }else{
                  temp = response.content;
              }  

              this.agencias = temp;
            
       }).catch(erro=>{
           this.mxShowModalError(erro);
       });

        },

        getCalenderFrequencia(filtro){
            this.loading = ServiceWeeks.listar(filtro).then(response=>{ 
                this.frequencia.response = true
               // console.log("FREQUENCIA -> ",response);
                this.calenderFrequencia = response;
                this.frequencia.semanas = response.weeks.length;
                let x=0 ;
                response.weeks.forEach(e => {
                   x = x + e.deliveryDays
                });
                this.frequencia.diasEntregues = x;
                this.frequencia.diasUteis = response.weeks[0].calendar.workDays
            }).catch(e=>{
                console.log(e);
            })
        },

        getCalenderInfo(filtro){
                    this.loading = ServiceWeeks.listar(filtro).then(response=>{
                        this.info.response = true
                        this.calenderInfo = response
                         let x=0 ;
                        response.weeks.forEach(e => {
                        x = x + e.deliveryDays
                        });
                        this.info.diasEntregues = x;
                        this.info.diasEmit = response.weeks[0].calendar.workDays
                        //console.log('Info ->',response)
                    });

        },
        getCalenderQualidade(filtro){
                    this.loading = ServiceWeeks.listar(filtro).then(response=>{
                         this.qualidade.response = true
                         this.calenderQualidade = response
                        console.log('Qualidade ->',response)

                    });
        }

    },

    components:{
        FrequenciaDetalhada,
        InformacaoDetalhada,
        QualidadeDetalhada,
        Multiselect,
    }
   
    
}
</script>







<style lang="scss" scoped>
.wrapper-filtros{
    display: flex;
    justify-content: center;
}



.wrapper-card{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.card{
  
     background-color: rgba(0,0,0,0.5);
     margin-bottom: 15px;
     color: #ddd;
     min-height: 260px;
     min-width: 300px;
     max-width: 32%;
     width: 100%;
     margin: 5px;
}

.card-title{
    text-align: center;
    padding: 10px;
    background-color: rgba(0,0,0,0.6);
    font-size: 20px;
    color: #ddd;
}

.card-icone{
    padding: 10px;
    text-align: center;
}

.card-body{
    display: flex;
    justify-content: space-between;
}


</style>