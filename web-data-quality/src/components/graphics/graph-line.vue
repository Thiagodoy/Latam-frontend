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
							ctx.canvas.width = 4000;
							ctx.canvas.height = 1500;


							var myChart = new Chart(ctx, {
									type: 'bar',
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
															label: function (tooltipItem, myData) {
																	console.log('label',tooltipItem, myData)
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
	min-height: 200px;
	min-width: 350px;

}

.canvas{
		min-height: 200px;
			background: #00f;
}
</style>
