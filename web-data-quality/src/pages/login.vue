<template>
    <div class="pai">
       <div class="login">
            <div class="auth-main">
                <div class="wrapper">
                    <div class="auth-block">
                        <img class="mx-auto d-block" src="../assets/images/Login_Logo.png">
                        <div class="row" >
                            <div class="col-12">
                                <div   id="formLogin" style="margin-top: 20px; "  class="form-horizontal " >
                                    
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-2 text-right">
                                                <label for="inputUsername" class="  control-label">Email</label>
                                            </div>
                                            <div class="col-10">
                                                <input type="text"  class="  form-control" id="inputUsername" required placeholder="Email">
                                            </div>
                                        </div> 
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-2 text-right">
                                                 <label for="inputPassword" class=" control-label">Password</label>
                                            </div>
                                            <div class="col-md-10">
                                                 <input type="password"  name="password" class="form-control" id="inputPassword" required placeholder="Password">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-2"></div>
                                        <div class="col-md-10">
                                            <router-link to="/home"><button  @click="Logar"    class="btn btn-default btn-sm btn-auth mr-1">Sign in</button></router-link>
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
export default {
    data(){
        return{
            email:"",
            pass:""
        }
    },
    
    methods:{
        Logar(){

        }


    }
    
}
</script>
<style scoped>

.wrapper{
 
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
    background: rgba(0, 0, 0, .55);
    color: #fff;
    padding: 32px
}

.auth-block h1 {
    font-weight: 300;
    margin-bottom: 28px;
    text-align: center
}

.auth-block a {
    text-decoration: none;
    outline: 0;
    -webkit-transition: all .2s ease;
    transition: all .2s ease;
    color: #209e91
}

.auth-block a:hover {
    color: #1b867b
}

.auth-block .control-label {
    padding-top: 11px;
    color: #fff
}

.auth-block .form-group {
    margin-bottom: 12px
}

.auth-input {
    width: 300px;
    margin-bottom: 24px
}

.auth-input input {
    display: block;
    width: 100%;
    border: none;
    font-size: 16px;
    padding: 4px 10px;
    outline: 0
}

a.forgot-pass {
    display: block;
    text-align: right;
    margin-bottom: -20px;
    float: right;
    z-index: 2;
    position: relative
}

.al-share-auth,
.auth-link,
.auth-sep {
    text-align: center
}

.auth-link {
    display: block;
    margin-bottom: 33px
}

.auth-sep {
    margin-top: 36px;
    margin-bottom: 24px;
    line-height: 20px;
    display: block;
    position: relative
}

.auth-sep>span {
    display: table-cell;
    width: 30%;
    white-space: nowrap;
    padding: 0 24px;
    color: #fff
}

.auth-sep>span>span {
    margin-top: -12px;
    display: block
}

.auth-sep:after,
.auth-sep:before {
    border-top: solid 1px #fff;
    content: "";
    height: 1px;
    width: 35%;
    display: table-cell
}

.al-share-auth .al-share {
    float: none;
    margin: 0;
    padding: 0;
    display: inline-block
}

.al-share-auth .al-share li {
    margin-left: 24px
}

.al-share-auth .al-share li:first-child {
    margin-left: 0
}

.al-share-auth .al-share li i {
    font-size: 24px
}

.btn-auth {
    color: #fff!important
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
    padding-top: 0!important
}

.btn-auth {
    color: #fff!important
}




    

</style>