<template>
   <div v-async="loading">
      <div class="topo text-center">  <h6><i class="fas fa-key"></i>&nbsp; {{!(getIsFirstAccess) ? $t('lang.title_change_pass') : $t('lang.title_change_pass_first_acess')}}</h6></div>
      <div class="wrapper">      
         <div class="col-md-6 form">
               <div class="col-md-11">
                  <div class="form-group" :class="{'has-error':errors.has('oldPassword')}" >
                     <label for="oldPassword">{{$t('lang.label_input_current_pass')}}</label>
                     <input v-validate="'required'" name="oldPassword"    v-model="request.password" type="password" class="form-control campos"  :placeholder="$t('lang.label_input_current_pass')" >
                      <div class="help-block">{{errors.first('oldPassword')}}</div>
                  </div>
               </div>

               <div class="col-md-12">
                  <div class="row">
                     <div class="col-md-11">
                        <div class="form-group" :class="{'has-error':errors.has('password')}" >
                           <label for="password">{{$t('lang.label_imput_newpass')}}</label>
                           <input v-validate="'required|caracterEspecial|passwordLength|passwordLowerCase|passwordUpperCase'"  name="password" v-model="request.newPassword" ref="password"  :type="type1" class="form-control campos"  :placeholder="$t('lang.label_imput_newpass')" >
                           <div class="help-block">{{errors.first('password')}}</div>
                        </div>
                     </div>
                      <div class="col-md-1" style="margin-top: auto;margin-bottom: auto;">
                        <span v-if="type1=='password'" @click="type1='text'"><i class=" btn-option  fas fa-eye-slash  mr-5" style="font-size: 20px;position: relative;left: -13px;top: 7px;"></i></span>
                        <span v-else @click="type1='password'"><i class=" btn-option  fas fa-eye  mr-5" style="font-size: 20px;position: relative;left: -13px;top: 7px;"></i></span>
                     </div>
                  </div>
               </div>
               

               <div class="col-md-12">
                  <div class="row">
                     <div class="col-md-11">
                        <div class="form-group" :class="{'has-error':errors.has('newPassword')}" >
                           <label for="password">{{$t('lang.confirm_pass')}}</label>
                           <input   :type="type" name="newPassword" v-validate="'required|confirmed:password|caracterEspecial|passwordLength|passwordLowerCase|passwordUpperCase'"  class="form-control campos"  :placeholder="$t('lang.confirm_pass')" >                     
                           <div class="help-block">{{errors.first('newPassword')}}</div>
                        </div>
                     </div>
                     <div class="col-md-1" style="margin-top: auto;margin-bottom: auto;">
                        <span v-if="type=='password'" @click="type='text'"><i class=" btn-option  fas fa-eye-slash  mr-5" style="font-size: 20px;position: relative;left: -13px;top: 7px;"></i></span>
                        <span v-else @click="type='password'"><i class=" btn-option  fas fa-eye  mr-5" style="font-size: 20px;position: relative;left: -13px;top: 7px;"></i></span>
                     </div>
                  </div>
               </div>              
               <br>
               <button  :disabled="(errors.items.length > 0)" @click="change"  style="color:#fff"  class="btn btn-default btn-large ml-3">{{$t('lang.button_save')}}</button>
               <button @click="back" style="color:#fff"  class="btn btn-default btn-large ml-3 ">{{$t('lang.button_cancel')}}</button>                                        
            </div>
      </div>
   </div>    
</template>
<script>
import {mapActions,mapGetters} from 'vuex';
import AuthService from '../../../services/auth';
// import Modal from '';
export default {

   data(){
      return {
         request:{},
         loading:undefined,
         type1:'password',
         type:'password'
      }
   },
   computed:{
       ...mapGetters(['getIsFirstAccess','getUser'])
   },
   methods:{
      change(){
         this.$validator.validateAll().then(response => {

            if(response){    
                      
               this.request.email = this.getUser.email;
               this.request.isFirstAcces = this.getIsFirstAccess ;               
               return AuthService.changePassword(this.request).then(response=>{
                  this.mxShowModal({title:'Informação', message:'Senha alterada com sucesso'}).then(()=>{
                     this.$router.push({ name: "login" });
                  });
               }).catch(error=>{
                  this.mxShowModalError(error);
               });
            }
         });
      },
      back(){
         if(this.getIsFirstAccess){
             this.$router.push({ name: "login" });
         }else{
             this.$router.push({ name: "home" });
         }
      }
   }
   
}
</script>


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

