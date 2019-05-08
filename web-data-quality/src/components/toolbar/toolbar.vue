<template>
    <div v-if="config" class="all-toobar ">
        <div class="wrapper-toolbar  ">
            <div class="toolbar-item ">
               
               <template v-for="(v,i) in config.buttons">                    
                    <span   :key="i + 2" @click="$emit(v.emit)" :class="v.class">
                        <i  v-if="v.icon"  :class="v.icon"></i>&nbsp;{{$t(`lang.${v.label}`)}}&nbsp;
                        
                    </span>
               </template>
               
               
                <span v-if="config.filter.length > 0" class=" dropdown-toggle btn-search"   data-toggle="dropdown" aria-haspopup="true" >
                    &nbsp; <i class="fas fa-search"></i>
                </span>
                <div v-if="config.filter.length > 0" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <span v-for="(v,i) in config.filter"  :key="i + 3" @click="filterSelected = v.attribute" class="dropdown-item">{{$t(`lang.${v.label}`)}}</span>
                </div>&nbsp;
            </div> &nbsp;  
            <div v-if="config.filter.length > 0" class="toolbar-item input-search-box">
                  <input style="color:#eee" class="input-search form-control mx-auto" v-model="searchText" @keyup="search"  type="text" :placeholder="labelFilter"/>
            </div>
        </div>

    </div>
</template>

<script>
import _ from 'lodash';
export default {
    props:{config:Object},
    data(){
        return{            
            labelFilter:this.$t('lang.label_select_option'),
            filterSelected:undefined,
            filter:{},
            searchText:''
        }
    },
    mounted(){        
    },
    methods:{
        search:_.debounce(function(){
             if(this.filterSelected ){
                this.filter[this.filterSelected] = this.searchText.length > 0 ? this.searchText : undefined;                
                this.$emit('filter',this.filter);                   
             }else{
                 this.mxShowModal({title:'Informação', message:'Selecione um filtro!'});
             }   
        },400),
    },
    watch:{
        filterSelected(newValue,oldValue){
            delete this.filter[oldValue];
            this.searchText = '';
            let key = this.config.filter.find((f)=>f.attribute == newValue).label;
            this.labelFilter = this.$t(`lang.${key}`);
            this.filter[newValue] = undefined;
            
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
