<template>
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">
                <i class="mdi mdi-home menu-icon"></i>
                <span class="menu-title">Dashboard</span>
            </router-link>
          </li>
          <li class="nav-item">
              <router-link to="order" class="nav-link">
                  <i class="mdi mdi-grid-large menu-icon"></i>
                    <span class="menu-title">Orders</span>
              </router-link>
          </li>
          <li class="nav-item">
            <router-link to="customer" class="nav-link">
              <i class="mdi mdi-account-multiple menu-icon"></i>
              <span class="menu-title">Customers</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="product" class="nav-link">
              <i class="mdi mdi-cube menu-icon"></i>
              <span class="menu-title">Products</span>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#report" aria-expanded="false" aria-controls="report">
              <i class="mdi mdi-file-document-box-outline menu-icon"></i>
              <span class="menu-title">Reports</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="report">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> 
                    <router-link to="customer-statistics" class="nav-link">
                      <span class="menu-title">Customer statistics</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="order-statistics" class="nav-link">
                      <span class="menu-title">Order statistics</span>
                    </router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
    </nav>
</template>
<script>
export default {

}
</script>
