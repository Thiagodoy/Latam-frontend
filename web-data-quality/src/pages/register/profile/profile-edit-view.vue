<template>
    <div class=" mt-3 wrapper-view-edit">
        <div class="infos-box col-md-10 ">
                <div class="row">
                    <div class="col-md-4">                         
                         <div style="color:#fff;" class="form-group" :class="{'has-error': errors.has('name')}">
                            <label for="exampleInputEmail1">{{$t('lang.label_input_group_name')}}:</label>
                            <input :disabled="type == 'VIEW'" style="color:#eee" v-validate="'required'" v-model="request.name" type="text" class="form-control" name="name"  :placeholder="$t('lang.label_input_group_name')" >
                        </div>
                        <div class="help-block">{{errors.first('name')}}</div>                        
                    </div>
                    <div class="col-md-4">
                         <div class="form-group" :class="{'has-error': errors.has('type')}">
                            <label for="exampleInputEmail1">{{$t('lang.table_view_group_type')}}</label>
                            <input :disabled="type == 'VIEW'" style="color:#eee" v-validate="'required'" name="type" v-model="request.type"  type="text" class="form-control"  :placeholder="$t('lang.table_view_group_type')" >
                            <div class="help-block">{{errors.first('type')}}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group" :class="{'has-error':errors.has('rev')}">
                            <label for="exampleInputEmail1">{{$t('lang.table_view_group_rev')}}:</label>
                            <input :disabled="type == 'VIEW'" style="color:#eee" v-validate="'required'" name="rev"  type="number" v-model="request.rev" class="form-control"  :placeholder="$t('lang.table_view_group_rev')">
                            <div class="help-block">{{errors.first('rev')}}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                                         
                    </div>
                </div>
                <div class="row mt-1">
                    <div class="col-md-6">                        
                        <button v-if="!(type == 'VIEW')"  style="color:#fff" @click="saveGroup()" class="btn btn-default btn-large" :disabled="(errors.items.length > 0)">{{$t('lang.button_save')}}</button>
                        <button  style="color:#fff" @click="$emit('back')" class="btn btn-default btn-large ml-3 ">{{$t('lang.button_cancel')}}</button>                       
                    </div>
                     <div class="col-md-4">                        
                           
                       
                    </div>
                </div>   
            </div>
    </div>
</template>
<script>
import GroupService from '../../../services/group';
export default {
    props:['group', 'type'],
    data(){
        return {
            request:{},
            loading:undefined

        }
    },
    mounted(){
        this.request = this.group ? this.group : {};        
    },
    computed:{
        
    },
    methods:{
        saveGroup(){
            // FIXME: Put the loading

            this.request.id = this.request.name.toLowerCase();              
            this.loading = this.$validator.validateAll().then((valid)=>{
                if(valid){
                   let promise = this.type == 'EDIT' ? GroupService.updateGroup(this.request) : GroupService.saveGroup(this.request);                   
                   return Promise.all([promise]).then((response)=>{
                       this.request = {};
                       this.$emit('back');
                   })
                }
            });
        }
    }
}
</script>
<style>
input:disabled{
    background-color: rgba(255,255,255,0.6) !important;
    color:#000;
    cursor:not-allowed;
}
.wrapper-view-edit{
     background-color: rgba(0,0,0,0.3);
     margin: 0px;
    color:#ddd;
}
</style>


