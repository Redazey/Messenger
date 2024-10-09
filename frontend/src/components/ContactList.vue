<template>
  <v-list-item
    v-for="(contact, index) in contacts"
    :key="index"
    :items="contacts"
    width="30%"
    item-props
  >
    <v-list-item-content>
      <v-list-item-title>sex</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
const contacts = appStore.getContacts;

onMounted(() => {
  appStore.setConn;
  appStore.fetchUsersContacts;
});
</script>
