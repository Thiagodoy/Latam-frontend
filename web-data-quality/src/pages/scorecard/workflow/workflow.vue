<template>
    <div>
         <div class="row">
                <div class="col-md-12">
                    <div class="wrapper-filtros">
                        <div class="form-group mr-3" >
                            <label >Mês</label>
                            <select class="form-control campos" style="opacity:.7" >
                                <option >Setembro/2019</option>
                                <option >Outubro/2019</option>
                                <option >Novembro/2019</option>
                                <option >Dezembro/2019</option>
                            </select>
                        </div>
                        <div class="form-group" >
                            <label >Agência</label>
                            <select class="form-control campos" style="opacity:.7" >
                                <option >Agência 1</option>
                                <option >Agência 2</option>
                                <option >Agência 3</option>
                                <option >Agência 4</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <entrega-im></entrega-im> 
            <revisar></revisar>
            <aprovar></aprovar> 



        
    </div>
</template>
<script>
import EntregaIm from './entrega-im';
import Aprovar from './aprovar-apuracao';
import Revisar from './revisar-apuracao';

export default {
    data(){
        return{
           
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


</style>