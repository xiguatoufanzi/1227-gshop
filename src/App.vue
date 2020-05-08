<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHideFooter" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { reqBaseCategoryList, reqLogin } from "@/api";
import { reqFloors } from "@/api";

export default {
  name: "App",

  components: {
    Header,
    Footer,
  },
  async mounted() {
    // const result = await reqBaseCategoryList();
    // console.log("result", result);
    // const result2 = await reqLogin("13700000000", "111111");
    // console.log("result2", result2);

    this.$store.dispatch("getBaseCategoryList");

    //mock测试
    // const result = await reqFloors();
    // console.log("mock result ", result);

    
  },
};
</script>

<style lang="less" scoped></style>
