import { defineStore } from 'pinia';
import { useContactsStore } from './ContactStores';
import { Chats, Messages, Users } from '@/types';
import axios from 'axios';
import { ref } from 'vue';
import router from '@/router';
import { eraseCookie, getCookie, setCookie } from '@/utils/cookieUtils';
import { cookies_consts } from '@/utils/cookie_constants';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

export const useAppStore = defineStore('app', {
  state: () => ({
    chats: ref<Chats[]>([]),
    chat: ref<Chats | null>(),
    user: ref<Users | null>(),
    token: ref<string | null>(),
    returnUrl: ref<string | null>(),
    users: ref<Users[]>([]),
    contacts: ref<Users[]>([]),
    messages: ref<Messages[]>([]),
    loading: ref(false),
    error: ref<string | null>(null),
  }),
  getters: {
    getContacts: (state) => {
      return state.contacts;
    },
    getMessages: (state) => {
      return state.messages;
    },
    getUsers: (state) => {
      return state.users;
    },
    getUser: (state) => {
      return state.user;
    },
    getChats: (state) => {
      return state.chats;
    }
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

    async CREATE_MESSAGE(
      from_user_id: number,
      to_chat_id: number,
      message: string,
    ) {
      try {
        this.loading = true;
        let { data } = await axios.post(
          BASE_URL + `/users/${from_user_id}/chats/${to_chat_id}/messages`,
          message,
        );
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
        let { data } = await axios.get(
          BASE_URL + `/contacts/getContacts/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          },
        );
        this.contacts = data;
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
      }
    },

    async ADD_CONTACT(credentials: {
      chatname: string;
      user_id: number;
      contact_id: number;
    }) {
      try {
        this.loading = true;
        let { data } = await axios.post(
          BASE_URL + `/contacts/newContact`,
          credentials,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          },
        );
        this.contacts.push(data);
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
      }
    },

    // CHATS
    async FETCH_CHATS(user_id: number) {
      try {
        this.loading = true;
        let { data } = await axios.get(
          BASE_URL + `/chats/getChats/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          },
        );
        this.chats = data;
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
      }
    },

    async CREATE_CHAT(credentials: {
      creator_id: number;
      participants: number[];
    }) {
      try {
        this.loading = true;
        let { data } = await axios.post(
          BASE_URL + `/users/${credentials}/chats`,
          credentials,
        );
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
      }
    },

    // AUTH
    async FETCH_USERS(findBy: { username: string }) {
      try {
        this.loading = true;
        let { data } = await axios.post(BASE_URL + `/users/find`, findBy, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        if (data.message == 'Unauthorized') {
          this.LOGOUT();
        } else {
          this.users = data;
          this.loading = false;
        }
      } catch (error: any) {
        this.error = error;
        this.loading = false;
      }
    },

    async FETCH_USER() {
      try {
        this.loading = true;
        this.token = getCookie(cookies_consts.jwt);
        let { data } = await axios.get(BASE_URL + `/auth/profile`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.user = data.user;
        this.loading = false;
      } catch (error: any) {
        this.LOGOUT();
        this.error = error;
        this.loading = false;
        return null;
      }
    },

    async AUTH_USER(credentials: { email: string; password: string }) {
      try {
        this.loading = true;
        let { data } = await axios.post(BASE_URL + `/auth/login`, credentials);
        this.token = data.jwtToken;
        setCookie(cookies_consts.jwt, data.jwtToken, 14);
        router.push(this.returnUrl || '/');
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
      }
    },

    async REG_USER(credentials: { email: string; password: string }) {
      try {
        this.loading = true;
        let { data } = await axios.post(
          BASE_URL + `/auth/register`,
          credentials,
        );
        this.token = data.jwtToken;
        setCookie(cookies_consts.jwt, data.jwtToken, 14);
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
      }
    },

    async LOGOUT() {
      this.loading = true;
      this.token = null;
      try{
        let { data } = await axios.post(BASE_URL + `/users/logout`);
      }
      catch (error: any) {
        this.error = error;
        this.loading = false;
      }
      finally{
        eraseCookie(cookies_consts.jwt);
        this.user = null;
        router.push('/login');
        this.loading = false;
      }
    },
  },
});
