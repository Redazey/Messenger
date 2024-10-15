<template>
    <v-row class="pa-5">
    <v-textarea
      max-rows="5"
      variant="solo-filled"
      label="Write a message..."
      row-height="15"
      rows="1"
      class="ma-2"
      auto-grow
    />

    <v-btn icon="mdi-send" size="large" class="ma-2" />
  </v-row>
</template>

<script lang="ts" setup></script>