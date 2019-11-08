<template>
    <div v-async="loading" class="all-user-home">
        <div v-if="show == 'home'" >
            <!-- Conponente Toolbar -->
          
           
              <table class="table table-striped table-dark fluid">
            <thead>
                <tr>
                    <td><b>Agência</b></td>
                    <td><b>Cluster</b></td>
                    <td><b>BDA</b></td>
                    <td><b>IM</b></td>
                    <td><b>Scorecard</b></td>
                    <td><b>Comentário/Justificativa</b></td>
                    <td><b>Sc Ajustado</b></td>
                    <td><b>Ajustado por</b></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,i) in conteudo" :key="i">
                <td>{{item.agency.name}}</td>
                <td>{{item.agency.category}}</td>
                <td>{{item.bda}}</td>
                <td>{{item.scoreIm}}</td>
                <td>{{item.scorecard}}</td>
                <td>
                    <textarea :disabled="inputTableDisabled" class="input-table" type="text"   v-model="item.comments" ></textarea>
                 
                </td>
                <td>
                    <select :disabled="inputTableDisabled" class="input-table" v-model="item.adjustedResult" >
                        <option value="MINIMO">Minimo</option>
                        <option value="MAXIMO" >Máximo</option>
                        <option value="0">0</option>
                    </select>
                </td>
                <td>{{item.adjustedUserId}}</td>

                




                    <td class="text-center" width="120">
                    <div @click="btEdit" v-if="mode == 'edit'"><i style="cursor:pointer;font-size:25px" class="fas fa-pen-square"></i></div>
                   
                    <div v-if="mode == 'save-cancel'">
                        <div><i @click="save(item)" style="cursor:pointer;font-size:25px" class="far fa-save"></i></div> 
                        
                        <div><i @click="cancel" style="cursor:pointer;font-size:25px" class="far fa-window-close "></i></div>


                    </div>
                 
                 
                
                   
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
            inputTableDisabled:true,
            mode:"edit",
            scoreResult:undefined,
           

           
            
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
                 } ,
                  
        }
    },


    mounted() {
        this.getScore();
    },

    methods:{


        btEdit(){
            this.inputTableDisabled = false;
            this.mode='save-cancel'
        },

        cancel(){
            this.inputTableDisabled = true;
             this.mode='edit'
        },

        save(object){
            console.log("OBJETO",object)
            let requestSave = {
                'adjustedResult': object.adjustedResult,
                'adjustedUserId': "", //colocar id usuario
                'approved': object.approved, 
                'approvedUserId': object.approvedUserId,
                'comments': object.comments,
                'id': object.id,
                'result': object.result,
                'reviewed': object.reviewed,   
            }

            console.log("REQUEST",requestSave);
            ServiceScore.update(requestSave);
                    
               

        },

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


.input-table{
    background: rgba(0, 0, 0, 0);
    border:#a9a9a9 1px solid;
    color:#a9a9a9;
    padding:5px;
}

.input-table:disabled{
    background: rgba(207, 221, 6, 0) !important;
    border:none;
   color:#a9a9a9;
}

</style>

