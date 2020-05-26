<template>
  <div class="todo">
    <div
      class="todo-mark-complete"
      @click="updateTodo"
    >
      <i
        class="material-icons"
        :style="{
          color: `${todo.completed ? '#47D89B' : ''}`
        }"
      >
        check
      </i>
    </div>
    <div
      class="todo-content"
      :style="{
        textDecoration: `${todo.completed ? 'line-through' : 'none'}`
      }"
      :title="todo.content"
    >
      {{ todo.content }}
    </div>
    <div
      class="todo-delete"
      @click="deleteTodo"
    >
      <i class="material-icons">
        delete
      </i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    updateTodo() {
      this.$store.dispatch('updateTodo', this.todo);
    },
    deleteTodo() {
      this.$store.dispatch('deleteTodo', this.todo);
    }
  }
}
</script>

<style lang="scss" scoped>
$todo-padding: 15px 5px;
$todo-border-color: #dedede;

.todo {
  width: 100%;
  background-color: white;
  border: 1px solid $todo-border-color;
  display: grid;
  grid-template-columns: 50px minmax(0, 1fr) 50px;
  align-items: stretch;

  > div {
    padding: $todo-padding;
  }

  .material-icons {
    color: $todo-border-color;
  }
  .todo-mark-complete {
    border-right: 1px solid $todo-border-color;
    outline: none;
    cursor: pointer;
  }
  .todo-content {
    text-align: left;
    padding: 15px 15px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .todo-delete {
    outline: none;
    cursor: pointer;
  }
}

</style>