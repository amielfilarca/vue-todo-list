<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">Todo List</div>

      <v-spacer></v-spacer>

      <v-btn @click="signin" text>
        <span class="mr-2">Sign-in</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    //
  },

  data: () => ({
    //
  }),

  methods: {
    signin() {
      console.log("Sign-in");
    },
  },
};
</script>
