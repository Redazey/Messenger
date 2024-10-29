<template>
  <v-text-field
    v-model="username"
    append-inner-icon="mdi-magnify"
    density="compact"
    label="Search"
    variant="solo"
    hide-details
    single-line
    class="ma-2"
    max-width="12%"
    min-width="150px"
    @input="find"
    @update:focused="onFocus"
    @blur="onBlur"
  />
  <div style="height: 75%">
    <div v-if="isSearching">
      <v-list>
        <v-list-item
          v-if="username != ''"
          v-for="(user, index) in filteredUsers"
          :key="index"
          :value="user.username"
        />
        <v-list-item v-if="isLoading" titile="Loading..." />
      </v-list>
    </div>
    <div v-if="!isSearching">
      <v-list>
        <v-list-item
          v-for="(contact, index) in filteredUsers"
          :key="index"
          :title="contact.username"
          @click="openUserDialog(contact)"
          class="cursor-pointer"
        />
      </v-list>

      <v-dialog v-model="dialog" max-width="500">
        <v-card rounded="lg">
          <v-card-title class="d-flex justify-space-between align-center">
            <div class="text-h5 text-medium-emphasis ps-2">
              {{ selectedUser.username }}
            </div>

            <v-btn icon="mdi-close" variant="text" @click="closeDialog" />
          </v-card-title>

          <v-divider class="mb-4" />

          <v-card-actions class="my-2 d-flex justify-end">
            <v-btn
              class="text-none"
              rounded="xl"
              text="Close"
              @click="closeDialog"
            />
            <v-btn
              class="text-none"
              color="primary"
              rounded="xl"
              text="Add contact"
              variant="flat"
              @click="addContact"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useAppStore } from '@/stores/app';
import type { Users } from '@/types';
import ContactModal from './ContactModal.vue';

const userStorage = useAppStore();

export default {
  components: {
    ContactModal,
  },
  data: () => ({
    username: '',
    isLoading: false,
    isSearching: false,
    dialog: ref(false),
    selectedUser: ref<Users>({
      user_id: 0,
      password: '',
      username: '',
      email: '',
      created_at: null,
    }),
  }),
  setup() {
    const filteredUsers = computed(() => userStorage.users);

    return { filteredUsers };
  },
  mounted() {
    const user = userStorage.user?.user_id as number;
    userStorage.FETCH_CONTACTS(user);
  },
  methods: {
    async onFocus() {
      this.isSearching = true;
    },

    async onBlur() {
      const user = userStorage.user?.user_id as number;
      userStorage.FETCH_CONTACTS(user);
      this.isSearching = false;
    },

    async find() {
      if (!this.username) {
        return;
      }

      this.isLoading = true;

      try {
        await userStorage.FETCH_USERS({ username: this.username });
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        this.isLoading = false;
      }
    },

    async addContact() {
      this.isLoading = true;

      try {
        await userStorage.ADD_CONTACT(
          {
            chatname: this.selectedUser.username,
            user_id: userStorage.user?.user_id as number,
            contact_id: this.selectedUser.user_id,
          }
        );

      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        this.isLoading = false;
      }
    },

    openUserDialog(contact: Users) {
      this.selectedUser = contact;
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
