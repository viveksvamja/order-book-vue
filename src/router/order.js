import Order from '../views/Order/Index.vue'
import Add from '../views/Order/Add.vue'
import Edit from '../views/Order/Edit.vue'
import View from '../views/Order/View.vue'

export default [
    {
        path: '/order',
        name: 'Order',
        component: Order
      },
      {
        path: '/order/add',
        name: 'Order-add',
        component: Add
      },
      {
        path: '/order/edit/:id',
        name: 'Order-edit',
        component: Edit
      },
      {
        path: '/order/:id',
        name: 'Order-view',
        component: View
      },
]