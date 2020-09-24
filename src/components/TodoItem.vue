<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="pa-0" disable-icon-rotate>
      <v-col class="text-truncate">
        <v-chip
          class="ma-2 ml-0"
          :color="
            todo.priority == 1 ? 'green' : todo.priority == 2 ? 'orange' : 'red'
          "
          text-color="white"
          x-small
        >
          {{ todo.priority == 1 ? "Low" : todo.priority == 2 ? "Med" : "High" }}
        </v-chip>
        {{ todo.title }}
      </v-col>
      <template v-slot:actions>
        <v-checkbox
          @change="checkboxHandler(todo)"
          v-model="todo.completed"
          @click="clickHandler($event)"
          :color="
            todo.priority == 1 ? 'green' : todo.priority == 2 ? 'orange' : 'red'
          "
        />
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-list subheader flat dense>
        <template v-if="inEditMode">
          <v-subheader>Title</v-subheader>
          <v-list-item>
            <v-text-field class="pa-0 ma-0" :value="todo.title" />
          </v-list-item>
          <v-subheader>Description</v-subheader>
          <v-list-item>
            <v-text-field class="pa-0 ma-0" :value="todo.description" />
          </v-list-item>
          <v-subheader>Due</v-subheader>
          <v-list-item>
            <v-col class="py-0 pl-0">
              <v-menu
                ref="datePicker"
                v-model="datePicker"
                :close-on-content-click="false"
                :return-value.sync="dueDateInDatePicker"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    class="pa-0 ma-0"
                    v-model="dueDateInDatePicker"
                    label="Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="dueDateInDatePicker"
                  no-title
                  scrollable
                >
                  <v-spacer />
                  <v-btn text color="primary" @click="datePicker = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.datePicker.save(dueDateInDatePicker)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col class="py-0 pr-0">
              <v-menu
                ref="timePicker"
                v-model="timePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="dueTime"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    class="pa-0 ma-0"
                    v-model="dueTime"
                    label="Time"
                    prepend-icon="mdi-clock-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-if="timePicker"
                  v-model="dueTime"
                  full-width
                  @click:minute="$refs.timePicker.save(dueTime)"
                />
              </v-menu>
            </v-col>
          </v-list-item>
          <v-subheader>Priority</v-subheader>
          <v-list-item>
            <v-select
              class="pa-0 ma-0"
              :items="['Low', 'Medium', 'High']"
              :value="
                todo.priority == 1
                  ? 'Low'
                  : todo.priority == 2
                  ? 'Medium'
                  : todo.priority == 3
                  ? 'High'
                  : null
              "
            />
          </v-list-item>
          <v-subheader>Notes</v-subheader>
          <v-list-item>
            <v-textarea
              class="pa-0 ma-0"
              auto-grow
              clearable
              clear-icon="mdi-cancel"
              rows="1"
              :value="todo.notes"
            />
          </v-list-item>
          <v-subheader>Checklist</v-subheader>
          <Checklist :todo="todo" />
        </template>
        <template v-else>
          <v-subheader>Title</v-subheader>
          <v-list-item>{{ todo.title }}</v-list-item>
          <v-subheader>Description</v-subheader>
          <v-list-item>{{ todo.description }}</v-list-item>
          <v-subheader>Due</v-subheader>
          <v-list-item>{{ dueDate }}</v-list-item>
          <v-subheader>Priority</v-subheader>
          <v-list-item>{{ priority }}</v-list-item>
          <v-subheader>Notes</v-subheader>
          <v-list-item>{{ todo.notes }}</v-list-item>
          <v-subheader>Checklist</v-subheader>
          <Checklist :todo="todo" />
        </template>
        <v-list-item>
          <v-text-field
            @keyup.enter="addToChecklistHandler(todo, checklistTitle)"
            v-model="checklistTitle"
            class="pr-2"
            label="Add to checklist"
          ></v-text-field>
          <v-btn
            @click="addToChecklistHandler(todo, checklistTitle)"
            icon
            :disabled="checklistTitle == ''"
            color="primary"
          >
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
      <v-row>
        <v-btn @click="editTodoHandler" text color="primary">
          <v-icon>mdi-square-edit-outline</v-icon>
          <v-col>Edit</v-col>
        </v-btn>
        <v-spacer />
        <v-btn @click="deleteTodo(todo.id)" text color="#FF0000">
          <v-icon>mdi-trash-can-outline</v-icon>
          <v-col>Delete</v-col>
        </v-btn>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapActions } from "vuex";
import { formatRelative, formatISO9075 } from "date-fns";

import Checklist from "@/components/Checklist";

export default {
  name: "TodoItem",
  components: {
    Checklist,
  },
  props: ["todo"],
  data() {
    return {
      inEditMode: false,
      dueDate: `${
        formatRelative(this.todo.dueDate, new Date())
          .toString()
          .charAt(0)
          .toUpperCase() +
        formatRelative(this.todo.dueDate, new Date()).toString().substring(1)
      }`,
      priority: `${
        this.todo.priority == 1
          ? "Low"
          : this.todo.priority == 2
          ? "Medium"
          : "High"
      } priority`,
      checklistTitle: "",
      dueDateInDatePicker: formatISO9075(this.todo.dueDate, {
        representation: "date",
      }),
      datePicker: false,
      dueTime: formatISO9075(this.todo.dueDate, {
        representation: "time",
      }),
      timePicker: false,
    };
  },
  methods: {
    ...mapActions(["updateTodo", "deleteTodo"]),
    checkboxHandler(todo) {
      todo.completed == true ? true : false;
      this.updateTodo(todo);
    },
    clickHandler(e) {
      e.cancelBubble = true;
      document.activeElement.blur();
    },
    addToChecklistHandler(todo, checklistTitle) {
      if (this.checklistTitle != "") {
        todo.checklist.push({
          id: Math.floor(Math.random() * Math.floor(1000)),
          title: checklistTitle,
          completed: false,
        });
        this.updateTodo(todo);
        this.checklistTitle = "";
      }
    },
    editTodoHandler() {
      this.inEditMode = true;
    },
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>