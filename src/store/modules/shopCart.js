import { reqCartList } from "@/api";

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
    async getCartList({ commit }) {
      const result = await reqCartList();
      if (result.code === 200) {
        const cartList = result.data;
        commit("RECEIVE_CART_LIST", cartList);
      }
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
