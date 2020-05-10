import Vue from 'vue';
import Vuex from 'vuex';

import App from './App.vue';
import './assets/styles/common.scss';

import {storeTodo} from './store-todos';

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    todos: storeTodo
  }
});

new Vue({
  render: h => h(App),
  store
}).$mount('#app');
