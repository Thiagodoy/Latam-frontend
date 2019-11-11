<template>
  <div v-async="loading">

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
                        </div>
                        <div class="form-group mt-4 ml-3">
                            <button  @click="filtrar"  style="color:#fff" class="btn btn-default btn-large" >Buscar</button>

                        </div>

                    </div>
                </div>
            </div>




   
    <table class="table table-striped table-dark fluid">
      <thead>
        <tr>
          <td>Agência</td>
        
          <td>Entrega IM</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entrega,i) in entregas" :key="i">
          <td>{{entrega.agency.name}}</td>
          <td class="text-center" width="120">
            <input :id="'chek'+i" @click="salvarIm(entrega,i)" :disabled="entrega.delivered == 'S'" :checked="entrega.delivered == 'S'" :name="i" style="cursor:pointer" type="checkbox" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ServiceIm from '../../../services/im'
import Modal from '../../../components/modal/message-dialog.vue';
import ServicePeriodo from '../../../services/periodos'
import ServiceAgency from '../../../services/agency'
import Multiselect from 'vue-multiselect';
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      entregas: [],
      loading:undefined,
      periodo:undefined,
      periodos:[],
      agencia:undefined,
      agencias:[],

      filterIm:{
        agency:25,
        page:0,
        size:10,
        calendar:9
      },

      company:[]
    
    };
  },

   computed:{
      ...mapGetters(['getUser','getAgencysFromUser','getIsMaster']),

    },


  mounted() {
    this.getIM();
    this.getPeriodos();
    this.getAgency();
  // this.agency();
    
  },


  methods:{

    filtrar(){

    },

    getIM(){

      this.loading = ServiceIm.listar(this.filterIm).then(response =>{
        console.log("response",response);
        this.entregas = response;

      })
    },

    salvarIm(object,i){
      this.mxShowModal({ type:"YES-NO",title:'Informação', message:' Aprovar IM ?'}).then(response=>{
          if(response == 'YES'){
            let requestIm = {
              "delivered": "S",
              "id": object.id,
              "user": this.getUser.id
            }
            this.loading = ServiceIm.update(requestIm).then(()=>{
              this.mxShowModal({ type:"OK",title:'Informação', message:' IM Aprovado'})
                       document.getElementById('chek'+i).disabled=true;
                       // this.getIM();
                       console.log('chek'+i);
            })
          }else{
           document.getElementById('check-im').checked=false;
          }
          
         
      }).catch(()=>{
         
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

        getAgency(){
             this.loading = ServiceAgency.list({page:0,size:1000}).then(response=>{ 
              //
                this.agencias = response.content;
            }).catch(e=>{
                console.log(e);
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
            
       }).catch(erro=>{
           this.mxShowModalError(erro);
       });

        }
















  },

   

  components:{
    Multiselect,
  }


};
</script>


<style lang="scss" scoped>
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

.icon-pass-view {
  position: relative;
  top: -30px;
  left: 10px;

  &:hover {
    cursor: pointer;
  }
}

.wrapper {
  background-color: rgba(0, 0, 0, 0.3);
  margin: 0px;
  color: #ddd;

  padding: 40px;
}

.topo {
  background-color: rgba(0, 0, 0, 0.3);
  margin: 0px;
  color: #ddd;
  padding: 15px;
  margin-bottom: 20px;
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
}
select{
     background-color: rgba(0,0,0,0.5);
}
option{
    color: #666;
}


</style>

