<template>
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">
              <div class="brand-logo">
                <!-- <img src="../../images/logo.svg" alt="logo"> -->
              </div>
              <h4>Sign in to continue.</h4>
              <alert-message :message="message" v-if="message"></alert-message>
              <form class="pt-3" @submit="login">
                <div class="form-group">
                  <input type="email" v-model="email" class="form-control form-control-lg" placeholder="Username">
                </div>
                <div class="form-group">
                  <input type="password" v-model="password" class="form-control form-control-lg"  placeholder="Password">
                </div>
                <div class="mt-3">
                   <button type="submit" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                    SIGN IN
                   </button>
                </div>
                <div class="my-2 d-flex justify-content-between align-items-center">
                  <div class="form-check">
                    <label class="form-check-label text-muted">
                      <input type="checkbox" class="form-check-input">
                      Keep me signed in
                    </label>
                  </div>
                  <a href="#" class="auth-link text-black">Forgot password?</a>
                </div>
                <div class="text-center mt-4 font-weight-light">
                  Don't have an account? <router-link to="signup" class="text-primary">Create</router-link>
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
            email: "",
            password: "",
            message: {}
        }
    },
    methods: {
        login(e) {
            e.preventDefault()
            const email = this.email 
            const password = this.password

            this.$store.dispatch('login', {email, password})
                    .then(() => this.$router.push('/'))
                    .catch(err => {
                      this.message = {
                        type : "error",
                        text : err.response.data.error
                      }
                    })
        }
    }
}
</script>