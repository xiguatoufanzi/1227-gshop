import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import TypeNav from "@/components/TypeNav";
import store from "./store";
import "./mock/mockServer";
import "swiper/css/swiper.min.css";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
import "./mock/mockServer";
import "./validate";
import * as API from "@/api"; // 引入所有接口请求函数并包装在API对象中
import "./elements";
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/loading.gif'

Vue.use(VueLazyload, { // 内部自定义了一个指令lazy
  loading,  // 指定未加载得到图片之前的loading图片
})

// 让所有组件对象可以直接看到API对象
Vue.prototype.$API = API;

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
