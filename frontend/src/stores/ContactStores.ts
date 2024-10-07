import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Contacts, Messages } from '../types';

export const useContactsStore = defineStore('contactsStore', () => {
  // Состояние
  const contacts = ref<Contacts[]>([]);
  const messagesSent = ref<Messages[]>([]);
  const messagesReceived = ref<Messages[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

  // Подключение к SSE
  const connectToSSE = () => {
    const eventSource = new EventSource(BASE_URL + '/events/stream');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Обновляем контакты или сообщения в зависимости от полученных данных
        if (data.type === 'contacts') {
          contacts.value = data.payload;
        } else if (data.type === 'messageSent') {
          messagesSent.value.push(data.payload);
        } else if (data.type === 'messageReceived') {
          messagesReceived.value.push(data.payload);
        }
      } catch (err) {
        error.value = 'Failed to parse incoming data';
      }
    };

    eventSource.onerror = () => {
      error.value = 'Failed to connect to the server. Retrying...';
    };
  };

  return {
    contacts,
    messagesSent,
    messagesReceived,
    loading,
    error,
    connectToSSE,
  };
});
