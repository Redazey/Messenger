<template>
  <v-row v-if="isChatSelected" class="pa-5">
    <v-textarea
      max-rows="5"
      v-model="text"
      variant="solo-filled"
      label="Write a message..."
      row-height="15"
      rows="1"
      class="ma-2"
      auto-grow
    />

    <v-btn icon="mdi-send" size="large" class="ma-2" @click="sendMessage" />
  </v-row>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app';
import { Messages } from '@/types';

const userStorage = useAppStore();
const text = ref('');

const isChatSelected = computed(() => {
  return userStorage.chat != null;
});

const sendMessage = async () => {
  if (text.value.trim() === '') {
    return;
  }

  const message: Messages = {
    user_id: userStorage.user?.user_id as number,
    chat_id: userStorage.chat?.chat_id as number,
    message_text: text.value,
  };

  await userStorage.CREATE_MESSAGE(message);
  text.value = '';
};
</script>
