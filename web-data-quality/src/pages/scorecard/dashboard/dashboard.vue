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
                        <div class="  form-group">
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

                       
                      
                       
                       
                       
                       
                       
                        
                    
                       
                       
                       
                       
                       
                       
                      
                    </div>
                </div>
            </div>
            <div class="wrapper-card mt-4">
            
                    <div class="card">
                        <div class="card-title">Frequência</div>
                        <div class="card-icone">
                            <img @click="show ='frequencia'" style="cursor:pointer" src="img/success_large.svg">      
                        </div>
                        <div class="card-body">
                            <div><span style="font-size:18px;"> Envio diário</span><br><small style="color:#888;font-size:10px;">(Dias entregues/Dias Uteis)</small></div>
                            <div style="font-size:20px; color:#ffed69;">{{frequencia.diasEntregues}}/{{frequencia.diasUteis}}</div>    
                        </div>
                    </div>
            
                
                    <div class="card">
                        <div class="card-title">Informações</div>
                        <div class="card-icone">
                            <img @click="show ='info'" style="cursor:pointer" src="img/success_large.svg">   
                        </div>
                        <div class="card-body">
                            <div>
                                <div><span style="font-size:18px;">Emissão diária</span><br><small style="color:#888;font-size:10px;">(Dias entregues/Dias de emissão</small></div> 
                                <div style="font-size:20px; color:#ffed69;">{{info.diasEntregues}}/{{info.diasEmissao}}</div>
                            </div>
                            <div>
                                <div><span  style="font-size:18px;" >Info Empresas</span><br><small style="color:#888;font-size:10px;">(Pontos)</small></div> 
                                <div style="font-size:20px; color:#ffed69;">10/10</div>
                            </div>
                        </div>
                        
                    </div>
            
                
                    <div class="card">
                        <div class="card-title">Qualidade</div>
                        <div class="card-icone">
                            <img @click="show ='qualidade'" style="cursor:pointer" src="img/success_large.svg">   
                        </div>
                        <div class="card-body">
                            <div><span style="font-size:18px;">Aproveitamento</span><br><small style="color:#888;font-size:10px;margin-top:-10px">(% de linhas aproveitadas)</small></div>
                            <div style="font-size:20px; color:#ffed69;">{{qualidade.linhasAprovadas}}%</div>    
                        </div>
                    
                    </div>
   
            </div>

      
            {{frequencia.semanas}}

        </div> <!--home-->  

        <!-- Detalhes -->
        <frequencia-detalhada  :calender-frequencia = "calenderFrequencia" v-if="show == 'frequencia'" @back="show = 'home'"></frequencia-detalhada> 
        <informacao-detalhada v-if="show == 'info'" @back="show = 'home'"></informacao-detalhada> 
        <qualidade-detalhada v-if="show == 'qualidade'" @back="show = 'home'"></qualidade-detalhada> 
   
   
   
   
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

            frequencia:{
                semanas:undefined,
                diasUteis:0,
                diasEntregues:0,    
            },
            info:{
                diasEntregues:0,
                diasEmissao:0, 
            },
            qualidade:{
                linhasAprovadas:0
            },
            
            
            
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

    mounted() {
        this.getPeriodos();
        this.getAgency();
        this.getCalenderFrequencia();

       
               
        
       
       
    },

    

    methods:{
        getPeriodos(){
            this.loading = ServicePeriodo.listar(this.filtrosMes).then(response=>{
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
        getCalenderFrequencia(){
            let request={agency:25,calendar:9,type:"FREQUENCY"}
            this.loading = ServiceWeeks.listar(request).then(response=>{ 
                console.log("FREQUENCIA -> ",response);
                this.calenderFrequencia = response;
                this.frequencia.semanas = response.weeks.length;
              
               // console.log("FREQUENCIA -> ",response.weeks);
            }).catch(e=>{
                console.log(e);
            })
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