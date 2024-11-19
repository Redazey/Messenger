<template>
  <v-toolbar color="cyan-lighten-1" height="10%">
    <v-btn icon="mdi-menu" variant="text" @click="drawer = !drawer" />

    <v-label
      class="ma-5"
      text="Chat-1"
      style="color: white; font-size: larger; font-weight: bolder"
    />
  </v-toolbar>

  <v-navigation-drawer v-model="drawer" app temporary pa-5>
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
      :subtitle="user?.email"
      :title="user?.username"
    />

    <v-divider />

    <v-list style="display: flex; flex-direction: column">
      <v-list-item title="Settings">
        <template v-slot:prepend>
          <v-icon>mdi-cog</v-icon>
        </template>
      </v-list-item>

      <v-list-item @click="openSettingsDialog()" title="Create chat">
        <template v-slot:prepend>
          <v-icon>mdi-message-plus</v-icon>
        </template>
      </v-list-item>

      <v-list-item align-content-center align-center>
        <template v-slot:prepend>
          <v-icon>mdi-weather-night</v-icon>
        </template>
        <v-switch inset></v-switch>
      </v-list-item>
    </v-list>

    <v-btn
      text="Log out"
      width="80%"
      style="margin-left: 20px"
      @click="logout"
    />
  </v-navigation-drawer>

  <v-dialog v-model="dialog" max-width="500">
    <v-card rounded="lg">
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Select Contacts</span>
      </v-card-title>

      <v-divider class="mb-4" />

      <v-list>
        <v-list-item-group v-model="selectedContacts" multiple>
          <v-list-item
            v-for="contact in contacts"
            :key="contact.user_id"
            :value="contact.username"
            @click="toggleContactSelection(contact)"
            :class="{'selected-contact': selectedContacts.includes(contact.user_id)}"
          >
            <v-list-item-content>
              <v-list-item-title>{{ contact.username }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-card-actions class="my-2 d-flex justify-end">
        <v-btn
          class="text-none"
          rounded="xl"
          text="Close"
          @click="closeDialog"
        />
        <v-btn
          class="text-none"
          color="primary"
          rounded="xl"
          text="Create"
          variant="flat"
          @click="openChatNameDialog"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="chatNameDialog" max-width="500">
    <v-card rounded="lg">
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Enter Chat Name</span>
      </v-card-title>

      <v-divider class="mb-4" />

      <v-card-text>
        <v-text-field v-model="chatName" label="Chat Name" />
      </v-card-text>

      <v-card-actions class="my-2 d-flex justify-end">
        <v-btn
          class="text-none"
          rounded="xl"
          text="Cancel"
          @click="closeChatNameDialog"
        />
        <v-btn
          class="text-none"
          color="primary"
          rounded="xl"
          text="Create Chat"
          @click="createChat"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useAppStore } from '@/stores/app';
import { Users } from '@/types';

const isLoading = ref(false);
const drawer = ref(false);
const dialog = ref(false);
const chatNameDialog = ref(false);
const chatName = ref('');
const contacts = ref<Users[]>([]);
const selectedContacts = ref<number[]>([]);

const userStorage = useAppStore();
const user = computed(() => userStorage.user);

onMounted(async () => {
  await userStorage.FETCH_USER();
});

const openSettingsDialog = async () => {
  const user_id = user.value?.user_id as number;

  await userStorage.FETCH_CONTACTS(user_id);
  contacts.value = userStorage.getContacts;

  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  selectedContacts.value = [];
};

const openChatNameDialog = () => {
  if (selectedContacts.value.length > 0) {
    dialog.value = false;
    chatNameDialog.value = true;
  } else {
    alert("Please select at least one contact to create a chat.");
  }
};

const closeChatNameDialog = () => {
  chatNameDialog.value = false;
  chatName.value = '';
};

const toggleContactSelection = (contact: Users) => {
  const index = selectedContacts.value.indexOf(contact.user_id);
  if (index === -1) {
    selectedContacts.value.push(contact.user_id);
  } else {
    selectedContacts.value.splice(index, 1);
  }
};

const logout = async () => {
  isLoading.value = true;

  try {
    await userStorage.LOGOUT();
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    isLoading.value = false;
  }
};

const createChat = async () => {
  isLoading.value = true;

  try {
    const user_id = userStorage.getUser?.user_id as number;
    selectedContacts.value.push(user_id)
    await userStorage.CREATE_CHAT({ chat_name: chatName.value, participants: selectedContacts.value });
    closeChatNameDialog();
    closeDialog();
  } catch (error) {
    console.error('Creating chat failed:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style>
.selected-contact {
  background-color: #e0f7fa;
}
</style>