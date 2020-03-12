export const storeTodo = {
  state: {
    list: []
  },
  getters: {
    count: state => {
      return state.todos.length;
    }
  },
  mutations: {
    add(state, newTodo) {
      state.list.push(newTodo)
    },
  },
}
