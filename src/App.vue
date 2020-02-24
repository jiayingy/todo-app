<template>
  <div id="app">
    <TodoAppHeader />
    <TodoInput />
    <TodoList />
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
  }
};
</script>

<style lang="scss">
#app {
  text-align: center;
}
</style>
