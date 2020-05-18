<template>
  <div>
    <h2>BABA有存款: {{ money }}</h2>
    <button @click="borrowMoney1(100)">找小明借钱100</button><br />
    <button @click="borrowMoney2(150)">找小红借钱150</button><br />
    <button @click="borrowMoney3(200)">找所有孩子借钱200</button><br />

    <br />
    <Son ref="son" />

    <br />
    <Daughter ref="daughter" />
  </div>
</template>

<script>
import Son from "./Son";
import Daughter from "./Daughter";

export default {
  name: "ChildrenParentTest",
  data() {
    return {
      money: 1000,
    };
  },

  methods: {
    borrowMoney1(count) {
      //得到组件对象
      const son = this.$refs.son;
      //更新组件对象数据
      // son.money -= count;
      son.pullMoney(count);
      //更新自身数据
      this.money += count;
    },

    borrowMoney2(count) {
      //得到组件对象
      const daughter = this.$refs.daughter;
      //更新组件对象数据
      // daughter.money -= count;
      daughter.pullMoney(count);
      //更新自身数据
      this.money += count;
    },

    borrowMoney3(count) {
      //得到组件对象
      this.$children.forEach((child) => {
        child.pullMoney(count);
        this.money += count;
      });
    },
  },

  components: {
    Son,
    Daughter,
  },
};
</script>

<style></style>
