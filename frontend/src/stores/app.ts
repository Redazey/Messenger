import { defineStore } from 'pinia';
import { Chats, Messages, Users } from '@/types';
import axios from 'axios';
import { ref } from 'vue';
import router from '@/router';
import { eraseCookie, getCookie, setCookie } from '@/utils/cookieUtils';
import { cookies_consts } from '@/utils/cookie_constants';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie(cookies_consts.jwt);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

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
    message: ref<Messages>(),
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
    getMessage: (state) => {
      return state.message;
    },
    getUsers: (state) => {
      return state.users;
    },
    getUser: (state) => {
      return state.user;
    },
    getChats: (state) => {
      return state.chats;
    },
  },
  actions: {
    // MESSAGES
    async FETCH_MESSAGES(chat_id: number) {
      try {
        this.loading = true;
        let { data } = await axiosInstance.get(
          BASE_URL + `/messages/get/${chat_id}`,
        );
        this.messages = data;
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
        console.error(error);
      }
    },

    async REACTIVE_MESSAGES(chat_id: number) {
      const eventSource = new EventSource(
        BASE_URL + `/messages/getSSE/${chat_id}`,
        {
          withCredentials: true,
        },
      );

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log(data);
          this.messages.push(data);
        } catch (err) {
          console.error(err);
        }
      };

      eventSource.onerror = () => {
        console.error('failed connect to the server');
      };
    },

    async CREATE_MESSAGE(message: Messages) {
      try {
        this.loading = true;
        let { data } = await axiosInstance.post(
          BASE_URL + `/messages/send`,
          message,
        );
        this.message = data;
        this.messages.push(data);
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
        console.error(error);
      }
    },

    async EDIT_MESSAGE(message_id: number) {
      try {
        this.loading = true;
        let { data } = await axiosInstance.post(
          BASE_URL + `/messages/edit`,
          message_id,
        );
        this.message = data;
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
        console.error(error);
      }
    },

    async DELETE_MESSAGE(message_id: number) {
      try {
        this.loading = true;
        let { data } = await axiosInstance.post(
          BASE_URL + `/messages/delete`,
          message_id,
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
        let { data } = await axiosInstance.get(
          BASE_URL + `/contacts/getContacts/${user_id}`,
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
        let { data } = await axiosInstance.post(
          BASE_URL + `/contacts/newContact`,
          credentials,
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
        let { data } = await axiosInstance.get(
          BASE_URL + `/chats/getChats/${user_id}`,
        );
        this.chats = data;
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
      }
    },

    async CREATE_CHAT(credentials: {
      chat_name: string;
      participants: number[];
    }) {
      try {
        this.loading = true;
        let { data } = await axiosInstance.post(
          BASE_URL + `/chats/create`,
          credentials,
        );
        this.chats.push(data);
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
        let { data } = await axiosInstance.post(
          BASE_URL + `/users/find`,
          findBy,
        );
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

    async FETCH_USERS_BY_CHAT(chat_id: number) {
      try {
        this.loading = true;
        let { data } = await axiosInstance.get(
          BASE_URL + `/users/inChat/${chat_id}`,
        );
        this.users = data;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
      }
    },

    async FETCH_USER() {
      try {
        this.loading = true;
        this.token = getCookie(cookies_consts.jwt);
        let { data } = await axiosInstance.get(BASE_URL + `/auth/profile`);
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
        let { data } = await axiosInstance.post(
          BASE_URL + `/auth/login`,
          credentials,
        );
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
        let { data } = await axiosInstance.post(
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
      try {
        let { data } = await axiosInstance.post(BASE_URL + `/users/logout`);
      } catch (error: any) {
        this.error = error;
        this.loading = false;
      } finally {
        eraseCookie(cookies_consts.jwt);
        this.user = null;
        router.push('/login');
        this.loading = false;
      }
    },
  },
});
