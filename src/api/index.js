/* 
包含所有接口请求函数的模块
每个函数的返回值都是promise
*/
import ajax from "./ajax";
import mockAjax from "./mockAjax";

/* 
请求获取3级分类列表
/api/product/getBaseCategoryList
*/
export function reqBaseCategoryList() {
  //函数形式
  return ajax("/product/getBaseCategoryList");
}

export const reqBanners = () => mockAjax("/banners");
export const reqFloors = () => mockAjax("/floors");

// 根据搜索的条件参数对象获取商品列表数据
export const reqProductList = (searchParams) =>
  ajax({
    url: "/list",
    method: "POST",
    data: searchParams,
  });

/* reqProductList({
  category3Id: "61",
  categoryName: "手机",
  keyword: "小米",
  order: "1:desc",
  pageNo: 1,
  pageSize: 10,
  props: ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  trademark: "4:小米",
}); */

/* 
请求获取指定id的商品信息
/api/item/{ skuId }
*/
export const reqProduct = (skuId) => ajax(`item/${skuId}`);

/* 
添加到购物车
/api/cart/addToCart/{ skuId }/{ skuNum }
skuId: 商品的id
skuNum: 增加或减少的数量 正数代表增加 / 负数代表减少
*/
export const reqAddToCart = (skuId, skuNum) =>
  ajax.post(`/cart/addToCart/${skuId}/${skuNum}`);

//获取购物车列表
export const reqCartList = () => ajax("/cart/cartList");

/* 
切换商品选中状态
skuId: 商品id
isChecked: 新的选中状态值  0代表取消选中 / 1代表选中
*/
export const reqCheckCartItem = (skuId, isChecked) =>
  ajax(`/cart/checkCart/${skuId}/${isChecked}`);

//删除购物车商品
export const reqDeleteCartItem = (skuId) =>
  ajax.delete(`/cart/deleteCart/${skuId}`);

/* 
请求登陆
/api/user/passport/login
POST
*/
export function reqLogin(mobile, password) {
  //   方法形式
  //   return ajax.post("/user/passport/login", { mobile, password });

  //函数形式
  return ajax({
    method: "POST",
    url: "user/passport/login",
    data: { mobile, password },
  });
}

//请求注册
/* export const reqRegister = ({ mobile, password, code }) =>
  ajax.post("/user/passport/register", { mobile, password, code }); */
export const reqRegister = (userInfo) =>
  ajax.post("/user/passport/register", userInfo);

// 退出登陆
export const reqLogout = () => ajax("/user/passport/logout");

//获取我的订单列表
export const reqMyOrders = (page, limit) =>
  ajax(`/order/auth/${page}/${limit}`);

//获取订单交易页信息
export const reqTradeInfo = () => ajax("/order/auth/trade");

//提交订单
export const reqSubmitOrder = (tradeNo, orderInfo) =>
  ajax({
    url: "/order/auth/submitOrder",
    method: "POST",
    params: { tradeNo },
    data: orderInfo,
  });

//获取订单支付信息
export const reqPayInfo = (orderId) =>
  ajax(`/payment/weixin/createNative/${orderId}`);

//查询支付订单状态
export const reqOrderStatus = (orderId) =>
  ajax(`/payment/weixin/queryPayStatus/${orderId}`);
