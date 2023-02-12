import Vue from "vue";
import App from "./App.vue";
import VuejsDialogBox from "@prostreyd/vue-dialog";
import "@prostreyd/vue-dialog/dist/style.css";

Vue.use(VuejsDialogBox);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
