export const storeTodo = {
  state: {
    list: []
  },
  getters: {
    count: state => {
      return state.list.length;
    },
    completed: state => {
      return state.list.filter(todo => todo.completed)
    }
  },
  mutations: {
    add(state, newTodo) {
      state.list.push({
        content: newTodo,
        timestamp: new Date()
      })
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
    }
  },
}
