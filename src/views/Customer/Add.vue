<template>
    <layout>
    <div class="col-12 grid-margin stretch-card">
        <div class="card">
        <div class="card-body">
            <h4 class="card-title">Add Customer</h4>
            <alert-message :message="message" v-if="message"></alert-message>
            <form class="forms-sample" @submit="add">
                <div class="form-group">
                    <label for="customerName" class="text-left">Customer Name</label>
                    <input 
                        type="text" 
                        :class="{'form-control':true, 'is-invalid' : $v.name.$error}" 
                        name="name" 
                        v-model="$v.name.$model"
                        placeholder="Customer Name" autocomplete="nope" />
                    <validation-message
                        v-if="$v.name.$error"
                        field="Customer Name"
                        :errors="$v.name"
                    ></validation-message>
                </div>
                <div class="form-group">
                    <label for="emailAddress" class="text-left">Email address</label>
                    <input 
                    type="email" 
                    :class="{'form-control':true, 'is-invalid' : $v.email.$error}" 
                    name="email" 
                    v-model="$v.email.$model"
                    placeholder="Email" autocomplete="nope">
                    <validation-message
                        v-if="$v.email.$error"
                        field="Email address"
                        :errors="$v.email"
                    ></validation-message>
                </div>
                <div class="form-group">
                    <label for="gstNumber" class="text-left">GST Number</label>
                    <input 
                        type="text" 
                        :class="{'form-control': true, 'is-invalid': $v.gst_number.$error}" 
                        name="gst_number" 
                        v-model="$v.gst_number.$model" 
                        placeholder="GST Number" autocomplete="nope">
                    <validation-message
                        v-if="$v.gst_number.$error"
                        field="GST Number"
                        :errors="$v.gst_number"
                    ></validation-message>
                </div>
                <div class="form-group">
                    <label for="cstNumber" class="text-left">CST Number</label>
                    <input 
                        type="text" 
                        :class="{'form-control': true, 'is-invalid': $v.cst_number.$error}" 
                        name="cst_number" 
                        v-model="$v.cst_number.$model" 
                        placeholder="CST Number" autocomplete="nope">
                    <validation-message
                        v-if="$v.cst_number.$error"
                        field="CST Number"
                        :errors="$v.cst_number"
                    ></validation-message>
                </div>
                <div class="form-group">
                    <label for="contactNumber" class="text-left">Contact Number</label>
                    <input 
                        type="text" 
                        :class="{'form-control': true, 'is-invalid': $v.contact_number.$error}" 
                        name="contact_number" 
                        v-model="$v.contact_number.$model" 
                        placeholder="Contact Number" autocomplete="nope">
                    <validation-message
                        v-if="$v.contact_number.$error"
                        field="Contact Number"
                        :errors="$v.contact_number"
                    ></validation-message>
                </div>
                <div class="form-group">
                    <label for="defaultDiscount" class="text-left">Default Discount(%)</label>
                    <input 
                        type="text" 
                        :class="{'form-control': true, 'is-invalid': $v.discount_percentage.$error}" 
                        name="discount_percentage" 
                        v-model="$v.discount_percentage.$model" 
                        placeholder="Default Discount" autocomplete="nope">
                    <validation-message
                        v-if="$v.discount_percentage.$error"
                        field="Default Discount"
                        :errors="$v.discount_percentage"
                    ></validation-message>
                </div>
                <div class="form-group">
                    <label for="city" class="text-left">City</label>
                    <input 
                        type="text" 
                        :class="{'form-control': true, 'is-invalid': $v.city.$error}" 
                        name="city" 
                        v-model="$v.city.$model" 
                        placeholder="City" />
                    <validation-message
                        v-if="$v.city.$error"
                        field="City"
                        :errors="$v.city"
                    ></validation-message>
                </div>
                <div class="form-group">
                    <label for="shippingAddress"  class="text-left">Shipping Addres</label>
                    <textarea 
                        :class="{'form-control': true, 'is-invalid': $v.shipping_address.$error}" 
                        name="shipping_address" 
                        v-model="$v.shipping_address.$model" 
                        rows="4">
                    </textarea>
                    <validation-message
                        v-if="$v.shipping_address.$error"
                        field="Shipping Address"
                        :errors="$v.shipping_address"
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
import { required, between, minLength, maxLength, alphaNum, email, requiredIf } from 'vuelidate/lib/validators'
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
            email: "",
            gst_number: "",
            cst_number: "",
            contact_number: "",
            city: "",
            discount_percentage: "",
            shipping_address: "",
            message: {},
        }
    },
    validations: {
        name: {
            required,
            minLength : minLength(3),
            maxLength : maxLength(50)
        },
        email: {
            required,
            email
        },
        gst_number: {
            required: requiredIf(function(){
                return !this.cst_number
            }),
            alphaNum,
            minLength : minLength(15),
            maxLength : maxLength(15)
        },
        cst_number: {
            required: requiredIf(function(){
                return !this.gst_number
            }),
            alphaNum,
            minLength : minLength(15),
            maxLength : maxLength(15)
        },
        contact_number: {
            required,
            minLength : minLength(10),
            maxLength : maxLength(16)
        },
		city: {
            required,
            minLength : minLength(3),
            maxLength : maxLength(50)
        },
        discount_percentage: {
            required,
            between: between(0,100)
        },
        shipping_address: {
            required,
            minLength : minLength(6),
        },
    },
    methods: {
        add(e) {
            e.preventDefault();
            this.$v.$touch()
            if (!this.$v.$invalid) {
                let params = {
                    name: this.name,
                    email: this.email,
                    gst_number: this.gst_number,
                    cst_number: this.cst_number,
                    contact_number: this.contact_number,
                    city: this.city,
                    discount_percentage: this.discount_percentage,
                    shipping_address: this.shipping_address,
                }
                // Filter blank data from payload
                Object.keys(params).forEach((k) => params[k] == "" && delete params[k]);
                
                // Create customer request to server
                axios.post('customers', params, {
                    headers: {
                        'Authorization': `Bearer ${this.$store.getters.token}`
                    }
                }).then(() => {
                    this.message = {
                        text: "Customer added successfully!",
                        type: 'success',
                    }
                    this.$router.push({ name: 'Customer', params: { message: this.message } })
                }).catch(error => {
                    this.message = {
                        text: error.response.data.error,
                        type: 'error',
                    }
                    if (error.response.status !== 422) {
                        this.$router.push({ name: 'Customer', params: { message: this.message } })
                    }
                });
            }
        },
    }
}
</script>

<style>

</style>