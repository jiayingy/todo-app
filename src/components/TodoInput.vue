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
  props: {
    date: {
      type: Date,
      default: new Date(),
    }
  },
  data() {
    return {
      todo: '',
      charsLeft: TODO_MAX_CHARS
    }
  },
  computed: {
    todosCount() {
      return this.$store.getters.count;
    }
  },
  watch: {
    todo(val) {
      if (val) {
        this.charsLeft = TODO_MAX_CHARS - val.length;
      } else {
        this.charsLeft = TODO_MAX_CHARS;
      }
    },
    todosCount(newCount, oldCount) {
      if (newCount > oldCount) { 
        // new todo added successfully
        this.todo = '';
      }
    }
  },
  methods: {
    addNewTodo() {
      if (this.todo) {
        this.$store.dispatch('addTodo', {
          todo: this.todo,
          date: this.date.getTime(),
        });
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
  color: #979797;
}

.todo-chars-count {
  text-align: right;
  text-transform: uppercase;
  font-size: 0.8em;
  color: #D8D8D8;
}
</style>