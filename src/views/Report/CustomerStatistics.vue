<template>
  <layout>
    <div class="col-12">
      <div class="col-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Customer statistics</h4>
            <form class="form-sample" @submit="search">
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <label for="fromDate">From Date</label>
                      <datepicker type="text" 
                          :bootstrap-styling="true"
                          name="from_date" 
                          v-model="from_date"
                          placeholder="From Date" autocomplete="nope">
                      </datepicker>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <label for="toDate" class="text-left">To Date</label>
                      <datepicker type="text" 
                          :bootstrap-styling="true"
                          name="to_date" 
                          v-model="to_date"
                          placeholder="To Date" autocomplete="nope">
                      </datepicker>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <label for="customer" class="text-left">Customer</label>
                      <select 
                          v-model="customer" 
                          name="customer"
                          class="form-control">
                          <option value="">All</option>
                          <option v-for="(val, index) in customers" :value="val._id" :key="index">{{val.name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <button type="submit" class="btn btn-primary mr-2" style="margin-top:30px;">Search</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-12 stretch-card"  v-if="isSearch">
        <div class="card">
          <div class="card-title">
              <json-excel
              class="btn btn-default float-right"
              :data="json_data"
              :fields="json_fields"
              worksheet="My Worksheet"
              name="Customer-Statistics.xls"
              v-if="isSearch && results.length"
            >
              <button type="button" class="btn btn-outline-danger btn-icon-text">
                          <i class="mdi mdi-download btn-icon-prepend"></i>                                                    
                          Download Excel
                        </button>
            </json-excel>
          </div>
          <div class="card-body">
            <div class="table-responsive">
                <table class="table table-striped">
                  <thead class="thead-light">
                    <tr>
                        <th class="font-weight-bold">Customer Name</th>
                        <th class="font-weight-bold">Pending</th>
                        <th class="font-weight-bold">Completed</th>
                        <th class="font-weight-bold">Close</th>
                        <th class="font-weight-bold">Total</th>
                        <th class="font-weight-bold">Total Sales</th>
                        <th class="font-weight-bold">Total Debit</th>
                        <th class="font-weight-bold">Total Paid</th>
                        <th class="font-weight-bold">View</th>
                    </tr>
                  </thead>
                  <tbody v-if="results && results.length">
                    <tr v-for="(res,index) in results" :key="index" :res="res">
                        <td>{{ res.customer[0].name }}</td>
                        <td>{{ res.total_inprogress_orders }}</td>
                        <td>{{ res.total_complete_orders }}</td>
                        <td>{{ res.total_close_count }}</td>
                        <td>{{ res.total_orders }}</td>
                        <td>₹{{ res.total_sales }}</td>
                        <td class="text-danger">₹{{ res.total_debit }}</td>
                        <td class="text-success">₹{{ res.total_paid }}</td>
                        <td>
                          <button 
                            class="btn btn-primary"
                            @click="getOrdersByCustomerId(res.customer[0]._id)">
                            View
                          </button>
                        </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                  <tr>
                    <td colspan="8"> No recent data found.</td>
                  </tr>
                </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
      <Dialog header="Customer details" :visible.sync="displayModal" :style="{width: '85vw'}" :modal="true">
        <div class="card" v-if="orders && orders.length">
          <div class="card-body">
                <table class="table">
                    <tbody>
                    <tr>
                        <td class="font-weight-bold">Customer Name</td>
                        <td>{{ orders[0].customer.name}}</td>
                        <td class="font-weight-bold">Email address</td>
                        <td>{{ orders[0].customer.email}}</td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">GST Number</td>
                        <td>{{ orders[0].customer.gst_no}}</td>
                        <td class="font-weight-bold">Contact Number</td>
                        <td>{{ orders[0].customer.contact}}</td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Contact Number</td>
                        <td>{{ orders[0].customer.contact}}</td>
                        <td class="font-weight-bold">Default Discount(%)</td>
                        <td>{{ orders[0].customer.discount_percentage}}</td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Shipping Addres</td>
                        <td>{{ orders[0].customer.shipping_address}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table">
              <thead class="thead-light">
                <tr>
                    <th class="font-weight-bold">Order#</th>
                    <th class="font-weight-bold">Order Date</th>
                    <th class="font-weight-bold">Sub Total</th>
                    <th class="font-weight-bold">Discount</th>
                    <th class="font-weight-bold">Vat(4%)</th>
                    <th class="font-weight-bold">Tax(1%)</th>
                    <th class="font-weight-bold">Total</th>
                    <th class="font-weight-bold">Status</th>
                    <th class="font-weight-bold">Created At</th>
                    <th class="font-weight-bold">Order Qty</th>
                </tr>
              </thead>
              <tbody v-if="orders && orders.length">
                <tr v-for="(order,index) in orders" :key="index" :res="order">
                    <td>{{ order.order_no }}</td>
                    <td>{{ order.order_date | formatDate }}</td>
                    <td>{{ order.subtotal | formatCurrency }}</td>
                    <td>{{ order.discount | formatCurrency }}</td>
                    <td>{{ order.vat | formatCurrency}}</td>
                    <td>{{ order.tax | formatCurrency }}</td>
                    <td>{{ order.total | formatCurrency }}</td>
                    <td v-html="getOrderStatusBadge(order.status)"></td>
                    <td>{{ order.createdAt | formatDate }}</td>
                    <td>{{ order.orderitems.reduce((a, b) => +a + +b.qty, 0) }}</td>
                </tr>
              </tbody>
              <tbody v-else>
              <tr>
                <td colspan="10"> No recent data found.</td>
              </tr>
            </tbody>
            </table>
        </div>

        <!-- Dialog footer -->
        <template #footer>
            <button type="button" class="btn btn-primary" @click="displayModal = false">                                        
              Ok
            </button>
        </template>
      </Dialog>
    </div>
  </layout>
</template>

<script>
import Layout from "./../Common/Layout"
import axios from "axios"
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
import JsonExcel from "vue-json-excel";
import Dialog from 'primevue/dialog';

export default {
  name: 'CustomerStatistics',
  components: {
    Layout,
    Datepicker,
    JsonExcel,
    Dialog
  },
  data() {
    return {
      customer: "",
      customers: [],
      from_date: moment().format('01 MMMM YYYY'),
      to_date: moment().format('DD MMMM YYYY'),
      results: [],
      orders: [],
      isSearch: false,
      displayModal: false,
      json_data: [],
      json_fields: {
        "Customer name" : "name",
        "Pending Order" : "pending",
        "Complete Order" : "complete",
        "Close Order" : "close",
        "Total Order" : "total",
        "Total Sales" : "total_sales",
        "Total Debit" : "total_debit",
        "Total Paid" : "total_paid",
      },
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
    }
  },
  mounted() {
      axios.get('customers?page=-1', {
            headers: {
            'Authorization': `Bearer ${this.$store.getters.token}`
            },
        }).then(response => {
            this.customers = response.data
        });
  },
  methods: {
    search(e) {
      e.preventDefault();
      this.isSearch = true;
      axios.get('reports/customer-statistics', {
        params: {
          customer: this.customer,
          from_date: moment(this.from_date).toDate(),
          to_date: moment(this.to_date).toDate(),
        },
        headers: {
          'Authorization': `Bearer ${this.$store.getters.token}`
        },
      }).then(response => {
        this.results = response.data
        this.loadExcelData(response.data);
      }).catch(() => {
        this.message = {
            text: "Unable to get customer statistics!",
            type: 'error',
        }
      })
    },
    loadExcelData(data) {
        let excelData = []
        data.forEach((record, index) => {
            excelData[index] = {
              name: record.customer[0].name,
              pending: record.total_inprogress_orders,
              complete: record.total_complete_orders,
              close: record.total_close_count,
              total: record.total_orders,
              total_sales: record.total_sales,
              total_debit: record.total_debit,
              total_paid: record.total_paid,
            }
        });
        this.json_data = excelData;
    },
    getOrdersByCustomerId(id) {
      axios.get(`reports/customer-statistics/${id}`, {
        params: {
          customer: this.customer,
          from_date: moment(this.from_date).toDate(),
          to_date: moment(this.to_date).toDate(),
        },
        headers: {
          'Authorization': `Bearer ${this.$store.getters.token}`
        },
      }).then(response => {
        this.orders = response.data
        this.displayModal = true;
      }).catch(() => {
        this.message = {
            text: "Unable to get customer statistics!",
            type: 'error',
        }
        this.displayModal = false;
      })
    },
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

<style scoped>
  .p-component-overlay {
    z-index: 1500 !important;
  }
</style>