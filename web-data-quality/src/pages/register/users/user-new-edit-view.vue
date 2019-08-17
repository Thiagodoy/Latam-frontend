<template>

    <div  v-async="loading" class="all-user-new">
        <div v-if="show == 'SAVED'"  class="alert alert-success text-center" role="alert">
           {{$t('lang.msg_success_user')}}
        </div>
        <div  class="tool-edit mb-2">
            <div v-if="!this.showMineProfile"  @click="$emit('back')" class="tool-view-item"><i class="fas fa-arrow-circle-left"></i>&nbsp;{{$t('lang.button_back')}}</div> &nbsp; &nbsp;&nbsp;          
        </div>
        
         <div  class="row mt-3 wrapper-view-edit">
            <div class="picture-box col-md-2 text-center">
                
                <img v-if="!userPhoto"  class="img-fluid rounded-circle avatar-view mb-2"  src="../../../assets/images/avatar-null.jpg"/><br>
                <img v-if="userPhoto" id="image-photo" class="img-fluid rounded-circle avatar-view mb-2"  :src="userPhoto"/><br>
                <input type="file" id="file-load-photo" style="display:none">                
                <span v-if="!userPhoto"  class="change-photo" @click="addPhoto"><i class="far fa-save"></i>&nbsp;{{$t('lang.add_photo')}}</span>
                <span v-else class="change-photo-remove" @click="removePhoto"><i class="far fa-trash-alt"></i>&nbsp;Remover imagem</span>
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
                            <div class="form-group" :class="{'has-error': errors.has('lastname')}">
                                <label for="exampleInputEmail1">{{$t('lang.label_input_lastname')}}</label>
                                <input  :disabled="typeAction == 'VIEW'"  v-validate="'required'" name="lastname" v-model="request.lastName"  type="text" class="form-control campos"  :placeholder="$t('lang.label_input_lastname')" >
                                <div class="help-block">{{errors.first('lastname')}}</div>
                            </div>
                         </div>
                        <div class="col-md-12">
                            <div class="form-group" :class="{'has-error':errors.has('email')}">
                                <label for="exampleInputEmail1">{{$t('lang.label_input_email')}}</label>
                                <input :disabled="typeAction == 'EDIT' || typeAction == 'VIEW'"  v-validate="'required|email'" name="email"  type="email" v-model="request.email" class="form-control campos"  :placeholder="$t('lang.label_input_email')">
                                <div class="help-block">{{errors.first('email')}}</div>
                            </div>
                        </div>
                       
                       <!--
                       <div class="col-md-12">
                            <div class="form-group" :class="{'has-error':errors.has('company')}">
                                <label for="exampleInputEmail1">{{$t('lang.label_input_company')}}</label>
                                <select :disabled="typeAction == 'VIEW'" v-model="agencia"  v-validate="'required'" class="custom-select form-control selct1 campos">
                                    <option v-for="(v, i) in agencys" :key="i" :value="v.id">{{v.name}}</option>
                                </select>  
                                   <div class="help-block">{{errors.first('company')}}</div>  
                             </div>        
                       </div>
                       -->
                       
                       <!--
                        <div class="col-md-12">
                            <div class="form-group" :class="{'has-error':errors.has('email')}">
                                <label for="exampleInputEmail1">{{$t('lang.label_input_company')}}</label>
                                <input :disabled="typeAction == 'VIEW'"  v-validate="'required'" name="email"  type="text" v-model="request.company" class="form-control campos"  :placeholder="$t('lang.label_input_company')">
                                <div class="help-block">{{errors.first('email')}}</div>
                            </div>
                        </div> -->
                       
                         <div class="col-md-12">
                        <div  class="form-group" :class="{'has-error':errors.has('profile')}">
                            <label for="profile">{{$t('lang.profile')}}</label>
                            <select :disabled="typeAction == 'VIEW'" class="form-control campos" v-validate="'required|validaNroMaxPerfil'" :ref="'g'" v-model="request.groups" name="profile" id="profile" multiple style="height:200px;">
                                <option class="campos "  v-for="(v,i) in groups" :value="v.id" :key="i">{{v.name}}</option>
                            </select>
                            <div class="help-block">{{errors.first('profile')}}</div>
                            </div>                        
                        </div>
                    </div>
                    <!-- Column B -->
                    <div class="col-md-6">
                         <div class="col-md-12">
                            <div class="form-group" :class="{'has-error': errors.has('cpf')}">
                                <label for="exampleInputEmail1">CPF</label>
                                <input style="z-index:-1" v-mask="maskCpf"  :disabled="typeAction == 'VIEW' || typeAction == 'EDIT'"  v-validate="'required|userExists|validaCPF'" data-vv-validate-on="blur" name="cpf" v-model="cpf"   type="text" class="form-control campos"  placeholder="CPF"  >
                                <div class="help-block">{{errors.first('cpf')}}</div>
                            </div>
                         </div>

                         <div class="col-md-12">
                            <div class="form-group" :class="{'has-error': errors.has('phone')}">
                                <label for="exampleInputEmail1">{{$t('lang.label_input_phone')}}</label>
                                <input v-mask="maskPhone"  :disabled="typeAction == 'VIEW'"  v-validate="'required'" v-model="telefone" name="phone"   type="text" class="form-control campos"  :placeholder="$t('lang.label_input_phone')" >
                                <div class="help-block">{{errors.first('phone')}}</div>
                            </div>
                         </div>

                         <div class="col-md-12">
                            <div class="form-group" :class="{'has-error': errors.has('linkedin')}">
                                <label for="exampleInputEmail1">Linkedin</label>
                                <input  :disabled="typeAction == 'VIEW'" v-model="linkedin"   name="linkedin"   type="text" class="form-control campos"  placeholder="Linkedin" >
                                <div class="help-block">{{errors.first('linkedin')}}</div>
                            </div>
                         </div>
                        <div class="col-md-12">
                            <div  class="form-group" :class="{'has-error':errors.has('agency')}">
                                <label for="profile">{{$t('lang.table_view_file_company_name')}}</label>
                                <select :disabled="typeAction == 'VIEW'" class="form-control campos" v-validate="''" v-model="agency" name="agency" id="agency" multiple style="height:200px;">
                                    <option class="campos "  v-for="(v,i) in agencys" :value="v.id" :key="i">{{`${v.name}`}}</option>
                                </select>
                                <div class="help-block">{{errors.first('agency')}}</div>
                            </div>                        
                        </div>

                         <div class="col-md-12">
                             <div class="form-group">
                                <button v-if="typeAction == 'VIEW'" style="color:#fff" @click="resendEmail" class="btn btn-default">{{$t('lang.button_ressend_access_email')}}</button>                       
                             </div>
                         </div>
                        
                        
                    </div>
                </div>    
                
                <div class="row mt-1">
                    <div class="col-md-6">                        
                        <button v-if="!(typeAction == 'VIEW')"  style="color:#fff" @click="saveUser()" class="btn btn-default btn-large" :disabled="(errors.items.length > 0)">{{$t('lang.button_save')}}</button>
                        <router-link  v-if="showMineProfile" style="color:#fff" tag="button" class="btn btn-default btn-large ml-3 " :to="{ name: 'home' }">{{$t('lang.button_cancel')}}</router-link> 
                        <button v-else  style="color:#fff" @click="$emit('back')" class="btn btn-default btn-large ml-3 ">{{$t('lang.button_cancel')}}</button>                       
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
import AbilityFactory from '../../../security/ability-factory';
import moment from 'moment';
import {mapGetters,mapActions} from 'vuex';
import route from '../../../route/routes';

