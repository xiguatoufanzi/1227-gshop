import { reqBaseCategoryList, reqBanners, reqFloors } from "@/api";

export default {
  state: {
    baseCategoryList: [],
    banners: [],
    floors: [],
  },

  mutations: {
    RECEIVE_BASE_CATEGORY_LIST(state, baseCategoryList) {
      state.baseCategoryList = baseCategoryList;
    },
    //轮播
    RECEIVE_BANNERS(state, banners) {
      state.banners = banners;
    },
    //楼层
    RECEIVE_FLOORS(state, floors) {
      state.floors = floors;
    },
  },

  actions: {
    async getBaseCategoryList({ commit }) {
      const result = await reqBaseCategoryList();
      if (result.code === 200) {
        const baseCategoryList = result.data;
        commit("RECEIVE_BASE_CATEGORY_LIST", baseCategoryList);
      }
    },

    //轮播
    async getBanners({ commit }) {
      const result = await reqBanners();
      if (result.code === 200) {
        const banners = result.data;
        commit("RECEIVE_BANNERS", banners);
      }
    },

    //楼层
    async getFloors({ commit }) {
      const result = await reqFloors();
      if (result.code === 200) {
        const floors = result.data;
        commit("RECEIVE_FLOORS", floors);
      }
    },
  },
};
