/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';
import router from './router';
import store from './stores';

// Composables
import { createApp } from 'vue';

const app = createApp(App);

registerPlugins(app);
app.use(router).use(store);
app.mount('#app');
