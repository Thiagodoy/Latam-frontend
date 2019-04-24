<template>
    <div v-async="loading" >


            <div v-if="showOp== 'list'">
                    <!-- List File -->
                    <!-- Toolbar  -->
                    <toolbar 
                    :config="configToolbar" 
                    @upload="openUpload"
                    ></toolbar>
                    
                        <br>
                    
                    <nav mt-5>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link active" id="nav-profile-tab" @click="show='upload'" data-toggle="tab"  role="tab" aria-controls="nav-profile" aria-selected="false">Upload</a>
                            <a class="nav-item nav-link " id="nav-home-tab" @click="show='file'" data-toggle="tab"  role="tab" aria-controls="nav-home" aria-selected="true">Relatório</a>
                        
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade" :class="{'show':(show !='upload'), 'active':(show !='upload')}"  role="tabpanel" aria-labelledby="nav-home-tab">
                                    <!-- DataTable -->

                                   
                      
  <table style="width:100%; padding:30px;background-color: rgba(10,23,55,0.0); height:50px;" class="">
     
  <tr style="width:10%;">
    <td class="text-right"> Agência &nbsp;</td>
    <th>
         <input  class="input-search form-control " type="text" placeholder="Agência"/>
    </th>
     <td class="text-right">De &nbsp;</td>
    <td>
    <input style="color:#ccc"   class="form-control mx-auto ml-2" type="date"/>
    </td>  
    <td class="text-right">Até &nbsp;</td>
    <td>
    <input style="color:#ccc;"  class="form-control mx-auto" type="date"/>
    </td> 
    <td class="text-right"></td>
    <td>
       <button  style="color:#fff"  class="btn btn-default btn-small ml-3 ">Filtrar</button> 
    
    </td>
    
  </tr>
  <tr>
   
   
  </tr>
  <tr>
    
   
  </tr>
</table> <br> 


<table id="table-mock" class="table table-striped table-dark  tabela">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Company</th>
      <th scope="col">File</th>
      <th scope="col">Created date</th>
      <th scope="col">Status</th>
      <th scope="col">Dowload</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Company 1</td>
      <td>latam_movimento_aereo_FBT_20190301_20190321.csv</td>
      <td>03/05/2019 13:31</td>
      <td><div src="..." alt="..." class="rounded-circle text-primary" style="height:25px;width:25px; background-color:green;"/></td>
      <td><i class="fas fa-download"></i></td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Company 2</td>
      <td>latam_movimento_aereo_FBT_20190301_20190321.csv</td>
      <td>08/05/2019 11:49</td>
      <td><div src="..." alt="..." class="rounded-circle text-primary" style="height:25px;width:25px; background-color:green;"/></td>
      <td><i class="fas fa-download"></i></td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Company 3</td>
      <td>latam_movimento_aereo_FBT_20190301_20190321.csv</td>
      <td>23/05/2019 17:15</td>
      <td><div src="..." alt="..." class="rounded-circle text-primary" style="height:25px;width:25px; background-color:green;"/></td>
      <td><i class="fas fa-download"></i></td>
    </tr>

  </tbody>
</table>
                                  
                                  
                                  
                                  
                                  
                                  
                                  
                                   
                                   
                                   
                                   

                                   
                           
                          
                          
                          
                         <!--
                            <data-table 
                                :data="data" 
                                @download="download" 
                                @info="showDetail"
                                :config="configDataTable">
                            </data-table>
                          
                          -->
                          
                          
                          
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

export default {
    data(){
        return {
            show:'upload',
            loading:undefined,
            configToolbar: ToolbarFactory.build('TOOLBAR-FILE-VISUALIZATION') , 
            configDataTable: DataTableFactory.build('DATA-TABLE-RELATORIO-VISUALIZATION'),
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
            removeFileUploads:[],
            showOp:'list',
            fileCurrent:undefined
        }
    },
    mounted(){
        this.listFiles();
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


