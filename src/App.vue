<template>
  <div id="app">
    <TodoAppHeader />
    <TodoInput />
  </div>
</template>

<script>
import TodoAppHeader from './components/TodoAppHeader.vue';
import TodoInput from './components/TodoInput.vue';

export default {
  name: 'App',
  components: {
    TodoAppHeader,
    TodoInput
  }
};
</script>

<style lang="scss">
#app {
  text-align: center;
}
</style>
