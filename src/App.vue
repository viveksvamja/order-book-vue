<template>
  <div id="app">
    <router-view :key="$route.fullPath"/>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  components: {
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  }
}
</script>

<style>
</style>
