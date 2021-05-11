<template>
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">
              <div class="brand-logo">
                <!-- <img src="../../images/logo.svg" alt="logo"> -->
              </div>
              <h4>New here?</h4>
              <h6 class="font-weight-light">Signing up is easy. It only takes a few steps</h6>
              <alert-message :message="message" v-if="message"></alert-message>
              <form class="pt-3" @submit="signup">
                <div class="form-group">
                  <input type="text" class="form-control form-control-lg" placeholder="Name" v-model="name">
                </div>
                <div class="form-group">
                  <input type="email" class="form-control form-control-lg" placeholder="Email" v-model="email">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control form-control-lg" placeholder="Password" v-model="password">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control form-control-lg" placeholder="Confirm password" v-model="password2">
                </div>
                <div class="mb-4">
                  <div class="form-check">
                    <label class="form-check-label text-muted">
                      <input type="checkbox" class="form-check-input">
                      I agree to all Terms & Conditions
                    </label>
                  </div>
                </div>
                <div class="mt-3">
                  <button type="submit" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN UP</button>
                </div>
                <div class="text-center mt-4 font-weight-light">
                  Already have an account? <router-link to="login" class="text-primary">Login</router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
</template>
<script>
import AlertMessage from './Common/AlertMessage'
export default {
    components: {
      AlertMessage
    },
    data() {
        return {
            name: "",
            email: "",
            password: "",
            password2: "",
            message: {},
        }    
    },
    methods: {
        signup(e) {
            e.preventDefault()
            let data = {
                name: this.name,
                email: this.email,
                password: this.password
            }

            this.$store.dispatch('signup', data)
                  .then(() => this.$router.push('/login')
                  .catch(err => {
                      this.message = {
                        type : "error",
                        text : err.response.data.error
                      }
                    }));
            
        }
    }
}
</script>