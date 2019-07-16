<template>
    <div>
      <div class="chart-container" >
          <canvas id="stacked" width="300" height=""></canvas>
       </div>
    </div>
    
</template>

<script>
import Chart from 'chart.js';
export default {
    mounted(){
         var ctx = document.getElementById('stacked').getContext('2d');
          var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
           
           
           labels: ['01/01/2019', '01/01/2019', '03/01/2019', '04/01/2019', '05/01/2019', '06/01/2019'], //Datas
           
           datasets: [
               
               {
                label: 'Upload', // Configurações Dados 1  Exemplo: Uploads
                data: [11, 9, 5, 9, 6, 4],
                backgroundColor: [ // A cor será sempres a mesma ex: Azul para uploads
               'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                   
                    
                ],
                borderColor: [
                   
               
                    
                ],
                borderWidth: 1
            },

             {
                label: 'Erros', // Configurações Coluna dados 2 Exemplo: Erros
                data: [2, 5, 3, 5, 2, 3],
                backgroundColor: [
                     'rgba(255, 50, 50, 0.4)',
                     'rgba(255, 50, 50, 0.4)',
                     'rgba(255, 50, 50, 0.4)',
                     'rgba(255, 50, 50, 0.4)',
                     'rgba(255, 50, 50, 0.4)',
                     'rgba(255, 50, 50, 0.4)',
                  
                    
                ],
                borderColor: [],
                borderWidth: 1
            },
             {
                label: 'Sucesso', // Configurações Coluna dados 2 Exemplo: Erros
                data: [2, 5, 3, 5, 2, 3],
                backgroundColor: [
                     'rgba(255, 50, 50, 0.4)',
                     'rgba(255, 50, 50, 0.4)',
                     'rgba(255, 50, 50, 0.4)',
                     'rgba(255, 50, 50, 0.4)',
                     'rgba(255, 50, 50, 0.4)',
                     'rgba(255, 50, 50, 0.4)',
                  
                    
                ],
                borderColor: [],
                borderWidth: 1
            }
            
            
            
            ]






        },
        options: {
            responsive:true,
            title: {
						display: true,
						text: 'Uploads/Erros'
					},
            scales: {
						xAxes: [{
                            stacked: true,
                             gridLines: {
                                color: 'rgba(255,255,255,.4)',
                                lineWidth: 0.5
                            }
                            
						}],
						yAxes: [{
                            stacked: true,
                            scaleLabel: {
                                        display: true,
                                        labelString: 'Qtd arquivos unid.'
                                },
                                gridLines: {
                                color: 'rgba(255,255,255,.4)',
                                lineWidth: 0.5
                            }
						}]
					}
        }
    });


    }

}
</script>

<style lang="scss" scoped>




.chart-container{

	width: 100%;
	
	background: rgba(0,0,0,.2)

}

</style>
