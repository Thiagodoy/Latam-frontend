<template>
<div v-async="loading">

    <div v-if="showOp== 'list'">




        <toolbar v-if="$can('upload', 'File')" 
            :config="configToolbar" 
            @upload="openUpload">
        </toolbar>

       <div   @mouseover="help=true" @mouseleave="help=false" class="help"><i class="far fa-question-circle"></i></div>

       <div v-if="help" class="box-help">
           Para gravar um arquivo, selecione a opção Upload no menu.
            Na próxima página, clique em Upload na parte superior
             da tela e escolha o arquivo em uma pasta local.
            Pronto, visualize a gravação do arquivo na tela.
             Uma mensagem de carregamento com sucesso
              será exibida na tela


       </div>

        <br>

        <nav mt-5>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a v-if="$can('upload', 'File')"  class="nav-item nav-link" :class="{'active': show == 'upload'}" id="nav-profile-tab" @click="show='upload'" data-toggle="tab" role="tab" aria-controls="nav-profile" aria-selected="false">Upload</a>
                <a  v-if="$can('report', 'File')" class="nav-item nav-link " :class="{'active': show == 'file'}" id="nav-home-tab" @click="show='file'" data-toggle="tab" role="tab" aria-controls="nav-home" aria-selected="true">{{$t('lang.aba_report')}}</a>
            </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade" :class="{'show':(show !='upload'), 'active':(show !='upload')}" role="tabpanel" aria-labelledby="nav-home-tab">
                   
                  
               <center>   <div class="filtros">
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
                                        :multiple="true"> 
                                                                
                                    </multiselect>
                       </div>
                       <div class="filter-date">
                           <div class="date-init">
                            <div class="filterlabel">{{$t('lang.label_input_search_date_From')}}&nbsp;</div>   
                           <datepicker :clear-button="true" @cleared="clearData"  :clear-button-icon="'fas fa-backspace'"  input-class="input-date"  v-model="timeInit"  name="date-init" style="color:#222;" class="form-control mx-auto ml-2"  placeholder="DD/MM/YYY" format="dd/MM/yyyy"></datepicker>  
                           </div>
                            <div class="date-end">
                             <div>{{$t('lang.label_input_search_date_To')}}&nbsp;</div>
                             <datepicker :clear-button="true" @cleared="clearDataEnd" :clear-button-icon="'fas fa-backspace'"  input-class="input-date" v-model="timeEnd" style="color:#222;" v-validate="'after:date-init'" name="date-end" class="  form-control mx-auto"  placeholder="DD/MM/YYYY" format="dd/MM/yyyy"></datepicker>    
                            </div>
                             <div class="filter-button">
                            <button  @click="listFiles"   style="color:#fff" class="btn btn-default btn-small ml-3 ">{{$t('lang.button_filter')}}</button>
                       </div>
                       </div>
                     
                   </div></center>              
                   

                <br>
                 <div class="row">
                     
                    <div class="col text-right" style="max-height: 22px;">
                        
                        <div style="display: inline-block;min-width: 115px; min-width: 115px;height: 30px;">
                            <div src="..." alt="..." class="rounded-circle text-primary" style="height:25px;width:25px; background-color:green;" /> 
                            <span class="margin-left" style="position: relative; top: -24px;">Sucesso</span>
                        </div>
                        <div style="display: inline-block;min-width: 115px; min-width: 148px;height: 30px;">
                            <div src="..." alt="..." class="rounded-circle text-primary" style="height:25px;width:25px; background-color:blue;" />  
                            <span class="margin-left" style="position: relative; top: -24px;">Processando</span>
                        </div>
                       <div style="display: inline-block;min-width: 115px; min-width: 90px;height: 30px;">
                        <div src="..." alt="..." class="rounded-circle text-primary" style="height:25px;width:25px; background-color:red;" />
                        <span class="margin-left" style="position: relative; top: -24px;">Erro</span>                        
                       </div>
                        
                    </div>     
                </div>

                <data-table 
                    :config="configDataTable" 
                    :data="data"
                    @page="setPage"
                    @download="download"
                    @info="showDetail">
                </data-table>   

                     
              
                <input type="file" id="file-upload" style="display:none;" accept=".csv" multiple>

            </div>
            <div class="tab-pane fade" :class="{'show':(show =='upload'), 'active':(show =='upload')}" role="tabpanel" aria-labelledby="nav-profile-tab">
                <br>
                <div class="wrapper-table">
                    <table class="table tabela table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col" style="width:30%">{{$t('lang.file')}}</th>
                                <th scope="col">status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <file-upload-progress 
                                v-for="(v,i) in filesUploads" 
                                :processFile="true" 
                                :uploadAws="false" 
                                :uploadFtp="false" 
                                :key="i" 
                                :fileInput="v" 
                                :index="i" 
                                @finished="hideProgress">
                            </file-upload-progress>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <!-- Detail file -->
        <!-- <file-detail-status @back="showOp = 'list'" :file="fileCurrent"></file-detail-status> -->
        <details-validar @back="showOp = 'list'" :filecurrent="fileCurrent"></details-validar>
    </div>

