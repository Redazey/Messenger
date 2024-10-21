<template>
  <v-card class="mx-auto" style="max-width: 500px">
    <v-toolbar color="deep-purple-accent-4" cards dark flat>
      <v-card-title class="text-h6 font-weight-regular"> Sign up </v-card-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form ref="form" v-model="isValid" class="pa-5 pt-5">
      <v-text-field
        v-model="email"
        color="deep-purple"
        label="Email"
        variant="filled"
      ></v-text-field>
      <v-text-field
        v-model="password"
        color="deep-purple"
        label="Password"
        type="password"
        variant="filled"
      ></v-text-field>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :loading="isLoading"
        color="deep-purple-accent-4"
        link
        to="register"
      >
        Register
      </v-btn>
      /
      <v-btn :loading="isLoading" color="deep-purple-accent-4" @click="signIn"> Sign up </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app';

export default {
  data: () => ({
    isLoading: false,
    email: '',
    password: '',
    isValid: false,
  }),
  setup() {
    const auth = useAppStore();
    return { auth };
  },
  methods: {
    async signIn() {
      if (!this.email || !this.password) {
        alert('Username and password are required.');
        return;
      }

      this.isLoading = true;

      try {
        await this.auth.AUTH_USER({ email: this.email, password: this.password });
      } catch (error) {
        console.error('Registration failed:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
