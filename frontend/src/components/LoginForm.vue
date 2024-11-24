<template>
  <v-card class="mx-auto" style="max-width: 500px">
    <v-toolbar cards dark flat>
      <v-card-title class="text-h6 font-weight-regular"> Areal-Messenger </v-card-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form ref="form" v-model="isValid" class="pa-5 pt-5">
      <v-text-field
        v-model="email"
        label="Email"
        variant="filled"
      ></v-text-field>
      <v-text-field
        v-model="password"
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
        link
        to="register"
      >
        Нет аккаунта?
      </v-btn>
      /
      <v-btn :loading="isLoading" @click="signIn"> Войти </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app';

const auth = useAppStore();
const isLoading = ref(false);
const email = ref('');
const password = ref('');
const isValid = ref(false);

const signIn = async () => {
  if (!email.value || !password.value) {
    alert('Username and password are required.');
    return;
  }

  isLoading.value = true;

  try {
    await auth.AUTH_USER({ email: email.value, password: password.value });
  } catch (error) {
    console.error('Registration failed:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>
