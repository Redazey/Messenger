<template>
  <HeaderNav />
  <v-row style="height: 90%;">
    <v-col cols="2" style="padding-right: 0;">
      <ContactList  />
    </v-col>
    <v-col cols="10" style="height: 100%; padding-left: 0;">
      <ChatArea />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup></script>
