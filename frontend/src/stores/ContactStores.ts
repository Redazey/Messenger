import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Contacts, Messages } from '../types';
import { _get } from '@/api/apiClient';

export const useContactsStore = defineStore('contactsStore', () => {
  // Состояние
  const contacts = ref<Contacts[]>([]);
  const messagesSent = ref<Messages[]>([]);
  const messagesReceived = ref<Messages[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Действия
  const fetchContacts = async () => {
    loading.value = true;
    try {
      const response = await _get<Contacts[]>('/contacts');
      contacts.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch contacts';
    } finally {
      loading.value = false;
    }
  };

  const fetchMessagesSent = async (contactId: number) => {
    loading.value = true;
    try {
      const response = await _get<Messages[]>(`/messages/sent/${contactId}`);
      messagesSent.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch sent messages';
    } finally {
      loading.value = false;
    }
  };

  const fetchMessagesReceived = async (contactId: number) => {
    loading.value = true;
    try {
      const response = await _get<Messages[]>(`/messages/received/${contactId}`);
      messagesReceived.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch received messages';
    } finally {
      loading.value = false;
    }
  };

  return {
    contacts,
    messagesSent,
    messagesReceived,
    loading,
    error,
    fetchContacts,
    fetchMessagesSent,
    fetchMessagesReceived
  };
});