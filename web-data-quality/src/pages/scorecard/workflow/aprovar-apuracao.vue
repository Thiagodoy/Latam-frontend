<template>
    <div v-async="loading" class="all-user-home">
        <div v-if="show == 'home'" >
            <!-- Conponente Toolbar -->
          
           
              <table class="table table-striped table-dark fluid">
            <thead>
                <tr>
                    <td>Agência</td>
                    <td>Cluster</td>
                    <td>Nota BDA</td>
                    <td>Nota IM</td>
                    <td>Scorecard</td>
                    <td>Comentário/Justificativa</td>
                    <td>Sc Ajustado</td>
                    <td>Ajustado por</td>
                    <td>Aprovar</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,i) in conteudo" :key="i">
                <td>{{item.agency}}</td>
                <td>{{item.cluster}}</td>
                <td>{{item.bda}}</td>
                <td>{{item.im}}</td>
                <td>{{item.scorecard}}</td>
                <td>{{item.comentario}}</td>
                <td>{{item.ajust}}</td>
                <td>{{item.ajustBy}}</td>
              
                
                
                
                
                
                <td class="text-center" width="120">
                    <input  name="i" type="checkbox" />
                </td>
                </tr>
            </tbody>
            </table>













          
        </div>
         <!--Componentes Options --> 
         
         <checked v-else-if="show=='view'" :dataObject="dataObject" @back="show = 'home'"></checked>
    </div> 
</template>
<script>
import DataTable from '../../../components/data-table/data-table.vue';
import DataTableConfigFactory from '../../../components/data-table/data-config-factory';
import _ from 'lodash';
import Modal from '../../../components/modal/message-dialog.vue';
//import Checked from './aprovar-check';

export default {
    data(){
        return{
            show:'home',
           
            configTable: DataTableConfigFactory.build('DATA-TABLE-APROVAR'),
            loading:undefined,
            dataObject:undefined,
           
                conteudo:[
                    {agency:"Agência 1",cluster:"RM1",bda:"0",im:"30",scorecard:"Não recebe SC",comentario:"Agência ficou sem energia 5 Dias",ajust:"Recebe RM1",ajustBy:""},
                        {agency:"Agência 2",cluster:"RM2",bda:"40",im:"30",scorecard:"Não recebe SC",comentario:"Não Recebe SC",ajust:"Não recebe SC",ajustBy:""},
                         {agency:"Agência 3",cluster:"RM3",bda:"60",im:"0",scorecard:"Recebe RM2",comentario:"",ajust:"Recebe RM2",ajustBy:""},

                    ],
            
             filter:{page:0,size:10}           
        }
    },

    methods:{

         view(data){
            this.show = 'view';
            this.dataObject = data;
            console.log("click")
        },    

        setPage(page){            
            let temp = {...this.filter};
            temp.page = page;
            this.filter = temp;            
        },
        setRowPage(rowPage){            
             let temp = {...this.filter};
            temp.size = rowPage;
            this.filter = temp;
        },
        setFilter(filter){ 
            this.filter = _.merge({...filter},{
                page:0,
                size:10
            });            
        },

    },
   


    components:{
      
        DataTable, 
      
       
    }



}







</script>
<style <style lang="scss" scoped>

input[type="checkbox"] {
  /* Double-sized Checkboxes */
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  padding: 10px;
  margin-right: 10px;
  background: #ffed69;
}

table {
  background-color: rgba(0, 0, 0, 0.4);

  color: #a9a9a9;
  margin: 15px auto;
  &.table-striped tbody tr:nth-of-type(odd) {
  }

  & tbody tr:hover,
  & tbody tr.active {
    color: #ffed69;
    -webkit-box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.3);
    &:nth-of-type(even) {
    }
  }
}


</style>

