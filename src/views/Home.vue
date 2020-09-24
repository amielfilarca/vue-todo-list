<template>
  <v-container fluid class="py-0">
    <v-row align="center" justify="center">
      <v-col cols="12" class="py-0">
        <AddTodo />
        <TodoList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";

export default {
  name: "Home",
  components: {
    AddTodo,
    TodoList,
  },
};
</script>
