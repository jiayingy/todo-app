export const storeTodo = {
  state: {
    list: []
  },
  getters: {
    count: state => {
      return state.list.length;
    }
  },
  mutations: {
    add(state, newTodo) {
      state.list.push({
        content: newTodo,
        timestamp: new Date()
      })
    },
  },
}
