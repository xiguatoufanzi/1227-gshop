import {
  reqCartList,
  reqCheckCartItem,
  reqAddToCart,
  reqDeleteCartItem,
} from "@/api";

export default {
  state: {
    cartList: [], // 购物项的列表
  },

  mutations: {
    RECEIVE_CART_LIST(state, cartList) {
      state.cartList = cartList;
    },
  },

  actions: {
    //获取购物车列表数据的异步action
    async getCartList({ commit }) {
      const result = await reqCartList();
      if (result.code === 200) {
        const cartList = result.data;
        commit("RECEIVE_CART_LIST", cartList);
      }
    },

    //改变购物项的勾选状态的异步
    async checkCartItem({}, { skuId, isChecked }) {
      const result = await reqCheckCartItem(skuId, isChecked);
      if (result.code !== 200) {
        throw new Error(result.message || "修改勾选状态操作失败");
      }
    },

    //对所有购物项实现全选或全不选
    async checkAllCartItems({ state, dispatch }, checked) {
      const isChecked = checked ? 1 : 0;
      const promises = [];
      state.cartList.forEach((item) => {
        if (item.isChecked === isChecked) return;
        const promise = dispatch("checkCartItem", {
          skuId: item.skuId,
          isChecked,
        });
        promises.push(promise);
      });
      return Promise.all(promises);
    },

    //添加和改变购物车数量
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

    //删除购物车项目
    async delCartItem({}, skuId) {
      const result = await reqDeleteCartItem(skuId);
      if (result.code !== 200) {
        throw new Error("删除失败");
      }
    },

    //删除所有选中项
    async delAllCartItems({ state, dispatch }) {
      /* const promises = [];
      state.cartList.forEach((item) => {
        if (item.isChecked === 1) {
          const promise = dispatch("delCartItem", item.skuId);
          promises.push(promise);
        }
      }); */

      const promises = state.cartList.reduce((pre, item) => {
        if (item.isChecked === 1) {
          pre.push(dispatch("delCartItem", item.skuId));
        }
        return pre;
      }, []);
      return Promise.all(promises);
    },
  },

  getters: {
    //已选中的商品的总数量
    totalCount(state) {
      /* let total = 0;
      state.cartList.forEach((item) => {
        const { isChecked, skuNum } = item;
        if (isChecked === 1) {
          total += skuNum;
        }
      });
      return total; */

      return state.cartList.reduce((pre, item) => {
        return item.isChecked === 1 ? pre + item.skuNum : pre;
      }, 0);
    },

    //已选中的商品的总价格
    totalPrice(state) {
      /*  let total = 0;
      state.cartList.forEach((item) => {
        const { isChecked, skuNum, cartPrice } = item;
        if (isChecked === 1) {
          total += cartPrice * skuNum;
        }
      });
      return total; */

      return state.cartList.reduce((pre, item) => {
        return item.isChecked === 1 ? pre + item.skuNum * item.cartPrice : pre;
      }, 0);
    },
  },
};
