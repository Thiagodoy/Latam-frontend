<template>
  <div>
   
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
            <input id="check-im" @click="salvarIm" :disabled="entrega.delivered == 'S'" :checked="entrega.delivered == 'S'" name="i" style="cursor:pointer" type="checkbox" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ServiceIm from '../../../services/im'
import Modal from '../../../components/modal/message-dialog.vue';
export default {
  data() {
    return {
      entregas: [],
      loading:undefined,
      filterIm:{
        agency:25,
        page:0,
        size:10,
        calendar:9
      }
    
    };
  },


  mounted() {
    this.getIM();
    
  },


  methods:{
    getIM(){

      this.loading = ServiceIm.listar(this.filterIm).then(response =>{
        console.log("response",response);
        this.entregas = response;

      })
    },

    salvarIm(){
      this.mxShowModal({ type:"YES-NO",title:'Informação', message:' Aprovar IM ?'}).then(response=>{
          if(response == 'YES'){
             alert("Aprovado")
          }else{
           document.getElementById('check-im').checked=false;
          }
          
         
      }).catch(()=>{
         
      }) 
    }
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
</style>

