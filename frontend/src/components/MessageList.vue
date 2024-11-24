<template>
  <v-list style="height: 100%">
    <v-list-item
      v-for="message in messages"
      :key="message.message_id"
      class="message-item"
      :class="{ 'message-right': message.user_id == messagesStore.getUser?.user_id }"
      @contextmenu.prevent="openMsgContextMenu($event, message)"
    >
      <v-chip
        :class="{
          'current-user-chip': message.user_id == messagesStore.getUser?.user_id,
        }"
        class="message-chip"
      >
        <div>
          <strong>{{ getUserName(message.user_id) }}</strong>
        </div>
        <div>{{ message.message_text }}</div>
      </v-chip>
    </v-list-item>

    <context-menu
      :visible="isContextMenuVisible"
      :position="contextMenuPosition"
      :sender-name="getUserName(selectedMessage?.user_id as number)"
      :message-text="selectedMessage?.message_text as string"
      :message-id="selectedMessage?.message_id as number"
      @close="isContextMenuVisible = false"
      @edit="
        (message_text) => {
          text = message_text;
        }
      "
    />
  </v-list>
  <v-row class="pa-5" v-if="!isEditing && !isReplying">
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
  <v-row class="pa-5" v-if="isEditing && !isReplying">
    <v-textarea
      max-rows="5"
      v-model="text"
      variant="solo-filled"
      label="Edit a message..."
      row-height="15"
      rows="1"
      class="ma-2"
      auto-grow
    />
    <v-btn icon="mdi-send" size="large" class="ma-2" @click="editMessage" />
  </v-row>
  <v-row class="pa-5" v-if="isReplying && !isEditing">
    <v-textarea
      max-rows="5"
      v-model="text"
      variant="solo-filled"
      label="Reply a message..."
      row-height="15"
      rows="1"
      class="ma-2"
      auto-grow
    />
    <v-btn icon="mdi-send" size="large" class="ma-2" @click="editMessage" />
  </v-row>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app';
import { Users } from '@/types';
import { ref, computed, onMounted } from 'vue';
import { Messages } from '@/types';
import ContextMenu from './ContextMenu.vue';

const messagesStore = useAppStore();
const messages = computed(() => messagesStore.messages);
const isEditing = computed(() => messagesStore.message);
const isReplying = computed(() => messagesStore.replyingMessage);
const chatMembers = ref<Users[]>([]);
const text = ref('');

const selectedMessage = ref<Messages>();
const isContextMenuVisible = ref(false);
const contextMenuPosition = ref({ x: 0, y: 0 });

const props = defineProps({
  chat_id: {
    type: Number,
    required: true,
  },
});

onMounted(() => {
  messagesStore.FETCH_MESSAGES(props.chat_id);
  messagesStore.REACTIVE_MESSAGES(props.chat_id);
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

const editMessage = async () => {
  if (text.value.trim() === '') {
    return;
  }

  await messagesStore.EDIT_MESSAGE({
    chat_id: isEditing.value?.chat_id as number,
    message_text: text.value,
    message_id: isEditing.value?.message_id as number,
  });
  text.value = '';
  messagesStore.message = undefined;
};

const openMsgContextMenu = (event: MouseEvent, message: Messages) => {
  selectedMessage.value = message;
  isContextMenuVisible.value = true;
  contextMenuPosition.value = { x: event.clientX, y: event.clientY };
};

const getUserName = (user_id: number) => {
  const user = chatMembers.value.find((user) => user.user_id === user_id);
  return user ? user.username : '';
};
</script>

<style scoped>
.message-item {
  display: flex;
  justify-content: flex-start;
  height: fit-content;
}

.message-right {
  justify-content: flex-end;
}

.message-chip {
  word-wrap: break-word;
}

.current-user-chip {
  background-color: #e0f7fa;
  color: #00695c;
}
</style>