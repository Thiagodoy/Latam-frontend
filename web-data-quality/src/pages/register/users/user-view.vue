<template>

    <div class="all-user-view">
        <div class="tool-view">
            <div @click="$emit('change','home')" class="tool-view-item"><i class="fas fa-arrow-circle-left"></i>&nbsp;Back</div> &nbsp; &nbsp;&nbsp;
            <div @click="$emit('change','edit')" class="tool-view-item"><i class="fas fa-pen mr-3" ></i>Edit</div>&nbsp; &nbsp;&nbsp;
            <div class="tool-view-item"><i class=" btn-option far fa-times-circle" title="Delete"></i>&nbsp;Delete</div>
        </div>
        <div class="row mt-3 wrapper-view-info">
            <div class="picture-box col-md-2 text-center">
                <img class="img-fluid rounded-circle avatar-view"  src="../../../assets/images/avatar.jpg"/>
            </div>
            <div class="infos-box col-md-10">
                <div class="row">
                    <div class="col-md-6">
                         <div style="color:#fff;" class="form-group">
                            <label for="exampleInputEmail1">First Name:</label>
                            <input  type="text" class="form-control" id="" value="Batman " disabled>
                        </div>
                    </div>
                    <div class="col-md-6">
                         <div class="form-group">
                            <label for="exampleInputEmail1">Last Name:</label>
                            <input  type="text" class="form-control" id="" value="José da Silva" disabled>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="exampleInputEmail1">E-mail:</label>
                            <input  type="text" class="form-control" id="" value="batmam@dc.com.br" disabled>
                        </div>

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
.tool-view{
     background-color: rgba(0,0,0,0.5);
     width: 100%;
     display: flex;
     border-radius:5px;
     padding: 10px;

     .tool-view-item:hover{
         cursor: pointer;
         color: #ffed69;}

}

.wrapper-view-info{
     background-color: rgba(0,0,0,0.3);
     margin: 0px;
    color:#ddd;

}

input:disabled{
    background-color: rgba(255,255,255,0.6);
    color:#000;
    cursor:not-allowed;
}

.picture-box{
   padding: 15px;
   .avatar-view{
     
   }

}
.infos-box {
     padding: 15px;

}

@media (max-width: 600px) {
    .tool-view{
        justify-content: center;

    }
    
}


</style>
