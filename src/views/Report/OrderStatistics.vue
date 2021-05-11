<template>
  <layout>
    <div class="col-12">
      <div class="col-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Order statistics</h4>
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
                      <label for="customer" class="text-left">Group By</label>
                      <select 
                          v-model="group_by" 
                          name="group_by"
                          class="form-control">
                          <option value="day">Date</option>
                          <option value="month">Month</option>
                          <option value="year">Year</option>
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
              name="Order-Statistics.xls"
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
                        <th class="font-weight-bold">Group By</th>
                        <th class="font-weight-bold">Pending</th>
                        <th class="font-weight-bold">Completed</th>
                        <th class="font-weight-bold">Close</th>
                        <th class="font-weight-bold">Total</th>
                        <th class="font-weight-bold">Total Sales</th>
                        <th class="font-weight-bold">Total Debit</th>
                        <th class="font-weight-bold">Total Paid</th>
                    </tr>
                  </thead>
                  <tbody v-if="results && results.length">
                    <tr v-for="(res,index) in results" :key="index" :res="res">
                        <td>{{ getGroupByFormatValue(res._id) }}</td>
                        <td>{{ res.total_inprogress_orders }}</td>
                        <td>{{ res.total_complete_orders }}</td>
                        <td>{{ res.total_close_count }}</td>
                        <td>{{ res.total_orders }}</td>
                        <td>₹{{ res.total_sales }}</td>
                        <td class="text-danger">₹{{ res.total_debit }}</td>
                        <td class="text-success">₹{{ res.total_paid }}</td>
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
    </div>
  </layout>
</template>

<script>
import Layout from "./../Common/Layout"
import axios from "axios"
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
import JsonExcel from "vue-json-excel";

export default {
  name: 'OrderStatistics',
  components: {
    Layout,
    Datepicker,
    JsonExcel,
  },
  data() {
    return {
      group_by: "day",
      from_date: moment().format('01 MMMM YYYY'),
      to_date: moment().format('DD MMMM YYYY'),
      results: [],
      isSearch: false,
      json_data: [],
      json_fields: {
        "Group By" : "by",
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
  methods: {
    search(e) {
      e.preventDefault();
      this.isSearch = true;
      axios.get('reports/order-statistics', {
        params: {
          group_by: this.group_by,
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
              by: this.getGroupByFormatValue(record._id),
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
    getGroupByFormatValue(group) {
        if (group.year != undefined && group.month != undefined && group.day != undefined) {
            return moment([group.year, group.month-1, group.day]).format('DD MMMM YYYY');
        } else if (group.year != undefined && group.month != undefined ) {
            return moment([group.year, group.month-1]).format('MMMM YYYY');
        } else {
            return moment([group.year]).format('YYYY');
        }
    }
  }
}
</script>

<style>
</style>