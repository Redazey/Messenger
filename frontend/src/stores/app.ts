// Utilities
import { defineStore } from 'pinia'
import { useContactsStore } from './ContactStores';

export const useAppStore = defineStore('app', {
  state: () => ({
    // Your state variables here
  }),
  getters: {
    getContacts: () => {
      const contactsStore = useContactsStore();
      return contactsStore.contacts;
    },
    getMessages: () => {
      const contactsStore = useContactsStore();
      return contactsStore.messagesSent;
    },
  },
  actions: {
    setConn: async() => {
      const contactsStore = useContactsStore();
      contactsStore.connectToSSE();
    },

    fetchMessagesSentToUser: async(userId: number) => {
      const contactsStore = useContactsStore();
      return computed(() => {
        return contactsStore.messagesSent.filter((message) => message.chatId === userId);
      });
    },

    fetchUsersContacts: async(userId: number) => {
      const contactsStore = useContactsStore();
      return computed(() => {
        return contactsStore.contacts.filter((message) => message.userId === userId);
      });
    }
  },
})
