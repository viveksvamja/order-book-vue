import CustomerStatistics from '../views/Report/CustomerStatistics.vue'
import OrderStatistics from '../views/Report/OrderStatistics.vue'

export default [
    {
        path: '/customer-statistics',
        name: 'CustomerStatistics',
        component: CustomerStatistics
    },
    {
        path: '/order-statistics',
        name: 'OrderStatistics',
        component: OrderStatistics
    },
]