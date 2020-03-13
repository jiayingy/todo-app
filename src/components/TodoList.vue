<template>
  <div class="todo-list">
    <TodoItem
      v-for="todo in undone"
      :key="todo.index"
      :todo="todo"
    />
    <TodoItem
      v-for="todo in completed"
      :key="todo.index"
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
  created() {
    // this.createDb();
  },
  methods: {
    // createDb() {
    //   let dbReq = indexedDB.open('todo-app', 1);
    //   dbReq.onupgradeneeded = (event) => {
    //     this.db = event.target.result;
    //   }

    //   dbReq.onsuccess = (event) => {
    //     this.db = event.target.result;
    //     console.log(this.db)
    //   }

    //   dbReq.onerror = (event) => {
    //     this.dbError = true;
    //     alert('Error retrieving todo list, please try again later')
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.todo-list {
  margin-top: 40px;
}
</style>