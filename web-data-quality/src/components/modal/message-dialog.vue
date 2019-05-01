<template>
  <div>
    <button type="button" style="display:none" id="btn-open-modal" class="btn btn-primary" data-toggle="modal" data-target="#message-dialog">
      Abrir modal de demonstração
    </button>
    <div class="modal fade" id="message-dialog" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
      <div class="modal-dialog " role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="titulo">{{title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
              <span style="color:#fff;font-size:22px;" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div v-if="type == 'AGENCIA'" class="modal-body" >
            <div v-html="message"></div>
            <div v-for="(v,i) in agencys" :key="i"> 
              <input  class="ml-2" v-model="agencySelected" type="radio" :value="v.id" /><label>{{v.name}}</label>&nbsp;&nbsp;
            </div>
          </div>
          <div v-else class="modal-body" v-html="message"></div>
          <div class="modal-footer">
            <template v-if="type == 'YES-NO'">
                <button type="button" class="btn" data-dismiss="modal" @click="result('NO')">
                  Não
                </button>
                <button type="button" class="btn" data-dismiss="modal" @click="result('YES')">
                  Sim
                </button>
              </template>
              <template v-else-if="type == 'TEMPLATE'">            
                <button type="button" class="btn" data-dismiss="modal" @click="result('YES')">
                  Sim
                </button>
              </template>
              <template v-else-if="type == 'AGENCIA'">            
                <button :disabled="!agencySelected" type="button" class="btn" data-dismiss="modal" @click="result(agencySelected)">
                  OK
                </button>
              </template>
              <template v-else>            
                <button type="button" class="btn" data-dismiss="modal" @click="result('YES')">
                  Ok
                </button>
              </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!--<template>
  <div>

<button type="button" style="display:none" id="btn-open-modal" class="btn btn-primary" data-toggle="modal" data-target="#message-dialog">
  Abrir modal de demonstração
</button>

<div class="modal fade in" id="message-dialog" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
  <div class="modal-dialog " role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="titulo">Título do modal</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
          <span style="color:#fff;font-size:22px;" aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       Message Here...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn   " data-dismiss="modal">OK</button>
         <button type="button" class="btn   " data-dismiss="modal">YES</button>
          <button type="button" class="btn   " data-dismiss="modal">NO</button>
      </div>
    </div>
  </div>
</div>
  </div>
</template>-->

<script src="./message-dialog.js"></script>
<style lang="scss" scoped>
.modal-header{
border: none;
background-image: linear-gradient(to bottom right, #01161d,#184e65);
/* background:  rgba(14, 68, 87, 1); */  
}
.modal-body{
color:#333;
font-size: 18px;
background:  rgb(240, 240, 240);
min-height: 100px;
}
.modal-footer{
background:  rgba(240, 240, 240, 1);
}
button{border: solid 1px #333}
h5{
  color: aliceblue;
}
</style>

