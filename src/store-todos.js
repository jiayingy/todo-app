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
    markComplete(state, index) {
      state.list = [
        ...state.list.slice(0, index),
        {
          ...state.list[index],
          completed: true
        },
        ...state.list.slice(index+1)
      ];
    },
    getTodos(state) {
      const transaction = state.db.transaction('todos', 'readonly');
      const objStore = transaction.objectStore('todos');
      objStore.openCursor().onsuccess = (event) => {
        let cursor = event.target.result;
        if(cursor) {
          state.list.push(cursor.value);
          cursor.continue();
        }
      }
    }
  },
  actions: {
    addTodo({ state, commit }, newTodo) {
      let transaction = state.db.transaction('todos', 'readwrite');
      let objStore = transaction.objectStore('todos');
      objStore.put({
        content: newTodo,
        timestamp: Date.now(),
      });

      transaction.oncomplete = (event) => {
        alert('todo added');
      }

      commit('getTodos');
    }
  }
}
