<template>
  <layout>
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h1 class="card-title text-left align-middle">List of orders</h1>
                <div>
                    <div class="col-md-6 float-left">
                      <router-link to="order/add/" class="btn btn-primary btn-icon-text float-left btn-sm">
                        <i class="mdi mdi-plus-box btn-icon-prepend"></i>
                        Add
                      </router-link>
                    </div>
                    <div class="col-md-3 float-right">
                      <form name='search-form' @submit="search">
                      <div class="form-group">
                        <div class="input-group">
                          <input type="text" class="form-control" name='search' placeholder="Search" aria-label="Search" v-model="searchText">
                          <div class="input-group-append">
                            <button class="btn btn-sm btn-primary" type="submit"><i class="mdi mdi-magnify"></i></button>
                          </div>
                        </div>
                      </div>
                      </form>
                    </div>
                </div>
                <div class="table-responsive">
                  <alert-message :message="message"></alert-message>
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th class="font-weight-bold">Order#</th>
                        <th class="font-weight-bold">Order Date</th>
                        <th class="font-weight-bold">Customer</th>
                        <th class="font-weight-bold">Total</th>
                        <th class="font-weight-bold">Status</th>
                        <th class="font-weight-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody v-if="results.docs && results.docs.length">
                      <tr v-for="(res,index) in results.docs" :key="index" :res="res">
                        <td>{{res.order_no}}</td>
                        <td>{{res.order_date | formatDate}}</td>
                        <td>{{res.customer.name}}</td>
                        <td>{{res.total}}</td>
                        <td v-html="getOrderStatusBadge(res.status)"></td>
                        <td>
                            <action-bar :id="res._id" :order_no="res.order_no" module="order" @delete="deleteRecord" @download="download"></action-bar>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="6"> No records found.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="card-footer">
                <Pagination
                  v-on:updateResults="updateResults"
                  :total="results.total"
                  :searchText="searchText"
                  :limit="results.limit"
                  :currentPage="results.page"
                  :Pages="results.pages"
                  moduleName="orders">
                </Pagination>
              </div>
            </div>
          </div>
  </layout>
</template>

<script>
import Layout from "./../Common/Layout"
import axios from "axios"
import Pagination from "./../Common/Pagination"
import AlertMessage from '../Common/AlertMessage'
import ActionBar from '../Common/ActionBar'
//import html2canvas from 'html2canvas'

export default {
  name: 'Order',
  components: {
    Layout,
    Pagination,
    AlertMessage,
    ActionBar
  },
  data() {
    return {
      results: [],
      searchText: "",
      message: {}
    }
  },
  mounted() {
      axios.get('orders', {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.token}`
        },
      }).then(response => {
        this.results = response.data
      })
      this.message = this.$route.params.message;
  },
  methods: {
    updateResults(results) {
      console.log(results);
      this.results = results
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
    deleteRecord(id) {
      axios.delete(`orders/${id}`, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.token}`
        }
      }).then(() => {
        axios.get('orders', {
          headers: {
            'Authorization': `Bearer ${this.$store.getters.token}`
          },
        }).then(response => {
          this.results = response.data
        })
        this.message = {
            text: "Order deleted successfully!",
            type: 'success',
        }
      }).catch(() => {
        this.$router.go();
        this.message = {
            text: "Unable to delete order!",
            type: 'error',
        }
      })
    },
    search(e){
      e.preventDefault();
      let searchText = this.searchText;
      axios.get(`orders?search=${searchText}`, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.token}`
        },
      }).then(response => {
        this.results = response.data
      }).catch(() => {
        this.message = {
            text: "Unable to search order!",
            type: 'error',
        }
      })
    },
    download(id, order_no) {
      console.log(id);
      axios.get(`orders/invoice/${id}`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${this.$store.getters.token}`,
        },
      }).then(response => {
            this.downloadFile(response, order_no)
      }).catch(() => {
        this.message = {
            text: "Unable to download invoice!",
            type: 'error',
        }
      })
    },
    downloadFile(response, filename) {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      var newBlob = new Blob([response.data], {type: 'application/pdf'})

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob)
        return
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob)
      var link = document.createElement('a')
      link.href = data
      link.download = filename + '.pdf'
      link.click()

      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data)
      }, 100)
    },
  }
}
</script>

<style>

</style>