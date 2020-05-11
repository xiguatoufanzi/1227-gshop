import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter);

//解决push方法参数不变报错问题
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, onComplete, onAbort) {
  //如果本身传了回调
  if (onComplete || onAbort) {
    originPush.call(this, location, onComplete, onAbort);
  } else {
    //没传回调
    return originPush.call(this, location).catch(() => {
      console.log("error");
    });
  }
};

VueRouter.prototype.replace = function(location, onComplete, onAbort) {
  //如果本身传了回调
  if (onComplete || onAbort) {
    originReplace.call(this, location, onComplete, onAbort);
  } else {
    //没传回调
    return originReplace.call(this, location).catch(() => {
      console.log("error");
    });
  }
};

export default new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }; // 在跳转路由时, 滚动条自动滚动到x轴和y轴的起始位置
  },
});
