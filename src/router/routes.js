// import Home from "@/pages/Home";
// import Search from "@/pages/Search";
const Search = () => import("@/pages/Search");
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import MyOrder from "@/pages/Center/MyOrder";
import GroupBuy from "@/pages/Center/GroupBuy";
import store from "@/store";
import router from ".";

export default [
  //home
  {
    path: "/",
    component: () => import("@/pages/Home"),
  },

  //详情
  {
    name: "detail",
    path: "/detail/:skuId",
    component: Detail,
  },
  //添加购物车
  {
    path: "/addcartsuccess",
    component: AddCartSuccess,

    beforeEnter(to, from, next) {
      // 得到当前路由信息对象
      // 得到要跳转到目路由的query参数
      const skuNum = to.query.skuNum;
      // 读取保存的数据
      const skuInfo = JSON.parse(window.sessionStorage.getItem("SKU_INFO_KEY"));
      // 只有都存在, 才放行
      if (skuNum && skuInfo) {
        next();
      } else {
        next("/");
      }
    },
  },
  //购物车结算
  {
    path: "/shopcart",
    component: ShopCart,
  },

  //交易
  {
    path: "/trade",
    component: Trade,
    /* 只能从购物车界面, 才能跳转到交易界面 */
    beforeEnter(to, from, next) {
      if (from.path === "/shopcart") {
        next();
      } else {
        next("/shopcart");
      }
    },
  },
  //支付
  {
    path: "/pay",
    component: Pay,
    props: (route) => ({ orderId: route.query.orderId }),

    beforeEnter(to, from, next) {
      if (from.path === "/trade") {
        next();
      } else {
        next("/trade");
      }
    },
  },
  //支付成功
  {
    path: "/paysuccess",
    component: PaySuccess,

    beforeEnter(to, from, next) {
      if (from.path === "/pay") {
        next();
      } else {
        next("/pay");
      }
    },
  },
  //订单中心
  {
    path: "/center",
    component: Center,
    children: [
      //我的订单
      {
        path: "myorder",
        component: MyOrder,
      },
      //团购
      {
        path: "groupbuy",
        component: GroupBuy,
      },
      {
        path: "",
        redirect: "myorder",
      },
    ],
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
  //登录
  {
    path: "/login",
    component: Login,
    meta: {
      isHideFooter: true,
    },

    //路由守卫
    /*  beforeEnter: (to, from, next) => {
      //未登录放行
      if (!store.state.user.userInfo.token) {
        next();
      } else {
        next("/");
      }
    }, */
  },
];
