import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
      {
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
      },
      {
        "id": 2,
        "title": "quis ut nam facilis et officia qui",
        "completed": false
      },
      {
        "id": 3,
        "title": "fugiat veniam minus",
        "completed": false
      },
      {
        "id": 4,
        "title": "et porro tempora",
        "completed": true
      },
      {
        "id": 5,
        "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
        "completed": false
      },
    ]
  },
  mutations: {
    addTodo: (state, todo) => state.todos.unshift(todo),
    updateTodo: (state, newTodo) => {
      const index = state.todos.findIndex(oldTodo => oldTodo.id == newTodo.id);
      if (index !== -1) {
        state.todos.splice(index, 1, newTodo);
      }
    },
    deleteTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
  },
  actions: {
    addTodo({ commit }, title) {
      commit('addTodo', {
        id: Math.floor(Math.random() * Math.floor(1000)),
        title,
        completed: false,
      })
    },
    updateTodo({ commit }, todo) {
      console.log(todo);
      commit('updateTodo', todo)
    },
    deleteTodo({ commit }, id) {
      commit('deleteTodo', id)
    }
  },
  modules: {
  },
  getters: {
    getTodos: state => state.todos
  },
})
