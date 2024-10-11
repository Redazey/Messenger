import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Contacts, Messages } from '../types';

export const useContactsStore = defineStore('contactsStore', () => {
  // Состояние
  const contacts = ref<Contacts[]>([]);
  const messagesSent = ref<Messages[]>([]);
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

        switch (data.type) {
          case 'contacts': 
            contacts.value = data.payload
          case 'messageSent':
            messagesSent.value.push(data.payload)
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
    loading,
    error,
    connectToSSE,
  };
});
