<template>
  <v-toolbar color="cyan-lighten-1" height="10%">
    <!-- Menu button to toggle the drawer -->
    <v-btn icon="mdi-menu" variant="text" @click="drawer = !drawer" />

    <v-text-field
      append-inner-icon="mdi-magnify"
      density="compact"
      label="Search"
      variant="solo"
      hide-details
      single-line
      class="ma-2"
      max-width="12%"
      min-width="150px"
    />

    <v-label
      class="ma-5"
      text="Chat-1"
      style="color: white; font-size: larger; font-weight: bolder"
    />
  </v-toolbar>

  <!-- Sidebar drawer -->
  <v-navigation-drawer v-model="drawer" app temporary pa-5>
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
      :subtitle="user?.email"
      :title="user?.username"
    />

    <v-divider />

    <v-list style="display: flex; flex-direction: column">
      <v-list-item link to="settings" title="Settings">
        <template v-slot:prepend>
          <v-icon>mdi-cog</v-icon>
        </template>
      </v-list-item>

      <v-list-item link title="Create chat">
        <template v-slot:prepend>
          <v-icon>mdi-message-plus</v-icon>
        </template>
      </v-list-item>

      <v-list-item align-content-center align-center>
        <template v-slot:prepend>
          <v-icon>mdi-weather-night</v-icon>
        </template>
        <v-switch
          inset
        ></v-switch>
      </v-list-item>
    </v-list>

    <v-btn
      text="Log out"
      width="80%"
      style="margin-left: 20px"
      @click="logout"
    />
  </v-navigation-drawer>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app';

export default {
  data: () => ({
    isLoading: false,
    drawer: false,
  }),
  setup() {
    const auth = useAppStore();
    onMounted(async () => {
      await auth.FETCH_USER();
    });
    const user = computed(() => auth.user);
    return { auth, user };
  },
  methods: {
    async logout() {
      this.isLoading = true;

      try {
        await this.auth.LOGOUT();
      } catch (error) {
        console.error('logout failed:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
