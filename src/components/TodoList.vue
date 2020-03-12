<template>
  <div>
    <TodoItem
      v-for="(todo, index) in todoList"
      :key="index"
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
    todoList() {
      return this.$store.state.todos.list;
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

<style>

</style>