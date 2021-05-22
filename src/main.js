import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import moment from 'moment';
import Vulidate from 'vuelidate';
import PrimeVue from 'primevue/config';

Vue.config.productionTip = false

Axios.defaults.baseURL = 'https://bhagyesh-enterprise-api.herokuapp.com';

Vue.prototype.$http = Axios

if (!store.getters.isLoggedIn) {
  router.push('/login');
}

Vue.filter('formatDate', function(value) {
  if (value) {
      return moment(String(value)).format('DD/MM/YYYY hh:mm:ss')
  }
});

Vue.filter('formatCurrency', function(value) {
  if (value) {
      return `₹${value}`
  } else {
    return `₹0`
  }
});


Vue.filter('formatDecimal', function(value, precision = 2) {
  if (value) {
      return value.toFixed(precision)
  }
});

Vue.use(Vulidate);

Vue.use(PrimeVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
