<template>
    <div v-async="loading"> 
            <toolbar  
                :config="configToolbar" 
               >
            </toolbar> 

            <div class="row mt-3 mb-5">
                <div style="" class="col-md-12 text-center">
            <center><div class="filtros">
                        <div class="filter-select">
                            <div>{{$t('lang.table_view_file_company_name')}}:&nbsp;</div> 
                            <multiselect
                                v-model="company"
                                :options="options"
                                :label="'name'"                                
                                :track-by="'id'"
                                tag-placeholder="Add this as new tag"                                
                                :selectLabel="'Pressione para selecionar'"
                                :selectedLabel="'Selecionado'"
                                :deselectLabel="'Pressione para Deselecionar'"
                                :placeholder="'Selecione a agencia'" 
                                :limit="2"
                                :limit-text="(count)=>`Mais ${count}`"
                                :max-width="150"                                                              
                                :multiple="false">                        
                            </multiselect>
                        </div>
                        <div class="filter-date">
                            <div class="date-init">
                                <div class="filterlabel">{{$t('lang.label_input_search_date_From')}}&nbsp;</div>   
                                <datepicker :clear-button="true" :clear-button-icon="'fas fa-backspace'"  input-class="input-date"    name="date-init" style="color:#222;" class="form-control mx-auto ml-2"  placeholder="DD/MM/YYY" format="dd/MM/yyyy"></datepicker>  
                            </div>
                            <div class="date-end">
                                <div>{{$t('lang.label_input_search_date_To')}}&nbsp;</div>
                                <datepicker :clear-button="true" :clear-button-icon="'fas fa-backspace'"  input-class="input-date"  style="color:#222;" v-validate="'after:date-init'" name="date-end" class="  form-control mx-auto"  placeholder="DD/MM/YYYY" format="dd/MM/yyyy"></datepicker>    
                            </div>
                            <div class="filter-button">
                                <button style="color:#fff" class="btn btn-default btn-small ml-3 ">{{$t('lang.button_filter')}}</button>
                            </div>
                        </div>
                    </div> </center> 
                </div>
            </div>
          
            <graph-line :graphData="graphData"/>     
    </div>     
</template>


<script>
import Toolbar from '../../components/toolbar/toolbar.vue';
import GraphLine from '../../components/graphics/graph-line'
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
        }
    },
    methods:{
        listar(){


            if(!this.request.company){
                this.graphData = {
                            dataValidacao:[],
                            dataUpload:[],
                            dataErro:[]
                        }
              return;                          
            }

            this.loading = FileService.listStatusProcess(this.request).then(response=>{                           
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
        Multiselect,
    },
    watch:{
        request:{
            handler:function(newValue){
                this.listar();
            },
            deep:true
        }
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
.filter-select{
  
   //  margin-bottom: 0px;
}
    
  


 }


</style>

