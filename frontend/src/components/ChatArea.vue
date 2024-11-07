<template>
  <div v-if="isChatSelected">
    <MessageList :key="chat_id" :chat_id="chat_id" />
  </div>
  <div v-if="!isChatSelected">
    <v-chip>Select a chat to start messaging</v-chip>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAppStore } from '@/stores/app';
import MessageList from './MessageList.vue';

const messagesStore = useAppStore();
const chat_id = computed(() => messagesStore.chat?.chat_id as number);

const isChatSelected = computed(() => {
  return messagesStore.chat != null;
});
</script>