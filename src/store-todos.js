export const storeTodo = {
  state: {
    db: null,
    dbError: null,
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
    createDb(state) {
      return new Promise((res, rej) => {
        let dbReq = indexedDB.open('todo-app', 1);
        dbReq.onupgradeneeded = (event) => {
          state.db = event.target.result;
          state.db.createObjectStore('todos', {
            autoIncrement: true,
            keyPath: 'timestamp'
          })
        }
  
        dbReq.onsuccess = (event) => {
          state.db = event.target.result;
          res(state.db)
        }
        dbReq.onerror = (event) => {
          state.dbError = true;
          rej(state.dbError)
        }
      })
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
    async createDb({ commit }) {
      await commit('createDb')
      commit('getTodos');
    },
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
