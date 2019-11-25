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
                    <!--    <div class="  form-group">
                            <label  >Status</label> 
                            <select v-model="filterScore.reviewed" class="form-control select-campo mr-3">
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
            
                   
                 
            </div>

            

          
           
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
                <td class="l-coment" >
                    <textarea style="width:100%"  :id="'textArea'+i" disabled class="input-table" type="text"   v-model="item.comments" ></textarea>
                 
                </td>
                <td class="l-scAjust">
                    <select :id="'select'+i" disabled class="input-table" v-model="item.adjustedResult" >
                        <option value="MINIMO">Minimo</option>
                        <option value="MAXIMO" >Máximo</option>
                        <option value="0">0</option>
                    </select>
                </td>
                <td class="l-ajustby">{{item.adjustedUserId}}</td>
                <td style="" class="text-center l-options" width="120">
                    <div  style=" padding-left:10px;" class="test-center">
                         <input v-if="mode == 'edit'" id="check-revisado" @click="salvarRevisado(item)" :disabled="item.reviewed == 'S'" :checked="item.reviewed == 'S'" :name="i" style="cursor:pointer" type="checkbox" />
                    </div>
                    <div style=""  class="text-center" @click="btEdit(item,i)" v-if="item.reviewed == 'N' || item.reviewed == null ">
                        <i style="cursor:pointer;font-size:25px" class="fas fa-pen-square"></i>
                    </div>
                
                   
                        <div><i v-if="item.reviewed == 'N' || item.reviewed == null " @click="save(item,i)" style="cursor:pointer;font-size:25px" class="far fa-save" ></i></div> 
                   <!-- <div><i v-if="item.reviewed == 'N' || item.reviewed == null " @click="cancel(item,i)" style="cursor:pointer;font-size:25px" class="far fa-window-close "></i></div> -->
                    

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
//import Checked from './aprovar-check';

export default {
    data(){
        return{
            show:'home',
            inputTableDisabled:true,
            mode:"edit",
            scoreResult:undefined,
            periodo:undefined,
            periodos:[],
            agencia:undefined,
            agencias:[],
           

           
            
            loading:undefined,
            dataObject:undefined,
           
                conteudo:[],
                pagination:undefined,
            
            
            rowPerPage:10,
            filterScore:{
                    agencys:[], 
                    calendar:undefined,
                    approved:undefined,
                    reviewed:undefined,
                    page:0,
                    size:10,
                    sort:'reviewed'
                 } ,

                 
                  
        }
    },

     computed:{
      ...mapGetters(['getUser','getAgencysFromUser','getIsMaster']),

    },


    mounted() {

      
       
        this.getPeriodos();
        this.agency();
         
       
    },

    methods:{

        btEdit(object,index){
            console.log(object);
            console.log(index)
            document.getElementById('textArea'+index).disabled = false
            document.getElementById('select'+index).disabled = false

        },


        
        cancel(object,index){
            document.getElementById('textArea'+index).disabled = true
            document.getElementById('select'+index).disabled = true
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

        listarTodos(){
             this.filterScore.agencys = this.agencias;
                 this.filterScore.calendar=undefined;
                   this.filterScore.reviewed = undefined;
                   console.log(this.filterScore)
                   
                  this.agency();
            
        },

        salvarRevisado(object){
            this.mxShowModal({ type:"YES-NO",title:'Informação', message:' Marcar como revisado ?'}).then(response=>{
                if(response == 'YES'){
                     console.log("yes")
                     let requestRevisado = {
                        "adjustedResult": object.adjustedResult,
                        "adjustedUserId": this.getUser.id,
                        "approved": object.approved,
                        "approvedUserId": object.approvedUserId,
                        "comments": object.comments,
                        "id": object.id,
                        "result": object.result,
                        "reviewed": "S",
                    }

                    console.log("sssssssssss",requestRevisado);

          
                this.loading = ServiceScore.update(requestRevisado).then(()=>{
                this.mxShowModal({ type:"OK",title:'Informação', message:' Revisão finalizada com sucesso'})
                        this.mode = "edit";
                        this.inputTableDisabled = true;
                        this.getScore();
                   
              
              
           }).catch(e=>{
               alert("erro: ",e)
           })
                }
                
                
                else{
                document.getElementById('check-revisado').checked=false;
                }
                
                
            }).catch(()=>{
                
            }) 
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
            }

           
          
           ServiceScore.update(requestAjust).then(()=>{
                this.mxShowModal({ type:"OK",title:'Informação', message:' Ajuste realizado com sucesso'})
                        this.mode = "edit";
                        this.inputTableDisabled = true;
                       document.getElementById('textArea'+index).disabled = true
                       document.getElementById('select'+index).disabled = true
                        this.getScore();
                        console.log("INDEX AQUI ->",index)
                   
              
              
           }).catch(e=>{
               alert("erro: ",e)
           })
                    
               

        },

        getScore(){
          
            this.loading = ServiceScore.listar(this.filterScore).then(response=>{
                console.log("response score",response);
                this.conteudo = response.content;
                this.pagination = response;
            }).catch(erro=>{

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
             // this.filterScore.agencys = temp.map(g=>g.id);
             // this.getScore();
       }).catch(erro=>{
           this.mxShowModalError(erro);
       });

        },

         getPeriodos(){
            this.loading =    ServicePeriodo.listar({pagination:false,page:0,size:1000}).then(response=>{
               // console.log(response);
                this.periodos = response;
               this.periodos.push({id:9,period :'Set/19'});
            }).catch(e=>{
                console.log(e);
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

/////////

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
    height: 60px;

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

.l-agencia{width: 15%}
.l-cluster{width: 7%}
.l-bda{width: 7%}
.l-im{width: 7%}
.l-scorecard{width: 11.5%}
.l-coment{width: 20%}
.l-scAjust{width: 11.5%}
.l-ajustby{width: 14%}
.l-options{width: 7%}



</style>

