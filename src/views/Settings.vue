<template>
    <layout>
      <div class="col-12 grid-margin stretch-card">
        <div class="card">
        <div class="card-body">
            <h4 class="card-title">User Settings</h4>
            <alert-message :message="message" v-if="message"></alert-message>
            <form class="forms-sample" @submit="updateSettings">
                <div class="form-group">
                    <label for="userName" class="text-left">User Name</label>
                    <input 
                        type="text" 
                        :class="{'form-control':true, 'is-invalid' : $v.user.name.$error}" 
                        name="name" 
                        v-model="$v.user.name.$model"
                        placeholder="User Name" autocomplete="nope" />
                    <validation-message
                        v-if="$v.user.name.$error"
                        field="User Name"
                        :errors="$v.user.name"
                    ></validation-message>
                </div>
                <div class="form-group">
                    <label for="emailAddress" class="text-left">Email address</label>
                    <input 
                    type="email" 
                    :class="{'form-control':true, 'is-invalid' : $v.user.email.$error}" 
                    name="email" 
                    v-model="$v.user.email.$model"
                    placeholder="Email" autocomplete="nope">
                    <validation-message
                        v-if="$v.user.email.$error"
                        field="Email address"
                        :errors="$v.user.email"
                    ></validation-message>
                </div>
                <div class="form-group">
                    <label for="password" class="text-left">Password</label>
                    <input 
                        type="password" 
                        :class="{'form-control':true, 'is-invalid' : $v.user.password.$error}" 
                        name="password" 
                        v-model="$v.user.password.$model"
                        placeholder="Password" 
                        autocomplete="off">
                    <validation-message
                        v-if="$v.user.password.$error"
                        field="Password"
                        :errors="$v.user.password"
                    ></validation-message>
                </div>
                <div class="form-group">
                    <label for="profile-image" class="text-left">Upload Profile Image</label>
                    <input type="file" class="form-control" @change="onFileChange" />
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
import Layout from "./Common/Layout"
import axios from 'axios';
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import ValidationMessage from './Common/ValidationMessage';
import AlertMessage from './Common/AlertMessage'

export default {
    name: "user-settings",
    components: {
        Layout,
        ValidationMessage,
        AlertMessage
    },
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: "",
                avatar: "",
            },
            message: {},
        }
    },
    mounted() {
        axios.get(`auth/user`, {
            headers: {
            'Authorization': `Bearer ${this.$store.getters.token}`
            },
        }).then(response => {
            this.user = response.data;
        })
    },
    validations: {
        user: {
            name: {
                required,
                minLength : minLength(3),
                maxLength : maxLength(50)
            },
            email: {
                required,
                email
            },
            password: {
            }
        }
    },
    methods: {
        updateSettings(e) {
            e.preventDefault();
            this.$v.$touch()
            if (!this.$v.$invalid) {
                let params = {
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password,
                    avatar: this.user.avatar,
                }
                
                // Filter blank data from payload
                Object.keys(params).forEach((k) => params[k] == "" && delete params[k]);

                // Update customer request to server
                axios.patch(`auth/update`, params, {
                    headers: {
                        'Authorization': `Bearer ${this.$store.getters.token}`
                    }
                }).then(() => {
                    this.message = {
                        text: "User settings successfully!",
                        type: 'success',
                    }
                }).catch(error => {
                    this.message = {
                        text: error.response.data.error,
                        type: 'error',
                    }
                });
            }
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.user.avatar = URL.createObjectURL(file);
        }
    }
}
</script>

<style>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>