export default {
    props:['userEdit','typeAction', 'mineProfile'],
    data(){
        return {

            maskPhone: "(##) #########",
            maskCpf: "###.###.###-##",
            loading:undefined,
            show:'',
            showMineProfile:undefined,
            userPhoto:undefined,
            request:{
                groups:[],
                info:[]   
            },
            groups:[],
            agencys:[]
        }
    },    
    mounted(){        

        
        this.showMineProfile = this.mineProfile;
        
        let promises = new Array();

        //TODO: workaround alterar para listar apenas as agencias do usuario
        promises.push(GroupService.getGroups({page:0, size:100}));        
        promises.push(AgencyService.list({page:0,size:1000}));

        this.loading = Promise.all(promises).then(responses=>{
            
            this.agencys = responses[1].content.map(e=>{
                let ne = {};
                ne.id = e.id;
                ne.name = e.name;
                ne.code = e.agencyCode;
                return ne;
            });

            this.groups = responses[0].content;
            
            if( !this.showMineProfile){                
                this.checkConditions();
            }

            if(this.showMineProfile){
               
                this.userEdit.groups.forEach((g)=>{
                    g.groupId = g.id;
                });

                this.groups = this.groups.filter(gg=>{            
                    return gg.id == this.userEdit.groups[0].id;
                }); 
                

                let temp = new Array();
                this.userEdit.info.filter(e=> e.key == 'agencia').forEach(ee=>{
                    temp.push(this.agencys.find(a=> a.id == ee.value));
                });                
                
                this.agencys = temp;
                this.userEdit.groups = this.getGroups;               
            }   
            
            if(this.userEdit){                              
                this.request.id = this.userEdit.email;
                this.request.firstName = this.userEdit.firstName;
                this.request.lastName = this.userEdit.lastName;
                this.request.email = this.userEdit.email;
                this.request.photo = this.userEdit.pictureUrl;
                this.userPhoto  = this.userEdit.pictureUrl;
                if(this.showMineProfile){
                     this.request.groups = this.userEdit.groups.map((g)=>g.id);
                }else{
                     this.request.groups = this.userEdit.groups.map((g)=>g.groupId);
                     console.log('Request',this.request.groups,'userEdit',this.userEdit.groups)
                }
                
                this.request.info = this.userEdit.info;
                this.request.password = this.userEdit.password;
                this.$forceUpdate();   
            }

            //Workaround pra remover as agencias nulas;
           this.agencys = this.agencys.filter(a=> a);
           

        }).catch(erro=>{            
            this.mxShowModalError(erro)
        });


       
    },    
    computed:{
        ...mapGetters(['getUser','getGroups']),
        agency:{
            set:function(newValue){       

                this.request.info =  this.request.info.filter(e => e.key != 'agencia' );                
                newValue.forEach(e=>{
                    this.request.info.push({key:'agencia',value:e});
                });                          
                
            },
            get:function(){                   
               return this.request.info.filter(e=> e.key == 'agencia').map(ee=>{
                   return ee.value;
               })
            }
        },
        telefone:{
            set:function(newValue){
                if(this.request.info.some(e => e.key == 'telefone')){
                    this.request.info.find(e=> e.key == 'telefone').value = newValue
                }else{
                    this.request.info.push({key:'telefone',value:newValue});
                }
            },
            get:function(){
                 let info = this.request.info.find(e=> e.key == 'telefone');
                return (info && info.value) || ''; 
            }
        },
        linkedin:{
            set:function(newValue){
                if(this.request.info.some(e => e.key == 'linkedin')){
                    this.request.info.find(e=> e.key == 'linkedin').value = newValue
                }else{
                    this.request.info.push({key:'linkedin',value:newValue});
                }
            },
            get:function(){
                let info = this.request.info.find(e=> e.key == 'linkedin');
                return (info && info.value) || '';               
            }
        },
        cpf:{
            set:function(newValue){
                if(this.request.info.some(e => e.key == 'cpf')){
                    this.request.info.find(e=> e.key == 'cpf').value = newValue
                }else{
                    this.request.info.push({key:'cpf',value:newValue});
                }
            },
            get:function(){
                let info = this.request.info.find(e=> e.key == 'cpf');
                return (info && info.value) || '';               
            }
        },
        agencia:{
            set:function(newValue){
                if(this.request.info.some(e => e.key == 'agencia')){
                    this.request.info.find(e=> e.key == 'agencia').value = newValue
                }else{
                    this.request.info.push({key:'agencia',value:newValue});
                }
            },
            get:function(){
                let info = this.request.info.find(e=> e.key == 'agencia');
                return (info && info.value) || '';               
            }
        }
    },
    methods:{
        ...mapActions(['updatePhoto','updateUser']),
        checkConditions(){

            let conditions = AbilityFactory.getRule()[0].conditions;               
            if(conditions && conditions.agencys && conditions.agencys.length > 0){
                let tempAgency = [];
                
                conditions.agencys.forEach(a=>{
                    let agency = this.agencys.find(e=>e.id == a.id);
                    tempAgency.push(agency);
                });

                  this.agencys = tempAgency;   
            } 
            
            if(conditions && conditions.profile && conditions.profile.length > 0){
                let tempProfile = [];
                
                conditions.profile.forEach(a=>{
                    let profile = this.groups.find(e=>e.id == a);
                    tempProfile.push(profile);
                });

                this.groups = tempProfile;                
            } 


        },
        resendEmail(){
           this.loading = UserService.resendAcces(this.userEdit.email).then(()=>{
               this.mxShowModal({title:'Informação', message:' E-mail enviado com sucesso!'}); 
           }).catch(erro=>{
               this.mxShowModalError(erro);
           });  
        },
        removePhoto(){            
            this.userPhoto = undefined;
            document.getElementById('file-load-photo').value = '';
        },
        addPhoto(){
            let inputLoadPhoto =  document.getElementById('file-load-photo');
            inputLoadPhoto.click();
            inputLoadPhoto.onchange = (e)=>{
                
                if(e.target.files.length == 0){return;}

                if(e.target.files[0].size > 524288){
                    this.mxShowModal('Imagem maior que 50 mb'); 
                    return
                }

                let reader = new FileReader();

                reader.onload = (re)=>{                                       
                   this.userPhoto = re.target.result;
                }
                reader.readAsDataURL(e.target.files[0]); 
            }
        },

        saveUser(){

            //Caso o usuário edite a suas informações pela listagem de usuário
            //atualiza suas informações
            if(this.getUser.email == this.request.id && !this.showMineProfile){
                this.showMineProfile = true;
            }

            this.loading = this.$validator.validateAll().then((valid)=>{
                                  
                this.request.id = this.request.email;
                this.request.photo = this.userPhoto;                

                if(valid && !this.userEdit){                                 
                    this.request.info.push({key:'primeiro_acesso', userId: this.request.id, value:'true'});
                    this.request.info.push({key:'ultimo_acesso', userId: this.request.id, value: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')});
                    this.request.info.push({key:'trocar_senha', userId: this.request.id, value: moment(new Date()).format('YYYY-MM-DD')});
                    this.request.userMaster = this.getUser.email;
                    return UserService.saveUser(this.request).then(()=>{
                      this.savedSuccess('Usuário criado com sucesso!');
                    });
                }else if(valid && this.userEdit){
                    
                  return UserService.updateUser(this.request).then(()=>{  
                      if(this.showMineProfile){
                          this.updatePhoto(this.userPhoto); 
                          this.updateUser(this.request);   
                      }                      
                      this.savedSuccess('Usuário atualizado com sucesso!');
                  })
                }

            }).catch(erro=>{
                this.mxShowModalError(erro);
            });
        },
        savedSuccess(msg){

            this.mxShowModal({title:'Informação', message:msg}).then(()=>{
                if(this.showMineProfile){
                    route.push({name:'home'});
                }else{
                    this.$emit('back');
                }
                this.request = {groups:[], info:[]};
            })
            
        },       
    },
    watch:{
        userEdit(newValue){
          
            if(newValue){
                this.request.id = this.userEdit.email;
                this.request.firstName = this.userEdit.firstName;
                this.request.lastName = this.userEdit.lastName;
                this.request.email = this.userEdit.email;
                this.request.photo = this.userPhoto === '../../../assets/images/avatar-null.jpg' ? '' :this.userPhoto;
                this.request.groups = this.userEdit.groups.map((g)=>g.groupId);
                this.request.info = this.userEdit.info;
                this.request.password = this.userEdit.password;
            }
        }
    }
}
</script>

<style lang="scss" scoped>

input{
    z-index: 10;
}

#company option{

   background-color: rgba(0,0,0,0.9);
    
}

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
    padding: 20px;
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
     background-color: rgba(37,239,147,0.4);
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
