<template>
  <v-text-field
    v-model="username"
    append-inner-icon="mdi-magnify"
    density="compact"
    label="Search"
    variant="solo"
    hide-details
    single-line
    class="ma-2"
    @input="find"
  />
  <div>
    <div v-if="username !== ''">
      <v-list class="bg-background">
        <v-list-item
          v-for="user in filteredUsers"
          :key="user.user_id"
          :value="user.username"
          :title="user.username"
          @click="openUserDialog(user)"
          class="cursor-poiner bg-background"
        />
        <v-list-item v-if="isLoading" titile="Loading..." />
      </v-list>
      <div
        v-if="filteredUsers.length === 0"
        class="text-h6 text-medium-emphasis ps-2"
      >
        Ничего не найдено
      </div>
      <v-dialog v-model="dialog" max-width="500">
        <v-card rounded="lg">
          <v-card-title class="d-flex justify-space-between align-center">
            <div class="text-h5 text-medium-emphasis ps-2">
              {{ selectedUser?.username }}
            </div>

            <v-btn icon="mdi-close" variant="text" @click="closeDialog" />
          </v-card-title>

          <v-divider class="mb-4" />

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
              :text="isAdded == false ? 'Add contact' : 'View chat'"
              variant="flat"
              @click="addContact"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div v-if="!username">
      <v-list class="bg-background">
        <v-list-item
          v-for="chat in userChats"
          :key="chat.chat_id"
          :title="chat.chat_name"
          :subtitle="userStorage.getMessages[chat.chat_id][userStorage.getMessages[chat.chat_id].length - 1].message_text"
          :class="{
            'selected-chat': userStorage.getChat?.chat_id == chat.chat_id,
          }"
          @click="selectUserChat(chat)"
        />
        <v-list-item v-if="isLoading" titile="Loading..." />
      </v-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useAppStore } from '@/stores/app';
import { Chats, type Users } from '@/types';

const userStorage = useAppStore();
const username = ref('');
const isLoading = ref(false);
const dialog = ref(false);
const isAdded = ref(false);
const existingContacts = ref<Users[]>([]);
const selectedUser = ref<Users>({
  user_id: 0,
  password: '',
  username: '',
  email: '',
  created_at: null,
});

const userChats = computed(() => userStorage.chats);
const filteredUsers = computed(() => userStorage.users);

onMounted(async () => {
  await userStorage.FETCH_CHATS(userStorage.user?.user_id as number);
  userStorage.getChats.forEach(async (chat) => {
    await userStorage.FETCH_MESSAGES(chat.chat_id);
    await userStorage.REACTIVE_MESSAGES(chat.chat_id);
  });
});

const find = async () => {
  if (!username.value) {
    return;
  }

  isLoading.value = true;

  try {
    await userStorage.FETCH_USERS({
      username: username.value,
      user_id: userStorage.getUser?.user_id as number,
    });
  } catch (error) {
    console.error('Search failed:', error);
  } finally {
    isLoading.value = false;
  }
};

const addContact = async () => {
  const user_id = userStorage.getUser?.user_id as number;

  try {
    if (!isAdded.value) {
      await userStorage.ADD_CONTACT({
        chatname: selectedUser.value?.username as string,
        user_id: user_id,
        contact_id: selectedUser.value?.user_id as number,
      });
      await userStorage.FETCH_CHATS(user_id);
      isAdded.value = true;
      closeDialog();
    } else {
      closeDialog();
    }
  } catch (error) {
    console.error('Adding contact failed:', error);
  }
};

const selectUserChat = async (chat: Chats) => {
  userStorage.chat = chat;
};

const openUserDialog = async (contact: Users) => {
  const user_id = userStorage.getUser?.user_id as number;

  await userStorage.FETCH_CONTACTS(user_id);
  existingContacts.value = userStorage.getContacts;

  const isContactExists = existingContacts.value.some(
    (existingContact) => existingContact.user_id === contact.user_id,
  );

  isAdded.value = isContactExists;
  selectedUser.value = contact;
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};
</script>

<style scoped>
.selected-chat {
  background-color: #f1e5d8;
}
</style>
