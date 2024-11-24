<template>
  <v-card class="mx-auto" style="max-width: 500px" >
    <v-toolbar cards dark flat>
      <v-card-title class="text-h6 font-weight-regular"> Areal-Messenger </v-card-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form ref="form" v-model="isValid" class="pa-5 pt-5">
      <v-text-field
        v-model="username"
        label="Username"
        variant="filled"
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="Email"
        variant="filled"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.password, rules.length(8)]"
        counter="8"
        label="Password"
        type="password"
        variant="filled"
      ></v-text-field>
      <v-text-field
        v-model="pass_confirm"
        :rules="[rules.password, rules.length(8)]"
        counter="8"
        label="Confirm password"
        type="password"
        variant="filled"
      ></v-text-field>
      <v-checkbox
        v-model="agreement"
        :rules="[rules.required]"
      >
        <template v-slot:label>
          Я согласен с&nbsp;
          <a href="#" @click.stop.prevent="dialog = true">условиями использования</a>
          &nbsp;
        </template>
      </v-checkbox>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        :loading="isLoading"
        link to="login"
      >
        Уже есть аккаунт?
      </v-btn>
      /
      <v-btn
        :disabled="!isValid"
        :loading="isLoading"
        @click="registerIn"
      >
        Зарегистрироваться
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="text-h5"> Условия пользования </v-card-title>
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
            Нет
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            variant="tonal"
            @click="(agreement = true), (dialog = false)"
          >
            Согласен
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app';
import { ref } from 'vue';

type ValidationResult = true | string;

const auth = useAppStore();
const agreement = ref(false);
const isValid = ref(false);
const dialog = ref(false);
const isLoading = ref(false);
const username = ref('');
const email = ref('');
const pass_confirm = ref('');
const password = ref('');

const rules = {
  length: (len: number) => (value: string | null | undefined): ValidationResult =>
    (value || '').length >= len || `Значение должно быть длиннее ${len} символов`,

  password: (value: string | null | undefined): ValidationResult =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/.test(value || '') ||
    'Пароль должен содержать буквы в нижнем и верхнем регистре, а так же цифры и спец. символы',

  required: (value: string | null | undefined): ValidationResult =>
    !!value || 'Это поле обязательно',
};

const registerIn = async () => {
  if (pass_confirm.value != password.value) {
    alert('Пароли должны совпадать');
    return;
  }

  isLoading.value = true;

  try {
    await auth.REG_USER({ username: username.value, email: email.value, password: password.value });
  } catch (error) {
    console.error('Registration failed:', error);
  } finally {
    isLoading.value = false;
  }
}

</script>
