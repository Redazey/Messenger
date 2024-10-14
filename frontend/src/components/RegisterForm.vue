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
        :rules="[rules.password, rules.length(15)]"
        color="deep-purple"
        counter="6"
        label="Password"
        type="password"
        variant="filled"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.confirm_password, rules.length(15)]"
        color="deep-purple"
        counter="6"
        label="Confirm password"
        type="password"
        variant="filled"
      ></v-text-field>
      <v-checkbox
        v-model="agreement"
        :rules="[rules.required]"
        color="deep-purple"
      >
        <template v-slot:label>
          I agree to the&nbsp;
          <a href="#" @click.stop.prevent="dialog = true">Terms of Service</a>
          &nbsp;and&nbsp;
          <a href="#" @click.stop.prevent="dialog = true">Privacy Policy</a>*
        </template>
      </v-checkbox>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn variant="text" @click="form.reset()"> Clear </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :loading="isLoading"
        color="deep-purple-accent-4"
        link to="Login"
      >
        Sign up
      </v-btn>
      /
      <v-btn
        :disabled="!isValid"
        :loading="isLoading"
        color="deep-purple-accent-4"
      >
        Register
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="text-h5 bg-grey-lighten-3"> Legal </v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn variant="text" @click="(agreement = false), (dialog = false)">
            No
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="deep-purple"
            variant="tonal"
            @click="(agreement = true), (dialog = false)"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    agreement: false,
    dialog: false,
    isLoading: false,
    password: undefined,
    phone: undefined,
    rules: {
      length: (len) => (v) =>
        (v || '').length >= len || `Invalid character length, required ${len}`,
      password: (v) =>
        !!(v || '').match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/,
        ) ||
        'Password must contain an upper case letter, a numeric character, and a special character',
      confirm_password: (v) => (v).match(password) || 'passwords must be the same',
      required: (v) => !!v || 'This field is required',
    },
  }),
};
</script>
