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
    messages: ref<{ [key: number]: Messages[] }>([]),
    message: ref<Messages>(),
    loading: ref(false),
    eventsources: ref<EventSource[]>([]),
    error: ref<string | null>(null),
  }),
  getters: {
    getContacts: (state) => state.contacts,
    getMessages: (state) => state.messages,
    getMessage: (state) => state.message,
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
    getChats: (state) => state.chats,
    getChat: (state) => state.chat,
    getEventsources: (state) => state.eventsources,
  },
  actions: {
    // MESSAGES
    async FETCH_MESSAGES(chat_id: number) {
      try {
        this.loading = true;
        let { data } = await axiosInstance.get(
          BASE_URL + `/messages/get/${chat_id}`,
        );
        this.messages[chat_id] = data;
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
          switch (data.type) {
            case 'newMsg':
              const newMsg = data.message;
              this.messages[chat_id].push(newMsg);

              break;
            case 'deleteMsg':
              const deletedMsg = data.message;
              const msg = this.messages[chat_id].findIndex(
                (msg) => msg.message_id === deletedMsg,
              );

              if (msg !== -1) {
                this.messages[chat_id][msg].deleted = true;
              }

              break;
            case 'editMsg':
              const editMsg = data.message;
              const index = this.messages[chat_id].findIndex(
                (msg) => msg.message_id === editMsg.message_id,
              );

              if (index !== -1) {
                this.messages[chat_id][index].message_text =
                  editMsg.message_text;
              }

              break;
          }
        } catch (err) {
          console.error(err);
        }
      };

      eventSource.onerror = (error) => {
        console.error('Failed to connect to the server:', error);
      };
    },

    async CREATE_MESSAGE(message: Messages) {
      try {
        this.loading = true;
        let { data } = await axiosInstance.post(
          BASE_URL + `/messages/send`,
          message,
        );
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
        console.error(error);
      }
    },

    async EDIT_MESSAGE(editMessageDto: {
      chat_id: number;
      sender_id: number;
      message_text: string;
      message_id: number;
    }) {
      try {
        this.loading = true;
        let { data } = await axiosInstance.post(
          BASE_URL + `/messages/edit`,
          editMessageDto,
        );
        this.loading = false;
      } catch (error: any) {
        this.error = error;
        this.loading = false;
        console.error(error);
      }
    },

    async DELETE_MESSAGE(credentials: { chat_id: number; message_id: number }) {
      try {
        this.loading = true;
        let { data } = await axiosInstance.post(
          BASE_URL + `/messages/delete`,
          credentials,
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
    async FETCH_USERS(findBy: { username: string; user_id: number }) {
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

    async REG_USER(credentials: {
      username: string;
      email: string;
      password: string;
    }) {
      try {
        this.loading = true;
        let { data } = await axiosInstance.post(
          BASE_URL + `/auth/register`,
          credentials,
        );

        this.token = data.jwtToken;
        setCookie(cookies_consts.jwt, data.jwtToken, 14);
        router.push(this.returnUrl || '/');

        this.loading = false;
      } catch (error: any) {
        if (error.status == 409) {
          alert('Пользователь с таким e-mail уже существует');
          this.loading = false;
          return;
        }
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
