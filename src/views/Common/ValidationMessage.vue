<template>
    <div class="invalid-feedback text-left">
      <span v-if="errors.required !== undefined && !errors.required">{{field}} is required</span>
      <span v-else-if="errors.minLength !== undefined && !errors.minLength">Minimum {{errors.$params.minLength.min}} character required</span>
      <span v-else-if="errors.maxLength !== undefined && !errors.maxLength">Maximum {{errors.$params.maxLength.max}} character allowed</span>
      <span v-else-if="errors.email !== undefined && !errors.email">Invalid {{field}} format</span>
      <span v-else-if="errors.alphaNum !== undefined && !errors.alphaNum">Must be alphanumeric allowed</span>
      <span v-else-if="errors.between !== undefined && !errors.between">{{field}} must be between {{errors.$params.between.min}} & {{errors.$params.between.max}}</span>
      <span v-else>Invalid {{field}}</span>
    </div>
</template>

<script>
export default {
    props: {
        field: String,
        errors: [Object, Array]
    }
}
</script>

<style>

</style>