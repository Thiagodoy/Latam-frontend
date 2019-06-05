<template>
    <div class="">

			<div class="chart-container" >
       <canvas   style="canvas" id="bar12" width="" height=""></canvas>
			</div> 
	  </div>
</template>

<script>
import Chart from 'chart.js';
import momment from 'moment';
export default {
    mounted(){


      

		var dateFormat = 'MMMM DD YYYY';
		var date = momment('April 01 2017', dateFormat);
		var data = [this.randomBar(date, 30)];
	

        data = [{"t":1491015600000,"y":"30.12"},{"t":1491188400000,"y":"31.26"},{"t":1491274800000,"y":"30.84"},{"t":1491361200000,"y":"33.19"},{"t":1491447600000,"y":"31.57"},{"t":1491534000000,"y":"28.94"},{"t":1491793200000,"y":"31.19"},{"t":1491879600000,"y":"33.32"},{"t":1491966000000,"y":"33.84"},{"t":1492052400000,"y":"33.26"},{"t":1492138800000,"y":"35.04"},{"t":1492398000000,"y":"33.59"},{"t":1492484400000,"y":"33.70"},{"t":1492570800000,"y":"34.68"},{"t":1492657200000,"y":"35.52"}]
        let datas = [{"t":1491015600000,"y":"20.12"},{"t":1491188400000,"y":"11.26"},{"t":1491274800000,"y":"50.84"},{"t":1491361200000,"y":"13.19"},{"t":1491447600000,"y":"10.33"},{"t":1491534000000,"y":"28.94"},{"t":1491793200000,"y":"50.10"},{"t":1491879600000,"y":"60.32"},{"t":1491966000000,"y":"55.88"},{"t":1492052400000,"y":"43.11"},{"t":1492138800000,"y":"27.04"},{"t":1492398000000,"y":"10"},{"t":1492484400000,"y":"15.70"},{"t":1492570800000,"y":"20.68"},{"t":1492657200000,"y":"35.52"}]
        let datae = [{"t":1491015600000,"y":"2.12"},{"t":1491188400000,"y":"5.26"},{"t":1491274800000,"y":"10.84"},{"t":1491361200000,"y":"7.19"},{"t":1491447600000,"y":"5.33"},{"t":1491534000000,"y":"2.94"},{"t":1491793200000,"y":"10.10"},{"t":1491879600000,"y":"5.32"},{"t":1491966000000,"y":"5.88"},{"t":1492052400000,"y":"4.11"},{"t":1492138800000,"y":"7.04"},{"t":1492398000000,"y":"1"},{"t":1492484400000,"y":"1.70"},{"t":1492570800000,"y":"2.68"},{"t":1492657200000,"y":"4.52"}]
		 

        

 
         var ctx = document.getElementById('bar12').getContext('2d');
         ctx.canvas.width = 4000;
					ctx.canvas.height = 1500;
				
					
          var myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				datasets: [{
					label: 'Upload',
					backgroundColor: 'rgba(0,0,240,0.5)',
					borderColor: 'rgba(0,0,240,1)',
					data: data,
					type: 'line',
					pointRadius: 0,
					fill: false,
					lineTension: 0,
					borderWidth: 2
                },
                {
					label: 'Validacao',
					backgroundColor: 'rgba(0,240,0,0.5)',
					borderColor: 'rgba(0,240,0,1)',
					data: datas,
					type: 'line',
					pointRadius: 0,
					fill: false,
					lineTension: 0,
					borderWidth: 2
                },
                {
					label: 'Erros',
					backgroundColor: 'rgba(240,0,0,0.5)',
					borderColor: 'rgba(240,0,0,1)',
					data: datae,
					type: 'line',
					pointRadius: 0,
					fill: false,
					lineTension: 0,
					borderWidth: 2
				}]
			},

			

			options: {
			
				scales: {
				
					xAxes: [{
						
						type: 'time',
						distribution: 'series',
						ticks: {
							source: 'data',
							autoSkip: true
						}
					}],
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Qtd arquivos unid.'
						}
					}]
				},
				tooltips: {
					intersect: false,
					mode: 'index',
					callbacks: {
						label: function(tooltipItem, myData) {
							var label = myData.datasets[tooltipItem.datasetIndex].label || '';
							if (label) {
								label += ': ';
							}
							label += parseFloat(tooltipItem.value).toFixed(2);
							return label;
						}
					}
				}
			}
		});

    },
    methods:{
         randomNumber(min, max) {
			return Math.random() * (max - min) + min;
		},

		 randomBar(date, lastClose) {
			var open = this.randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
			var close = this.randomNumber(open * 0.95, open * 1.05).toFixed(2);
			return {
				t: date.valueOf(),
				y: close
			};
		}
    }
    

}
</script>

<style lang="scss" scoped>
.chart-container{

	width: 100%;
	min-height: 200px;
	min-width: 350px;

}

.canvas{
		min-height: 200px;
			background: #00f;
}
</style>
