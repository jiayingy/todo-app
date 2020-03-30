<template>
  <div id="app">
    <TodoAppHeader class="grid__item" />
    <div class="todo-wrapper grid__item">
      <TodoInput />
      <TodoList />
    </div>
  </div>
</template>

<script>
import TodoAppHeader from './components/TodoAppHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';

export default {
  name: 'App',
  components: {
    TodoAppHeader,
    TodoInput,
    TodoList
  },
  async created() {
    await this.createDb();
    this.$store.commit('getDbTodos');
  },
  methods: {
    async createDb() {
      const db = await new Promise((res, rej) => {
      let dbReq = indexedDB.open('todo-app', 1);
      dbReq.onupgradeneeded = (event) => {
        let db = event.target.result;
        db.createObjectStore('todos', {
          autoIncrement: true,
          keyPath: 'timestamp'
        });
        res(db);
      }
      dbReq.onsuccess = (event) => {
        res(event.target.result);
      }
      dbReq.onerror = (event) => {
        const dbError = event;
        rej('Error');
      }
    });
    this.$store.commit('createDb', db);
    }
  },
};
</script>

<style lang="scss">
#app {
  min-width: 450px;
  max-width: 800px;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  margin: auto;
}

.grid__item {
  grid-column: 3/-3;
}

.todo-wrapper {
  width: 100%;
}
</style>
