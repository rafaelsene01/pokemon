import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Components from "@/components";

import "@/assets/css/tailwind.css";

const app = createApp(App);

Object.keys(Components).forEach(name => {
  app.component(name, Components[name]);
});

app.use(router);
app.mount("#app");
