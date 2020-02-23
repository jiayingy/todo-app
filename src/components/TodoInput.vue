<template>
  <input
    v-model="todo"
    type="text"
    placeholder="What would you like to work on today?"
    @keydown.enter="addNewTodo"
  >
</template>

<script>
export default {
  data() {
    return {
      todo: ''
    }
  },
  methods: {
    addNewTodo() {
      if (this.todo) {
        this.$emit('add', this.todo);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  border: 0;
  outline: none;
  padding: 5px;
  font-size: 16px;
  background-color: transparent;
  width: 400px;
  text-align: center;
}
</style>