import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import store from "./store";

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(store).use(router).use(vuetify).mount("#app");
