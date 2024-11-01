<template>
  <div v-if="isChatSelected">
    <v-list>
      <v-list-item 
      v-for="message in messages"
          :key="message.message_id"
          :subtitle="message.message_text"
          :title="getUserName(message.user_id)"
      />
    </v-list>
  </div>
  <div v-if="!isChatSelected">
    <v-chip>Select a chat to start messaging</v-chip>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app';

const messageStore = useAppStore();

const messages = computed(() => messageStore.messages)
const chatMembers = computed(() => messageStore.users)

const isChatSelected = computed(() => {
  return messageStore.chat != null;
});

const getUserName = (userId: number) => {
  messageStore.FETCH_USERS_BY_CHAT(messageStore.chat?.chat_id as number)
  const user = chatMembers.value.find(user => user.user_id === userId);
  return user ? user.username : '';
};

</script>
