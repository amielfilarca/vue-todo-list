<template>
  <v-col>
    <v-row align="center" no-gutters>
      <v-text-field v-model="title" class="pr-2" label="Task name"></v-text-field>
      <v-btn @click="clickHandler(title)" icon :disabled="title == ''">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-row>
  </v-col>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddTodo",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
    clickHandler(title) {
      this.addTodo(title);
      this.title = "";
    },
  },
};
</script>

<style>
</style>