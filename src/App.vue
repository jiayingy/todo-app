<template>
  <div id="app">
    <TodoAppHeader/>
  </div>
</template>

<script>
import TodoAppHeader from './components/TodoAppHeader.vue'

export default {
  name: 'app',
  components: {
    TodoAppHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
