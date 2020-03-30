export const storeTodo = {
  state: {
    db: null,
    list: []
  },
  getters: {
    count: state => {
      return state.list.length;
    },
    completed: state => {
      return state.list.filter(todo => todo.completed)
    },
    undone: state => {
      return state.list.filter(todo => !todo.completed);
    }
  },
  mutations: {
    createDb(state, db) {
      state.db = db;
    },
    getTodos(state) {
      const transaction = state.db.transaction('todos', 'readonly');
      const objStore = transaction.objectStore('todos');
      state.list = []
      objStore.openCursor().onsuccess = (event) => {
        let cursor = event.target.result;
        if(cursor) {
          state.list.push(cursor.value);
          cursor.continue();
        }
      }
    },
  },
  actions: {
    addTodo({ state, commit }, newTodo) {
      let transaction = state.db.transaction('todos', 'readwrite');
      let objStore = transaction.objectStore('todos');
      objStore.put({
        content: newTodo,
        timestamp: Date.now(),
        completed: false,
      });

      transaction.oncomplete = (event) => {
        // alert('todo added');
      }

      commit('getTodos');
    },
    toggleStatus({state, commit}, timestamp) {
      let todoItem = state.list.find(val => val.timestamp === timestamp);

      todoItem = {
        ...todoItem,
        completed: !todoItem.completed
      }

      const transaction = state.db.transaction('todos', 'readwrite');
      const objStore = transaction.objectStore('todos');
      const req = objStore.put(todoItem);
      req.onsuccess = (event) => {
        commit('getTodos');
      }
    },
    deleteTodo({state, commit}, timestamp) {
      let transaction = state.db.transaction('todos', 'readwrite');
      const objStore = transaction.objectStore('todos');
      const req = objStore.delete(timestamp);

      req.onsuccess = (event) => {
        commit('getTodos');
      }
    }
  }
}
