
<template>
  <div>

     <!-- Botão para acionar modal -->
<button type="button" id="btn-show-accepted" style="display:none" class="btn btn-primary" data-toggle="modal" data-target="#ModalLongoExemplo">  
</button>

<!-- Modal -->
<div class="modal fade" data-backdrop="static" id="ModalLongoExemplo" tabindex="-1" role="dialog" aria-labelledby="TituloModalLongoExemplo" aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
 
        <h5 class="modal-title" id="TituloModalLongoExemplo"> {{$t('lang.modal_terms')}}</h5>
        
        
      
      </div>
      <div class="modal-body">

          <h4>INSTRUÇÕES GERAIS</h4><br>


        <p>A LATAM Airlines Brasil alerta que as senhas fornecidas aos nossos parceiros para
        acesso ao sistema LATAM BDA 2.0 (usuário e senha) são pessoais e intransferíveis, não
        devendo, em hipótese alguma, serem compartilhadas com companheiros de trabalho,
        familiares, fornecedores, gestores, terceiros, etc. O mau uso de tais credenciais pode
        trazer impactos graves à própria empresa.</p>

        <p>Por isso, solicitamos que leiam as orientações abaixo e as apliquem sempre ao utilizar
        suas credenciais, de modo a garantir a segurança de nossos dados.</p>

        <div style="margin-left:35px;">
            <p> &bull;  Nunca compartilhe sua senha! Caso a solicitem, reforce a proibição e reporte a
            situação à área responsável da sua empresa;</p>
        
            <p>  &bull; Sua senha deve ser de fácil lembrança para você e de difícil dedução para outra
            pessoa. Não é recomendada a utilização de nomes, datas, países, etc., como
            por exemplo: LATAM, LAN, TAM, Cargo, 2018, Travel, Sabre, Amadeus,
            Emissão, nome da agência, nome de parentes, entre outras;</p>
            <p>  &bull;Sua senha deverá ter as seguintes características:</p>
       
            <div style="margin-left:50px;">
                
                <p>  &bull; No mínimo 8 caracteres, compostos por letras e números;</p>
                <p>  &bull; Ter, no mínimo, uma letra maiúscula;</p>
                <p>  &bull; Ter, no mínimo, um número;</p>
                <p>  &bull; Ter, no mínimo, um caractere especial (como *, @, !, etc.);</p>
                <p>  &bull; Não mais que dois caracteres consecutivos repetidos (AAA, 0000, entre
                outros, não são permitidos)</p>
            </div>

          

           
           
            <p> &bull; Não use computadores ou redes públicas para acessar contas pessoais ou
            corporativas;</p>    
            <p> &bull; Não escreva suas senhas em papéis, como post-it ou blocos de notas;</p>
             <p> &bull; Você deve mudar sua senha periodicamente;</p>
            <p> &bull; Sua senha irá expirar a cada 90 dias. Você será notificado 10 dias antes da
            expiração;</p>
            <p> &bull; Após 3 tentativas inválidas, sua senha será bloqueada;</p>
            <p> &bull; EPRs robóticos não devem ser utilizados para acesso ao LATAM BDA 2.0.</p>
    
         </div><br> 

        <div  style="text-align: right">
            <p class="text-right">Atenciosamente,</p>
            <p class="text-right">Equipe de Vendas LATAM Airlines Brasil</p><br>
        </div>
         
         <hr>  
        <br><br>
        
            
        

        <h4>TERMO DE RESPONSABILIDADE DE USO DE LOGIN E SENHA</h4><br>

        <p>O usuário declara haver recebido, nesta data, da LATAM o login e senha provisórios
        para utilização da plataforma LATAM BDA 2.0/Behavior Intelligence, assumindo o
        compromisso de utilizá-los exclusivamente para o compartilhamento de dados de
        vendas, mediante o cadastramento de nova senha pessoal e intransferível a ser por ele
        próprio escolhida, com base nos melhores critérios de complexidade e segurança.</p>

        <p>Além do acima exposto, o usuário se compromete a:</p>

           <p> a) Utilizar a senha do modo correto e adequado, mantendo-a sob absoluto sigilo, bem
            como a utilizá-la exclusivamente para fins estritamente profissionais junto ao LATAM
            BDA 2.0/Behavior Intelligence;</p>
            <p>b) Informar à LATAM, exclusivamente através do executivo de conta LATAM que o
            atende, sobre qualquer suspeita ou ocorrência de quebra de sigilo da senha,
            responsabilizando-se integralmente pelos prejuízos que porventura advirem de sua
            divulgação e utilização, e;</p>
            <p>c) Manter em caráter de estrita confidencialidade e no mais absoluto sigilo a senha
            criada, comprometendo-se, outrossim, a não revelar, reproduzir, utilizar ou dar
            conhecimento, em hipótese alguma, a terceiros.</p> 
        
        <p>Declaro conhecer e estar de acordo com os termos de uso da plataforma LATAM BDA2.0/Behavior Intelligence:</p>
   
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn " @click="$emit('no_accept')" data-dismiss="modal">{{$t('lang.btn_no_accept')}}</button>&nbsp;&nbsp;
        <button type="button" class="btn " data-dismiss="modal" > {{$t('lang.btn_accept')}}</button>
      </div>
    </div>
  </div>
</div>


  </div>
</template>

<script> 
import $ from 'jquery';
 export default {

   props:['show'],
   mounted(){
     
     if(this.show){
       $('#btn-show-accepted').click();
     }
   }
   
   
   

}
</script>
<style lang="scss" scoped>
.modal-header{
border: none;
background-image: linear-gradient(to bottom right, #01161d,#184e65);
/* background:  rgba(14, 68, 87, 1); */  
}
.modal-body{
color:#333;
font-size: 18px;
background:  rgb(240, 240, 240);
min-height: 100px;
padding: 100px;
}
.modal-footer{
background:  rgba(240, 240, 240, 1);
}
button{border: solid 1px #333}
h5{
  color: aliceblue;
}

p{
    text-align: justify;
    font-size: 18px;
    color: #222;

    
}
</style>

