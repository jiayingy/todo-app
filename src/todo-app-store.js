export const todoStore = {
  state: {
    list: []
  },
  mutations: {
    add(state, newTodo) {
      state.list.push(newTodo)
    },
  }
}
