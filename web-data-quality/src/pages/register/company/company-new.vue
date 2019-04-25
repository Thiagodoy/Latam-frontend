<template>  
    <div>
        <div class="tool mb-2">
            <div   @click="$emit('back')" class="tool-view-item"><i class="fas fa-arrow-circle-left"></i>&nbsp;{{$t('lang.button_back')}}</div> &nbsp; &nbsp;&nbsp;
        </div>

        <div class="wrapper">
            <div class="row">
               <div class="col-md-6">
                    <div class="col-md-12">
                        <div class="form-group" :class="{'has-error':errors.has('agency')}">
                            <label class="" >{{$t('lang.table_agency_name')}}</label>
                            <input v-validate="'required'" type="text" class="form-control campos" :placeholder="$t('lang.table_agency_name')"  >
                            <span>{{ errors.first('agency') }}</span>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group" >
                            <label >{{$t('lang.table_agency_input_path')}}</label>
                            <input v-validate="'required'" type="text" class="form-control campos" :placeholder="$t('lang.table_agency_input_path')"   >
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group" >
                            <label >{{$t('lang.table_agency_processed_path')}}</label>
                            <input v-validate="'required'" type="text" class="form-control campos" :placeholder="$t('lang.table_agency_processed_path')"   >
                        </div>
                    </div>
                    </div>
                    <div class="col-md-6">
                        <div class="col-md-12">
                            <div class="form-group" >
                                <label >{{$t('lang.table_agency_local_file_path')}}</label>
                                <input v-validate="'required'" type="text" class="form-control campos" :placeholder="$t('lang.table_agency_local_file_path')"   >
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group" >
                                <label >{{$t('lang.table_agency_code')}}</label>
                                <input v-validate="'required'" type="text" class="form-control campos" :placeholder="$t('lang.table_agency_code')"   >
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12 pt-2">
                        <div class="checks ml-3 mb-3">
                            <input class="ml-2" type="checkbox" value="0" name="campo-checkbox" id="od" />
                            <label class="checkboxtext mr-3" for="od">{{$t('lang.table_Agency_od_flag')}}</label>&nbsp;
                           
                            <input type="checkbox" value="0" name="campo-checkbox" id="aproved" />
                            <label for="aproved">{{$t('lang.table_agency_flag_approved')}}</label>&nbsp;&nbsp;|&nbsp;&nbsp;

                            <span class="mt-3">{{$t('lang.table_agency_flag_monthly')}}:</span>&nbsp;
                            <input class="ml-2" type="radio" value="0" name="campo-checkbox" id="m" /><label>M</label>&nbsp;&nbsp;
                            <input class="ml-2" type="radio" value="0" name="campo-checkbox" id="s" /><label>S</label>
                        </div>

                    </div>

                    <div class="col-md-6 mt-3 ml-3">                        
                        <button v-if="!(typeAction == 'VIEW')"  style="color:#fff" @click="saveAgency()" class="btn btn-default btn-large" :disabled="(errors.items.length > 0)">{{$t('lang.button_save')}}</button>
                        <button  style="color:#fff" @click="$emit('back')" class="btn btn-default btn-large ml-3 ">{{$t('lang.button_cancel')}}</button>                       
                    </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },

    methods:{

        saveAgency(){

              this.$validator.validateAll().then((valid)=>{

                   if(valid){

                        alert("Salvar");

                   }
                   
                   else{

                        

                   }


              })

          

        }

    }

}


</script>

<style lang="scss" scoped>

input[type=checkbox]
{
  /* Double-sized Checkboxes */
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  padding: 10px;
  margin-right: 10px;
}

input[type=radio]
{
  /* Double-sized Checkboxes */
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  padding: 10px;
  margin-right: 10px;
}

/* Might want to wrap a span around your checkbox text */
.checkboxtext
{
  /* Checkbox text */
  font-size: 110%;
  display: inline;
}

.wrapper{
     background-color: rgba(0,0,0,0.5);
     width: 100%;
    
     padding:60px;

}

.tool{
     background-color: rgba(0,0,0,0.5);
     width: 100%;
     display: flex;
     border-radius:5px;
     padding: 10px;

     .tool-view-item:hover{
         cursor: pointer;
         color: #ffed69;}
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

.labels{
    color:#ccc;
}





</style>


