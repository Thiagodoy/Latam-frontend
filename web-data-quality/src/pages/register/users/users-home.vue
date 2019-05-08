<template>
    <div class="all-user-home">
        <div v-if="show =='home'">
            <!-- Conponente Toolbar -->
            <toolbar 
                :config="configToolbar"
                @filter="setFilter"
                @new="show = 'new'" 
            ></toolbar>
            <!--Componente DataTable -->
            <data-table
                :config="configTable"
                :data="data"
                @page="setPage"
                @view="viewUser"
                @edit="editUser"
                @delete="deleteUser"
            ></data-table>   
          
 
        </div>

        <!--Componentes Options -->             
        <user-new-edit-view :userEdit="currentObject" :typeAction="typeAction" :showMineProfile="showMineProfile"  @back="show = 'home';f=false" v-if="show=='new'"></user-new-edit-view>    

           
    
    </div> 
</template>



<script>



import UserNewEditView from './user-new-edit-view.vue';
import Toolbar from '../../../components/toolbar/toolbar.vue';
import ToolbarConfigFactory from '../../../components/toolbar/toolbar-config-factory';
import DataTable from '../../../components/data-table/data-table.vue';
import DataTableConfigFactory from '../../../components/data-table/data-config-factory';
import UserService from '../../../services/user';
import GroupService from '../../../services/group'
import MockFactory from '../../../utils/mock-factory';
import _ from 'lodash';
import {mapGetters} from 'vuex';


export default {

    data(){
        return{
            perfil:undefined,
            currentObject:undefined,
            configTable: DataTableConfigFactory.build('DATA-TABLE-USER-VISUALIZATION'),
            configToolbar: ToolbarConfigFactory.build('TOOLBAR-USER-VISUALIZATION'),
            c:undefined,
            show:'home',
            typeAction:undefined,
            data:{
                conteudo:[],
                pagination:undefined
            },
            filter:{
                page:0,
                size:10
            },
            groups:[],
            showMineProfile:false,                        
        }
    },  
    mounted(){  

      if(this.$route.params.show == 'view'){       
         this.viewUser(this.getUser);
         this.showMineProfile = true;
      }else{
        this.loading =  Promise.all([this.getUsers(), this.getGroups()]);
      } 

    },
    beforeDestroy(){
        this.showMineProfile = false;        
    },
    computed:{
        ...mapGetters(['getUser','getIsMaster']),
    },
    methods:{

        deleteUser(data){
            this.mxShowModal({title:"Informação", message:`Deseja deletar esse usuário ${data.email}`, type:'YES-NO'}).then(response =>{
                if(response == 'YES'){
                    //Corrigir o loading
               this.loading = UserService.deleteUser({id:data.id}).then(response=>{this.getUsers()}).catch(erro=>{
                        this.mxShowModalError(erro);
                   }) 
                }
            })
        },
        editUser(data){
            this.currentObject = data;
            this.show = 'new';
            this.typeAction = 'EDIT';
        },   
        viewUser(data){
            this.currentObject = data;
            this.show = 'new';
            this.typeAction = 'VIEW';
        },     
        setPage(page){            
            let temp = {...this.filter};
            temp.page = page;
            this.filter = temp;            
        },
        setFilter(filter){    
            
            this.filter = _.merge({...filter},{
                page:0,
                size:10
            })
            
        },
        getUsers(){                        
           this.filter.userMaster = this.getIsMaster ? undefined : this.getUser.email; 
           return UserService.getUsers(this.filter).then((response)=>{
             
                response.content.forEach((e)=>{ 
                    e.pictureUrl = e.picture;
                    e.picture = e.picture ? MockFactory.build('MAKE_IMAGE_PROFILE',e.picture) :  MockFactory.build('MOCK_IMAGE_PROFILE') ;                  
                });
                
                var users = response.content;
                this.data.pagination = response

                 users.forEach(user => {

                     if(user.groups[0]){
                         user.group =  user.groups[0].groupId;
                     }else{
                         user.group = 'Usuário sem perfil cadastrado!';
                     }

                });

                this.data.pagination = response
                this.data.conteudo = users;
                }); 
        }, 
        getGroups(){
            return GroupService.getGroups({page:0,size:1000}).then((response)=>{
               this.groups = response;
            });
        }              
    },
    watch:{
        filter:{
            handler:function(newValue, oldValue){
                this.getUsers();
            },
            deep:true
        },
        show(newValue, oldValue){
            if(newValue == 'home'){
                this.currentObject = undefined;
                this.typeAction = undefined;
                this.getUsers();
            }
        }
    },
    components:{
        Toolbar,
        DataTable,        
        UserNewEditView,
    }
    
}


</script>
<style>
h1,p{
     font-family: Roboto, sans-serif;    
}
</style>

