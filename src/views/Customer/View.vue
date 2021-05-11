<template>
    <layout>
        <div class="col-12 grid-margin stretch-card">
            <div class="card shadow mb-4">
                <div class="card-body">
                    <div class="card-title text-left">View Customer</div>
                    <table class="table">
                        <tbody>
                        <tr>
                            <td class="font-weight-bold">Customer Name</td>
                            <td>{{ this.customer.name}}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Email address</td>
                            <td>{{ this.customer.email}}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">GST Number</td>
                            <td>{{ this.customer.gst_no}}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Contact Number</td>
                            <td>{{ this.customer.contact}}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Default Discount(%)</td>
                            <td>{{ this.customer.discount_percentage}}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Shipping Addres</td>
                            <td>{{ this.customer.shipping_address}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </layout>
</template>

<script>
import axios from 'axios';
import Layout from './../Common/Layout';
export default {
    name: "customer-view",
    components: {
        Layout
    },
    data() {
        return {
            customer: [],
            id: "",
        }
    },
    mounted() {
        axios.get(`customers/${this.$route.params.id}`, {
            headers: {
            'Authorization': `Bearer ${this.$store.getters.token}`
            },
        }).then(response => {
            this.customer = response.data
        })
        console.log(this.customer);
    }
}
</script>

<style>

</style>