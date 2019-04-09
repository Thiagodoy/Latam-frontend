import { Pie } from 'vue-chartjs'

export default {
    props: ['data'],

    extends: Pie,
    mounted() {
        // Overwriting base render method with actual data.
        this.renderChart(this.data, {
            responsive: false,
            maintainAspectRatio: false,
            legend: {
                display: true
            }

        })
    },
    watch: {
        data(newValue, oldValue) {
            if (newValue) {
                this.renderChart(this.data, {
                    responsive: false,
                    maintainAspectRatio: false,
                    legend: {
                        display: true
                    }

                })
            }
        }
    }
}