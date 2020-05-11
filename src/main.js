import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import TypeNav from "@/components/TypeNav";
import store from "./store";
import "./mock/mockServer";
import "swiper/css/swiper.min.css";
import Carousel from "@/components/Carousel";
import Pagination from '@/components/Pagination'

Vue.component("TypeNav", TypeNav);
Vue.component("Carousel", Carousel);
Vue.component("Pagination", Pagination);

Vue.config.productionTip = false;

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
