import { getUserTempId, saveUserInfo, getUserInfo, delUserInfo } from "@/utils";
import { reqRegister, reqLogin, reqLogout } from "@/api";

export default {
  state: {
    userInfo: getUserInfo(),
    userTempId: getUserTempId(),
  },
  mutations: {
    RECEIVE_USER_INFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    DELETE_USER_INFO(state) {
      state.userInfo = {};
    },
  },
  actions: {
    //注册
    async register({}, userInfo) {
      const result = await reqRegister(userInfo);
      if (result.code !== 200) {
        throw new Error(result.data || result.message || "注册失败");
      }
    },

    //登陆
    async login({ commit }, { mobile, password }) {
      const result = await reqLogin(mobile, password);
      if (result.code === 200) {
        const userInfo = result.data;
        commit("RECEIVE_USER_INFO", userInfo);
        //将用户信息保存到local中
        saveUserInfo(userInfo);
      } else {
        throw new Error(result.data || result.message || "登陆失败");
      }
    },

    //登出
    async Logout({ commit }) {
      const result = await reqLogout();
      if (result.code === 200) {
        commit("DELETE_USER_INFO");
        delUserInfo();
      } else {
        throw new Error(result.data || result.message || "登出失败");
      }
    },
  },
  getters: {},
};
