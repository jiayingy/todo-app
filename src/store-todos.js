export const storeTodo = {
  state: {
    list: []
  },
  mutations: {
    add(state, newTodo) {
      state.list.push(newTodo)
    },
  }
}
