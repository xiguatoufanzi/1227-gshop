import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";

export default [
  //home
  {
    path: "/",
    component: Home,
  },
  //登录
  {
    path: "/login",
    component: Login,
    meta: {
      isHideFooter: true,
    },
  },
  //详情
  {
    name: "detail",
    path: "/detail/:skuId",
    component: Detail,
  },
  //注册
  {
    path: "/register",
    component: Register,
    meta: {
      isHideFooter: true,
    },
  },
  //搜索
  {
    name: "search",
    path: "/search/:keyword?",
    component: Search,
    props: (route) => ({
      keyword3: route.params.keyword,
      keyword4: route.query.keyword2,
    }),
  },
];
