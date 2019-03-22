<template>

    <div class="all-user-new">
        <div v-if="show == 'SAVED'"  class="alert alert-success text-center" role="alert">
           {{$t('lang.msg_success_user')}}
        </div>
        <div class="tool-edit mb-2">
            <div   @click="$emit('back')" class="tool-view-item"><i class="fas fa-arrow-circle-left"></i>&nbsp;{{$t('lang.button_back')}}</div> &nbsp; &nbsp;&nbsp;
          
        </div>
        
         <div class="row mt-3 wrapper-view-edit">
            <div class="picture-box col-md-2 text-center">
                <img class="img-fluid rounded-circle avatar-view mb-2"  src="../../../assets/images/avatar-null.jpg"/><br>
                <input type="file">
                <span  class="change-photo"><i class="far fa-save"></i>&nbsp;Add photo</span>
            </div>
            <div class="infos-box col-md-10">
                <div class="row">
                    <div class="col-md-6">
                         <div style="color:#fff;" class="form-group" :class="{'has-error': errors.has('firstname')}">
                            <label for="exampleInputEmail1">{{$t('lang.label_input_firstname')}}:</label>
                            <input style="color:#eee" v-validate="'required'" v-model="request.firstName" type="text" class="form-control" name="firstname"  :placeholder="$t('lang.label_input_firstname')" >
                        </div>
                        <div class="help-block">{{errors.first('firstname')}}</div>                        
                    </div>
                    <div class="col-md-6">
                         <div class="form-group" :class="{'has-error': errors.has('lastname')}">
                            <label for="exampleInputEmail1">{{$t('lang.label_input_lastname')}}</label>
                            <input style="color:#eee" v-validate="'required'" name="lastname" v-model="request.lastName"  type="text" class="form-control"  :placeholder="$t('lang.label_input_lastname')" >
                            <div class="help-block">{{errors.first('lastname')}}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group" :class="{'has-error':errors.has('email')}">
                            <label for="exampleInputEmail1">{{$t('lang.label_input_email')}}</label>
                            <input style="color:#eee" v-validate="'required|email'" name="email"  type="email" v-model="request.email" class="form-control"  :placeholder="$t('lang.label_input_email')">
                            <div class="help-block">{{errors.first('email')}}</div>
                        </div>

                    </div>
                </div>
                <div class="row mt-1">
                    <div class="col-md-6">                        
                        <button  style="color:#fff" @click="saveUser()" class="btn btn-default btn-large" :disabled="(errors.items.length > 0)">{{$t('lang.button_save')}}</button>
                        <button  style="color:#fff" @click="$emit('back')" class="btn btn-default btn-large ml-3 ">{{$t('lang.button_cancel')}}</button>                       
                    </div>
                     <div class="col-md-4">
                        
                           
                       
                    </div>
                </div>   
            </div>
        </div>
        
    </div>
    
</template>

<script>
import UserService from '../../../services/user';
export default {

    data(){
        return {
            show:'',
            request:{}
        }
    },
    methods:{
        saveUser(){
            //FIXME: Colocar o loading         
            

            this.$validator.validateAll().then((response)=>{


                if(response){
                    //FIXME: Set the field password temporaly
                    this.request.password = '123456';                    
                    this.request.id = this.request.email;
                    return UserService.saveUser(this.request).then((response)=>{
                        this.request = {};
                        this.show='SAVED';
                        setInterval(()=>{this.$emit('back')},1500);
                    });
                }else{
                  
                }


            });
        }
    }
}
</script>

<style lang="scss" scoped>
.tool-edit{
     background-color: rgba(0,0,0,0.5);
     width: 100%;
     display: flex;
     border-radius:5px;
     padding: 10px;

     .tool-view-item:hover{
         cursor: pointer;
         color: #ffed69;}
}
.wrapper-view-edit{
     background-color: rgba(0,0,0,0.3);
     margin: 0px;
    color:#ddd;
}
.picture-box{
   padding: 15px;
   max-width: 210px;
}
.infos-box {
     padding: 15px;

}
.change-photo:hover{
    cursor: pointer;
    color: #ffed69;
}
.alert{
     background-color: rgba(37,239,147,0.3);
     color:#eee;
     border: none;

}

@media (max-width: 769px) {
    .tool-view{
        justify-content: center;

    }

     .picture-box{
  
   max-width: none;
     }

}
</style>
