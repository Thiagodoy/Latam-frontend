<template>
    <div>
       <div class="wrapper">
           <div class="row">
               <div class="col-md-6">
                    <div class="col-md-12">
                            <div class="form-group" >
                                <label >{{$t('lang.table_user')}}</label>
                                <select    class="custom-select form-control selct1 campos">
                                    <option  >thiago@teste.com</option>
                                     <option >Luis@teste.com</option>
                                      <option >Pedro@teste.com</option>
                                </select>  
                                  
                             </div>        
                       </div>

                        <div class="col-md-12">
                        <div  class="form-group" >
                            <label for="profile">{{$t('lang.table_agency_name')}}</label>
                            <select  class="form-control campos" multiple style="height:300px;">
                                <option class="campos "  >Agencia 1</option>
                                <option class="campos "  >Agencia 2</option>
                                <option class="campos "  >Agencia 3</option>
                                <option class="campos "  >Agencia 4</option>
                                <option class="campos "  >Agencia 5</option>
                                <option class="campos "  >Agencia 1</option>
                                <option class="campos "  >Agencia 2</option>
                                <option class="campos "  >Agencia 3</option>
                                <option class="campos "  >Agencia 4</option>
                                <option class="campos "  >Agencia 5</option>
                                <option class="campos "  >Agencia 1</option>
                                <option class="campos "  >Agencia 2</option>
                                <option class="campos "  >Agencia 3</option>
                                <option class="campos "  >Agencia 4</option>
                                <option class="campos "  >Agencia 5</option>
                            </select>
                           
                            </div>                        
                        </div>
               </div>
               
               
               
                <div class="col-md-6">
                    
                </div>


           </div>
           <div class="row">
               <div class=" mt-4 col-md-12">
                   <button   style="color:#fff"  class="btn btn-default btn-large" >{{$t('lang.button_save')}}</button>
                   <button  style="color:#fff" @click="$emit('back')" class="btn btn-default btn-large ml-3 ">{{$t('lang.button_cancel')}}</button>    
               </div>
           </div>    


       </div>
    </div>
    
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.wrapper{
    width: 100%;
    
     background: rgba(0, 0, 0, .6);
     padding: 60px;

}

.selct1 {

    option{  color:#222;}
   
  

}
::-webkit-scrollbar {
    width: 6px;
    height: 0px;
}
::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    cursor: pointer
}

</style>
