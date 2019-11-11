<template>
    <div v-async="loading" class="all-user-home">
        <div v-if="show == 'home'" >
            <!-- Conponente Toolbar -->

             <div class="row" >
                <div class="col-md-12">
                    <div class="wrapper-filtros">
                        <div class="  form-group mr-3">
                          <label >Mês</label> 
                            <multiselect
                            v-model="periodo"
                            :options="periodos"
                            :label="'period'"                                
                            :track-by="'id'"
                            tag-placeholder="Add this as new tag"                                
                            :selectLabel="''"
                            :selectedLabel="''"
                            :deselectLabel="''"
                            :placeholder="'Selecione o Mês'" 
                            :limit="2"
                            :limit-text="(count)=>`Mais ${count}`"
                            :max-width="150" 
                            :showNoResults="false"                                                                                                                           
                            :multiple="false">                      
                            </multiselect>
                        </div>
                      <!--
                        <div class="  form-group">
                          <label >Agência</label> 
                            <multiselect
                            v-model="agencia"
                            :options="agencias"
                            :label="'name'"                                
                            :track-by="'id'"
                            tag-placeholder="Add this as new tag"                                
                            :selectLabel="''"
                            :selectedLabel="''"
                            :deselectLabel="''"
                            :placeholder="'Selecione a Agência'" 
                            :limit="2"
                            :limit-text="(count)=>`Mais ${count}`"
                            :max-width="150" 
                            :showNoResults="false"                                                                                                                           
                            :multiple="false">                      
                            </multiselect>
                        </div> -->
                        <div class="form-group mt-4 ml-3">
                            <button  @click="buscar"  style="color:#fff" class="btn btn-default btn-large mr-3" >Buscar</button>
                          <!--   <button  @click="listarTodos"  style="color:#fff" class="btn btn-default btn-large" >Todos</button> -->

                        </div>

                    </div>
                </div>
            </div>
          
           
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
                    <input :checked="item.approved == 'S'"  :disabled="item.approved == 'S'" @click="aprovarScore(item)" id="check-score" name="i" type="checkbox" />
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
import ServicePeriodo from '../../../services/periodos'
import ServiceAgency from '../../../services/agency'
import Multiselect from 'vue-multiselect';
import {mapGetters} from 'vuex'
//import Checked from './aprovar-check';

export default {
    data(){
        return{
            show:'home',
           
            
            loading:undefined,
            dataObject:undefined,
            periodo:undefined,
            periodos:[],
            agencias:[],
           
                conteudo:[
                    ],
            
             filterScore:{
                    agencys:this.agencias,
                    calendar:undefined,
                    approved:undefined,
                    reviewed:"S",
                    page:0,
                    size:10,
                 }           
        }
    },

     computed:{
      ...mapGetters(['getUser','getAgencysFromUser','getIsMaster']),

    },

    mounted() {
         this.loading =  ServiceAgency.list({page:0,size:1000}).then(response=>{            
              let temp = undefined;               
              if(!this.getIsMaster){
                  temp = response.content.filter(a=> this.getAgencysFromUser.some(e=> e.value == a.id));
              }else{
                  temp = response.content;
              }  

              this.agencias = temp;
              this.filterScore.agencys = temp.map(g=>g.id);
              //this.getScore();
        }).catch(erro=>{
            this.mxShowModalError(erro);
        });
       
        this.getPeriodos();
    },

    methods:{

          buscar(){
              this.filterScore.calendar = this.periodo.id
              console.log("Request",this.filterScore)
          this.getScore();
        },

        getScore(){
            this.loading = ServiceScore.listar(this.filterScore).then(response=>{
                console.log("response score",response);
                this.conteudo = response.content;
            }).catch(erro=>{

            })
        },

        getPeriodos(){
            this.loading =    ServicePeriodo.listar({page:0,size:1000}).then(response=>{
               // console.log(response);
                this.periodos = response.content;
            }).catch(e=>{
                console.log(e);
            })
        },

         aprovarScore(object){
         this.mxShowModal({ type:"YES-NO",title:'Informação', message:' Aprovar Score ?'}).then(response=>{
          if(response == 'YES'){
             console.log("yes")
                     let requestRevisado = {
                        "adjustedResult": object.adjustedResult,
                        "adjustedUserId": object.adjustedUserId,
                        "approved": "S",
                        "approvedUserId": this.getUser.id,
                        "comments": object.comments,
                        "id": object.id,
                        "result": object.result,
                        "reviewed": object.reviewed,
                    }

                    console.log("sssssssssss",requestRevisado);

          
                this.loading = ServiceScore.update(requestRevisado).then(()=>{
                this.mxShowModal({ type:"OK",title:'Informação', message:' Aprovação finalizada com sucesso'})
                        this.mode = "edit";
                        this.inputTableDisabled = true;
                        this.getScore();
                   
              
              
           }).catch(e=>{
               alert("erro: ",e)
           })
         
         
         
         
         
         
         
         
         
         
         
         
         
         }else{
           document.getElementById('check-score').checked=false;
          }
          
         
      }).catch(()=>{
         
      }) 
    }

        

    },
   


    components:{
      Multiselect,
      
      
       
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

.wrapper-filtros{
    display: flex;
    justify-content: center;
    margin-top: 20px;
    min-width: 550px;
}


</style>

