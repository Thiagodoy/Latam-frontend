<template>
    <div v-async="loading" >


            <div v-if="showOp== 'list'">
                    <!-- List File -->
                    <!-- Toolbar  -->
                    <toolbar :config="configToolbar" @upload="openUpload"></toolbar>
                        <br>
                    
                    <nav mt-5>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link active" id="nav-profile-tab" @click="show='upload'" data-toggle="tab"  role="tab" aria-controls="nav-profile" aria-selected="false">Upload</a>
                            <a class="nav-item nav-link " id="nav-home-tab" @click="show='file'" data-toggle="tab"  role="tab" aria-controls="nav-home" aria-selected="true">Status</a>
                        
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade" :class="{'show':(show !='upload'), 'active':(show !='upload')}"  role="tabpanel" aria-labelledby="nav-home-tab">
                                    <!-- DataTable -->
                            <data-table 
                                :data="data" 
                                @download="download" 
                                @info="showDetail"
                                :config="configDataTable">
                            </data-table>
                            <input type="file"  id="file-upload" style="display:none;" multiple>

                        </div>
                        <div class="tab-pane fade" :class="{'show':(show =='upload'), 'active':(show =='upload')}"  role="tabpanel" aria-labelledby="nav-profile-tab"><br>
                        
                            <div class="wrapper-table">  
                                <table class="table tabela table-striped table-dark">
                                    <thead>
                                        <tr>                                
                                            <th scope="col" style="width:30%">{{$t('lang.file')}}</th>
                                            <th scope="col">status</th>                                
                                        </tr>
                                    </thead>
                                    <tbody> 
                                    <file-upload-progress v-for="(v,i) in filesUploads" :processFile="true" :uploadAws="true" :uploadFtp="false"  :key="i" :fileInput="v" :index="i" @finished="hideProgress"></file-upload-progress>
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
import {mapActions, mapGetters} from 'vuex';

export default {
    data(){
        return {
            show:'upload',
            loading:undefined,
            configToolbar: ToolbarFactory.build('TOOLBAR-FILE-VISUALIZATION') , 
            configDataTable: DataTableFactory.build('DATA-TABLE-FILE-VISUALIZATION'),
            data:{
                conteudo:[],
                pagination:{pageable:{}},
            },
            filesUploads:[],
            removeFileUploads:[],
            showOp:'list',
            fileCurrent:undefined
        }
    },
    mounted(){
        this.listFiles();
    },
    computed:{
        ...mapGetters(['getAgencysFromUser'])
    },
    methods:{
        showDetail(data){
            this.showOp = 'detail';
            this.fileCurrent = data;
        },
        delete(data){
            FileService.deleteFile({id:data.id}).then((response)=>{
                this.listFiles();
            });
        },
        download(data){
            this.downloadStatementUrl = `${process.env.VUE_APP_BASE_PATH}/file/errors/${data.id}/2`;       
            var aTag = window.document.getElementById('mobi');
            aTag.setAttribute('href', this.downloadStatementUrl);
            aTag.setAttribute('download', 'erros.txt');      
            aTag.click();
        },
        listFiles(){
            FileService.listFile({page:0,size:10}).then((response)=>{
               this.data.conteudo = response.content;
                this.data.pagination = response
            }).catch((erro)=>{
                this.mxShowModalError(erro);
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
                    this.mxShowModal({title:'Informação', message:'Qual agência os arquivos serão carregados?', type:'AGENCIA', agencys: this.getAgencysFromUser }).then((response)=>{
                        this.processFile(e);
                    });
                }else{
                    this.processFile(e);
                }
            };
            inputFile.click();   
        },
        processFile(e){                           
            for(let i = 0; i < e.target.files.length; i++){                   
                this.filesUploads.push(e.target.files[i]);
            }
            inputFile.value = "";
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
        FileDetailStatus
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







</style>


