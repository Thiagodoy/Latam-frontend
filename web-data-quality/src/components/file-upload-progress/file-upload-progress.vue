<template>    
        <tr v-if="file">
            <td>{{file.name}}</td>
            <td>
                <div class="progress">
                    <div class="progress-bar" :class="{'bg-danger':error}" role="progressbar" :style="{width : `${percentUpload}%`}" :aria-valuenow="percentUpload" aria-valuemin="0" aria-valuemax="100">{{`${percentUpload}%`}}</div>
                </div>
                <p v-if="error"  class="text-center message-error" role="alert">
                        {{$t(message)}}
                </p>

            </td>   
        </tr>
</template>
<script>
import FileService from '../../services/file';
import { error } from 'util';
import axios from 'axios';
import { setTimeout } from 'timers';
export default {
    props:['fileInput','index'],
    data(){
        return {
           percentUpload: 0 ,
           error:undefined,
           message:'',
           company:'teste',
           userId:'user',
           file:undefined
        }
    },
    mounted(){
        this.file = this.fileInput;
        let formData =  new FormData();
        formData.append('file',this.file);


        axios.post(`${process.env.VUE_APP_BASE_PATH}/file/${this.company}/${this.userId}`, formData, {
            onUploadProgress: (event)=>{
              this.percentUpload =  Math.round((event.loaded/event.total)*100);                  
            },
            transformResponse: [(data)=> {                  
                this.message = `lang.msg_error_${data}`; 
                return data;
            }],
        }).then(()=>{
           setTimeout(()=>{
               this.file = undefined
               this.$emit('finished', this.index);
           },800) 
           
        }).catch((erro)=>{
            console.log('erro',erro.message)
             this.error = true;
        });      
    },
  
}
</script>
<style lang="scss" scoped>
.message-error{
    color: red;
    font-weight: bold;
    margin-top: 0.15em;
}
</style>


