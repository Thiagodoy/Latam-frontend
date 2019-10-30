<template>
    <div>
       <div v-if="show =='home'">
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
            <div class="wrapper-card mt-4">
            
                    <div class="card">
                        <div class="card-title">Frequência</div>
                        <div class="card-icone">
                            <img @click="show ='frequencia'" style="cursor:pointer" src="img/success_large.svg">      
                        </div>
                        <div class="card-body">
                            <div><span style="font-size:18px;"> Envio diário</span><br><small style="color:#888;font-size:10px;">(Dias entregues/Dias Uteis)</small></div>
                            <div style="font-size:20px; color:#ffed69;">18/20</div>    
                        </div>
                    </div>
            
                
                    <div class="card">
                        <div class="card-title">Informações</div>
                        <div class="card-icone">
                            <img @click="show ='info'" style="cursor:pointer" src="img/success_large.svg">   
                        </div>
                        <div class="card-body">
                            <div>
                                <div><span style="font-size:18px;">Emissão diária</span><br><small style="color:#888;font-size:10px;">(Dias entregues/Dias de emissão</small></div> 
                                <div style="font-size:20px; color:#ffed69;">28/28</div>
                            </div>
                            <div>
                                <div><span  style="font-size:18px;" >Info Empresas</span><br><small style="color:#888;font-size:10px;">(Pontos)</small></div> 
                                <div style="font-size:20px; color:#ffed69;">10/10</div>
                            </div>
                        </div>
                        
                    </div>
            
                
                    <div class="card">
                        <div class="card-title">Qualidade</div>
                        <div class="card-icone">
                            <img @click="show ='qualidade'" style="cursor:pointer" src="img/success_large.svg">   
                        </div>
                        <div class="card-body">
                            <div><span style="font-size:18px;">Aproveitamento</span><br><small style="color:#888;font-size:10px;margin-top:-10px">(% de linhas aproveitadas)</small></div>
                            <div style="font-size:20px; color:#ffed69;">97%</div>    
                        </div>
                    
                    </div>
            
            </div>
        </div> <!--home-->  

        <!-- Detalhes -->
        <frequencia-detalhada v-if="show == 'frequencia'" @back="show = 'home'"></frequencia-detalhada> 
        <informacao-detalhada v-if="show == 'info'" @back="show = 'home'"></informacao-detalhada> 
        <qualidade-detalhada v-if="show == 'qualidade'" @back="show = 'home'"></qualidade-detalhada> 
   
   
   
   
    </div>
</template>



<script>
import FrequenciaDetalhada from './frequencia-detalhada'
import InformacaoDetalhada from './informacao-detalhada'
import QualidadeDetalhada from './qualidade-detalhada'
export default {
    data(){
        return{
             show:'home',
        }
    },

    components:{
        FrequenciaDetalhada,
        InformacaoDetalhada,
        QualidadeDetalhada
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

.wrapper-card{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.card{
  
     background-color: rgba(0,0,0,0.5);
     margin-bottom: 15px;
     color: #ddd;
     min-height: 260px;
     min-width: 300px;
     max-width: 32%;
     width: 100%;
     margin: 5px;
}

.card-title{
    text-align: center;
    padding: 10px;
    background-color: rgba(0,0,0,0.6);
    font-size: 20px;
    color: #ddd;
}

.card-icone{
    padding: 10px;
    text-align: center;
}

.card-body{
    display: flex;
    justify-content: space-between;
}
</style>