</div>     
</template>


<script>
import Toolbar from '../../components/toolbar/toolbar.vue';
import FileUploadProgress from '../../components/file-upload-progress/file-upload-progress.vue'
import ToolbarFactory from '../../components/toolbar/toolbar-config-factory';
import DataTable from '../../components/data-table/data-table.vue';
import DataTableFactory from '../../components/data-table/data-config-factory';
import FileService from '../../services/file';
import FileDetailStatus from './file-status-detail.vue';
import AgencyService from '../../services/agency'; 
import { mapGetters } from 'vuex';
import Multiselect from 'vue-multiselect';
import * as _ from 'lodash';
import Constantes from '../../utils/constantes';
import DetailsValidar from './file-status-datail-validar';
import MockFactory from '../../utils/mock-factory'


export default {
    
    data(){
        return {
            show:'upload',
            loading:undefined,
            configToolbar: ToolbarFactory.build('TOOLBAR-FILE-VISUALIZATION') , 
            configDataTable: DataTableFactory.build('DATA-TABLE-VALIDATION-UPLOAD-VISUALIZATION'),
            data:{
                conteudo:[],
                pagination:{pageable:{}},
            },
            filesUploads:[],
            removeFileUploads:[],
            showOp:'list',
            fileCurrent:undefined,
            agencys:[],
            options: [],
            idAgencyFilter:undefined,
            listAgencia:undefined,
            request:{
                page:0,
                size:10,
                company:[],
                timeStart:undefined,
                timeEnd:undefined, 
                status:['VALIDATION_UPLOADED','VALIDATION_PROCESSING','VALIDATION_PARSE','VALIDATION_ERROR','VALIDATION_SUCCESS']               
            },
            help:false,            
   
        }
    },
    mounted(){


       this.loading =  AgencyService.list({page:0,size:1000}).then(response=>{            

              let temp = undefined;               
              if(!this.getIsMaster){
                  temp = response.content.filter(a=> this.getAgencysFromUser.some(e=> e.value == a.id));
                  this.request.company = temp.map(e=>e.id)  
              }else{
                  temp = response.content;
              }  

              this.agencys = temp;
              this.options = temp;              
              //this.company = temp;  

              this.listFiles();
       }).catch(erro=>{
           this.mxShowModalError(erro);
       });
       
    },
     computed:{
        ...mapGetters(['getUser','getAgencysFromUser','getIsMaster']),
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
        company:{
            set:function(newValue){                
                this.request.company = newValue.map(e=>e.id);
            },
            get:function(){
                let data = new Array();                
                this.request.company.forEach(e=>{
                    data.push(this.agencys.find(a=>a.id == e));
                });
                return data;
            }
        }

    },

    methods:{    
        
        clearData(campo,data){            
            this.request.timeStart = undefined;          
        },
        clearDataEnd(campo,data){            
            this.request.timeEnd = undefined;          
        },
        setPage(page){            
            this.request.page = page;
            this.listFiles();
        },
        getNameAgency(id){            
            return this.agencys.find(e=>e.id == id).name;
        },
        showDetail(data){
            this.showOp = 'detail';
            this.fileCurrent = data;
        },
        delete(data){
            FileService.deleteFile({id:data.id}).then(()=>{
                this.listFiles();
            }).catch(erro=>{
               this.showError(erro);
            });
        },
        download(data){            
            this.downloadStatementUrl = `${process.env.VUE_APP_BASE_PATH}/file//errors/${data.id}/1`;       
            var aTag = window.document.getElementById('mobi');
            aTag.setAttribute('href', this.downloadStatementUrl);
            aTag.setAttribute('download', 'erros.txt');      
            aTag.click();
        },
        listFiles(){          
            this.loading = FileService.listFile(this.request).then((response)=>{
                
                this.data.conteudo = response.content.map(f=>{
                    
                    f.companyName = this.getNameAgency(f.company);
                    f.status = MockFactory.build('MAKE_IMAGE_STATUS',f.status);
                    return f;
                });

                this.data.pagination = response
            }).catch((erro)=>{
               this.showError(erro);
            });
        },
        hideProgress(index){
            this.reveFile(index);
        },
        reveFile:_.debounce(function(){             
                this.filesUploads.splice(arguments[0],1);
           
        }, 1000),
        openUpload(){   
            this.show='upload';       
            let inputFile = document.getElementById('file-upload');
            inputFile.onchange = (e)=>{                
               if(this.getAgencysFromUser.length > 1){
                    this.mxShowModal({title:'Informação', message:'Qual agência os arquivos serão carregados?', type:'AGENCIA', agencys: this.getAgencys(this.getAgencysFromUser) }).then((response)=>{                        
                        this.processFile(e, response);
                    });
                }else{
                    this.processFile(e,this.getAgencysFromUser[0].value);
                }
            };
            inputFile.click();   
        },
        processFile(e, agencia){ 
            
            let someFileBigSize = this.checkFileSize(e.target.files);
            
            let result = this.invalidExtensionFile(e.target.files);
            debugger;
            if(result){
                 setTimeout(()=>{
                   
                   this.mxShowModal({title:'Erro', message:'Permitido apenas arquivos com extensão <b>.csv</b>.'});
                    document.getElementById('file-upload').value = "";                
                }, 500);
                 
                 return;
            }

            if(someFileBigSize){
                setTimeout(()=>{
                    let hasFiles = e.target.files.length > 1;
                    this.mxShowModal({title:'Erro', message:`${hasFiles ? 'Existem':''} ${hasFiles ? 'arquivos':'Arquivo'} com tamanho superior a  <span style="color:red"><b>${Constantes.FILE_SIZE_UPLOAD/1000000} MB</span></b>.`})
                    document.getElementById('file-upload').value = "";                
                }, 500);

                return;
            }
            
            for(let i = 0; i < e.target.files.length; i++){ 
                this.filesUploads.push({file:e.target.files[i],agency:agencia});
            }
            
            document.getElementById('file-upload').value = "";
        },
        checkFileSize(fileList){            
             for(let i = 0; i < fileList.length; i++){   
               if(fileList[i].size > Constantes.FILE_SIZE_UPLOAD){
                   return true
               }
            }
            return false;
        },
        invalidExtensionFile(fileList){

            let result = false;
            for(let i = 0; i < fileList.length; i++){   
               
               if(!(/(\w)*\.csv/.test(fileList[i].name))){
                   result = true;
               }
            }
            return result;
        },
        getAgencys(data){
            let a = new Array();
            data.forEach(e=>{
                a.push(this.agencys.find(a=> a.id == e.value));                
            });
            
            return a.filter(ee=> ee.layoutFile > 0);
        },
        showError(erro){
          this.mxShowModalError(erro);
        }
    },
    watch:{
        show(){
            if(this.show == 'file'){
                this.listFiles();
            }
            if(this.show == 'upload'){
                this.request.timeStart = undefined;
                this.request.timeEnd = undefined;                
            }
        }
       
    },
    components:{
        Toolbar,
        DataTable,
        FileUploadProgress,
        FileDetailStatus,
        DetailsValidar,
        Multiselect
      
    }
}
</script>

