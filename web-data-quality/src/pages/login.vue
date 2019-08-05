<template>
  <div v-async="loading" class="pai">
    <!-- <loading></loading>  -->
   
    <div class="login">
      <div class="auth-main">
        <div class="wrapper">
          <div class="auth-block">
            
            <img class="img-fluid mx-auto d-block" src="../assets/images/Login_Logo_Latam.png">
            <div class="row">
              <div class="col-12">
                
                  <div  style="margin-top: 20px; " class="form-horizontal">
                    
                    <div v-show="tipoLogin=='login'" class="campos-login">

                      <div class="form-group" :class="{'has-error':errors.has('email')}">
                        <div class="row">
                          <div class="col-md-2 pl-4 label-auth">
                            <label for="email" class="control-label">{{$t('lang.label_input_email')}}</label>
                          </div>
                          <div class="col-md-10">
                            <input id="input-email" type="text" v-validate="'required'"  name="email" class="form-control"  v-model="request.email" :placeholder="$t('lang.label_input_email')">
                          </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2"></div>
                            <div class="col-md-10">
                                <div class="help-block">{{errors.first('email')}}</div>
                            </div>
                        </div>
                      </div>

                      <div class="form-group" :class="{'has-error':errors.has('password')}">
                          <div class="row">
                            <div class="col-md-2 pl-4 label-auth">
                              <label for="password" class="control-label">{{$t('lang.label_input_password')}}</label>
                            </div>
                            <div class="col-md-10">
                              <input id="input-password"  type="password" name="password" v-validate="'required'" v-model="request.password"  class="form-control"  :placeholder="$t('lang.label_input_password')">
                            </div>                    
                          </div>
                          <div class="row">
                              <div class="col-md-2"></div>
                              <div class="col-md-10">
                                  <div class="help-block">{{errors.first('password')}}</div>
                              </div>
                          </div>
                          <div class="row  container-options">
                            <div>
                              <button  @click="login" :disabled="(errors.items.length > 0)"  class="btn btn-default btn-sm btn-auth mr-1" >{{$t('lang.button_sign_in')}}</button>                            
                            </div>
                            <div @click="logarCadastrar" class="link-pass"> {{$t('lang.Forgot_password')}} </div>   
                            <div><localization></localization></div>   
                          </div>
                                       
                      </div>
                     
                    </div>

                    <div v-if="tipoLogin=='cadastro'" class="campos-cadastro">
                        <div class="form-group" :class="{'has-error':errors.has('forgot-password-email')}">
                          <div class="row">
                            <div class="col-md-2 pl-4 label-auth">
                              <label for="forgot-password-email" class="control-label">{{$t('lang.label_input_email')}}</label>
                            </div>
                            <div class="col-md-10">
                              <input
                                type="text"
                                v-validate="'required'"
                                name="forgot-password-email"
                                class="form-control"
                                v-model="forgotRequest.email"
                                :placeholder="$t('lang.label_input_email')"
                              >
                            </div>
                          </div>
                          <div class="row">
                              <div class="col-md-2"></div>
                              <div class="col-md-10">
                                  <div class="help-block">{{errors.first('forgot-password-email')}}</div>
                              </div>
                          </div>
                        </div>
                        <div class="row  container-options">
                            <div>                              
                              <button @click="sendEmailForgotPassword"  class="btn btn-default btn-sm btn-auth mr-1">{{$t('lang.button_send_email')}}</button>
                            </div>
                            <div @click="logarCadastrar" class="link-pass"> {{$t('lang.go_to_login')}} </div>
                            <div><localization></localization></div>                            
                        </div>                        
                    </div>                    
                </div>
                
                
              </div> 
              </div> 


               <div style="displat:flex; justify-content: space-between;" class="row mt-3">
                <div  class="pl-4"><img style="max-width:60px;" class="img-fluid mx-auto d-block" src="../assets/images/Login_Logo.png"></div>
                <div  class="pr-3">  {{`v${version}`}}</div>
                
            
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
      
 
</template>
<script>
import Localization from "../components/local/localization.vue";
import AuthenticationService from "../services/auth.js";
import {mapActions, mapGetters } from 'vuex';
import Package from '../../package.json';

