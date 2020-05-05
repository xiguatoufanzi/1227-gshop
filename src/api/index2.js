import ajax2 from "./ajax2";

export function reqBaseCategoryList() {
  return ajax2("/product/getBaseCategoryList");
}

export function reqLogin(mobile, password) {
  return ajax2.post("user/passport/login", { mobile, password });
}
