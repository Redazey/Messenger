<template>
  <v-toolbar
    color="cyan-lighten-1"
    height="64"
    style="z-index: 2000; position: fixed; top: 0; left: 0"
  >
    <v-btn icon="mdi-menu" variant="text" />

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
</template>
