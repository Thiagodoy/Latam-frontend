<template>
    <div v-async="loading"> 
            <toolbar  
                :config="configToolbar" 
               >
            </toolbar> 

            <div class="row mt-3 mb-5">
                <div style="" class="col-md-12 text-center">
                   <center>
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
                   </center> 
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
</style>

