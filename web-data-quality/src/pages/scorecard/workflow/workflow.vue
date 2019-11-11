<template>
    <div>  

        <div>
            <div class="wrapper-abas">
                <div @click="mudarAba('im')" v-if="$can('manage', 'Workflow-im')" class="abas" :class="{active:abaIsActive == 'im'}"  >IM</div>
                <div @click="mudarAba('planejamento')" v-if="$can('manage', 'Workflow-planejamento')" class="abas" :class="{active:abaIsActive == 'planejamento'}" >Planejamento</div>
                <div  @click="mudarAba('performance')" v-if="$can('manage', 'Workflow-performance')" class="abas" :class="{active:abaIsActive == 'perfomance'}"  >Performance</div>

            </div>
            <div class="wrapper-workflows">
                <div   v-if="$can('manage', 'Workflow-im')" class=" conteudo conteudo-im">
                        <entrega-im v-if="abaIsActive == 'im'" ></entrega-im> 
                </div>
                <div  v-if="$can('manage', 'Workflow-planejamento')" class=" conteudo conteudo-revisar">
                        <revisar  v-if="abaIsActive == 'planejamento'" ></revisar>
                </div>
                <div  v-if="$can('manage', 'Workflow-performance')" class="conteudo conteudo-aprovar">
                        <aprovar v-if=" abaIsActive == 'performance'" ></aprovar> 
                </div>
            </div>


        </div>

  
    </div>
</template>
<script>
import EntregaIm from './entrega-im';
import Aprovar from './aprovar-apuracao';
import Revisar from './revisar-apuracao';
import {mapGetters} from 'vuex'

export default {
    data(){
        return{
          abaIsActive : "im"
           
        }
    },

    mounted() {
        console.log("USUARIO",this.getUser);
        switch (this.getUser.groups[0].id) {
            case 'analista de performance': this.abaIsActive = 'performance' ; break;
            case 'executivo de planejamento': this.abaIsActive = 'planejamento' ; break;
        
            default: "im"
                break;
        }
    },

    computed:{
        ...mapGetters(['getUser'])

    },

    methods: {
        mudarAba(value){
            this.abaIsActive = value;
        }
    },



    components:{
        EntregaIm,
        Aprovar,
        Revisar
    }
    
}
</script>

<style lang="scss" scoped>
.wrapper-filtros{
    display: flex;
    justify-content: center;
}
select{
     background-color: rgba(0,0,0,0.5);
}
option{
    color: #666;
}

.wrapper-abas{
    display: flex;
  
    margin-top: 15px;
   border-bottom: #fff solid 1px;
   
   
   

}

.abas{
    padding: 10px;
 
    
   
   text-align: center;
   cursor: pointer;
}

.conteudo{
  
}

.active{
    color: #ff0
}


</style>