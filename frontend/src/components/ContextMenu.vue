<template>
  <div
    v-if="visible"
    :style="{ top: position.y - 50 + 'px', left: position.x - 200 + 'px' }"
    class="context-menu"
  >
    <v-list>
      <v-list-item @click="copyMsg">Копировать</v-list-item>
      <v-list-item @click="replyMsg">Ответить</v-list-item>
      <v-list-item @click="forwardMsg">Переслать</v-list-item>
      <v-list-item @click="editMsg">Редактировать</v-list-item>
      <v-list-item @click="deleteMsg">Удалить</v-list-item>

      <v-dialog v-model="dialog" max-width="500">
        <v-card rounded="lg">
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Select chat</span>
          </v-card-title>

          <v-divider class="mb-4" />

          <v-list>
            <v-list-item-group v-model="selectedChat" multiple>
              <v-list-item
                v-for="chat in chats"
                :key="chat.chat_id"
                :value="chat.chat_id"
                @click="selectChat(chat)"
                :class="{'selected-chat': selectedChat?.chat_id === chat.chat_id}"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ chat.chat_name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>

          <v-card-actions class="my-2 d-flex justify-end">
            <v-btn
              class="text-none"
              rounded="xl"
              text="Отмена"
              @click="dialog = false"
            />
            <v-btn
              class="text-none"
              color="primary"
              rounded="xl"
              text="Переслать"
              variant="flat"
              :disabled="!selectedChat"
              @click="sendForwardedMessage"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app';
import { Chats, Messages } from '@/types';
import { defineProps } from 'vue';

const props = defineProps({
  senderName: {
    type: String,
    required: true,
  },
  messageText: {
    type: String,
    required: true,
  },
  messageId: {
    type: Number,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
  position: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);
const dialog = ref(false);
const messageStore = useAppStore();
const chats = computed(() => messageStore.getChats);
const selectedChat = ref<Chats | null>(null);

onMounted(async () => {
  await messageStore.FETCH_CHATS(messageStore.getUser?.user_id as number);
});

const copyMsg = async () => {
  await navigator.clipboard.writeText(props.messageText);
  emit('close');
};

const replyMsg = () => {
  messageStore.replyingMessage = messageStore.getMessages.find((element) => element.message_id === props.messageId);
  emit('close');
};

const forwardMsg = () => {
  dialog.value = true;
};

const sendForwardedMessage = () => {
  if (selectedChat.value) {
    let msg = messageStore.getMessages.find((element) => element.message_id === props.messageId) as Messages;
    msg.message_text += ` Переслано от ${props.senderName}`;
    msg.user_id = messageStore.getUser?.user_id as number
    msg.chat_id = selectedChat.value.chat_id as number;
    msg.message_id = undefined
    messageStore.CREATE_MESSAGE(msg);

    // редиректим юзера в тот чат, куда мы переслали сообщение
    messageStore.chat = selectedChat.value
    dialog.value = false;
    emit('close');
  }
};

const selectChat = (chat: Chats) => {
  selectedChat.value = chat;
};

const editMsg = () => {
  messageStore.message = messageStore.getMessages.find((element) => element.message_id === props.messageId);
  emit('close');
};

const deleteMsg = () => {
  messageStore.DELETE_MESSAGE({ message_id: props.messageId });
  messageStore.FETCH_MESSAGES(messageStore.getChat?.chat_id as number);
  emit('close');
};
</script>

<style scoped>
.context-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.selected-chat {
  background-color: #e0f7fa;
}

.v-btn[disabled] {
  background-color: #f0f0f0;
  cursor: not-allowed;
}
</style>
