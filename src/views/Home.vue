<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col class="mx-5">
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
