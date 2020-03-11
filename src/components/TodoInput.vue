<template>
  <div class="todo-input">
    <input
      v-model="todo"
      type="text"
      placeholder="What would you like to work on today?"
      maxlength="250"
      @keydown.enter="addNewTodo"
    >
    <div class="todo-chars-count">
      {{ charsLeft }} chars left
    </div>
  </div>
</template>

<script>
const TODO_MAX_CHARS = 250;
export default {
  data() {
    return {
      todo: '',
      charsLeft: TODO_MAX_CHARS
    }
  },
  watch: {
    todo(val) {
      if (val) {
        this.charsLeft = TODO_MAX_CHARS - val.length;
      } else {
        this.charsLeft = TODO_MAX_CHARS;
      }
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
.todo-input {
width: 100%;
}
input {
  border: 0;
  outline: none;
  padding: 15px 0;
  font-size: 1em;
  background-color: transparent;
  text-align: left;
  border-bottom: 1px solid #979797;
  margin-bottom: 10px;
  width: 100%;
}
::placeholder {
  color: #D8D8D8;
}

.todo-chars-count {
  text-align: right;
  text-transform: uppercase;
  font-size: 0.8em;
}
</style>