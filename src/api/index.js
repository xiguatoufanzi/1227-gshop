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

export const reqBanners = () => mockAjax("/banners");
export const reqFloors = () => mockAjax("/floors");
