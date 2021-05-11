import Product from '../views/Product/Index.vue'
import Add from '../views/Product/Add.vue'
import Edit from '../views/Product/Edit.vue'
import View from '../views/Product/View.vue'

export default [
    {
        path: '/product',
        name: 'Product',
        component: Product
      },
      {
        path: '/product/add',
        name: 'Product-add',
        component: Add
      },
      {
        path: '/product/edit/:id',
        name: 'Product-edit',
        component: Edit
      },
      {
        path: '/product/:id',
        name: 'Product-view',
        component: View
      },
]