
<template>
  <div>

     <!-- Botão para acionar modal -->
<button type="button" id="btn-show-accepted" style="display:none" class="btn btn-primary" data-toggle="modal" data-target="#ModalLongoExemplo">  
</button>

<!-- Modal -->
<div class="modal fade" data-backdrop="static" id="ModalLongoExemplo" tabindex="-1" role="dialog" aria-labelledby="TituloModalLongoExemplo" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
 
        <h5 class="modal-title" id="TituloModalLongoExemplo"> {{$t('lang.modal_terms')}}</h5>
        
        
      
      </div>
      <div class="modal-body">

         <!-- Fazer traduções quando texto for disponibilizado -->

        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was popularised in
        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
        and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.<br><br>

        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was popularised in
        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
        and more recently with desktop publishing software like Aldus PageMaker including
         versions of Lorem Ipsum.<br><br>

        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was popularised in
        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
        and more recently with desktop publishing software like Aldus PageMaker including
         versions of Lorem Ipsum.<br><br>
   
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn " @click="$emit('no_accept')" data-dismiss="modal">{{$t('lang.btn_no_accept')}}</button>&nbsp;&nbsp;
        <button type="button" class="btn " data-dismiss="modal" > {{$t('lang.btn_accept')}}</button>
      </div>
    </div>
  </div>
</div>


  </div>
</template>

<script> 
import $ from 'jquery';
 export default {

   props:['show'],
   mounted(){     
     if(this.show){
       $('#btn-show-accepted').click();
     }
   }
   
   
   

}
</script>
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

