<template>
  <v-col class="px-0 pb-0">
    <v-row align="center" no-gutters>
      <v-text-field
        @keyup.enter="clickHandler(title)"
        v-model="title"
        class="pr-2"
        label="Add a task"
      />
      <v-btn
        @click="clickHandler(title)"
        icon
        :disabled="title == ''"
        color="primary"
      >
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
      if (this.title != "") {
        this.addTodo(title);
        this.title = "";
      }
    },
  },
};
</script>

<style>
</style>