export default {
  data() {
    return {

      tipoLogin:"login",
      textLink:"{$t('lang.Forgot_password')}",
      request: {
        email: undefined,
        password: undefined
      },
      version:undefined,
      forgotRequest:{},
      loading: undefined
    };
  },
  mounted(){    
    this.version = Package.version;
   },
  computed:{
    ...mapGetters(['getIsFirstAccess'])
  },
  methods: {
    ...mapActions(['loginStore']),
    logarCadastrar(){
      if(this.tipoLogin=="login"){
        this.tipoLogin = "cadastro";
        this.textLink = "Fazer login";
      }else{
        this.tipoLogin="login";
        this.textLink="Esqueceu sua senha ?"
      }
    },

    sendEmailForgotPassword(){
      
      this.loading = Promise.all([this.$validator.validate('forgot-password-email')]).then(response=>{       
       if(response[0]){
          return AuthenticationService.forgot(this.forgotRequest).then(()=>{
                   this.mxShowModal({title:'Informação', message:'Email enviado com sucesso!'}).then(()=>{                    
                     this.tipoLogin = 'login';
                  });
                });
       }
     }).catch(erro=>{       
         this.mxShowModalError(erro);
     });
    },
    login() {     
      
      this.loading = Promise.all([this.$validator.validate('email'),this.$validator.validate('password')]).then(response => {  
        
        let valid = response.every(e=> e == true);

        if (valid) {          
          return this.loginStore(this.request).then(() => {
            if(this.getIsFirstAccess == true){
              this.$router.push({ name: "change-pass" });
            }else{
              this.loadAbilities();
              this.$router.push({ name: "home" });
            }            
            return Promise.resolve();
          });
        }
      }).catch((erro)=>{        
         this.mxShowModalError(erro);
      });
    },
    loadAbilities(){

    }
  },
  components: {
    Localization,    
  }
};
</script>
<style scoped>
.wrapper {
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  height: 100vh;
  min-height: 100vh;
}

.link-pass:hover{
  cursor: pointer;
  color: #ffed69;
}

.container-options{
 
  justify-content: space-between;
  width: 385px;
  position: relative;
  float: right;
  margin-right: 0px;
}

.auth-block {
  width: 540px;

  border-radius: 5px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  padding: 32px;
}

.auth-block h1 {
  font-weight: 300;
  margin-bottom: 28px;
  text-align: center;
}

.auth-block a {
  text-decoration: none;
  outline: 0;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  color: #209e91;
}

.auth-block a:hover {
  color: #1b867b;
}

.auth-block .control-label {
  padding-top: 11px;
  color: #fff;
}

.auth-block .form-group {
  margin-bottom: 12px;
}

.auth-input {
  width: 300px;
  margin-bottom: 24px;
}

.auth-input input {
  display: block;
  width: 100%;
  border: none;
  font-size: 16px;
  padding: 4px 10px;
  outline: 0;
}

a.forgot-pass {
  display: block;
  text-align: right;
  margin-bottom: -20px;
  float: right;
  z-index: 2;
  position: relative;
}

.al-share-auth,
.auth-link,
.auth-sep {
  text-align: center;
}

.auth-link {
  display: block;
  margin-bottom: 33px;
}

.auth-sep {
  margin-top: 36px;
  margin-bottom: 24px;
  line-height: 20px;
  display: block;
  position: relative;
}

.auth-sep > span {
  display: table-cell;
  width: 30%;
  white-space: nowrap;
  padding: 0 24px;
  color: #fff;
}

.auth-sep > span > span {
  margin-top: -12px;
  display: block;
}

.auth-sep:after,
.auth-sep:before {
  border-top: solid 1px #fff;
  content: "";
  height: 1px;
  width: 35%;
  display: table-cell;
}

.al-share-auth .al-share {
  float: none;
  margin: 0;
  padding: 0;
  display: inline-block;
}

.al-share-auth .al-share li {
  margin-left: 24px;
}

.al-share-auth .al-share li:first-child {
  margin-left: 0;
}

.al-share-auth .al-share li i {
  font-size: 24px;
}

.btn-auth {
  color: #fff !important;
}

.alert {
  width: 100%;
  position: absolute;
}

.alert > .message {
  text-align: center;
}

.form-horizontal label {
  line-height: 34px;
  margin-bottom: 0;
  padding-top: 0 !important;
}

.btn-auth {
  color: #fff !important;
}

@media (min-width: 768px) {
  .label-auth {
    text-align: right;
  }
}

@media(max-width: 768px){
   .container-options{
    width: 100%;
}
}


@media(max-width: 600px){
   .container-options{
    width: 100%;
  justify-content: center;
   
}
}



@media (max-width: 600px) {
  .auth-block {
    width: 300px;
  }
}
</style>