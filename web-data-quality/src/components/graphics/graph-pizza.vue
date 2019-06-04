<template>
<div>
     <canvas id="pizza" width="300" height=""></canvas>
</div>
    
</template>

<script>
import Chart from 'chart.js';
export default {

    props:['data'],

    mounted(){
        
     
     let tem = this.data.map(d=>{

         let di = this.randomRgb();
         return{
             label:d.fieldName,
             value:d.qtdErrors,
             ...di
         }
     }).filter(ee=> ee.value > 0);

     let labelTemp = tem.map(t=>{
        return t.label;
    });

    let dataTemp = tem.map(t=>{
        return t.value;
    });

    let backTemp = tem.map(t=>{
        return t.backgroundColor;
    });

    let borderColorTemp = tem.map(t=>{
        return t.borderColor;
    });   
   
   var ctx = document.getElementById('pizza').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labelTemp,
            datasets: [{
                label: '# of Votes',
                data: dataTemp ,
                backgroundColor: backTemp ,
                borderColor: borderColorTemp,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    },
    methods:{
        randomRgb(){
             let value = `${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)}`;
             return {backgroundColor: `rgba(${value},0.2)`,borderColor: `rgba(${value},1)`};
        }
    }

}
</script>

<style>

</style>
