<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text color="primary" v-bind="attrs" v-on="on">
        <v-icon>mdi-square-edit-outline</v-icon>
        <v-col>Edit</v-col>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Task Details</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Title"
                hint="Required"
                persistent-hint
                required
                filled
                :value="todo.title"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Description"
                filled
                :value="todo.description"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                ref="datePicker"
                v-model="datePicker"
                :close-on-content-click="false"
                :return-value.sync="dueDate"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dueDate"
                    label="Due Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    filled
                  />
                </template>
                <v-date-picker v-model="dueDate" no-title scrollable>
                  <v-spacer />
                  <v-btn text color="primary" @click="datePicker = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.datePicker.save(dueDate)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-select
                :items="['Low', 'Medium', 'High']"
                label="Priority"
                filled
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
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Notes"
                auto-grow
                clearable
                clear-icon="mdi-cancel"
                rows="1"
                filled
                :value="todo.notes"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-list subheader two-line flat>
                <v-subheader>Checklist</v-subheader>

                <v-list-item-group v-model="checklist" multiple>
                  <v-list-item
                    @click="clickHandler(item)"
                    v-for="item in todo.checklist"
                    :key="item.id"
                  >
                    <template v-slot:default="{ active }">
                      <v-list-item-action>
                        <v-checkbox
                          :input-value="active"
                          v-model="item.completed"
                          color="primary"
                        />
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="saveHandler">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { formatISO } from "date-fns";

export default {
  name: "EditTodo",
  props: ["todo"],
  data() {
    return {
      dialog: false,
      dueDate: formatISO(this.todo.dueDate, { representation: "date" }),
      datePicker: false,
      priority: 1,
      checklist: [],
    };
  },
  methods: {
    clickHandler(item) {
      item.completed = !item.completed;
    },
    saveHandler() {
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>