import Vue from 'vue';
import Vuex from 'vuex';

import App from './App.vue';
import './assets/styles/common.scss';

import {todoStore} from './todo-app-store';

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    todos: todoStore
  }
});

new Vue({
  render: h => h(App),
  store
}).$mount('#app');
