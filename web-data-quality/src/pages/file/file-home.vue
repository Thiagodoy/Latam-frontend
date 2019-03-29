<template>
    <div>
            <!-- Toolbar  -->
            <toolbar :config="configToolbar" @upload="openUpload"></toolbar>
            <!-- DataTable -->
            <data-table :data="data" :config="configDataTable"></data-table>
            <input type="file"  id="file-upload" style="display:none;" multiple>
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
         configToolbar: ToolbarFactory.build('TOOLBAR-FILE-VISUALIZATION') , 
         configDataTable: DataTableFactory.build('DATA-TABLE-FILE-VISUALIZATION'),
         data:{
             conteudo:[
                 {company:'Gol',name:'file_22012019.csv', date: '10/10/2019', status:'NEW'},
                 {company:'Latam',name:'file_22012019.csv', date: '10/09/2019', status:'UPLOADED'},
                 {company:'Emirates',name:'file_22012019.csv', date: '21/10/2019',status:'PROCESSING'},
                 {company:'Tam',name:'file_22012019.csv', date: '10/02/2019', status:'ERROR'},                 
                
             ],
             pagination:undefined
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

</style>


