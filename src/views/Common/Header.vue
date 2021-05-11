<template>
    <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div class="navbar-brand-wrapper d-flex justify-content-center">
        <div class="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
          <router-link to="/" class="navbar-brand brand-logo"><img src="images/logo.svg" alt="logo"/></router-link>
          <router-link to="/" class="navbar-brand brand-logo-mini"><img src="images/logo-mini.svg" alt="logo"/></router-link>
          <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span class="mdi mdi-sort-variant"></span>
          </button>
        </div>  
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <!-- <ul class="navbar-nav mr-lg-4 w-100">
          <li class="nav-item nav-search d-none d-lg-block w-100">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="search">
                  <i class="mdi mdi-magnify"></i>
                </span>
              </div>
              <input type="text" class="form-control" placeholder="Search now" aria-label="search" aria-describedby="search">
            </div>
          </li>
        </ul> -->
        <ul class="navbar-nav navbar-nav-right">
          <!-- <li class="nav-item dropdown mr-1">
            <a class="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center" id="messageDropdown" href="#" data-toggle="dropdown">
              <i class="mdi mdi-message-text mx-0"></i>
              <span class="count"></span>
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="messageDropdown">
              <p class="mb-0 font-weight-normal float-left dropdown-header">Messages</p>
              <a class="dropdown-item">
                <div class="item-thumbnail">
                    <img src="images/faces/face4.jpg" alt="image" class="profile-pic">
                </div>
                <div class="item-content flex-grow">
                  <h6 class="ellipsis font-weight-normal">David Grey
                  </h6>
                  <p class="font-weight-light small-text text-muted mb-0">
                    The meeting is cancelled
                  </p>
                </div>
              </a>
              <a class="dropdown-item">
                <div class="item-thumbnail">
                    <img src="images/faces/face2.jpg" alt="image" class="profile-pic">
                </div>
                <div class="item-content flex-grow">
                  <h6 class="ellipsis font-weight-normal">Tim Cook
                  </h6>
                  <p class="font-weight-light small-text text-muted mb-0">
                    New product launch
                  </p>
                </div>
              </a>
              <a class="dropdown-item">
                <div class="item-thumbnail">
                    <img src="images/faces/face3.jpg" alt="image" class="profile-pic">
                </div>
                <div class="item-content flex-grow">
                  <h6 class="ellipsis font-weight-normal"> Johnson
                  </h6>
                  <p class="font-weight-light small-text text-muted mb-0">
                    Upcoming board meeting
                  </p>
                </div>
              </a>
            </div>
          </li> -->
          <li class="nav-item dropdown mr-4">
            <a class="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center notification-dropdown" id="notificationDropdown" href="#" data-toggle="dropdown">
              <i class="mdi mdi-bell mx-0"></i>
              <span class="count"></span>
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="notificationDropdown">
              <p class="mb-0 font-weight-bold float-left dropdown-header">Recent Pending orders</p>
              <router-link :to="{ path: `/order/${order._id}`}" class="dropdown-item" v-for="(order, index) in recentPendingOrders.docs" :key="index" :order="order">
                <div class="item-thumbnail">
                  <div class="item-icon bg-warning">
                    <i class="mdi mdi-open-in-new mx-0"></i>
                  </div>
                </div>
                <div class="item-content">
                  <h6 class="font-weight-normal">#{{order.order_no}}  - {{order.customer.name}}</h6>
                  <p class="font-weight-light small-text mb-0 text-muted">
                    {{order.total | formatCurrency}} <i>{{calculatedOrderDateDiff(order.createdAt)}}</i>
                  </p>
                </div>
              </router-link>
            </div>
          </li>
          <li class="nav-item nav-profile dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
              <!-- <img v-if="profileImage" :src="profileImage" alt="profile"/> -->
              <img src="images/faces/face5.jpg" alt="profile"/>
              <span class="nav-profile-name">{{ currentUser.name }}</span>
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
              <router-link to="settings" class="dropdown-item">
                  <i class="mdi mdi-settings text-primary"></i>
                  Settings
              </router-link>
              
              <a class="dropdown-item" v-if="isLoggedIn" @click="logout()">
                <i class="mdi mdi-logout text-primary"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span class="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
</template>
<script>
import axios from "axios";
import moment from 'moment';
export default {
    props: {
        isLoggedIn: Boolean,
        currentUser: [Object, Array]
    },
    data() {
      return {
          recentPendingOrders : [],
          profileImage : "",
      }
    },
    mounted() {
      axios.get(`orders?status=in-process`, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.token}`
        },
      }).then(response => {
        this.recentPendingOrders = response.data
      })

      axios.get(`auth/avatar`, {
        responseType: 'blob',
        headers: {
          'Authorization': `Bearer ${this.$store.getters.token}`
        },
      }).then(response => {
        this.profileImage = URL.createObjectURL(response.data);
      })
    },
    methods: {
        logout() {
            this.$store.dispatch('logout').then(() => this.$router.push('/login'))
        },
        calculatedOrderDateDiff(date) {
          let orderDate = moment(String(date));
          let diff = moment().diff(orderDate, 'days');
          if (diff == 0) {
              return "today"
          }
          return `${diff} days ago`
        },
        loadAvatar(response) {
          // It is necessary to create a new blob object with mime-type explicitly set
          // otherwise only Chrome works like it should
          var newBlob = new Blob([response.data], {type: 'image/jpeg'})

          // IE doesn't allow using a blob object directly as link href
          // instead it is necessary to use msSaveOrOpenBlob
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob)
            return
          }

          // For other browsers:
          // Create a link pointing to the ObjectURL containing the blob.
          const data = window.URL.createObjectURL(newBlob)
          this.profileImage = data

          setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data)
          }, 100)
        }
    },
}
</script>