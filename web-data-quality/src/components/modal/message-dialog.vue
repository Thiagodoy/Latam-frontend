<template>
  <div>
      <!-- Botão para acionar modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#message-dialog">
  Abrir modal de demonstração
</button>
<!-- Modal -->
<div class="modal fade" id="message-dialog" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
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
</template>
<script></script>
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
</style>

