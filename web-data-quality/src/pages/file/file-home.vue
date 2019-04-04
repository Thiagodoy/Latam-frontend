<template>
    <div v-async="loading" >
            <!-- Toolbar  -->
            <toolbar :config="configToolbar" @upload="openUpload"></toolbar>
                <br>
              
            <nav mt-5>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Upload</a>
                    <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Progress</a>
                   
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

                    <!-- DataTable -->
            <data-table :data="data" :config="configDataTable"></data-table>
            <input type="file"  id="file-upload" style="display:none;" multiple>

                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"><br>
                  
                     <div class="wrapper-table">  
                        <table class="table tabela table-striped table-dark">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Primeiro</th>
                                <th scope="col">Último</th>
                                <th scope="col">Nickname</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                                <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                                </tr>
                            </tbody>
                            </table>
                     </div>
                 
                </div>
            </div>
           
           
           
           
           
           
           
           
           
           
           
            
    </div>
     
</template>
<script>
import Toolbar from '../../components/toolbar/toolbar.vue';
import ToolbarFactory from '../../components/toolbar/toolbar-config-factory';
import DataTable from '../../components/data-table/data-table.vue';
import DataTableFactory from '../../components/data-table/data-config-factory';
import FileService from '../../services/file';
export default {
    data(){
        return {
             loading:undefined,
         configToolbar: ToolbarFactory.build('TOOLBAR-FILE-VISUALIZATION') , 
         configDataTable: DataTableFactory.build('DATA-TABLE-FILE-VISUALIZATION'),
         data:{
             conteudo:[
                 {company:'Gol',name:'file_22012019.csv', date: '10/10/2019', status:'NEW'},
                 {company:'Latam',name:'file_22012019.csv', date: '10/09/2019', status:'UPLOADED'},
                 {company:'Emirates',name:'file_22012019.csv', date: '21/10/2019',status:'PROCESSING'},
                 {company:'Tam',name:'file_22012019.csv', date: '10/02/2019', status:'ERROR'},                 
                
             ],
             pagination:{pageable:{}}
         }
        }
    },
    methods:{
         openUpload(){          
            let inputFile = document.getElementById('file-upload');
            inputFile.onchange = (e)=>{
                console.log('files',e.target.files);

                let formData =  new FormData();

                formData.append('file',e.target.files[0]);

                FileService.uploadFile(formData).then(()=>{alert('FINALIZOU')});

            };

            inputFile.click();   
        },

    },
    components:{
        Toolbar,
        DataTable
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


