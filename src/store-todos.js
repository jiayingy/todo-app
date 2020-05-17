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
    getDbTodos(state, query = null) {
      const transaction = state.db.transaction('todos', 'readonly');
      const objStore = transaction.objectStore('todos');
      state.list = []
      objStore.openCursor(query).onsuccess = (event) => {
        let cursor = event.target.result;
        if(cursor) {
          state.list.push(cursor.value);
          cursor.continue();
        }
      }
    },
    updateLocalTodos(state, payload) {
      switch (payload.action) {
        case 'add':
          state.list = [
            ...state.list,
            payload.todo
          ];
          break;
        case 'delete': {
          const deleteIndex = state.list.findIndex(val => 
            val.created === payload.todo.created);
          if (deleteIndex >= 0) {
            state.list = [
              ...state.list.slice(0, deleteIndex),
              ...state.list.slice(deleteIndex + 1, state.list.length)
            ];
          }
          break;
        }
        case 'update': {
          const updateIndex = state.list.findIndex(val => 
            val.created === payload.todo.created);
          if (updateIndex >= 0) {
            state.list = [
              ...state.list.slice(0, updateIndex),
              payload.todo,
              ...state.list.slice(updateIndex + 1, state.list.length)
            ];
          }
          break;
        }
        default:
          break;
      }
    }
  },
  actions: {
    addTodo({ state, commit }, { todo, date }) {
      let transaction = state.db.transaction('todos', 'readwrite');
      let objStore = transaction.objectStore('todos');
      const newTodo = {
        content: todo,
        date,
        created: Date.now(),
        completed: false,
      }
      objStore.put(newTodo);

      transaction.oncomplete = (event) => {
        // alert('todo added');
      }
      commit('updateLocalTodos', {
        todo: newTodo,
        action: 'add'
      });
    },
    updateTodo({state, commit}, todo) {
      const newTodo = {
        ...todo,
        completed: !todo.completed
      }

      const transaction = state.db.transaction('todos', 'readwrite');
      const objStore = transaction.objectStore('todos');
      const req = objStore.put(newTodo);
      req.onsuccess = (event) => {
        commit('updateLocalTodos', {
          todo: newTodo,
          action: 'update'
        });
      }
    },
    deleteTodo({state, commit}, todo) {
      let transaction = state.db.transaction('todos', 'readwrite');
      const objStore = transaction.objectStore('todos');
      const req = objStore.delete(todo.date);

      req.onsuccess = (event) => {
        commit('updateLocalTodos', {
          todo,
          action: 'delete'
        });
      }
    }
  }
}
