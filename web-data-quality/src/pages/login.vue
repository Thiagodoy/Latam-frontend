<template>
  <div class="pai">
    <div class="login">
      <div class="auth-main">
        <div class="wrapper">
          <div class="auth-block">
            <img class="img-fluid mx-auto d-block" src="../assets/images/Login_Logo.png">
            <div class="row">
              <div class="col-12">
                <div id="formLogin" style="margin-top: 20px; " class="form-horizontal">
                  <div class="form-group" :class="{'has-error':errors.has('email')}">
                    <div class="row">
                      <div class="col-md-2 pl-4 label-auth">
                        <label for="email" class="control-label">{{$t('lang.label_input_email')}}</label>
                      </div>
                      <div class="col-md-10">
                        <input
                          type="text"
                          v-validate="'required'"
                          name="email"
                          class="form-control"
                          v-model="request.email"
                          :placeholder="$t('lang.label_input_email')"
                        >
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
                        <label
                          for="password"
                          class="control-label"
                        >{{$t('lang.label_input_password')}}</label>
                      </div>
                      <div class="col-md-10">
                        <input
                          type="password"
                          name="password"
                          v-validate="'required'"
                          v-model="request.password"
                          class="form-control"
                          id="inputPassword"
                          :placeholder="$t('lang.label_input_password')"
                        >
                      </div>                    
                    </div>
                    <div class="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-10">
                            <div class="help-block">{{errors.first('password')}}</div>
                        </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-6">
                      <button
                        @click="login" :disabled="(errors.items.length > 0)"
                        class="btn btn-default btn-sm btn-auth mr-1"
                      >{{$t('lang.button_sign_in')}}</button>
                    </div>
                    <div class="col-md-4">
                      <localization></localization>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Localization from "../components/local/localization.vue";
import AuthenticationService from "../services/authentication.js";
export default {
  data() {
    return {
      request: {
        email: undefined,
        password: undefined
      },
      loading: undefined
    };
  },

  methods: {
    // FIXME: Put loading on the page when  make a request
    login() {
      this.loading = this.$validator.validateAll().then(response => {
        if (response) {
          // return AuthenticationService.login(this.request).then(response => {
            this.$router.push({ name: "home" });
          //   return Promise.resolve();
          // });
        }
      });
    }
  },
  components: {
    Localization
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

@media (max-width: 600px) {
  .auth-block {
    width: 300px;
  }
}
</style>