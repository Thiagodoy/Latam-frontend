<template>
    <div class="all-toobar ">
        <div class="wrapper-toolbar  ">
            <div class="toolbar-item ">
               
                <span @click="$emit('change','new')" class="btn-add-user">
                    <i class="fas fa-user-plus  "></i>&nbsp; New  &nbsp;
                </span>
               
               
                <span class=" dropdown-toggle btn-search"   data-toggle="dropdown" aria-haspopup="true" >
                    &nbsp; <i class="fas fa-search"></i>
                </span>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <span @click="selectFilter" class="dropdown-item" value="First Name" >First Name</span>
                    <span class="dropdown-item" >Last Name</span>
                    <span class="dropdown-item" >E-mail</span>  
                </div>&nbsp;
            </div> &nbsp;  
            <div class="toolbar-item input-search-box">
                  <input style="color:#eee" class="input-search form-control mx-auto"  type="text" :placeholder="labelFilter"/>
            </div>
        </div>

    </div>
</template>

<script>
export default {

    data(){
        return{
            labelFilter:"Select filter...",
            filter:"",
        }
    },

    methods:{
        selectFilter(data){
            this.labelFilter="Fist Name";
        },

         buttonClick(action){
          this.$emit(action);
        },

    }

}
</script>

<style lang="scss" scoped>


label,p,span,{
    font-size: 1rem;
}


.all-toolbar{
   background: #ffed69;
}



.wrapper-toolbar{
    width: 100%;
   
    display: flex;
    justify-content:center;
    align-items: center;
    padding: 10px 5px 10px 5px ;
    border: #fff 1px solid .5;
    border-radius: 5px;
    background-color: rgba(0,0,0,0.5);
    font-size:1em;



}


.btn-add-user:hover,.btn-search:hover{
   
    color:#ffed69;
    cursor: pointer;
     
    
}

.dropdown-menu span:hover{
    cursor: pointer;
}

@media (max-width: 600px) 
{
    .wrapper-toolbar{
     flex-direction: column;
     padding: 10px 0 10px 0  ;

    .btn-search{
        margin-top: -15px;
    }

  
       

    .input-search{
        margin-top: -16px; 
        width: 90%;
        ;
    }

    }
}


</style>
