<template>
  <div class="todo">
    <div class="todo-mark-complete">
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
  }
}
</script>

<style lang="scss" scoped>
$todo-padding: 12px 5px;
$todo-border-color: #dedede;

.todo {
  width: 100%;
  background-color: white;
  border: 1px solid $todo-border-color;
  display: grid;
  grid-template-columns: 50px 1fr 50px;
  align-items: center;

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
    padding: 12px 15px;
  }
  .todo-delete {
    outline: none;
    cursor: pointer;
  }
}

</style>