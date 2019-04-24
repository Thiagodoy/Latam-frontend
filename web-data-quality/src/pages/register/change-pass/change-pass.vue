<template>
<div>

    <div class="topo text-center">  <h6><i class="fas fa-key"></i>&nbsp; {{$t('lang.title_change_pass')}}</h6></div>
   <div class="wrapper">
     
        <div class="col-md-6 form">
                         <div class="col-md-12">
                            <div class="form-group" >
                                <label for="exampleInputEmail1">{{$t('lang.label_input_current_pass')}}</label>
                                <input    type="password" class="form-control campos"  :placeholder="$t('lang.label_input_current_pass')" >
                            </div>
                         </div>

                         <div class="col-md-12">
                            <div class="form-group" >
                                <label for="exampleInputEmail1">{{$t('lang.label_imput_newpass')}}</label>
                                <input    type="password" class="form-control campos"  :placeholder="$t('lang.label_imput_newpass')" >
                            </div>
                         </div>

                          <div class="col-md-12">
                            <div class="form-group" >
                                <label for="exampleInputEmail1">{{$t('lang.confirm_pass')}}</label>
                                <input    type="password" class="form-control campos"  :placeholder="$t('lang.confirm_pass')" >
                            </div>
                         </div>
                         <br>

                        <button  v-if="!(typeAction == 'VIEW')"  style="color:#fff" @click="saveUser()" class="btn btn-default btn-large ml-3" :disabled="(errors.items.length > 0)">{{$t('lang.button_save')}}</button>
                        <button  style="color:#fff" @click="$emit('back')" class="btn btn-default btn-large ml-3 ">{{$t('lang.button_cancel')}}</button>                 

                         

                        
                        
         </div>

       

   </div>

</div>
    
</template>

<style lang="scss" scoped>

 .wrapper{
    background-color: rgba(0,0,0,0.3);
     margin: 0px;
    color:#ddd;
  
    
    padding: 40px;
 }

 .form{
      border: #ccc solid 1px;
      padding: 40px 30px 30px 30px;
      border-radius:15px; 

 }

 .topo{
    background-color: rgba(0,0,0,0.3);
    margin: 0px;
    color:#ddd;
    padding: 15px;
    margin-bottom: 20px;

 }

 .campos{
     height: 40px;
     font-size: 18px;
 }

 
</style>

