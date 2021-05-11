<template>
    <layout>
        <div class="col-12 grid-margin stretch-card">
            <div class="card shadow mb-4">
                <div class="card-body">
                    <div class="card-title text-left">View Product</div>
                    <table class="table">
                        <tbody>
                        <tr>
                            <td class="font-weight-bold">Product Name</td>
                            <td>{{ this.product.name}}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Price/box</td>
                            <td>{{ this.product.price}}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Cartoon Qty</td>
                            <td>{{ this.product.cartoon_qty}}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Loose price/kg</td>
                            <td>{{ this.product.loose_price}}</td>
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
    name: "product-view",
    components: {
        Layout
    },
    data() {
        return {
            product: [],
            id: "",
        }
    },
    mounted() {
        axios.get(`products/${this.$route.params.id}`, {
            headers: {
            'Authorization': `Bearer ${this.$store.getters.token}`
            },
        }).then(response => {
            this.product = response.data
        })
        console.log(this.product);
    }
}
</script>

<style>

</style>