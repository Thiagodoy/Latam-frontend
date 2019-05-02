<template>
<div v-async="loading">

    <div v-if="showOp== 'list'">

        <toolbar :config="configToolbar" @upload="openUpload">
        </toolbar>

        <br>

        <nav mt-5>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a v-if="$can('upload', 'File')"  class="nav-item nav-link active" id="nav-profile-tab" @click="show='upload'" data-toggle="tab" role="tab" aria-controls="nav-profile" aria-selected="false">Upload</a>
                <a  v-if="$can('report', 'File')" class="nav-item nav-link " id="nav-home-tab" @click="show='file'" data-toggle="tab" role="tab" aria-controls="nav-home" aria-selected="true">{{$t('lang.aba_report')}}</a>
            </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade" :class="{'show':(show !='upload'), 'active':(show !='upload')}" role="tabpanel" aria-labelledby="nav-home-tab">
                <table style="width:100%; padding:30px;background-color: rgba(10,23,55,0.0); height:50px;" class="">
                    <tr style="width:10%;">
                        <td class="text-right">{{$t('lang.table_view_file_company_name')}} &nbsp;</td>
                        <th >
                          <!--  <input  v-model="company" class="input-search form-control " type="text" :placeholder="$t('lang.table_view_file_company_name')" /> -->
                            <multiselect
                               v-model="selected"
                                :options="options">
                             </multiselect>
                        </th>
                        <td class="text-right">{{$t('lang.label_input_search_date_From')}}&nbsp;</td>
                        <td style="max-width:145px;">
                            <input  v-model="timeStart" style="color:#ccc;" class="form-control mx-auto ml-2" type="date" />
                        </td>
                        <td class="text-right">{{$t('lang.label_input_search_date_To')}} &nbsp;</td>
                        <td style="max-width:145px;">
                            <input v-model="timeEnd" style="color:#ccc;" class="form-control mx-auto" type="date" />
                        </td>
                        <td class="text-right"></td>
                        <td>
                            <button  @click="filtrar" style="color:#fff" class="btn btn-default btn-small ml-3 ">{{$t('lang.button_filter')}}</button>
                        </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                    </tr>
                </table>
                <br>
                <table id="table-mock" class="table table-striped table-dark  tabela">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">{{$t('lang.table_view_file_company_name')}}</th>
                            <th scope="col">{{$t('lang.file')}}</th>
                            <th scope="col">{{$t('lang.table_created_date')}}</th>
                            <th scope="col">Status</th>
                            <th scope="col">Dowload</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(v,i) in data.conteudo" :key="i">
                            <th scope="row">{{i + 1}}</th>
                            <td>{{getNameAgency(v.company)}}</td>
                            <td>{{v.name}}</td>
                            <td>{{v.createdDate|dateTime}}</td>
                            <td>
                                <div src="..." alt="..." class="rounded-circle text-primary" style="height:25px;width:25px; background-color:green;" />
                            </td>
                            <td @click="download(v.name)"><i class="fas fa-download"></i></td>
                        </tr>                       
                    </tbody>
                </table>
                <input type="file" id="file-upload" style="display:none;" accept=".xls,.csv" multiple>
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
                            <file-upload-progress v-for="(v,i) in filesUploads" :processFile="false" :uploadAws="true" :uploadFtp="false" :key="i" :fileInput="v" :index="i" @finished="hideProgress"></file-upload-progress>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <!-- Detail file -->
        <file-detail-status @back="showOp = 'list'" :file="fileCurrent"></file-detail-status>
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


export default {
    
    data(){
        return {
            show:'upload',
            loading:undefined,
            configToolbar: ToolbarFactory.build('TOOLBAR-FILE-VISUALIZATION') , 
            configDataTable: DataTableFactory.build('DATA-TABLE-RELATORIO-VISUALIZATION'),
            data:{
                conteudo:[                          
                    
                ],
                pagination:{pageable:{}},
            },
            filesUploads:[],
            removeFileUploads:[],
            showOp:'list',
            fileCurrent:undefined,
            agencys:[],

            filter:{},

            company:[],
            timeStart:undefined,
            timeEnd:undefined,

            selected: null,
            options: [],
            idAgencyFilter:undefined,
            listAgencia:undefined,

            
    


           

           
   
        }
    },
    mounted(){
       this.loading =  AgencyService.list({page:0,size:1000}).then(response=>{            
            this.agencys = response.content;
              this.options = response.content.map((g)=> g.name);
            
            this.listFiles();
          
        }).catch(erro=>{
            this.showError(erro);
        })


         this.loading =  AgencyService.list({page:0,size:1000}).then(response=>{            
           
          
            
            console.log("TESTE",this.teste);
          
          
        }).catch(erro=>{
            this.showError(erro);
        })




       


       
    },
     computed:{
    ...mapGetters(['getUser','getAgencysFromUser'])
    },
    methods:{

       


       


        listAgency(){
             AgencyService.getAgency(this.filter).then((response)=>{                           
                this.data.conteudo = response.content;
                this.data.pagination = response
            }).catch(erro=>{
               this.mxShowModalError(erro);
            }); 

        },


       filtrar(){

           if(this.selected == null){

               alert("Selecione uma agência");

           }else{

            let ageciaSelecionada = this.agencys.filter((g)=> g.name == this.selected);
            let id = ageciaSelecionada.map((g)=> g.id);
 
          

            id=parseInt(id);

            let request = { status:'UPLOADED', page:0,size:10,company:id,timeStart:"" , timeEnd:"" };

            FileService.listFile(request).then((response)=>{
               this.data.conteudo = response.content;
                this.data.pagination = response
            }).catch((erro)=>{
               this.showError(erro);
            });

           }
      },



        getNameAgency(id){

            if(this.agencys.length == 0){
                return ""
            }

            return this.agencys.find(e=>e.id == id).name;

        },
        showDetail(data){
            this.showOp = 'detail';
            this.fileCurrent = data;
        },
        delete(data){
            FileService.deleteFile({id:data.id}).then((response)=>{
                this.listFiles();
            }).catch(erro=>{
               this.showError(erro);
            });
        },
        download(data){
            let agency = this.getUser.info.find(e=>e.key == 'agencia').value;
            this.downloadStatementUrl = `${process.env.VUE_APP_BASE_PATH}/file/download?fileName=${data}&company=${agency}`;       
            var aTag = window.document.getElementById('mobi');
            aTag.setAttribute('href', this.downloadStatementUrl);
            aTag.setAttribute('download', 'erros.txt');      
            aTag.click();
        },
        listFiles(){
           
            let agency = this.getUser.info.find(e=>e.key == 'agencia').value; 

            let request = { status:'UPLOADED', page:0,size:10};

            request.company = [1,2,4];
            

            this.loading = FileService.listFile(request).then((response)=>{
               this.data.conteudo = response.content;
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
            for(let i = 0; i < e.target.files.length; i++){                   
                this.filesUploads.push({file:e.target.files[i],agency:agencia});
            }
            document.getElementById('file-upload').value = "";
        },
        getAgencys(data){
            let a = new Array();
            data.forEach(e=>{
                a.push(this.agencys.find(a=> a.id == e.value));                
            });

            return a;
        },
        showError(erro){
          this.mxShowModalError(erro);
        }
    },
    watch:{
        show(newValue,oldValue){
            if(this.show == 'file'){
                this.listFiles();
            }
        }
    },
    components:{
        Toolbar,
        DataTable,
        FileUploadProgress,
        FileDetailStatus,
        Multiselect
      
    }
}
</script>
<style lang="scss" scoped>

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





</style>


