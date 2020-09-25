<template>
  <v-list-item-group>
    <v-list-item v-for="item in checklist" :key="item.id">
      <v-list-item-content>
        {{ item.title }}
      </v-list-item-content>
      <v-list-item-action>
        <v-btn @click="$emit('delete-item', item)" icon small color="red">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list-item-group>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "EditChecklist",
  props: ["todo", "checklist"],
  data() {
    return {
      settings: [],
    };
  },
  methods: {
    ...mapActions(["updateTodo"]),
    listItemCheckboxHandler(item) {
      item.completed = !item.completed;
      this.todo.checklist[this.todo.checklist.indexOf(item)] = item;
      this.updateTodo(this.todo);
    },
    deleteItem(id) {
      this.todo.checklist = this.todo.checklist.filter(
        (todo) => todo.id !== id
      );
      this.updateTodo(this.todo);
    },
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>