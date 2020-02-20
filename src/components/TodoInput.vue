<template>
  <input
    v-model="todo"
    type="text"
    placeholder="What would you like to work on today?"
  >
</template>

<script>
export default {
  data() {
    return {
      todo: ''
    }
  }
}
</script>

<style>

</style>