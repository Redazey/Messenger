<template>
  <v-card class="mx-auto" style="max-width: 500px" >
    <v-toolbar color="deep-purple-accent-4" cards dark flat>
      <v-card-title class="text-h6 font-weight-regular"> Sign up </v-card-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form ref="form" v-model="isValid" class="pa-5 pt-5">
      <v-text-field
        v-model="username"
        color="deep-purple"
        label="Username"
        variant="filled"
      ></v-text-field>
      <v-text-field
        v-model="password"
        color="deep-purple"
        counter="6"
        label="Password"
        type="password"
        variant="filled"
      ></v-text-field>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn variant="text" @click="form.reset()"> Clear </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :loading="isLoading"
        color="deep-purple-accent-4"
        link to="Register"
      >
        Register
      </v-btn>
      /
      <v-btn
        :loading="isLoading"
        color="deep-purple-accent-4"
      >
        Sign up
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    password: undefined,
    rules: {
      length: (len) => (v) =>
        (v || '').length >= len || `Invalid character length, required ${len}`,
      password: (v) =>
        !!(v || '').match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/,
        ) ||
        'Password must contain an upper case letter, a numeric character, and a special character',
      required: (v) => !!v || 'This field is required',
    },
  }),
};
</script>
