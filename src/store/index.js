import Vue from "vue";
import Vuex from "vuex";
import { add } from "date-fns";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [
      {
        id: 1,
        title:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        description:
          "Cu vim feugiat fabellas erroribus, pro senserit disputando id, mucius.",
        priority: 1,
        dueDate: add(new Date(), {
          hours: Math.floor(Math.random() * Math.floor(168)) + 1,
        }),
        notes:
          "Pri esse labitur accumsan no. Vidit soleat doctus has te, vis erant timeam recteque an.",
        checklist: [
          {
            id: 1,
            title: "venenatis a condimentum",
            completed: false,
          },
          {
            id: 2,
            title: "facilisis mauris sit amet massa",
            completed: true,
          },
          {
            id: 3,
            title: "sollicitudin tempor id eu nisl nunc mi ipsum",
            completed: false,
          },
        ],
        created: new Date(2020, 3, 16),
        completed: false,
      },
      {
        id: 2,
        title: "sit amet tellus cras adipiscing enim eu turpis egestas pretium",
        description:
          "Cu vim feugiat fabellas erroribus, pro senserit disputando id, mucius.",
        priority: 2,
        dueDate: add(new Date(), {
          hours: Math.floor(Math.random() * Math.floor(168)) + 1,
        }),
        notes:
          "Pri esse labitur accumsan no. Vidit soleat doctus has te, vis erant timeam recteque an.",
        checklist: [
          {
            id: 1,
            title: "venenatis a condimentum",
            completed: false,
          },
          {
            id: 2,
            title: "facilisis mauris sit amet massa",
            completed: true,
          },
          {
            id: 3,
            title: "sollicitudin tempor id eu nisl nunc mi ipsum",
            completed: false,
          },
        ],
        created: new Date(1996, 8, 5),
        completed: false,
      },
      {
        id: 3,
        title: "arcu vitae elementum curabitur vitae nunc sed velit",
        description:
          "Cu vim feugiat fabellas erroribus, pro senserit disputando id, mucius.",
        priority: 3,
        dueDate: add(new Date(), {
          hours: Math.floor(Math.random() * Math.floor(168)) + 1,
        }),
        notes:
          "Pri esse labitur accumsan no. Vidit soleat doctus has te, vis erant timeam recteque an.",
        checklist: [
          {
            id: 1,
            title: "venenatis a condimentum",
            completed: false,
          },
          {
            id: 2,
            title: "facilisis mauris sit amet massa",
            completed: true,
          },
          {
            id: 3,
            title: "sollicitudin tempor id eu nisl nunc mi ipsum",
            completed: false,
          },
        ],
        created: new Date(2016, 11, 3),
        completed: false,
      },
      {
        id: 4,
        title: "aliquam etiam erat velit scelerisque in dictum non",
        description:
          "Cu vim feugiat fabellas erroribus, pro senserit disputando id, mucius.",
        priority: 1,
        dueDate: add(new Date(), {
          hours: Math.floor(Math.random() * Math.floor(168)) + 1,
        }),
        notes:
          "Pri esse labitur accumsan no. Vidit soleat doctus has te, vis erant timeam recteque an.",
        checklist: [
          {
            id: 1,
            title: "venenatis a condimentum",
            completed: false,
          },
          {
            id: 2,
            title: "facilisis mauris sit amet massa",
            completed: true,
          },
          {
            id: 3,
            title: "sollicitudin tempor id eu nisl nunc mi ipsum",
            completed: false,
          },
        ],
        created: new Date(2018, 7, 16),
        completed: true,
      },
      {
        id: 5,
        title: "porttitor leo a diam sollicitudin tempor id eu nisl nunc",
        description:
          "Cu vim feugiat fabellas erroribus, pro senserit disputando id, mucius.",
        priority: 2,
        dueDate: add(new Date(), {
          hours: Math.floor(Math.random() * Math.floor(168)) + 1,
        }),
        notes:
          "Pri esse labitur accumsan no. Vidit soleat doctus has te, vis erant timeam recteque an.",
        checklist: [
          {
            id: 1,
            title: "venenatis a condimentum",
            completed: false,
          },
          {
            id: 2,
            title: "facilisis mauris sit amet massa",
            completed: true,
          },
          {
            id: 3,
            title: "sollicitudin tempor id eu nisl nunc mi ipsum",
            completed: false,
          },
        ],
        created: new Date(2014, 1, 11),
        completed: false,
      },
    ],
  },
  mutations: {
    addTodo: (state, todo) => state.todos.unshift(todo),
    updateTodo: (state, newTodo) => {
      const index = state.todos.findIndex(
        (oldTodo) => oldTodo.id == newTodo.id
      );
      if (index !== -1) {
        state.todos.splice(index, 1, newTodo);
      }
    },
    deleteTodo: (state, id) =>
      (state.todos = state.todos.filter((todo) => todo.id !== id)),
  },
  actions: {
    addTodo({ commit }, title) {
      commit("addTodo", {
        id: Math.floor(Math.random() * Math.floor(1000)),
        title,
        description:
          "Cu vim feugiat fabellas erroribus, pro senserit disputando id, mucius.",
        priority: Math.floor(Math.random() * Math.floor(3)) + 1,
        dueDate: add(new Date(), {
          hours: Math.floor(Math.random() * Math.floor(168)) + 1,
        }),
        notes:
          "Pri esse labitur accumsan no. Vidit soleat doctus has te, vis erant timeam recteque an.",
        checklist: [
          {
            id: 1,
            title: "venenatis a condimentum",
            completed: false,
          },
          {
            id: 2,
            title: "facilisis mauris sit amet massa",
            completed: true,
          },
          {
            id: 3,
            title: "sollicitudin tempor id eu nisl nunc mi ipsum",
            completed: false,
          },
        ],
        created: new Date(),
        completed: false,
      });
    },
    updateTodo({ commit }, todo) {
      commit("updateTodo", todo);
    },
    deleteTodo({ commit }, id) {
      commit("deleteTodo", id);
    },
  },
  modules: {},
  getters: {
    getTodos: (state) => state.todos,
  },
});
