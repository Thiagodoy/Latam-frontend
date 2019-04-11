import { Bar } from 'vue-chartjs'

export default {
    props: ['data'],

    extends: Bar,
    mounted() {
        // Overwriting base render method with actual data.
        this.renderChart(this.data, {
            responsive: true,
            legend: {
                display: true
            },
            scales: {
                xAxes: [{ stacked: true }],
                yAxes: [{ stacked: true }]
            }

        })
    },
    watch: {
        data(newValue, oldValue) {
            if (newValue) {
                this.renderChart(this.data, {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: true
                    },
                    scales: {
                        xAxes: [{ stacked: true }],
                        yAxes: [{ stacked: true }]
                    }

                })
            }
        }
    }
}