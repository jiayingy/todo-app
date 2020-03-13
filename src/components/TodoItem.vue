<template>
  <div class="todo">
    <div
      class="todo-mark-complete"
      @click="markComplete"
    >
      <i class="material-icons">
        check
      </i>
    </div>
    <div class="todo-content">
      {{ todo.content }}
    </div>
    <div class="todo-delete">
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
    markComplete() {
      this.$store.commit('markComplete', this.todo.index);
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