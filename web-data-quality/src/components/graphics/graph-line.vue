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
	props:['graphData'],
    mounted() {
					this.contruir();
		},
		watch:{
			graphData:{
				handler:function(){
					this.contruir();
				},
				deep:true
			}
		},
    methods: {

				contruir(){
							var ctx = document.getElementById('bar12').getContext('2d');
							ctx.canvas.width = 1000;
							ctx.canvas.height = 350;

							Chart.defaults.global.defaultFontColor = 'white';

							if(window.myChart)
								window.myChart.destroy();

							window.myChart = new Chart(ctx, {
									type: 'line',
									data: {
											datasets: [{
															label: 'Upload',
															backgroundColor: 'rgba(0,0,240,0.5)',
															borderColor: 'rgba(0,0,240,1)',
															data: this.graphData.dataUpload,
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
															data: this.graphData.dataValidacao,
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
															data: this.graphData.dataErro,
															type: 'line',
															pointRadius: 0,
															fill: false,
															lineTension: 0,
															borderWidth: 2
													}
											]
									},



									options: {

											scales: {

													xAxes: [{

															type: 'time',
															distribution: 'series',
															ticks: {
																	source: 'data',
																	autoSkip: true
															},
																gridLines: {
															color: 'rgba(255,255,255,.4)',
															lineWidth: 0.5
														}
															
													}],
													yAxes: [{
															scaleLabel: {
																	display: true,
																	labelString: 'Qtd arquivos unid.'
															},
															gridLines: {
															color: 'rgba(255,255,255,.4)',
															lineWidth: 0.5
														}
														
													}]
											},
											tooltips: {
													intersect: false,
													mode: 'index',
													callbacks: {
															label: function (tooltipItem, myData) {
																	
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
       
    }


}
</script>

<style lang="scss" scoped>
.chart-container{

	width: 100%;
	
	background: rgba(0,0,0,.2)

}

</style>
