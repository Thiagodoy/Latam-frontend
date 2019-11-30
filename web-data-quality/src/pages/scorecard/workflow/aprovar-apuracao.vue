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
                      
                        <div class="  form-group mr-3">
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
                        </div> 
                       <!--  <div class="  form-group">
                            <label  >Status</label> 
                            <select v-model="filterScore.approved" class="form-control select-campo mr-3">
                                <option :value='undefined'>Todos</option>
                                <option value ="N">Pendentes</option>
                                <option value="S">Finalizados</option>

                            </select>
                        </div> -->
                        <div class="form-group mt-4 ml-3">
                            <button  @click="buscar"  style="color:#fff" class="btn btn-default btn-large mr-3" >Buscar</button>
                          <!--  <button  @click="listarTodos"  style="color:#fff" class="btn btn-default btn-large" >Todos</button> -->

                        </div>
                        

                    </div>
                </div>
            </div>

             <div class="row-page-top">
                <div class=""  >
                    <div>
                        <label style="font-size:12px;">{{$t('lang.table_pagination_row_page_title')}}</label>
                    </div>
                    <div>
                        <select class="select-filtro form-control" v-model="rowPerPage" @change="setRowPage" >
                            <option :value="10" class="select-filtro">10</option>
                            <option :value="20" class="select-filtro">20</option>
                            <option :value="30" class="select-filtro">30</option>
                            <option :value="40" class="select-filtro">40</option>
                        </select>
                    </div>                       
                </div>
                <div class="export-box">
                    <button @click="download" class="bt-export"><i class="far fa-arrow-alt-circle-down"></i> Exportar</button>
                </div>
            
                   
                 
            </div>
            <a id ="downLink"></a>
          
           
              <table class="table table-striped table-dark fluid">
            <thead>
                <tr>
                  
                   
                   

                     <th class="l-agencia"><b>Agência</b></th>
                    <th class="l-cluster"><b>Cluster</b></th>
                    <th class="l-bda"><b>BDA</b></th>
                    <th class="l-im"><b>IM</b></th>
                    <th class="l-scorecard"><b>Scorecard</b></th>
                    <th class="l-coment"><b>Comentário/Justificativa</b></th>
                    <th class="l-scAjust"><b>Sc Ajustado</b></th>
                    <th class="l-ajustby"><b>Ajustado por</b></th>
                     <th class="l-performance">Comentario A.Performance</th>
                    <th class="l-options"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,i) in conteudo" :key="i">
                <td class="l-agencia">{{item.agency.name}}</td>
                <td class="l-cluster">{{item.agency.category}}</td>
                <td class="l-bda">{{item.bda}}</td>
                <td class="l-im">{{item.scoreIm}}</td>
                <td class="l-scorecard">{{item.scorecard}}</td>
                <td class="l-coment">{{item.comments}}</td>
                <td class="l-scAjust">{{item.adjustedResult}}</td>
                <td class="l-ajustby">{{item.adjustedUserId}}</td>
                 <td class="l-performance">
                      <textarea style="width:100%"  :id="'textArea'+i" disabled class="input-table" type="text" v-model="item.commentsAnalyst"   ></textarea>
                 </td>
              
                
                
                
                
                
                <td class="text-center l-options" width="120">
                   <div  style=" padding-left:12px;" >
                        <input class="" :checked="item.approved == 'S'"  :disabled="item.approved == 'S'" @click="aprovarScore(item,i)" :id="'check'+i" name="i" type="checkbox" />
                   </div>
                    
                     <div style=""  class="text-center" @click="btEdit(item,i)" v-if="item.approved == 'N' || item.approved == null ">
                        <i style="cursor:pointer;font-size:25px" class="fas fa-pen-square"></i>
                    </div>
                    <div><i v-if="item.approved == 'N' || item.approved == null " @click="save(item,i)" style="cursor:pointer;font-size:25px" class="far fa-save" ></i></div> 
               
               
               
                </td>
                </tr>
            </tbody>
            </table>
             <center><pagination class="pagination" ref="pagination" :info-page="pagination" @page="setPage"></pagination></center>













          
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
import Pagination from '../../../components/pagination/pagination.vue';
import JsonToCsv from '../../../utils/json2csv'
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
            agencia:undefined,
            rowPerPage :10,
            pagination:undefined,
            comentAnalista:undefined,

            request:undefined,
           
                conteudo:[
                    ],
            
             filterScore:{
                    agencys:[],
                    calendar:undefined,
                    approved:undefined,
                    reviewed:"S",
                    page:0,
                    size:10,
                    sort:"approved"
                 },
                 
                 colunas:[
                    { name: "agency.name", title: "Agência"},
                    { name: "agency.category", title: "Cluster"},
                    { name: "bda", title: "BDA"},
                    { name: "scoreIm", title: "IM"},
                    { name: "scorecard", title: "Scorecard"},
                    { name: "comments", title: "Comentario/Justificativa"},
                    { name: "adjustedResult", title: "Scorecard ajustado"},
                    { name: "adjustedUserId", title: "Ajustado por"},
                    { name: "commentsAnalyst", title: "Comentario A. Performance"},
                 ]
        }
    },

     computed:{
      ...mapGetters(['getUser','getAgencysFromUser','getIsMaster']),

    },

    mounted() {
        
        this.agency();
        this.getPeriodos();
    },

    methods:{

         btEdit(object,index){
            console.log(object);
            console.log(index)
            document.getElementById('textArea'+index).disabled = false
          
        },

        
        save(object,index){
         
            let requestAjust = {
                "adjustedResult": object.adjustedResult,
                "adjustedUserId": object.adjustedUserId,
                "approved": object.approved,
                "approvedUserId": object.approvedUserId,
                "comments": object.comments,
                "id": object.id,
                "result": object.result,
                "reviewed": object.reviewed,
                "commentsAnalyst":object.comentAnalista,
            }

           
          
           ServiceScore.update(requestAjust).then(()=>{
                this.mxShowModal({ type:"OK",title:'Informação', message:' Ajuste realizado com sucesso'})
                        this.mode = "edit";
                        this.inputTableDisabled = true;
                       document.getElementById('textArea'+index).disabled = true
                      
                        this.getScore();
                        
                   
              
              
           }).catch(e=>{
               alert("erro: ",e)
           })
                    
               

        },


          listarTodos(){
             this.filterScore.agencys = this.agencias;
                 this.filterScore.calendar=undefined;
                   this.filterScore.reviewed = "S";
                   console.log(this.filterScore)
                   
                  this.agency();
            
        },

        buscar(){

            if(!this.periodo){alert("Selecione o Mês")}else{
                this.filterScore.calendar = this.periodo.id
                 if(!this.agencia ){
                    this.filterScore.agencys = this.agencias.map(g=>g.id);
                     }else{
                        this.filterScore.agencys = []
                        this.filterScore.agencys.push( this.agencia.id)
                    }
                console.log("request",this.filterScore);
                this.getScore();
            }
          
        },

        getScore(){
            this.loading = ServiceScore.listar(this.filterScore).then(response=>{
                
                this.conteudo = response.content;
                this.pagination = response;
            }).catch(erro=>{

            })
        },

        getPeriodos(){
            this.loading =    ServicePeriodo.listar({pagination:false,page:0,size:1000}).then(response=>{               
                this.periodos = response;                 
            }).catch(e=>{
                console.log(e);
            })
        },

         aprovarScore(object,i){
         this.mxShowModal({ type:"YES-NO",title:'Informação', message:' Aprovar Score ?'}).then(response=>{
          if(response == 'YES'){
             
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

                    

          
                this.loading = ServiceScore.update(requestRevisado).then(()=>{
                this.mxShowModal({ type:"OK",title:'Informação', message:' Aprovação finalizada com sucesso'})
                        this.mode = "edit";
                        this.inputTableDisabled = true;
                        this.getScore();

                        if(object.approved == 'S'){
                            document.getElementById("check"+i).checked =true;
                        }
                         if(object.approved == 'N'){
                            document.getElementById("check"+i).checked =false;
                        }
                   
              
              
           }).catch(e=>{
               alert("erro: ",e)
           })
         
         
         
         
         
         
         
         
         
         
         
         
         
         }else{
           document.getElementById('check-score').checked=false;
          }
          
         
      }).catch(()=>{
         
      }) 
    },


      agency(){
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

        },

    exportar(){
        alert("exportar");
    },

    
    setRowPage(){
        console.log(this.rowPerPage);
        this.filterScore.size = this.rowPerPage;
        console.log(this.filterScore);
    },


     setPage(page){            
            let temp = {...this.filterScore};
            temp.page = page;
            this.filterScore = temp;            
            this.getScore();
        },


         download() {
      if (this.conteudo.length > 0) {
        //Ao gerar o arquivo tem listar todos os registro que é da consulta
        
         // this.filterScore.page = 0,
          this.filterScore.size =1000,
         

         this.loading = ServiceScore.listar(this.filterScore).then(
          response => {
            let config = {};
            config.columns = this.colunas;
            config.fileName = "relatorio.csv";
            config.data = response.content;
            JsonToCsv.downloadtoCsv(config);
            
          }
        );
      } else {
        Modal.show({
          title: "Informação",
          message: "Nenhum registro encontrado."
        });
      }
    }

        

    },
   


    components:{
      Multiselect,
      Pagination,
      
      
       
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

.row-page-top{
    display: flex;
    justify-content: space-between;
}
.pagination-box{
    background: #ffed69;
   
}

.pagination{
  margin-top: 30px;
}

.select-filtro option{
    color:#222;
}

.bt-export{
    margin-top: 35px;
    padding: 5px;
  background-color: rgba(30, 200, 100, .5);
    border:none;
    border-radius: 5px;
    color: #eee;
    &:hover{
        cursor: pointer;
        background-color: rgba(30, 200, 100, 1);
    }
    &:focus{
         box-shadow: 0 0 0 0;
        border: 0 none;
        outline: 0;

    }
}

.select-campo{
      background: rgba(0, 0, 0, .4);
      height: 36px;
      border-radius: 0px;
      color:#ddd;

      &:focus{
        box-shadow: 0 0 0 0;
        border: 0 none;
        outline: 0;
       

    }
}

.select-campo option{
    color:#222;
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


table {
    width: 100%;
    min-width: 1020px;
}

thead, tbody, tr, td, th { display: block; }

tr:after {
    content: ' ';
    display: block;
    visibility: hidden;
    clear: both;
}

thead th {
    height: 70px;
   

    /*text-align: left;*/
}

tbody {
    max-height: calc(100vh - 210px);
    overflow-y: auto;
}


tbody td, thead th {
  //  width: 11.1%;
    float: left;
}

//largura campos

.l-agencia{width: 10%}
.l-cluster{width: 5%}
.l-bda{width: 5%}
.l-im{width: 5%}
.l-scorecard{width: 8%}
.l-coment{width: 18%}
.l-scAjust{width: 8%}
.l-ajustby{width: 15%}
.l-performance{width: 15%}
.l-options{width: 11%}


</style>

