<template>
  <v-list style="height: 75%">
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
    />
    <v-list-item v-for="(user, index) in filteredUsers" :key="index">
      <v-list-item-content>
        <v-list-item-title>{{ user.username }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="isLoading">
      <!-- Показываем индикатор загрузки -->
      <v-list-item-content>
        <v-list-item-title>Loading...</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useAppStore } from '@/stores/app';

export default {
  data: () => ({
    username: '',
    isLoading: false,
  }),
  setup() {
    const userStorage = useAppStore();
    const filteredUsers = computed(() => userStorage.users);

    return { filteredUsers };
  },
  methods: {
    async find() {
      if (!this.username) {
        return;
      }

      this.isLoading = true;

      try {
        const userStorage = useAppStore();
        await userStorage.FETCH_USERS({username: this.username});
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
