<template>  
    <div>
        <div class="tool mb-2">
            <div   @click="$emit('back')" class="tool-view-item"><i class="fas fa-arrow-circle-left"></i>&nbsp;{{$t('lang.button_back')}}</div> &nbsp; &nbsp;&nbsp;
        </div>

        

        <div class="wrapper">
            <div class="row">
               <div class="col-md-6">
                    <div class="col-md-12">
                        <div class="form-group" >
                            <label class="" >{{$t('lang.table_agency_name')}}</label>
                            <input disabled v-model="viewAgency.name" type="text" class="form-control campos" :placeholder="$t('lang.table_agency_name')"  >
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group" >
                            <label >{{$t('lang.table_agency_input_path')}}</label>
                            <input disabled v-model="viewAgency.inputPath" type="text" class="form-control campos" :placeholder="$t('lang.table_agency_input_path')"   >
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group" >
                            <label >{{$t('lang.table_agency_processed_path')}}</label>
                            <input disabled v-model="viewAgency.processedPath" type="text" class="form-control campos" :placeholder="$t('lang.table_agency_processed_path')"   >
                        </div>
                    </div>
                    </div>
                    <div class="col-md-6">
                        <div class="col-md-12">
                            <div class="form-group" >
                                <label >{{$t('lang.table_agency_local_file_path')}}</label>
                                <input disabled v-model="viewAgency.localFilePath" type="text" class="form-control campos" :placeholder="$t('lang.table_agency_local_file_path')"   >
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group" >
                                <label >{{$t('lang.table_agency_code')}}</label>
                                <input disabled v-model="viewAgency.agencyCode" type="text" class="form-control campos" :placeholder="$t('lang.table_agency_code')"   >
                            </div>
                        </div>

                         <div class="col-md-12">
                            <div class="form-group" >
                                <label >{{$t('lang.table_agency_s3')}}</label>
                                <input disabled v-model="viewAgency.s3Path" type="text" class="form-control campos" :placeholder="$t('lang.table_agency_s3')"   >
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12 pt-2">
                        <div class="checks ml-3 mb-3">
                            <input disabled class="ml-2 campo-check" type="checkbox" value="0" name="campo-checkbox" id="od" />
                            <label   class="checkboxtext mr-3" for="od">{{$t('lang.table_Agency_od_flag')}}</label>&nbsp;
                           
                            <input disabled type="checkbox" value="0" name="campo-checkbox" id="approved" />
                            <label for="approved">{{$t('lang.table_agency_flag_approved')}}</label>&nbsp;&nbsp;|&nbsp;&nbsp;

                            <span class="mt-3">{{$t('lang.table_agency_flag_monthly')}}:</span>&nbsp;
                            <input disabled dia class="ml-2" type="checkbox" value="0"  id="m" /><label>M</label>&nbsp;&nbsp;
                            <input disabled class="ml-2 campo-check" type="checkbox" value="0"  id="s" /><label>S</label>
                        </div>

                    </div>

                    <div class="col-md-6 mt-3 ml-3">                        
                                     
                    </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {

props:['viewAgency'],

data(){
    return{
        odchecked:undefined,
        approvedChecked:undefined,
    }
},

mounted(){

    if(this.viewAgency.odFlag == 1){
        document.getElementById('od').checked = true;
    }

    if(this.viewAgency.flagApproved == 1){
        document.getElementById('approved').checked = true;
    }

    if(this.viewAgency.flagMonthly == 'S'){
           document.getElementById('s').checked = true;
    }

    if(this.viewAgency.flagMonthly == 'M'){
           document.getElementById('m').checked = true;
    }

   
   
   
   
  // document.getElementById('m').checked = true
 


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
  background: #ffed69;
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
        color: #111;
        font-size:18px;
    }
    &:focus{
       color:#fff;  
    }
    &:active{
       
    }
}

.campo-check{
    background: red;
}

.labels{
    color:#ccc;
}





</style>


