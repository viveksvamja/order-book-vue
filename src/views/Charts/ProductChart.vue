<template>
  <div>
    <canvas id="product-chart" style="margin:0 auto; width:10px; height:10px;"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
export default {
    name: 'ProductChart',
    props: {
        product_summary: Array
    },
    data() {
        return {
            productChartData: {
                type: "doughnut",
                data: {
                    datasets: [{
                        data: this.getChartData(),
                        backgroundColor: ['#4d83ff', '#ff4747', '#ffc100', '#71c016', '#686868', '#552ed7', '#181d23', '#e2e6ea'],
                        borderColor: ['#4d83ff', '#ff4747', '#ffc100', '#71c016', '#686868', '#552ed7', '#181d23', '#e2e6ea'],
                    }],

                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: this.getChartLabel()
                },
                options: {
                    responsive: true,
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    },
                    legend: {
                        display: true
                    },
                }
            }
        }
    },
    mounted() {
        const ctx = document.getElementById('product-chart');
        new Chart(ctx, this.productChartData);
    },
    methods: {
        getChartLabel() {
            let labels = []
            this.product_summary.forEach(value => {
                labels.push(value.product[0].name.replace("MM", "").replaceAll(" ", ""))
            })
            return labels;
        },
        getChartData() {
            let data = []
            this.product_summary.forEach(value => {
                data.push(value.total_qty)
            })
            return data;
        },
    }
}
</script>

<style>

</style>