<template>
  <v-col>
    <v-row align="center" no-gutters>
      <v-text-field v-model="name" class="pr-2" label="Task name"></v-text-field>
      <v-btn @click="addTodo(name)" icon :disabled="name == ''">
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
      name: "",
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
  },
};
</script>

<style>
</style>