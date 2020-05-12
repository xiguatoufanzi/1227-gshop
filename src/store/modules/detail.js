import { reqProduct } from "@/api";
import { reqAddToCart } from "@/api";

const state = {
  detailInfo: {},
};

const mutations = {
  RECEIVE_DETAIL_INFO(state, detailInfo) {
    state.detailInfo = detailInfo;
  },
};

const actions = {
  async getDetailInfo({ commit }, skuId) {
    const result = await reqProduct(skuId);
    if (result.code === 200) {
      const detailInfo = result.data;
      commit("RECEIVE_DETAIL_INFO", detailInfo);
    }
  },

  //购物车
  async addToCart({ commit }, { skuId, skuNum, callback }) {
    const result = await reqAddToCart(skuId, skuNum);
    if (result.code === 200) {
      //   console.log("添加到购物车成功");
      callback();
    } else {
      //   console.log("添加到购物车失败");
      callback("添加到购物车失败");
    }
  },

  async addToCart2({ commit }, { skuId, skuNum }) {
    const result = await reqAddToCart(skuId, skuNum);
    if (result.code === 200) {
      return "";
    } else {
      return "添加到购物车失败";
    }
  },

  async addToCart3({ commit }, { skuId, skuNum }) {
    const result = await reqAddToCart(skuId, skuNum);
    if (result.code === 200) {
      return "";
    } else {
      throw new Error("添加到购物车失败");
    }
  },
};

const getters = {
  //包含3级分类名称数据的对象
  categoryView(state) {
    const categoryView = state.detailInfo.categoryView;
    return categoryView || {};
  },

  //商品信息
  skuInfo(state) {
    const skuInfo = state.detailInfo.skuInfo;
    return skuInfo || {};
  },

  //图片列表
  skuImageList(state) {
    const skuInfo = state.detailInfo.skuInfo;
    return skuInfo ? skuInfo.skuImageList : [];
  },

  //销售属性
  spuSaleAttrList(state) {
    const spuSaleAttrList = state.detailInfo.spuSaleAttrList;
    return spuSaleAttrList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
