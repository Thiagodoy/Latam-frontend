<template>
    <div v-async="loading" >
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
                    <data-table :data="data" @download="download" :config="configDataTable"></data-table>
                    <input type="file"  id="file-upload" style="display:none;" multiple>

                </div>
                <div class="tab-pane fade" :class="{'show':(show =='upload'), 'active':(show =='upload')}"  role="tabpanel" aria-labelledby="nav-profile-tab"><br>
                  
                     <div class="wrapper-table">  
                        <table class="table tabela table-striped table-dark">
                            <thead>
                                <tr>                                
                                    <th scope="col" style="width:30%">File name</th>
                                    <th scope="col">status</th>                                
                                </tr>
                            </thead>
                            <tbody> 
                              <file-upload-progress v-for="(v,i) in filesUploads"  :key="i" :fileInput="v" :index="i" @finished="hideProgress"></file-upload-progress>
                            </tbody>
                            </table>
                     </div>
                 
                </div>
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

export default {
    data(){
        return {
            show:'upload',
            loading:undefined,
            configToolbar: ToolbarFactory.build('TOOLBAR-FILE-VISUALIZATION') , 
            configDataTable: DataTableFactory.build('DATA-TABLE-FILE-VISUALIZATION'),
            data:{
                conteudo:[
                    // {company:'Gol',name:'file_22012019.csv', date: '10/10/2019', status:'NEW'},
                    // {company:'Latam',name:'file_22012019.csv', date: '10/09/2019', status:'UPLOADED'},
                    // {company:'Emirates',name:'file_22012019.csv', date: '21/10/2019',status:'PROCESSING'},
                    // {company:'Tam',name:'file_22012019.csv', date: '10/02/2019', status:'ERROR'},                 
                    
                ],
                pagination:{pageable:{}},
            },
            filesUploads:[],
            removeFileUploads:[]
        }
    },
    mounted(){
        this.listFiles();
    },
    methods:{
        download(data){
             this.downloadStatementUrl = `/file/errors/${data.id}/2`;
       
        var aTag = window.document.getElementById('mobi');
        aTag.setAttribute('href', this.downloadStatementUrl);
        aTag.setAttribute('download', 'erros.txt');
       // aTag.style.display = "none";
       // aTag.innerHTML = "";
       // mydiv.appendChild(aTag);
        aTag.click();
        },
        listFiles(){
            FileService.listFile({page:0,size:10}).then((response)=>{
               this.data.conteudo = response.content;
                this.data.pagination = response
            }).catch((erro)=>{
                console.log("erro");
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
                let formData =  new FormData();
                for(let i = 0; i < e.target.files.length; i++){                   
                    this.filesUploads.push(e.target.files[i]);
                }
                inputFile.value = "";
            };
            inputFile.click();   
        },
    },
    watch:{
        show(newValue,oldValue){
            
        }
    },
    components:{
        Toolbar,
        DataTable,
        FileUploadProgress
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


.tabela{

      background-color: rgba(0,0,0,0.5);
    
}





</style>


