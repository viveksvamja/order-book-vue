<template>
  <div class="home">
    <HeaderComponent v-if="this.$store.getters.isLoggedIn"
      :isLoggedIn="this.$store.getters.isLoggedIn"
      :currentUser="this.$store.getters.currentUser"
    ></HeaderComponent>
    <div class="container-fluid page-body-wrapper">
      <SiderBarComponent/>
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
          <slot/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "./../Common/Header"
import SiderBarComponent from "./../Common/Sidebar"
export default {
  name: 'Layout',
  components: {
    HeaderComponent,
    SiderBarComponent
  },
}
</script>

<style scoped>
.content-wrapper {
  padding: 0.5rem 0.5rem;
}
</style>