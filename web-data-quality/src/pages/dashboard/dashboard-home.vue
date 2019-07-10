<template>
    <div v-async="loading"> 
            <toolbar  
                :config="configToolbar" 
               >
            </toolbar> 

            <div class="row mt-3 mb-5">
                <div style="" class="col-md-12 text-center">
            <center><div class="filtros">
                        <div class="filter-select form-group" >
                            <div>{{$t('lang.table_view_file_company_name')}}:&nbsp;</div> 
                            <multiselect 
                                name="agencia"
                                v-validate="'required'"
                                v-model="company"
                                :options="options"
                                :label="'name'"                                
                                :track-by="'id'"
                                tag-placeholder="Add this as new tag"                                
                                :selectLabel="'Pressione para selecionar'"
                                :selectedLabel="'Selecionado'"
                                :deselectLabel="'Pressione para Deselecionar'"
                                :placeholder="'Selecione a agencia'" 
                                :limit="1"
                                :limit-text="(count)=>`Mais ${count}`"
                                :max-width="150"                                                              
                                :multiple="false">                        
                            </multiselect>
                        </div>
                        <div class="filter-date">
                            <div class="form-group" >
                                <div class="date-init" >
                                    <div class="filterlabel">{{$t('lang.label_input_search_date_From')}}&nbsp;</div>   
                                    <datepicker @cleared="clearData" :clear-button="true" v-validate="'required'" :clear-button-icon="'fas fa-backspace'" v-model="timeInit"  input-class="input-date"    name="date-init" style="color:#222;" class="form-control mx-auto ml-2"  placeholder="DD/MM/YYY" format="dd/MM/yyyy"></datepicker>  
                                
                                </div>
                            </div>
                            
                            <div class=" form-group date-end" >
                                <div>{{$t('lang.label_input_search_date_To')}}&nbsp;</div>
                                <datepicker  @cleared="clearDataEnd" :clear-button="true" :clear-button-icon="'fas fa-backspace'" v-model="timeEnd"  input-class="input-date"  style="color:#222;" v-validate="'after:date-init'" name="date-end" class="  form-control mx-auto"  placeholder="DD/MM/YYYY" format="dd/MM/yyyy"></datepicker>    
                                
                            </div>
                            <div class="filter-button">
                                <button style="color:#fff" @click="listar" class="btn btn-default btn-small ml-3 ">{{$t('lang.button_filter')}}</button>
                            </div>
                        </div>
                    </div> </center> 
                </div>
            </div>
          
            <graph-line :graphData="graphData"/> <br>
          
            <graph-stacked/>   
    </div>     
</template>


<script>
import Toolbar from '../../components/toolbar/toolbar.vue';
import GraphLine from '../../components/graphics/graph-line'
import GraphBar from '../../components/graphics/graph-bar'
import GraphStacked from '../../components/graphics/graph-bar-stacked'
import ToolbarFactory from '../../components/toolbar/toolbar-config-factory';
import Multiselect from 'vue-multiselect';
import AgencyService from '../../services/agency'; 
import FileService from '../../services/file';
import { mapGetters } from 'vuex';
import * as _ from 'lodash';


