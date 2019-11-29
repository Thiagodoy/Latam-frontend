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
                
                
                <input  v-if="!filterSelected || filterSelected != 'date' "  style="color:#eee" class="input-search form-control mx-auto" v-model="searchText" @keyup="search"  type="text" :placeholder="labelFilter"/>
                <datepicker v-model="searchText" @selected="search" v-if="filterSelected == 'date'"  :clear-button="true" :clear-button-icon="'fas fa-backspace'"  input-class="input-date"    style="color:#222;max-width:50%; min-width:200px" class="form-control  ml-2"  placeholder="DD/MM/YYYY" format="dd/MM/yyyy"></datepicker>  
            </div>

            <!--
            <div v-if="config.filter.length > 0" class="toolbar-item input-search-box">
                <select required class="input-search form-control mx-auto">
                     <option style="color:#999;" class="select-place" value="" selected >Exc. vendas</option>
                    <option value="1">Executivo de venda 1</option>
                    <option value="2">Executivo de venda 2</option>
                </select>
            </div>
             <div v-if="config.filter.length > 0" class="toolbar-item input-search-box" :placeholder="labelFilter">
                   <select required class="input-search form-control mx-auto">
                 
                    <option style="color:#999;" class="select-place" value="" selected>Exc. Planejamento</option>
                    <option>Executivo de planejamento 1</option>
                    <option>Executivo de planejamento 2</option>
                </select>
            </div>
            -->



        </div>

    </div>
</template>

<script>
import _ from 'lodash';
import VueTimepicker from 'vue2-timepicker';
import moment from 'moment';
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
                 if(this.filterSelected == 'date'){ this.searchText = moment(this.searchText).format("DD/MM/YYYY")}
                
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

select:invalid{
    color:#ccc;
}

select option{
    color: #444;
    margin: 5px;
}

label,p,span{
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
