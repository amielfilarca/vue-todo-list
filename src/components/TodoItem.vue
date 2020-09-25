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
        />
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-list subheader flat dense>
        <template v-if="inEditMode">
          <v-subheader>Title</v-subheader>
          <v-list-item>
            <v-text-field
              class="pa-0 ma-0"
              v-model="titleEditMode"
              hint="Required"
              persistent-hint
            />
          </v-list-item>
          <v-subheader>Description</v-subheader>
          <v-list-item>
            <v-text-field class="pa-0 ma-0" v-model="descriptionEditMode" />
          </v-list-item>
          <v-subheader>Due</v-subheader>
          <v-list-item>
            <v-col class="py-0 pl-0">
              <v-menu
                ref="datePicker"
                v-model="datePicker"
                :close-on-content-click="false"
                :return-value.sync="datePickerValue"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    class="pa-0 ma-0"
                    v-model="datePickerValue"
                    label="Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="datePickerValue" no-title scrollable>
                  <v-spacer />
                  <v-btn text color="primary" @click="datePicker = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.datePicker.save(datePickerValue)"
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
                :return-value.sync="timePickerValue"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    class="pa-0 ma-0"
                    v-model="timePickerValue"
                    label="Time"
                    prepend-icon="mdi-clock-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-if="timePicker"
                  v-model="timePickerValue"
                  full-width
                  @click:minute="$refs.timePicker.save(timePickerValue)"
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
                  : 'High'
              "
              v-model="priorityEditMode"
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
              v-model="notesEditMode"
            />
          </v-list-item>
          <template
            v-if="
              checklistEditMode != null &&
              checklistEditMode != [] &&
              checklistEditMode.length != 0
            "
          >
            <v-subheader>Checklist</v-subheader>
            <EditChecklist
              @delete-item="deleteItem($event)"
              :todo="todo"
              :checklist="checklistEditMode"
            />
          </template>
        </template>
        <template v-else>
          <v-subheader>Title</v-subheader>
          <v-list-item>{{ todo.title }}</v-list-item>

          <template v-if="todo.description != null && todo.description != ''">
            <v-subheader>Description</v-subheader>
            <v-list-item>{{ todo.description }}</v-list-item>
          </template>

          <template v-if="todo.dueDate != null && todo.dueDate != ''">
            <v-subheader>Due</v-subheader>
            <v-list-item>{{ dateRelativeFormat }}</v-list-item>
          </template>

          <template v-if="todo.priority != null && todo.priority != ''">
            <v-subheader>Priority</v-subheader>
            <v-list-item>{{ priorityTextFormat }}</v-list-item>
          </template>

          <template v-if="todo.notes != null && todo.notes != ''">
            <v-subheader>Notes</v-subheader>
            <v-list-item>{{ todo.notes }}</v-list-item>
          </template>

          <template v-if="todo.checklist != null && todo.checklist != []">
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
        </template>
      </v-list>
      <v-row class="px-5">
        <template v-if="inEditMode">
          <v-btn @click="cancelEdit">Cancel</v-btn>
          <v-spacer />
          <v-btn
            @click="saveEdit(todo)"
            color="green"
            :dark="titleEditMode != ''"
            :disabled="titleEditMode == ''"
            >Save</v-btn
          >
        </template>
        <template v-else>
          <v-btn @click="editTodoHandler" text color="primary">
            <v-icon>mdi-square-edit-outline</v-icon>
            <v-col>Edit</v-col>
          </v-btn>
          <v-spacer />
          <v-btn @click="deleteTodo(todo.id)" text color="#FF0000">
            <v-icon>mdi-trash-can-outline</v-icon>
            <v-col>Delete</v-col>
          </v-btn>
        </template>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapActions } from "vuex";
import { formatRelative, formatISO9075 } from "date-fns";

import Checklist from "@/components/Checklist";
import EditChecklist from "@/components/EditChecklist";

export default {
  name: "TodoItem",
  components: {
    Checklist,
    EditChecklist,
  },
  props: ["todo"],
  data() {
    return {
      inEditMode: false,
      dateRelativeFormat:
        formatRelative(this.todo.dueDate, new Date())
          .toString()
          .charAt(0)
          .toUpperCase() +
        formatRelative(this.todo.dueDate, new Date()).toString().substring(1),
      priorityTextFormat: `${
        this.todo.priority == 1
          ? "Low"
          : this.todo.priority == 2
          ? "Medium"
          : "High"
      } priority`,
      checklistTitle: "",
      datePickerValue: formatISO9075(this.todo.dueDate, {
        representation: "date",
      }),
      datePicker: false,
      timePickerValue: formatISO9075(this.todo.dueDate, {
        representation: "time",
      }),
      timePicker: false,
      titleEditMode: this.todo.title,
      descriptionEditMode: this.todo.description,
      dueDateEditMode: this.todo.dueDate,
      notesEditMode: this.todo.notes,
      checklistEditMode: this.todo.checklist,
      priorityEditMode:
        this.todo.priority == 1
          ? "Low"
          : this.todo.priority == 2
          ? "Medium"
          : "High",
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
    cancelEdit() {
      this.inEditMode = false;
      this.titleEditMode = this.todo.title;
      this.descriptionEditMode = this.todo.description;
      this.dueDateEditMode = this.todo.dueDate;
      this.notesEditMode = this.todo.notes;
      this.checklistEditMode = this.todo.checklist;
      this.datePickerValue = formatISO9075(this.todo.dueDate, {
        representation: "date",
      });
      this.timePickerValue = formatISO9075(this.todo.dueDate, {
        representation: "time",
      });
    },
    saveEdit(todo) {
      this.inEditMode = false;
      todo.title = this.titleEditMode;
      todo.description = this.descriptionEditMode;
      const dateRegex = /(\d{4})-(\d{2})-(\d{2})/g;
      const dateMatch = dateRegex.exec(this.datePickerValue);
      const year = parseInt(dateMatch[1]);
      const month = parseInt(dateMatch[2]);
      const day = parseInt(dateMatch[3]);
      const timeRegex = /(\d{2}):(\d{2})/g;
      const timeMatch = timeRegex.exec(this.timePickerValue);
      const hour = parseInt(timeMatch[1]);
      const minute = parseInt(timeMatch[2]);
      this.dueDateEditMode = new Date(year, month - 1, day, hour, minute);
      todo.dueDate = this.dueDateEditMode;
      this.dateRelativeFormat =
        formatRelative(todo.dueDate, new Date())
          .toString()
          .charAt(0)
          .toUpperCase() +
        formatRelative(todo.dueDate, new Date()).toString().substring(1);
      this.timePickerValue = formatISO9075(todo.dueDate, {
        representation: "time",
      });
      todo.notes = this.notesEditMode;
      todo.checklist = this.checklistEditMode;
      todo.priority = this.priorityEditMode;
      this.priority = `${
        todo.priority == 1 ? "Low" : todo.priority == 2 ? "Medium" : "High"
      } priority`;
      this.updateTodo(todo);
    },
    deleteItem(item) {
      this.checklistEditMode = this.checklistEditMode.filter(
        (x) => x.id != item.id
      );
    },
  },
};
</script>