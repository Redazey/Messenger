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
      subtitle="sandra_a88@gmailcom"
      title="Sandra Adams"
    />

    <v-divider />

    <v-list style="display: flex; flex-direction: column;">
      <v-list-item link to="settings" title="Settings">
        <template v-slot:prepend>
          <v-icon>mdi-cog</v-icon>
        </template>
      </v-list-item>

      <v-list-item link @click="createChat" title="Create chat">
        <template v-slot:prepend>
          <v-icon>mdi-message-plus</v-icon>
        </template>
      </v-list-item>

      <v-list-item align-content-center align-center>
        <template v-slot:prepend>
          <v-icon>mdi-weather-night</v-icon>
        </template>
        <v-switch
          v-model="isNightMode"
          inset
          @change="toggleNightMode"
        ></v-switch>
      </v-list-item>
    </v-list>

    <v-btn text="Log out" width="80%" style="margin-left: 20px" link to="Login"/>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ChatToolbar',
  setup() {
    const drawer = ref(false);
    const isNightMode = ref(false);

    const createChat = () => {
      // Handle chat creation
      console.log('Creating a new Chat');
    };

    const toggleNightMode = () => {
      // Handle toggling of night mode
      console.log('Night Mode:', isNightMode.value);
    };

    return {
      drawer,
      isNightMode,
      createChat,
      toggleNightMode,
    };
  },
});
</script>
