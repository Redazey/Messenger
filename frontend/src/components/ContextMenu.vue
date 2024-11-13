<template>
  <div
    v-if="visible"
    :style="{ top: position.y - 50 + 'px', left: position.x - 300 + 'px' }"
    class="context-menu"
  >
    <v-list>
      <v-list-item @click="copyMsg">Копировать</v-list-item>
      <v-list-item @click="replyMsg">Ответить</v-list-item>
      <v-list-item @click="forwardMsg">Переслать</v-list-item>
      <v-list-item @click="editMsg">Редактировать</v-list-item>
      <v-list-item @click="deleteMsg">Удалить</v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app';
import { defineProps } from 'vue';

const props = defineProps({
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
const messageStore = useAppStore()

const copyMsg = async () => {
  await navigator.clipboard.writeText(props.messageText);
  emit('close');
};

const replyMsg = () => {
  console.log('replying')
  emit('close');
};

const forwardMsg = () => {

  emit('close');
};

const editMsg = () => {

  emit('close');
};

const deleteMsg = () => {
  messageStore.DELETE_MESSAGE({message_id: props.messageId})
  messageStore.FETCH_MESSAGES(messageStore.getChat?.chat_id as number)
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
</style>