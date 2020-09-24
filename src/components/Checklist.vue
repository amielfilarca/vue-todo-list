<template>
  <v-list-item-group v-model="settings" multiple>
    <v-list-item
      @click="listItemCheckboxHandler(item)"
      v-for="item in todo.checklist"
      :key="item.id"
    >
      <template v-slot:default="{ active }">
        <v-list-item-action>
          <v-checkbox
            @change="listItemCheckboxHandler(item)"
            :input-value="active"
            color="primary"
            v-model="item.completed"
          />
        </v-list-item-action>
        <v-list-item-content>
          {{ item.title }}
        </v-list-item-content>
      </template>
    </v-list-item>
  </v-list-item-group>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Checklist",
  props: ["todo"],
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
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>