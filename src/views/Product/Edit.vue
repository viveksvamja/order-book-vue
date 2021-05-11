<template>
  <layout>
      <div class="col-12 grid-margin stretch-card">
        <div class="card">
        <div class="card-body">
            <h4 class="card-title">Edit Product</h4>
            <alert-message :message="message" v-if="message"></alert-message>
            <form class="forms-sample" @submit="edit">
                <div class="form-group">
                    <label for="customerName" class="text-left">Product Name</label>
                    <input 
                        type="text" 
                        :class="{'form-control':true, 'is-invalid' : $v.product.name.$error}" 
                        name="name" 
                        v-model="$v.product.name.$model"
                        placeholder="Product Name" autocomplete="nope" />
                    <validation-message
                        v-if="$v.product.name.$error"
                        field="Product Name"
                        :errors="$v.product.name"
                    ></validation-message>
                </div>
                <div class="form-group">
                    <label for="price" class="text-left">Price per box</label>
                    <input 
                        type="text" 
                        :class="{'form-control': true, 'is-invalid': $v.product.price.$error}" 
                        name="price" 
                        v-model="$v.product.price.$model" 
                        placeholder="Price per box" autocomplete="nope">
                    <validation-message
                        v-if="$v.product.price.$error"
                        field="Price"
                        :errors="$v.product.price"
                    ></validation-message>
                </div>
                <div class="form-group">
                    <label for="cartoon_qty" class="text-left">Catroon Qty</label>
                    <input 
                        type="text" 
                        :class="{'form-control': true, 'is-invalid': $v.product.cartoon_qty.$error}" 
                        name="cartoon_qty" 
                        v-model="$v.product.cartoon_qty.$model" 
                        placeholder="Price per box" autocomplete="nope">
                    <validation-message
                        v-if="$v.product.cartoon_qty.$error"
                        field="Cartoon Qty"
                        :errors="$v.product.cartoon_qty"
                    ></validation-message>
                </div>
                <div class="form-group">
                    <label for="loose_price" class="text-left">Loose price/kg</label>
                    <input 
                        type="text" 
                        :class="{'form-control': true, 'is-invalid': $v.product.loose_price.$error}" 
                        name="loose_price" 
                        v-model="$v.product.loose_price.$model" 
                        placeholder="Loose price" autocomplete="nope">
                    <validation-message
                        v-if="$v.product.loose_price.$error"
                        field="Loose price"
                        :errors="$v.product.loose_price"
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
import { required, numeric, minLength, maxLength } from 'vuelidate/lib/validators'
import ValidationMessage from '../Common/ValidationMessage';
import AlertMessage from '../Common/AlertMessage'

export default {
    name: "product-edit",
    components: {
        Layout,
        ValidationMessage,
        AlertMessage
    },
    data() {
        return {
            product: {
                name: "",
                price: "",
                cartoon_qty: "",
                loose_price: "",
            },
            id: "",
            message: {},
        }
    },
    mounted() {
        axios.get(`products/${this.$route.params.id}`, {
            headers: {
            'Authorization': `Bearer ${this.$store.getters.token}`
            },
        }).then(response => {
            this.product = response.data;
        })
    },
    validations: {
        product: {
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
        }
    },
    methods: {
        edit(e) {
            e.preventDefault();
            this.$v.$touch()
            if (!this.$v.$invalid) {
                let params = {
                    name: this.product.name,
                    price: this.product.price,
                    cartoon_qty: this.product.cartoon_qty,
                    loose_price: this.product.loose_price,
                }

                // Filter blank data from payload
                Object.keys(params).forEach((k) => params[k] == "" && delete params[k]);
                
                // Update product request to server
                axios.put(`products/${this.$route.params.id}`, params, {
                    headers: {
                        'Authorization': `Bearer ${this.$store.getters.token}`
                    }
                }).then(() => {
                    this.message = {
                        text: "Product updated successfully!",
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
        }
    }
}
</script>

<style>

</style>