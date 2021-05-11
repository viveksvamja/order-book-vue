<template>
  <layout>
    <div class="content-wrapper">
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h1 class="card-title text-left align-middle">List of orders</h1>
                <div>
                    <div class="col-md-6 float-left">
                      <button type="button" class="btn btn-primary btn-icon-text float-left btn-sm">
                        <i class="mdi mdi-plus-box btn-icon-prepend"></i>
                        Add
                      </button>
                    </div>
                    <div class="col-md-3 float-right">
                      <input type='text' class="form-control" placeholder="Search.." />
                    </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th class="font-weight-bold">#</th>
                        <th class="font-weight-bold">Order Date</th>
                        <th class="font-weight-bold">Customer</th>
                        <th class="font-weight-bold">Order Total</th>
                        <th class="font-weight-bold">Status</th>
                        <th class="font-weight-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody v-if="this.results">
                      <tr v-for="(res,index) in results" :key="index" :res="res">
                        <td>{{index+1}}</td>
                        <td>{{res.order_date | formatDate}}</td>
                        <td>{{res.customer.name}}</td>
                        <td>{{res.total}}</td>
                        <td v-html="getOrderStatusBadge(res.status)"></td>
                        <td>
                            <!-- Call to action buttons -->
                            <ul class="list-inline m-0">
                                <li class="list-inline-item">
                                    <button class="btn btn-info btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="View"><i class="mdi mdi-table"></i></button>
                                </li>
                                <li class="list-inline-item">
                                    <button class="btn btn-dark btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="mdi mdi-file-check btn-icon-append"></i></button>
                                </li>
                                <li class="list-inline-item">
                                    <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="mdi mdi-delete"></i></button>
                                </li>
                            </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>17/04/2021</td>
                        <td>Jacob</td>
                        <td>10000</td>
                        <td><label class="badge badge-danger">Pending</label></td>
                        <td>
                            <!-- Call to action buttons -->
                            <ul class="list-inline m-0">
                                <li class="list-inline-item">
                                    <button class="btn btn-info btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="View"><i class="mdi mdi-table"></i></button>
                                </li>
                                <li class="list-inline-item">
                                    <button class="btn btn-dark btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="mdi mdi-file-check btn-icon-append"></i></button>
                                </li>
                                <li class="list-inline-item">
                                    <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="mdi mdi-delete"></i></button>
                                </li>
                            </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>11/04/2021</td>
                        <td>Messsy</td>
                        <td>500</td>
                        <td><label class="badge badge-warning">In progress</label></td>
                        <td>
                            <!-- Call to action buttons -->
                            <ul class="list-inline m-0">
                                <li class="list-inline-item">
                                    <button class="btn btn-info btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="View"><i class="mdi mdi-table"></i></button>
                                </li>
                                <li class="list-inline-item">
                                    <button class="btn btn-dark btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="mdi mdi-file-check btn-icon-append"></i></button>
                                </li>
                                <li class="list-inline-item">
                                    <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="mdi mdi-delete"></i></button>
                                </li>
                            </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>16/04/2021</td>
                        <td>John</td>
                        <td>2100</td>
                        <td><label class="badge badge-info">Fixed</label></td>
                        <td>
                            <!-- Call to action buttons -->
                            <ul class="list-inline m-0">
                                <li class="list-inline-item">
                                    <button class="btn btn-info btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="View"><i class="mdi mdi-table"></i></button>
                                </li>
                                <li class="list-inline-item">
                                    <button class="btn btn-dark btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="mdi mdi-file-check btn-icon-append"></i></button>
                                </li>
                                <li class="list-inline-item">
                                    <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="mdi mdi-delete"></i></button>
                                </li>
                            </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>12/04/2021</td>
                        <td>Peter</td>
                        <td>2200</td>
                        <td><label class="badge badge-success">Complete</label></td>
                        <td>
                            <!-- Call to action buttons -->
                            <ul class="list-inline m-0">
                                <li class="list-inline-item">
                                    <button class="btn btn-info btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="View"><i class="mdi mdi-table"></i></button>
                                </li>
                                <li class="list-inline-item">
                                    <button class="btn btn-dark btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="mdi mdi-file-check btn-icon-append"></i></button>
                                </li>
                                <li class="list-inline-item">
                                    <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="mdi mdi-delete"></i></button>
                                </li>
                            </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>15/04/2021</td>
                        <td>Dave</td>
                        <td>25000</td>
                        <td><label class="badge badge-warning">In progress</label></td>
                        <td>
                            <!-- Call to action buttons -->
                            <ul class="list-inline m-0">
                                <li class="list-inline-item">
                                    <button class="btn btn-info btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="View"><i class="mdi mdi-table"></i></button>
                                </li>
                                <li class="list-inline-item">
                                    <button class="btn btn-dark btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="mdi mdi-file-check btn-icon-append"></i></button>
                                </li>
                                <li class="list-inline-item">
                                    <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="mdi mdi-delete"></i></button>
                                </li>
                            </ul>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td> No records found.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="card-footer">
                <div class="btn-group float-left" role="group" aria-label="Pagination">
                  <button type="button" class="btn btn-outline-primary">1</button>
                  <button type="button" class="btn btn-outline-primary">2</button>
                  <button type="button" class="btn btn-outline-primary">3</button>
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
export default {
  name: 'Order',
  components: {
    Layout,
  },
  data() {
    return {
      results: []
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
      console.log(this.results);
  },
  methods: {
    getOrderStatusBadge(status) {
      let statusText = '';
      if (status == 'pending') {
        statusText = '<label class="badge badge-danger">Pending</label>';
      } else if(status == 'in-progress') {
        statusText = '<label class="badge badge-warning">In progress</label>';
      } else if (status == 'completed') {
        statusText = '<label class="badge badge-success">Completed</label>';
      } else {
        statusText = '<label class="badge badge-info">Close</label>';
      }
      return statusText;
    }
  }
}
</script>

<style>

</style>