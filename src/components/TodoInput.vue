<template>
  <input
    v-model="todo"
    type="text"
    placeholder="What would you like to work on today?"
    maxlength="250"
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
  padding: 15px 0;
  font-size: 16px;
  background-color: transparent;
  width: 400px;
  text-align: left;
  font-family: 'Century Gothic', 'Helvetica', 'Arial', sans-serif;
  border-bottom: 1px solid #979797;
}
::placeholder {
  color: #D8D8D8;
}
</style>