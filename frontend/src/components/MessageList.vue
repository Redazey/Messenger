<template>
  <v-list style="height: 85%;">
    <v-list-item v-for="(message, index) in messages" :key="index">
      <v-list-item-content>
        <v-list-item-title>{{ message.messageText }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
const messages = appStore.getMessages;

onMounted(() => {
  appStore.setConn;
  appStore.fetchMessagesSentToUser;
});
</script>
