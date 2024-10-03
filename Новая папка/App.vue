<template>
  <v-app>
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

<script>
import ContactList from '@/components/ContactList.vue';
import HeaderNav from '@/components/HeaderNav.vue';
export default {
  components: {
    HeaderNav,
    ContactList,
  },
};
</script>
