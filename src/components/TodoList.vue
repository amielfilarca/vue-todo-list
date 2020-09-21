<template>
  <v-col>
    <TodoItem v-for="todo in getTodos" :key="todo.id" :todo="todo" />
  </v-col>
</template>

<script>
import TodoItem from "@/components/TodoItem";
import { mapGetters } from "vuex";

export default {
  name: "TodoList",
  components: {
    TodoItem,
  },
  computed: {
    ...mapGetters(["getTodos"]),
  },
};
</script>

<style>
</style>