<template>
  <div />
</template>

<script>
export default {
  props: {
    newTodo: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      db: null,
      dbError: false
    }
  },
  created() {
    this.createDb();
  },
  methods: {
    createDb() {
      let dbReq = indexedDB.open('todo-app', 1);
      dbReq.onupgradeneeded = (event) => {
        this.db = event.target.result;
      }

      dbReq.onsuccess = (event) => {
        this.db = event.target.result;
      }

      dbReq.onerror = (event) => {
        this.dbError = true;
        alert('Error retrieving todo list, please try again later')
      }
    }
  }
}
</script>

<style>

</style>