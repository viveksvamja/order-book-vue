<template>
  <div>
    <canvas id="sales-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
export default {
    name: 'SalesChart',
    props: {
        current_year_sales: Array
    },
    data() {
        return {
            salesChartData: {
                type: 'line',
                data: {
                    labels: this.getChartLabel(),
                    datasets: [
                        {
                            label: 'Sales',
                            data: this.getSalesByMonth(),
                            borderColor: '#4d83ff',
                            backgroundColor: '#4d83ff',
                            borderWidth: 2,
                            fill: false,
                            pointBackgroundColor: "#fff"
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Current Year Sales'
                        }
                    },
                    legend: {
                        display: false
                    },
                    elements: {
                        point: {
                            radius: 3
                        },
                        line :{
                            tension: 0
                        }
                    },
                },
            }
        }
    },
    mounted() {
        const ctx = document.getElementById('sales-chart');
        new Chart(ctx, this.salesChartData);
        console.log("Sales chart data1", this.current_year_sales.length);
    },
    methods: {
        getChartLabel() {
            const allMonths = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var d = new Date();
            return allMonths.slice(0, d.getMonth()+1);
        },
        getSalesByMonth() {
            let salesData = []
            this.getChartLabel().forEach((value, index) => {
                let month = this.current_year_sales.find(o => o._id === index+1);
                if (month) {
                    salesData.push(month.total_sales)
                } else {
                    salesData.push(0)
                }
            });
            return salesData;
        }
    }
}
</script>

<style>

</style>