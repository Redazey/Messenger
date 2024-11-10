<template>
  <v-list>
    <v-list-item 
      v-for="message in messages"
      :key="message.message_id"
      :subtitle="message.message_text"
      :title="getUserName(message.user_id)"
    />
  </v-list>
  <v-row class="pa-5">
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
import { Users } from '@/types';
import { ref, computed, onMounted } from 'vue';
import { Messages } from '@/types';

const messagesStore = useAppStore();
const messages = computed(() => messagesStore.messages);
const chatMembers = ref<Users[]>([]);
const text = ref('');
const props = defineProps({
  chat_id: {
    type: Number,
    required: true,
  }
})


onMounted(() => {
  messagesStore.FETCH_MESSAGES(props.chat_id)
  messagesStore.REACTIVE_MESSAGES(props.chat_id)
  messagesStore.FETCH_USERS_BY_CHAT(props.chat_id).then(() => {
    chatMembers.value = messagesStore.users;
  });
});

const sendMessage = async () => {
  if (text.value.trim() === '') {
    return;
  }

  const message: Messages = {
    user_id: messagesStore.user?.user_id as number,
    chat_id: messagesStore.chat?.chat_id as number,
    message_text: text.value,
  };

  await messagesStore.CREATE_MESSAGE(message);
  text.value = '';
};

const getUserName = (user_id: number) => {
  const user = chatMembers.value.find(user => user.user_id === user_id);
  return user ? user.username : '';
};
</script>