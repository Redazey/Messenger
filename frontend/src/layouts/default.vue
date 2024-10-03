<template>
  <v-app style="overflow: hidden; height: 100vh;">
    <HeaderNav />
    <v-main>
      <ContactList />
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