<style lang="scss" scoped>

.margin-left{
    margin-left: 7px;
    margin-right: 15px;
}

.nav-item:active{
    background: #ff0;

   
}

.nav-item{

 color:white;
  

}

.nav-item:hover{
    cursor: pointer;
    color: #222;
}

.nav-item > a:hover{
    color: #222;
}


.tabela{

      background-color: rgba(0,0,0,0.5);
    
}


table{
      background-color: rgba(0, 0, 0, .4);
   
    color: #a9a9a9;
    margin: 15px auto;
    &.table-striped tbody tr:nth-of-type(odd) {
  
    }
  
    & tbody tr:hover,
    & tbody tr.active {
         color:#ffed69;
      -webkit-box-shadow:                     0 0 30px 0 rgba(0, 0, 0, 0.3);
      -moz-box-shadow:                        0 0 30px 0 rgba(0, 0, 0, 0.3);
      box-shadow:                             0 0 30px 0 rgba(0, 0, 0, 0.3);
      &:nth-of-type(even) {
      
      }

    }
}
    ul li{
        display: flex;
        align-items: center;
        padding: 10px;
        height: 40px;
        border-bottom: 1px solid #fff;


}

.multselect{
    background: #ff0;
}

.scroll{
    overflow: auto
}

::-webkit-scrollbar {
    width: 6px;
    height: 0px;
}
::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    cursor: pointer
}


.help{
    position:relative;
    right:40px;
    top: 10px;
    float: right;
    font-size:30px;
    cursor:pointer;
    &:hover{
        color: #ffed69;
    }
}

.box-help{
    top:130px;
    width: 250px;
  padding: 20px;
     background-color: rgba(255,255,255,1);
    position: absolute;
    right: 100px;
    border-radius: 10px;
    color:#111;
    z-index: 300;
}


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

