<template>
  <v-row align="center" no-gutters>
    <v-checkbox @change="checkboxHandler(todo)" v-model="todo.completed" />
    <v-spacer />
    <v-col class="text-truncate" cols="8" :class="{'completed':todo.completed}">{{todo.title}}</v-col>
    <v-spacer />
    <v-btn @click="deleteTodo(todo.id)" icon>
      <v-icon>mdi-trash-can-outline</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "TodoItem",
  props: ["todo"],
  methods: {
    ...mapActions(["updateTodo", "deleteTodo"]),
    checkboxHandler(todo) {
      const newTodo = {
        id: todo.id,
        title: todo.title,
        completed: todo.completed == true ? true : false,
      };
      this.updateTodo(newTodo);
    },
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>