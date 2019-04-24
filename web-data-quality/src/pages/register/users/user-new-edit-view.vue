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
                
                <img v-if="!userPhoto"  class="img-fluid rounded-circle avatar-view mb-2"  src="../../../assets/images/avatar-null.jpg"/><br>
                <img v-if="userPhoto" id="image-photo" class="img-fluid rounded-circle avatar-view mb-2"  :src="userPhoto"/><br>
                <input type="file" id="file-load-photo" style="display:none">                
                <span v-if="!userPhoto"  class="change-photo" @click="addPhoto"><i class="far fa-save"></i>&nbsp;Add photo</span>
                <span v-else class="change-photo-remove" @click="removePhoto"><i class="far fa-trash-alt"></i>&nbsp;Remove photo</span>
            </div>
            <div class="infos-box col-md-10">

                <div class="row">
                    <!-- Column A -->
                    <div class="col-md-6">
                        <div class="col-md-12">
                            <div style="color:#fff;" class="form-group" :class="{'has-error': errors.has('firstname')}">
                                <label for="exampleInputEmail1">{{$t('lang.label_input_firstname')}}:</label>
                                <input :disabled="typeAction == 'VIEW'"  v-validate="'required'" v-model="request.firstName" type="text" class="form-control campos" name="firstname"  :placeholder="$t('lang.label_input_firstname')" >
                            </div>
                            <div class="help-block">{{errors.first('firstname')}}</div>                        
                        </div>
                        <div class="col-md-12">
                            <div class="form-group" :class="{'has-error':errors.has('email')}">
                                <label for="exampleInputEmail1">{{$t('lang.label_input_email')}}</label>
                                <input :disabled="typeAction == 'EDIT' || typeAction == 'VIEW'"  v-validate="'required|email'" name="email"  type="email" v-model="request.email" class="form-control campos"  :placeholder="$t('lang.label_input_email')">
                                <div class="help-block">{{errors.first('email')}}</div>
                            </div>
                        </div>
                       
                       <div class="col-md-12">
                            <div class="form-group" :class="{'has-error':errors.has('email')}">
                                <label for="exampleInputEmail1">{{$t('lang.label_input_company')}}</label>
                                <select :disabled="typeAction == 'VIEW'" v-model="request.company"  v-validate="'required'" class="custom-select form-control selct1 campos">
                                    <option v-for="(v, i) in agencys" :key="i" :value="v.id">{{v.name}}</option>
                                </select>  
                                   <div class="help-block">{{errors.first('email')}}</div>  
                             </div>        
                       </div>
                       
                       <!--
                        <div class="col-md-12">
                            <div class="form-group" :class="{'has-error':errors.has('email')}">
                                <label for="exampleInputEmail1">{{$t('lang.label_input_company')}}</label>
                                <input :disabled="typeAction == 'VIEW'"  v-validate="'required'" name="email"  type="text" v-model="request.company" class="form-control campos"  :placeholder="$t('lang.label_input_company')">
                                <div class="help-block">{{errors.first('email')}}</div>
                            </div>
                        </div> -->
                       
                         <div class="col-md-12">
                        <div class="form-group" :class="{'has-error':errors.has('profile')}">
                            <label for="profile">Profile</label>
                            <select :disabled="typeAction == 'VIEW'" class="form-control campos" v-validate="'required'" v-model="request.groups" name="profile" id="profile" multiple>

                                <option class="campos"  v-for="(v,i) in groups" :value="v.id" :key="i">{{v.name}}</option>
                            </select>
                            <div class="help-block">{{errors.first('profile')}}</div>
                            </div>                        
                        </div>
                    </div>
                    <!-- Column B -->
                    <div class="col-md-6">
                         <div class="col-md-12">
                            <div class="form-group" :class="{'has-error': errors.has('lastname')}">
                                <label for="exampleInputEmail1">{{$t('lang.label_input_lastname')}}</label>
                                <input  :disabled="typeAction == 'VIEW'"  v-validate="'required'" name="lastname" v-model="request.lastName"  type="text" class="form-control campos"  :placeholder="$t('lang.label_input_lastname')" >
                                <div class="help-block">{{errors.first('lastname')}}</div>
                            </div>
                         </div>
                        
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

