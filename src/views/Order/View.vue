<template>
    <layout>
        <div class="col-12 grid-margin stretch-card">
            <div class="card shadow mb-4">
                <div class="card-body">
                    <div class="card-title text-left">View Order</div>
                    <table class="table">
                        <tbody>
                            <tr>
                                <td class="font-weight-bold">Order No#</td>
                                <td>{{ this.order.order_no }}</td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold">Order Date</td>
                                <td>{{ this.order.order_date | formatDate}}</td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold">Customer</td>
                                <td>{{ customer.name}}</td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold">Status</td>
                                <td v-html="getOrderStatusBadge(order.status)"></td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold">City</td>
                                <td>{{ customer.city}}</td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold">Shipping Address</td>
                                <td>{{ customer.shipping_address}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-3 p-2 border"><label for="product" class="text-left font-weight-bold">Product</label></div>
                        <div class="col-3 p-2 border"><label for="type" class="text-left font-weight-bold">Type</label></div>
                        <div class="col-3 p-2 border"><label for="qty" class="text-left font-weight-bold">Qty</label></div>
                        <div class="col-3 p-2 border"><label for="total" class="text-left font-weight-bold">Total</label></div>
                    </div>
                    <br>
                    <div v-for="(item, index) in order.orderitems" :key="index">
                        <div class="row form-group">
                            <div class="col-3 p-2 border">
                                {{item.product.name}}
                            </div>
                            <div class="col-3 p-2 border">
                                {{item.type}}
                            </div>
                            <div class="col-3 p-2 border">
                                {{item.qty}}
                            </div>
                            <div class="col-3 p-2 border">
                                <label for="total" class="font-weight-bold">{{item.total}}</label>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-9 text-right p-2 border"><label for="product" class="text-left font-weight-bold">Sub Total</label></div>
                        <div class="col-3 p-2 border"><label for="total" class="text-left font-weight-bold">{{order.subtotal | formatDecimal}}</label></div>
                    </div>
                    <div class="row">
                        <div class="col-9 text-right p-2 border"><label for="product" class="text-left font-weight-bold">Discount</label></div>
                        <div class="col-3 p-2 border"><label for="total" class="text-left font-weight-bold">{{order.discount | formatDecimal}}</label></div>
                    </div>
                    <div class="row">
                        <div class="col-9 text-right p-2 border"><label for="product" class="text-left font-weight-bold">CGST</label></div>
                        <div class="col-3 p-2 border"><label for="total" class="text-left font-weight-bold">{{order.discount | formatDecimal}}</label></div>
                    </div>
                    <div class="row">
                        <div class="col-9 text-right p-2 border"><label for="product" class="text-left font-weight-bold">SGST</label></div>
                        <div class="col-3 p-2 border"><label for="total" class="text-left font-weight-bold">{{order.discount | formatDecimal}}</label></div>
                    </div>
                    <div class="row">
                        <div class="col-9 text-right p-2 border"><label for="product" class="text-left font-weight-bold">Grand Total</label></div>
                        <div class="col-3 p-2 border"><label for="total" class="text-left font-weight-bold">{{order.total | formatDecimal}}</label></div>
                    </div>
                </div>
            </div>
        </div>
    </layout>
</template>

<script>
import axios from 'axios';
import Layout from './../Common/Layout';
export default {
    name: "order-view",
    components: {
        Layout
    },
    data() {
        return {
            order: [],
            customer: [],
            id: "",
        }
    },
    mounted() {
        axios.get(`orders/${this.$route.params.id}`, {
            headers: {
            'Authorization': `Bearer ${this.$store.getters.token}`
            },
        }).then(response => {
            this.order = response.data
            this.customer = this.order.customer
        })
        console.log(this.order);
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