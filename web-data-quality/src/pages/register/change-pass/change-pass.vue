<template>
<div>

    <div class="topo">  <h4><i class="fas fa-key"></i>&nbsp; Alterar senha</h4></div>
   <div class="wrapper">
     
        <div class="col-md-6">
                         <div class="col-md-12">
                            <div class="form-group" >
                                <label for="exampleInputEmail1">Senha atual</label>
                                <input    type="password" class="form-control campos"  placeholder="Senha atual" >
                            </div>
                         </div>

                         <div class="col-md-12">
                            <div class="form-group" >
                                <label for="exampleInputEmail1">Nova senha</label>
                                <input    type="password" class="form-control campos"  placeholder="Nova Senha" >
                            </div>
                         </div>

                          <div class="col-md-12">
                            <div class="form-group" >
                                <label for="exampleInputEmail1">Confirmar senha</label>
                                <input    type="password" class="form-control campos"  placeholder="Confirmar senha" >
                            </div>
                         </div>

                          <div class="row mt-1">
                    <div class="col-md-6">                        
                        <button v-if="!(typeAction == 'VIEW')"  style="color:#fff" @click="saveUser()" class="btn btn-default btn-large" :disabled="(errors.items.length > 0)">{{$t('lang.button_save')}}</button>
                        <button  style="color:#fff" @click="$emit('back')" class="btn btn-default btn-large ml-3 ">{{$t('lang.button_cancel')}}</button>                       
                    </div>
                     <div class="col-md-4">
                        
                           
                       
                     </div>
                </div>   

                        
                        
         </div>

       

   </div>

</div>
    
</template>

<style>
 .wrapper{
    background-color: rgba(0,0,0,0.3);
     margin: 0px;
    color:#ddd;
    border-block-end-width: 80%;
    
    padding: 40px;
 }

 .topo{
    background-color: rgba(0,0,0,0.3);
    margin: 0px;
    color:#ddd;
    padding: 15px;
    margin-bottom: 20px;

 }
</style>

