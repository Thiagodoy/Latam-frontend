<template>    
        <tr v-if="file">
            <td>{{file.name}}</td>
            <td>

                <template v-if="true">
                    <div class="progress">
                        <div class="progress-bar" 
                        :class="{'bg-danger':status == 'ERROR', 'bg-success':status == 'SUCCESS', 'progress-bar-striped': (status == 'UPLOAD' && percentUpload > 98), 'progress-bar-animated':(status == 'UPLOAD' && percentUpload > 98)}" role="progressbar" :style="{width : `${percentUpload}%`}" :aria-valuenow="percentUpload" aria-valuemin="0" aria-valuemax="100">{{`${percentUpload}%`}}</div>
                    </div>
                    <p v-if="message && message.length > 0"  class="text-center" :class="{'message-error': status == 'ERROR','message-success': status == 'SUCCESS' }" role="alert">
                            {{$t(message)}}
                    </p>
                </template>              
               
            </td>
            <td>
                 <span v-if="(this.percentUpload < 100)" @click="cancelUpload()"><i class=" btn-option far fa-times-circle" title="Delete"></i></span>
            </td>   
        </tr>
</template>
<script>
import FileService from '../../services/file';
import axios from 'axios';
import { setTimeout } from 'timers';
import {mapActions, mapGetters } from 'vuex';

export default {
    props:['fileInput','index','uploadAws','uploadFtp','processFile'],
    data(){
        return {
           percentUpload: 0 ,
           status:'UPLOAD',
           message:'',
           company:'teste',
           userId:'user',
           file:undefined,
           cancelToken:undefined
        }
    },
    mounted(){
        this.file = this.fileInput.file;
        let formData =  new FormData();
        formData.append('file',this.file);


        let email = this.getUser.email;
        let agencia = this.fileInput.agency;
        var lo = this.getUser.info;
        this.cancelToken = axios.CancelToken.source();
        axios.post(`${process.env.VUE_APP_BASE_PATH}/file/${agencia}/${email}/${this.uploadAws}/${this.uploadFtp}/${this.processFile}`, formData, {
            onUploadProgress: (event)=>{
              this.percentUpload =  Math.round((event.loaded/event.total)*100);                  
            },
            cancelToken: this.cancelToken.token,
            transformResponse: [(data)=> {   
                let code = JSON.parse(data).codeMessage; 
                this.status = code == 1988 ? 'SUCCESS' : 'ERROR'
                this.message = `lang.msg_error_${JSON.parse(data).codeMessage}`; 
                return code;
            }],
        }).then(()=>{
           setTimeout((data)=>{               
               this.file = undefined
               this.$emit('finished', this.index);
           },2000) 
           
        }).catch((erro)=>{
             console.log('erro',erro.message);
             this.status = 'ERROR';
        });      
    },
    computed:{
        ...mapGetters(['getUser'])
    },
    methods:{
        cancelUpload(){
            this.cancelToken.cancel('Cancelado pelo usuário');
            this.message ='Cancelado pelo usuário' ;
             this.status = 'ERROR';
        }
    }
  
}
</script>
<style lang="scss" scoped>
.message-error{
    color: red;
    font-weight: bold;
    margin-top: 0.15em;
}

.message-success{
    color: #28a745!important;
    font-weight: bold;
    margin-top: 0.15em;
}
</style>