<script>
import UserService from '../../../services/user';
import GroupService from '../../../services/group';
import AgencyService from '../../../services/agency';
export default {
    props:['userEdit','typeAction'],
    data(){
        return {
            show:'',
            userPhoto:undefined,
            request:{
                groups:[]   
            },
            groups:[],
            agencys:[]
        }
    },    
    mounted(){
        //FIXME:Put the loading on request
        GroupService.getGroups({page:0, size:100}).then((response)=>{this.groups = response.content});

        AgencyService.list().then(response => {
            this.agencys = response.map(e=>{
                let ne = {};
                ne.id = e.id;
                ne.name = e.name
                return ne;
            });
        })



       if(this.userEdit){
                this.request.id = this.userEdit.email;
                this.request.firstName = this.userEdit.firstName;
                this.request.lastName = this.userEdit.lastName;
                this.request.email = this.userEdit.email;
                this.request.photo = this.userPhoto === '../../../assets/images/avatar-null.jpg' ? '' :this.userPhoto;
                this.request.groups = this.userEdit.groups.map((g)=>g.groupId);
                this.request.company = this.userEdit.info.find((i)=> i.key == 'agencia').value;
            }
    },
    methods:{

        removePhoto(){
            this.userPhoto = undefined;
            document.getElementById('file-load-photo').value = '';
        },
        addPhoto(){
            let inputLoadPhoto =  document.getElementById('file-load-photo');
            inputLoadPhoto.click();
            inputLoadPhoto.onchange = (e)=>{
                
                if(e.target.files.length == 0){return;}

                if(e.target.files[0].size > 524288){alert('Imagem maior que 50 mb'); return}

                let reader = new FileReader();

                reader.onload = (re)=>{                    
                   let image = document.getElementById('image-photo');              
                   this.userPhoto = re.target.result;
                }
                reader.readAsDataURL(e.target.files[0]); 
            }
        },

        saveUser(){
            //FIXME: Colocar o loading 
            this.$validator.validateAll().then((valid)=>{

                this.request.password = '123456';                    
                this.request.id = this.request.email;
                this.request.photo = this.userPhoto;
                this.request.info = [];

                if(valid && !this.userEdit){
                    this.request.info.push({key:'agencia', userId: this.request.id, value:this.request.company});
                    this.request.info.push({key:'primeiro_acesso', userId: this.request.id, value:'true'});
                    return UserService.saveUser(this.request).then((response)=>{
                      this.savedSuccess();
                    });
                }else if(valid && this.userEdit){
                  return UserService.updateUser(this.request).then(()=>{
                      this.savedSuccess();
                  })
                }


            });
        },
        savedSuccess(){
            this.request = {groups:[]};
            this.show='SAVED';
            setInterval(()=>{this.$emit('back')},1500);
        }
    },
    watch:{
        userEdit(newValue, oldValue){
          
            if(newValue){
                request.id = newValue.email;
                request.firstName = newValue.firstName;
                request.lastName = newValue.lastName;
                request.email = newValue.email;
                request.groups = newValue.groups.map((g)=>g.id);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
input:disabled{
    background-color: rgba(255,255,255,0.6);
    color:#000;
    cursor:not-allowed;
}

select:disabled{    
    background-color: rgba(0, 0, 0, .2);
    cursor:not-allowed;
}
#profile{
    color: white;
}
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

.campos{
    color:#fff;
     font-size: 18px;
    &:disabled{
        color: #222;
        font-size:18px;
    }
    &:focus{
       color:#fff;  
    }
    &:active{
       
    }
}

.change-photo-remove:hover{
    cursor: pointer;
    color: #fd4732;
}

.alert{
     background-color: rgba(37,239,147,0.3);
     color:#eee;
     border: none;

}

::-webkit-scrollbar {
    width: 6px;
    height: 0px;
}
::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    cursor: pointer
}

@media (max-width: 769px) {
    .tool-view{
        justify-content: center;

    }

     .picture-box{
  
   max-width: none;
     }

}

.selct1:disabled{
    background-color: rgba(255, 255, 255, 0.5);

}

</style>
