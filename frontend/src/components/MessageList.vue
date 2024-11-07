<template>
  <v-list>
    <v-list-item 
      v-for="message in messages"
      :key="message.message_id"
      :subtitle="message.message_text"
      :title="getUserName(message.user_id)"
    />
  </v-list>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app';
import { Users } from '@/types';
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  chat_id: {
    type: Number,
    required: true,
  }
})

const messagesStore = useAppStore();
const messages = computed(() => messagesStore.messages);
const chatMembers = ref<Users[]>([]);

onMounted(() => {
  messagesStore.FETCH_MESSAGES(props.chat_id)
  messagesStore.FETCH_USERS_BY_CHAT(props.chat_id).then(() => {
    chatMembers.value = messagesStore.users;
  });
});

const getUserName = (user_id: number) => {
  const user = chatMembers.value.find(user => user.user_id === user_id);
  return user ? user.username : '';
};
</script>