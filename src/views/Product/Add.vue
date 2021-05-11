<template>
    <layout>
    <div class="col-12 grid-margin stretch-card">
        <div class="card">
        <div class="card-body">
            <h4 class="card-title">Add Product</h4>
            <alert-message :message="message" v-if="message"></alert-message>
            <form class="forms-sample" @submit="add">
                <div class="form-group">
                    <label for="customerName" class="text-left">Product Name</label>
                    <input 
                        type="text" 
                        :class="{'form-control':true, 'is-invalid' : $v.name.$error}" 
                        name="name" 
                        v-model="$v.name.$model"
                        placeholder="Product Name" autocomplete="nope" />
                    <validation-message
                        v-if="$v.name.$error"
                        field="Product Name"
                        :errors="$v.name"
                    ></validation-message>
                </div>
                <div class="form-group">
                    <label for="price" class="text-left">Price per box</label>
                    <input 
                        type="text" 
                        :class="{'form-control': true, 'is-invalid': $v.price.$error}" 
                        name="price" 
                        v-model="$v.price.$model" 
                        placeholder="Price per box" autocomplete="nope">
                    <validation-message
                        v-if="$v.price.$error"
                        field="Price"
                        :errors="$v.price"
                    ></validation-message>
                </div>
                <div class="form-group">
                    <label for="cartoon_qty" class="text-left">Catroon Qty</label>
                    <input 
                        type="text" 
                        :class="{'form-control': true, 'is-invalid': $v.cartoon_qty.$error}" 
                        name="cartoon_qty" 
                        v-model="$v.cartoon_qty.$model" 
                        placeholder="Price per box" autocomplete="nope">
                    <validation-message
                        v-if="$v.cartoon_qty.$error"
                        field="Cartoon Qty"
                        :errors="$v.cartoon_qty"
                    ></validation-message>
                </div>
                <div class="form-group">
                    <label for="loose_price" class="text-left">Loose price/kg</label>
                    <input 
                        type="text" 
                        :class="{'form-control': true, 'is-invalid': $v.loose_price.$error}" 
                        name="loose_price" 
                        v-model="$v.loose_price.$model" 
                        placeholder="Loose price" autocomplete="nope">
                    <validation-message
                        v-if="$v.loose_price.$error"
                        field="Loose price"
                        :errors="$v.loose_price"
                    ></validation-message>
                </div>
                <button type="submit" class="btn btn-primary mr-2" :disabled="$v.$invalid">Submit</button>
                <button class="btn btn-light">Cancel</button>
            </form>
        </div>
        </div>
    </div>
    </layout>
</template>

<script>
import Layout from "./../Common/Layout"
import axios from 'axios';
import { required, minLength, maxLength, numeric } from 'vuelidate/lib/validators'
import ValidationMessage from '../Common/ValidationMessage';
import AlertMessage from '../Common/AlertMessage'
export default {
    name: "add",
    components: {
        Layout,
        ValidationMessage,
        AlertMessage
    },
    data() {
        return {
            name: "",
            price: "",
            cartoon_qty: "",
            loose_price: "",
            message: {},
        }
    },
    validations: {
        name: {
            required,
            minLength : minLength(3),
            maxLength : maxLength(50)
        },
        price: {
            required,
            numeric
        },
        cartoon_qty: {
            required,
            numeric
        },
        loose_price: {
            required,
            numeric
        },
    },
    methods: {
        add(e) {
            e.preventDefault();
            this.$v.$touch()
            if (!this.$v.$invalid) {
                let params = {
                    name: this.name,
                    price: this.price,
                    cartoon_qty: this.cartoon_qty,
                    loose_price: this.loose_price,
                }
                // Filter blank data from payload
                Object.keys(params).forEach((k) => params[k] == "" && delete params[k]);
                
                // Create product request to server
                axios.post('products', params, {
                    headers: {
                        'Authorization': `Bearer ${this.$store.getters.token}`
                    }
                }).then(() => {
                    this.message = {
                        text: "Product added successfully!",
                        type: 'success',
                    }
                    this.$router.push({ name: 'Product', params: { message: this.message } })
                }).catch(error => {
                    this.message = {
                        text: error.response.data.error,
                        type: 'error',
                    }
                    if (error.response.status !== 422) {
                        this.$router.push({ name: 'Product', params: { message: this.message } })
                    }
                });
            }
        },
    }
}
</script>

<style>

</style>