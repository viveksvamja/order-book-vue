<template>
  <layout>
    <div class="content-wrapper">
          <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body dashboard-tabs p-0">
                  <div class="tab-content py-0 px-0">
                    <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                      <div class="d-flex flex-wrap justify-content-xl-between">
                        <div class="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                          <i class="mdi mdi-calendar-heart icon-lg mr-3 text-primary"></i>
                          <div class="d-flex flex-column justify-content-around">
                            <small class="mb-1 text-muted">Total Orders</small>
                            <h5 class="mr-2 mb-0">{{statistics.total_orders}}</h5>
                          </div>
                        </div>
                        <div class="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                          <i class="mdi mdi-currency-inr mr-3 icon-lg text-danger"></i>
                          <div class="d-flex flex-column justify-content-around">
                            <small class="mb-1 text-muted">Total Sales</small>
                            <h5 class="mr-2 mb-0">₹{{statistics.total_sales}}</h5>
                          </div>
                        </div>
                        <div class="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                          <i class="mdi mdi-eye mr-3 icon-lg text-warning"></i>
                          <div class="d-flex flex-column justify-content-warning">
                            <small class="mb-1 text-muted">Pending Orders</small>
                            <h5 class="mr-2 mb-0">{{statistics.total_inprogress_orders}}</h5>
                          </div>
                        </div>
                        <div class="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                          <i class="mdi mdi-download mr-3 icon-lg text-danger"></i>
                          <div class="d-flex flex-column justify-content-around">
                            <small class="mb-1 text-muted">Pending Payments</small>
                            <h5 class="mr-2 mb-0">₹{{statistics.total_debit}}</h5>
                          </div>
                        </div>
                        <div class="d-flex py-3 border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                          <i class="mdi mdi-check-circle mr-3 icon-lg text-success"></i>
                          <div class="d-flex flex-column justify-content-around">
                            <small class="mb-1 text-muted">Recieved Payment</small>
                            <h5 class="mr-2 mb-0">₹{{statistics.total_paid}}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-7 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title">Current Year Sales</p>
                  <div id="cash-deposits-chart-legend" class="d-flex justify-content-center pt-3"></div>
                  <sales-chart v-if="current_year_sales.length" :current_year_sales="current_year_sales" />
                </div>
              </div>
            </div>
            <div class="col-lg-5 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title">Product Wise Summary</p>
                  <product-chart v-if="product_summary.length" :product_summary="product_summary" />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title">Recent Orders</p>
                  <div class="table-responsive">
                    <table id="recent-purchases-listing" class="table">
                      <thead>
                        <tr>
                            <th><b>Name</b></th>
                            <th><b>Order Date</b></th>
                            <th><b>City</b></th>
                            <th><b>Qty</b></th>
                            <th><b>Status</b></th>
                            <th><b>Gross amount</b></th>
                        </tr>
                      </thead>
                      <tbody v-if="orders.docs && orders.docs.length">
                        <tr v-for="(res,index) in orders.docs" :key="index" :res="res">
                            <td>{{ res.customer.name }}</td>
                            <td>{{ res.order_date | formatDate }}</td>
                            <td>{{ res.customer.city }}</td>
                            <td>{{ res.customer.name }}</td>
                            <td v-html="getOrderStatusBadge(res.status)"></td>
                            <td>₹{{ res.total }}</td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                      <tr>
                        <td colspan="6"> No recent purchase found.</td>
                      </tr>
                    </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  </layout>
</template>

<script>
import Layout from "./Common/Layout"
import axios from "axios"
import SalesChart from "./Charts/SalesChart"
import ProductChart from "./Charts/ProductChart"
export default {
  name: 'Dashboard',
  components: {
    Layout,
    SalesChart,
    ProductChart
  },
  data() {
    return {
      orders: [],
      statistics: [],
      current_year_sales: [],
      product_summary: [],
    }
  },
  mounted() {
      axios.get('orders', {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.token}`
        },
      }).then(response => {
        this.orders = response.data
      });

      axios.get('reports/dashboard-statistics', {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.token}`
        },
      }).then(response => {
        this.statistics = response.data[0]
        this.current_year_sales = this.statistics.current_year_sales
        this.product_summary = this.statistics.product_summary
        console.log(this.current_year_sales.length,this.product_summary.length)
      })
  },
  methods: {
    getOrderStatusBadge(status) {
      let statusText = '';
      if (status == 'in-process') {
        statusText = '<label class="badge badge-warning">Processing</label>';
      } else if (status == 'complete') {
        statusText = '<label class="badge badge-success">Complete</label>';
      } else {
        statusText = '<label class="badge badge-info">Close</label>';
      }
      return statusText;
    },
  }
}
</script>
<style>

</style>
