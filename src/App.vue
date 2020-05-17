<template>
  <div id="app">
    <TodoAppHeader
      class="grid__item"
      @updateDate="(val) => date = val"
    />
    <div class="todo-wrapper grid__item">
      <TodoInput :date="date" />
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
  data() {
    return {
      date: new Date(),
    }
  },
  watch: {
    date(val) {
      if (val) {
        this.getTodos(this.getTimestampKeyRange(val));
      }
    }
  },
  async created() {
    await this.createDb();

    this.getTodos(this.getTimestampKeyRange(this.date));
  },
  methods: {
    async createDb() {
      const db = await new Promise((res, rej) => {
        let dbReq = indexedDB.open('todo-app', 1);
        dbReq.onupgradeneeded = (event) => {
          let db = event.target.result;
          db.createObjectStore('todos', {
            autoIncrement: true,
            keyPath: 'date'
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
    },
    getTodos(query = null) {
      this.$store.commit('getDbTodos', query);
    },
    getTimestampKeyRange(date) {
      const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
      const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
      const keyRange = IDBKeyRange.bound(startOfDay.getTime(), endOfDay.getTime());
      return keyRange;
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
