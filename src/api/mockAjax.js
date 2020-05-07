import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

//只显示水平进度条
NProgress.configure({ showSpinner: false });

const instance = axios.create({
  baseURL: "/mock",
  timeout: 15000,
});

//请求拦截器
instance.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});

//响应拦截器
instance.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response.data;
  },
  (error) => {
    NProgress.done();
    alert(`请求失败：${error.message || "未知错误"}`);
    return Promise.reject(error);
  }
);

export default instance;
