<template>
  <div v-if="message" :class="{
        'alert-danger': message.type === 'error',
        'alert-success': message.type === 'success',
      }"
      class="alert" 
      role="alert">
        {{message.text}}
  </div>
</template>

<script>
export default {
    props: {
        message: [Object, Array],
    }
}
</script>