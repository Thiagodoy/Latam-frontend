<template>
    <div v-async="loading" class="all-user-home">
        <div v-if="show == 'home'" >
            <!-- Conponente Toolbar -->
          
           
              <table class="table table-striped table-dark fluid">
            <thead>
                <tr>
                    <td>Agência</td>
                    <td>Cluster</td>
                    <td>BDA</td>
                    <td>IM</td>
                    <td>Scorecard</td>
                    <td>Comentário/Justificativa</td>
                    <td>Sc Ajustado</td>
                    <td>Ajustado por</td>
                    <td>Aprovar</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,i) in conteudo" :key="i">
                <td>{{item.agency.name}}</td>
                <td>{{item.agency.category}}</td>
                <td>{{item.bda}}</td>
                <td>{{item.scoreIm}}</td>
                <td>{{item.scorecard}}</td>
                <td>{{item.comments}}</td>
                <td>{{item.adjustedResult}}</td>
                <td>{{item.adjustedUserId}}</td>
              
                
                
                
                
                
                <td class="text-center" width="120">
                    <input @click="aprovarScore" id="check-score" name="i" type="checkbox" />
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
import ServiceScore from '../../../services/scorecard'
import _ from 'lodash';
import Modal from '../../../components/modal/message-dialog.vue';
//import Checked from './aprovar-check';

export default {
    data(){
        return{
            show:'home',
           
            
            loading:undefined,
            dataObject:undefined,
           
                conteudo:[
                    ],
            
             filterScore:{
                    agencys:[25],
                    calendar:9,
                    approved:undefined,
                    reviewed:undefined,
                    page:0,
                    size:10,
                 }           
        }
    },


    mounted() {
        this.getScore();
    },

    methods:{

        getScore(){
            this.loading = ServiceScore.listar(this.filterScore).then(response=>{
                console.log("response score",response);
                this.conteudo = response.content;
            }).catch(erro=>{

            })
        },

         aprovarScore(){
         this.mxShowModal({ type:"YES-NO",title:'Informação', message:' Aprovar Score ?'}).then(response=>{
          if(response == 'YES'){
             alert("Aprovado")
          }else{
           document.getElementById('check-score').checked=false;
          }
          
         
      }).catch(()=>{
         
      }) 
    }

        

    },
   


    components:{
      
      
      
       
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

