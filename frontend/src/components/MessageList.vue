<template>
  <context-menu
    :visible="isContextMenuVisible"
    :sender-name="getUserName(selectedMessage?.user_id as number)"
    :have-access="selectedMessage?.user_id == messagesStore.getUser?.user_id"
    :message-text="selectedMessage?.message_text as string"
    :message-id="selectedMessage?.message_id as number"
    @close="isContextMenuVisible = false"
    @edit="
      (message_text) => {
        text = message_text;
      }
    "
  />
  <v-list style="height: 650px">
    <v-list-item
      v-for="(message, index) in messages"
      :key="message.message_id"
      class="message-item"
      :class="{
        'message-right': message.user_id == messagesStore.getUser?.user_id,
      }"
      @contextmenu.prevent="openMsgContextMenu(message)"
    >
      <template v-if="shouldDisplaySenderName(index, message.user_id)">
        <strong>{{ getUserName(message.user_id) }}</strong
        ><br />
      </template>

      <div
        class="message-chip"
        :class="
          message.user_id == messagesStore.getUser?.user_id
            ? 'bg-surface-light'
            : 'bg-surface-bright'
        "
      >
        <div>{{ message.message_text }}</div>
      </div>
    </v-list-item>
  </v-list>
  <v-row class="pa-5" v-if="!isReplying">
    <v-textarea
      max-rows="4"
      v-model="text"
      variant="solo-filled"
      :label="isEditing ? 'Edit a message...' : 'Write a message...'"
      row-height="15"
      rows="1"
      class="ma-2"
      auto-grow
    />
    <v-btn
      icon="mdi-send"
      size="large"
      class="ma-2"
      @click="isEditing ? editMessage() : sendMessage()"
    />
  </v-row>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app';
import { Users } from '@/types';
import { ref, computed, onMounted } from 'vue';
import { Messages } from '@/types';

const messagesStore = useAppStore();
const messages = computed(
  () => messagesStore.messages[messagesStore.getChat?.chat_id as number],
);
const isEditing = computed(() => messagesStore.message);
const isReplying = computed(() => messagesStore.replyingMessage);
const chatMembers = ref<Users[]>([]);
const text = ref('');

const selectedMessage = ref<Messages>();
const isContextMenuVisible = ref(false);

const props = defineProps({
  chat_id: {
    type: Number,
    required: true,
  },
});

onMounted(() => {
  messagesStore.FETCH_MESSAGES(props.chat_id);
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
    sender_id: isEditing.value?.user_id as number,
    message_text: text.value,
    message_id: isEditing.value?.message_id as number,
  });
  text.value = '';
  messagesStore.message = undefined;
};

const openMsgContextMenu = (message: Messages) => {
  selectedMessage.value = message;
  isContextMenuVisible.value = true;
};

const getUserName = (user_id: number) => {
  const user = chatMembers.value.find((user) => user.user_id === user_id);
  return user ? user.username : '';
};

const shouldDisplaySenderName = (index: number, userId: number) => {
  if (index === 0) {
    return true;
  }

  const previousMessage = messages.value[index - 1];
  return previousMessage.user_id !== userId;
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
  text-align: right;
}

.message-chip {
  word-wrap: break-word;
  overflow-wrap: break-word;
  padding: 5px;
  border-radius: 5px;
}
</style>
