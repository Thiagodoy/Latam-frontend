<template>

    <div class="all-user-new">
        <div  class="alert alert-success text-center" role="alert">
           Saved successfully
        </div>
        <div class="tool-edit mb-2">
            <div   @click="$emit('change','home')" class="tool-view-item"><i class="fas fa-arrow-circle-left"></i>&nbsp;Back</div> &nbsp; &nbsp;&nbsp;
          
        </div>
        
         <div class="row mt-3 wrapper-view-edit">
            <div class="picture-box col-md-2 text-center">
                <img class="img-fluid rounded-circle avatar-view mb-2"  src="../../../assets/images/avatar-null.jpg"/><br>
                <span  class="change-photo"><i class="far fa-save"></i>&nbsp;Add photo</span>
            </div>
            <div class="infos-box col-md-10">
                <div class="row">
                    <div class="col-md-6">
                         <div style="color:#fff;" class="form-group">
                            <label for="exampleInputEmail1">First Name:</label>
                            <input style="color:#eee"  type="email" class="form-control" id="" value="" placeholder="First Name..." >
                        </div>
                    </div>
                    <div class="col-md-6">
                         <div class="form-group">
                            <label for="exampleInputEmail1">Last Name:</label>
                            <input style="color:#eee"  type="email" class="form-control" id="" value="" placeholder="Last Name..." >
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="exampleInputEmail1">E-mail:</label>
                            <input style="color:#eee"  type="email" class="form-control" id="" value="" placeholder="E-mail...">
                        </div>

                    </div>
                </div>
                <div class="row mt-1">
                    <div class="col-md-6">
                        
                            <button style="color:#fff" class="btn btn-default btn-large ">Save</button>
                             <button  style="color:#fff" class="btn btn-default btn-large ml-3 ">Cancel</button>
                       
                    </div>
                     <div class="col-md-4">
                        
                           
                       
                    </div>
                </div>   
            </div>
        </div>
        
    </div>
    
</template>

<script>
export default {

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
