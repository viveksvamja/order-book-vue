<template>
  <layout>
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h1 class="card-title text-left align-middle">List of products</h1>
                <div>
                    <div class="col-md-6 float-left">
                      <router-link to="product/add/" class="btn btn-primary btn-icon-text float-left btn-sm">
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
                        <th class="font-weight-bold">#</th>
                        <th class="font-weight-bold">Product Name</th>
                        <th class="font-weight-bold">Price/box</th>
                        <th class="font-weight-bold">Cartoon Qty</th>
                        <th class="font-weight-bold">Loose Price/kg</th>
                        <th class="font-weight-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody v-if="results.docs && results.docs.length">
                      <tr v-for="(res,index) in results.docs" :key="index" :res="res">
                        <td>{{((results.page-1)*results.limit) + index+1}}</td>
                        <td>{{res.name}}</td>
                        <td>{{res.price}}</td>
                        <td>{{res.cartoon_qty}}</td>
                        <td>{{res.loose_price}}</td>
                        <td>
                            <action-bar :id="res._id" module="product" @delete="deleteRecord"></action-bar>
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
                  moduleName="products">
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
export default {
  name: 'Product',
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
      message: {
        "text" : "This is error message!",
        "type" : "success"
      },
    }
  },
  mounted() {
      axios.get('products', {
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
      this.results = results
    },
    deleteRecord(id) {
      axios.delete(`products/${id}`, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.token}`
        }
      }).then(() => {
        axios.get('products', {
          headers: {
            'Authorization': `Bearer ${this.$store.getters.token}`
          },
        }).then(response => {
          this.results = response.data
        })
        this.message = {
            text: "Product deleted successfully!",
            type: 'success',
        }
      }).catch(() => {
        this.$router.go();
        this.message = {
            text: "Unable to delete product!",
            type: 'error',
        }
      })
    },
    search(e){
      e.preventDefault();
      let searchText = this.searchText;
      axios.get(`products?search=${searchText}`, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.token}`
        },
      }).then(response => {
        this.results = response.data
      }).catch(() => {
        this.message = {
            text: "Unable to search product!",
            type: 'error',
        }
      })
    }
  }
}
</script>

<style>

</style>