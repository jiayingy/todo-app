<template>
  <div class="todo-list">
    <TodoItem
      v-for="todo in undone"
      :key="todo.created"
      :todo="todo"
    />
    <TodoItem
      v-for="todo in completed"
      :key="todo.created"
      :todo="todo"
    />
  </div>
</template>

<script>
import TodoItem from './TodoItem';
export default {
  components: {
    TodoItem
  },
  props: {
    newTodo: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      db: null,
      dbError: false,
    }
  },
  computed: {
    undone() {
      return this.$store.getters.undone;
    },
    completed() {
      return this.$store.getters.completed;
    }
  },
}
</script>

<style lang="scss" scoped>
.todo-list {
  margin-top: 40px;
}
</style>