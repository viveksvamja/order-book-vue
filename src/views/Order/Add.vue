<template>
    <layout>
    <div class="col-12 grid-margin stretch-card">
        <div class="card">
        <div class="card-body">
            <h4 class="card-title">Add Order</h4>
            <alert-message :message="message" v-if="message"></alert-message>
            <form class="forms-sample" @submit="add">
                <div class="form-group">
                    <label for="orderDate" class="text-left">Order Date</label>
                    <datepicker type="text" 
                        :bootstrap-styling="true"
                        name="order_date" 
                        v-model="$v.order_date.$model"
                        placeholder="Order Date" autocomplete="nope">
                        
                        </datepicker>
                    <validation-message
                        v-if="$v.order_date.$error"
                        field="Order Date"
                        :errors="$v.order_date"
                    ></validation-message>
                </div>
                <div class="form-group">
                    <label for="customer" class="text-left">Customer</label>
                    <select 
                        v-model="$v.customer.$model" 
                        name="customer"
                        :class="{'form-control':true, 'is-invalid' : $v.customer.$error}">
                        <option value="">Please select one</option>
                        <option v-for="(val, index) in customers" :value="val._id" :key="index">{{val.name}}</option>
                    </select>
                    <validation-message
                        v-if="$v.customer.$error"
                        field="Customer"
                        :errors="$v.customer"
                    ></validation-message>
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-3 p-2 border"><label for="product" class="text-left font-weight-bold">Product</label></div>
                        <div class="col-3 p-2 border"><label for="type" class="text-left font-weight-bold">Type</label></div>
                        <div class="col-2 p-2 border"><label for="qty" class="text-left font-weight-bold">Qty</label></div>
                        <div class="col-2 p-2 border"><label for="total" class="text-left font-weight-bold">Total</label></div>
                        <div class="col-2 p-2 border">
                            <button class="btn btn-primary btn-icon-text float-right btn-sm" @click="items.push({product: '',qty: '', type: 'Cartoon', item_total: 0})">
                                <i class="mdi mdi-plus-box btn-icon-prepend"></i>
                                Add
                            </button>
                        </div>
                    </div>
                    <br>
                    <div v-for="(v, index) in $v.items.$each.$iter" :key="index">
                        <div class="row form-group">
                            <div class="col-3">
                                <select 
                                    v-model="v.product.$model" 
                                    name="customer"
                                    :class="{'form-control':true, 'is-invalid' : v.product.$error}"
                                    @change="updateTotal(index)"
                                    >
                                    <option value="">Select</option>
                                    <option v-for="(val, i) in products" :value="val._id" :key="i">{{val.name}}</option>
                                </select>
                                <validation-message
                                    v-if="v.product.$error"
                                    field="Product"
                                    :errors="v.product"
                                ></validation-message>
                            </div>
                            <div class="col-3">
                                <select 
                                    v-model="v.type.$model" 
                                    name="type"
                                    @change="updateTotal(index)"
                                    :class="{'form-control':true, 'is-invalid' : v.type.$error}">
                                    <option v-for="(val, i) in item_types" :value="val" :key="i">{{val}}</option>
                                </select>
                                <validation-message
                                    v-if="v.type.$error"
                                    field="Type"
                                    :errors="v.type"
                                ></validation-message>
                            </div>
                            <div class="col-2">
                                <input 
                                    type="text" 
                                    :class="{'form-control':true, 'is-invalid' : v.qty.$error}" 
                                    name="qty" 
                                    @keyup="updateTotal(index)"
                                    v-model="v.qty.$model"
                                    placeholder="qty" autocomplete="nope" />
                                <validation-message
                                    v-if="v.qty.$error"
                                    field="Qty"
                                    :errors="v.qty"
                                ></validation-message>
                            </div>
                            <div class="col-2 p-2 border">
                                <label for="total" class="font-weight-bold">{{items[index].item_total}}</label>
                            </div>
                            <div class="col-2">
                                <button class="btn btn-danger btn-icon btn-rounded" data-toggle="tooltip" data-placement="top" title="Remove" @click="items.pop()"><i class="mdi mdi-delete"></i></button>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-8 text-right p-2 border"><label for="product" class="text-left font-weight-bold">Sub Total</label></div>
                        <div class="col-2 p-2 border"><label for="total" class="text-left font-weight-bold">{{calculateSubtotal | formatDecimal}}</label></div>
                        <div class="col-2 p-2 border">&nbsp;</div>
                    </div>
                    <div class="row">
                        <div class="col-8 text-right p-2 border"><label for="product" class="text-left font-weight-bold">Discount</label></div>
                        <div class="col-2 p-2 border"><label for="total" class="text-left font-weight-bold">{{calculateDiscount | formatDecimal}}</label></div>
                        <div class="col-2 p-2 border">&nbsp;</div>
                    </div>
                    <div class="row">
                        <div class="col-8 text-right p-2 border"><label for="product" class="text-left font-weight-bold">CGST</label></div>
                        <div class="col-2 p-2 border"><label for="total" class="text-left font-weight-bold">{{calculateCGST | formatDecimal}}</label></div>
                        <div class="col-2 p-2 border">&nbsp;</div>
                    </div>
                    <div class="row">
                        <div class="col-8 text-right p-2 border"><label for="product" class="text-left font-weight-bold">SGST</label></div>
                        <div class="col-2 p-2 border"><label for="total" class="text-left font-weight-bold">{{calculateSGST | formatDecimal}}</label></div>
                        <div class="col-2 p-2 border">&nbsp;</div>
                    </div>
                    <div class="row">
                        <div class="col-8 text-right p-2 border"><label for="product" class="text-left font-weight-bold">Grand Total</label></div>
                        <div class="col-2 p-2 border"><label for="total" class="text-left font-weight-bold">{{calculateTotal | formatDecimal}}</label></div>
                        <div class="col-2 p-2 border">&nbsp;</div>
                    </div>
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
import { required } from 'vuelidate/lib/validators'
import ValidationMessage from '../Common/ValidationMessage';
import AlertMessage from '../Common/AlertMessage'
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
export default {
    name: "add",
    components: {
        Layout,
        ValidationMessage,
        AlertMessage,
        Datepicker
    },
    data() {
        return {
            order_date: "",
            customer: "",
            customers: [],
            products: [],
            items: [{product: '',qty: 0, type: "Cartoon", item_total: 0}],
            total: 0,
            message: {},
            item_types: [
                "Cartoon",
                "Loose",
                "Box"
            ]
        }
    },
    validations: {
        order_date: {
            required,
        },
        customer: {
            required,
        },
        items: {
            required,
            $each: {
                product: {
                    required,
                },
                qty: {
                    required,
                },
                type: {
                    required,
                }
            }
        }
    },
    mounted() {
        axios.get('customers?page=-1', {
            headers: {
            'Authorization': `Bearer ${this.$store.getters.token}`
            },
        }).then(response => {
            this.customers = response.data
        });

        axios.get('products?page=-1', {
            headers: {
            'Authorization': `Bearer ${this.$store.getters.token}`
            },
        }).then(response => {
            this.products = response.data
        })
    },
    methods: {
        add(e) {
            e.preventDefault();
            this.$v.$touch()
            if (!this.$v.$invalid) {
                let params = {
                    order_date: moment(String(this.order_date)).format('YYYY-MM-DD hh:mm:ss'),
                    customer: this.customer,
                    items: this.items.map(({product,qty,type}) => ({product,qty,type}))
                }
                console.log(params);
                //Create order request to server
                axios.post('orders', params, {
                    headers: {
                        'Authorization': `Bearer ${this.$store.getters.token}`
                    }
                }).then(() => {
                    this.message = {
                        text: "Order added successfully!",
                        type: 'success',
                    }
                    this.$router.push({ name: 'Order', params: { message: this.message } })
                }).catch(error => {
                    this.message = {
                        text: error.response.data.error,
                        type: 'error',
                    }
                    if (error.response.status !== 422) {
                        this.$router.push({ name: 'Order', params: { message: this.message } })
                    }
                });
            }
        },
        updateTotal(index) {
            let productId = this.items[index].product;
            let type = this.items[index].type;
            let qty = this.items[index].qty === null ? 0 : this.items[index].qty;
            let product = this.products.find(x => x._id == productId);
            let itemTotal = 0;

            if (type === "Cartoon") { // Cartoon
                itemTotal = product.price * qty * product.cartoon_qty;
            } else if (type === "Loose") { // Loose
                itemTotal = product.loose_price * qty;
            } else { // Box
                itemTotal = product.price * qty;
            }

            this.items[index].item_total = itemTotal;

            this.total = this.calculateSubtotal - this.calculateDiscount
        }
    },
    computed: {
        calculateSubtotal: function() {
            return this.items.reduce(function (total, val) {
                return total + val.item_total;
            }, 0);
        },
        calculateDiscount: function() {
            let customer = this.customers.find(x => x._id == this.customer);
            
            if (customer === undefined) {
                return 0;
            }

            let discount_percentage = customer.discount_percentage;

            const discount = this.items.reduce(function (total, val) {
                console.log(val.type)
                if (val.type === "Cartoon") {
                    return total + (val.item_total * discount_percentage / 100) ;
                }
                return total;
            }, 0);

            return discount;
        },
        calculateSGST: function() {
            return (this.total * 5 / 100);
        },
        calculateCGST: function() {
            return (this.total * 1 / 100);
        },
        calculateTotal: function() {
            return this.total - this.calculateSGST - this.calculateCGST;
        },
    }
}
</script>

<style>

</style>