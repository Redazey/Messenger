// Utilities
import { defineStore } from 'pinia'
import { useContactsStore } from './ContactStores';

export const useAppStore = defineStore('app', {
  state: () => ({
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

    fetchUserContacts: async(user_id: number) => {
      const contactsStore = useContactsStore();
      return computed(() => {
        return contactsStore.contacts.filter((contact) => contact.user_id === user_id);
      });
    },

    fetchMessagesSentToUser: async(user_id: number) => {
      const contactsStore = useContactsStore();
      return computed(() => {
        return contactsStore.messagesSent.filter((message) => message.user_id === user_id);
      });
    },

    fetchUsersContacts: async(user_id: number) => {
      const contactsStore = useContactsStore();
      return computed(() => {
        return contactsStore.contacts.filter((message) => message.user_id === user_id);
      });
    }
  },
})
