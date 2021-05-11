import Customer from '../views/Customer/Index.vue'
import CustomerAdd from '../views/Customer/Add.vue'
import CustomerEdit from '../views/Customer/Edit.vue'
import CustomerView from '../views/Customer/View.vue'

export default [
    {
        path: '/customer',
        name: 'Customer',
        component: Customer
      },
      {
        path: '/customer/add',
        name: 'Customer-add',
        component: CustomerAdd
      },
      {
        path: '/customer/edit/:id',
        name: 'Customer-edit',
        component: CustomerEdit
      },
      {
        path: '/customer/:id',
        name: 'Customer-view',
        component: CustomerView
      },
]