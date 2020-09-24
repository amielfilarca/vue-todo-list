<template>
  <v-expansion-panels v-model="panel" multiple accordion>
    <TodoItem v-for="todo in getTodos" :key="todo.id" :todo="todo" />
  </v-expansion-panels>
</template>

<script>
import TodoItem from "@/components/TodoItem";
import { mapGetters } from "vuex";

export default {
  name: "TodoList",
  components: {
    TodoItem,
  },
  data() {
    return {
      panel: [],
    };
  },
  computed: {
    ...mapGetters(["getTodos"]),
  },
};
</script>

<style>
</style>