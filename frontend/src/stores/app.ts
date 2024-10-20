import { defineStore } from 'pinia';
import { useContactsStore } from './ContactStores';
import { Callback, Chats, Messages, Users } from '@/types';
import axios from 'axios';
import { ref } from 'vue';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

export const useAppStore = defineStore('app', {
  state: () => ({
		callback: ref<Callback>(),
		chats: ref<Chats[]>([]),
		user: ref<Users>(),
		users: ref<Users[]>([]),
    messages: ref<Messages[]>([]),
    loading: ref(false),
    error: ref<string | null>(null),
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
    // MESSAGES
    async FETCH_MESSAGES(user_id: number) {
      try {
        this.loading = true;
        let { data } = await axios.get(BASE_URL + `/users/${user_id}/messages`);
        this.messages = data;
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
        console.error(error);
      }
    },

		async CREATE_MESSAGE(from_user_id: number, to_chat_id: number, message: string) {
      try {
        this.loading = true;
        let { data } = await axios.post(BASE_URL + `/users/${from_user_id}/chats/${to_chat_id}/messages`, message);
        this.callback = data;
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
        console.error(error);
      }
    },

		// CONTACTS
		async FETCH_CONTACTS(user_id: number) {
      try {
        this.loading = true;
        let { data } = await axios.get(BASE_URL + `/users/${user_id}/contacts`);
        this.users = data;
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
        console.error(error);
      }
    },

		async ADD_CONTACT(user_id: number, contact_id: number) {
      try {
        this.loading = true;
        let { data } = await axios.post(BASE_URL + `/users/${user_id}/contacts`, contact_id);
        this.callback = data;
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
        console.error(error);
      }
    },

		// CHATS
		async FETCH_CHATS(user_id: number) {
      try {
        this.loading = true;
        let { data } = await axios.get(BASE_URL + `/users/${user_id}/chats`);
        this.chats = data;
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
        console.error(error);
      }
    },

		async CREATE_CHAT(creator_id: number, participants: number[]) {
      try {
        this.loading = true;
        let { data } = await axios.post(BASE_URL + `/users/${creator_id}/chats`, participants);
        this.callback = data;
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
        console.error(error);
      }
    },

		// USERS
		async FETCH_USER(user_id: number) {
      try {
        this.loading = true;
        let { data } = await axios.get(BASE_URL + `/users/${user_id}`);
        this.user = data;
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
        console.error(error);
      }
    },

		async AUTH_USER(credentials: {email: string, password: string}) {
      try {
        this.loading = true;
        let { data } = await axios.post(BASE_URL + `/auth/login`, credentials);
        this.callback = data;
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
        console.error(error);
      }
    },

		async REG_USER(credentials: {email: string, password: string}) {
      try {
        this.loading = true;
        let { data } = await axios.post(BASE_URL + `/auth/register`, credentials);
        this.callback = data;
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
        console.error(error);
      }
    }
  },
});