export default {
    
    data(){
        return {
            
            loading:undefined,
            configToolbar: ToolbarFactory.build('TOOLBAR-BACK') ,    
            request:{
                company:undefined,  
                timeStart:undefined,
                timeEnd:undefined,
            },
            options:[],  
            agencys:[],
            graphData:{
                dataValidacao:[],
                dataUpload:[],
                dataErro:[]
            }
        }
    },

    mounted(){     


        this.loading =  AgencyService.list({page:0,size:1000}).then(response=>{            

              let temp = undefined;               
              if(!this.getIsMaster){
                  temp = response.content.filter(a=> this.getAgencysFromUser.some(e=> e.value == a.id));                    
              }else{
                  temp = response.content;
              }  

              this.agencys = temp;
              this.options = temp;              
              
       }).catch(erro=>{
           this.mxShowModalError(erro);
       });    
        
    },
    computed:{
         ...mapGetters(['getUser','getAgencysFromUser','getIsMaster']),
         company:{
            set:function(newValue){                
                this.request.company = newValue.id;
            },
            get:function(){
                return  this.agencys.find(a=>a.id == this.request.company);
            }
        },
        timeInit:{
            get:function(){
                if(!this.request.timeStart){
                    return '';
                }else{
                    return new Date(this.request.timeStart);
                }
            },
            set:function(data){
                if(!data)return;
                data.setHours(0,0,1);                
                this.request.timeStart = data.getTime();
            }
        },
        timeEnd:{
            get:function(){
                if(!this.request.timeEnd){
                    return '';
                }else{
                   return new Date(this.request.timeEnd);
                }
            },
            set:function(data){ 
                if(!data)return;               
                data.setHours(23,59,59);                
                this.request.timeEnd = data.getTime();
            }
        },
    },
    methods:{
        clearData(campo,data){            
            this.request.timeStart = undefined;          
        },
        clearDataEnd(campo,data){            
            this.request.timeEnd = undefined;          
        },
        listar(){

              if(!this.request.company){
                  this.mxShowModal({title:'Informação', message:'Selecione a agência!'});
                  return;
              } 

              if(!this.request.timeStart || this.request.timeStart == ''){
                  this.mxShowModal({title:'Informação', message:'Selecione uma data inicial!'});
                  return;
              } 

              if(!this.request.timeEnd || this.request.timeEnd == ''){
                  this.mxShowModal({title:'Informação', message:'Selecione uma data fim!'});
                  return;
              } 

              if(this.request.timeEnd < this.request.timeStart){
                  this.mxShowModal({title:'Informação', message:'Data fim tem que ser maior que a data inicial!'});
                  return;
              }          


            return FileService.listStatusProcess(this.request).then(response=>{   
                response = response.length > 0 ? response : [];            
                this.mountData(response);
            });            
        },
        mountData(response){
            
                let dataValidacao = response.filter(e=> e.status =='VALIDATION_SUCCESS').map(m=>{
                       return {
                           t:m.time,
                           y:m.qtd
                       }
                   }); 

                   let dataUpload = response.filter(e=> e.status =='COLLECTOR_UPLOADED').map(m=>{
                       return {
                           t:m.time,
                           y:m.qtd
                       }
                   }); 
                
                   let dataErro = response.filter(e=> e.status =='VALIDATION_ERROR' || e.status =='COLLECTOR_ERROR').map(m=>{
                       return {
                           t:m.time,
                           y:m.qtd
                       }
                   }); 
                    
                   dataValidacao.sort((a,b)=>{return a.time > b.time ? 1 : -1} );
                   dataUpload.sort((a,b)=>{return a.time > b.time ? 1 : -1} );                   
                   dataErro.sort((a,b)=>{return a.time > b.time ? 1 : -1} ); 

                   this.graphData = {dataValidacao,dataUpload,dataErro};
        }
    },
    components:{
        Toolbar,
        GraphLine,
        GraphBar,
        GraphStacked,
        Multiselect,
    }    
   
}
</script>

<style lang="scss" scoped>
.filtros{
    display: flex;
  justify-content: center;
    margin-top:30px;
    // flex-flow: row wrap;
}

.filter-select{
  
    display: flex;
    justify-content: center;
   margin-right: 10px;
}

    .filter-date{
    display: flex;
  //background: #ff0;
    min-width: 370px;
    .date-init{
        display: flex;
          max-width: 200px;
           margin-right: 10px;
            max-width: 170px;
        min-width: 160px;
    }
    .date-end{
        display: flex;
       max-width: 170px;
        min-width: 160px;
    }
}

@media (max-width: 1150px) { 

.filtros{
  //  background: #ff0;
    display: flex;
 
    margin-top:30px;
    flex-direction: column;
    
}

.filter-select{
  
    display: flex;
    justify-content: center;
   margin-right: 10px;
   margin-bottom: 10px;
    flex-direction: column;
   margin-bottom: 20px;
   

}

.filter-date{
    display: flex;
    justify-content: center;
    min-width: 310px;
    margin-bottom: 10px;
    .date-init{
         flex-direction: column;
        display: flex;
          max-width: 200px;
           margin-right: 10px;
           margin-left: 10px;
            min-width: 160px;
    }
    .date-end{
        flex-direction: column;
        display: flex;
       max-width: 200px;
        min-width: 160px;
    }
}

.filter-button{
   display: flex;
   
  padding: 25px 0 15px 0;
}

 }

 @media (max-width: 850px) { 

    
  


 }


</style>

