<template>
  <div class="Vip">
    <!-- 顶部分类 -->
    <div class="top">
      <ul>
        <li @click="red = item.id;changeRed($event)" v-for="item in topList" :key="item.id" :class="{'red': item.id === red}" ref="item.id">
          {{ item.title }}
        </li>
        <li ref="bar" id="bar"></li>
      </ul>
    </div>
    <!-- 商品 -->
    <div class="goods"></div>
    <!-- 底部支付 -->
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  name: "Vip",
  data() {
    return {
      topList: [],
      red: 0  // 初始状态下推荐有红色的下边框
    };
  },
  methods: {
    changeRed(e) {
      // 红色长条移动到鼠标点击的那一栏
      this.$refs.bar.style.left = e.target.offsetLeft + 'px'
    }
  },
  created() {
    // 如果有接口就在此处请求数据
    let rep = {
      status: 200,
      data: [
        {
          id: 0,
          title: "推荐",
        },
        {
          id: 1,
          title: "特惠",
        },
        {
          id: 2,
          title: "上新",
        },
        {
          id: 3,
          title: "蔬菜",
        },
        {
          id: 4,
          title: "水果",
        },
        {
          id: 5,
          title: "服装",
        },
      ],
      msg: "请求成功!",
    };
    this.topList = rep.data;
  },
  mounted() {
  }
};
</script>

<style scoped lang="less">
html {
  font-size: 4.26667vw;
}
// .red {
//   border-bottom: 2px solid red;
// }
* {
  margin: 0;
  padding: 0;
}
.top {
  ul {
    display: flex;
    position: relative;
    #bar {
      position: absolute;
      left: 0rem;
      padding: 0;
      bottom: 0;
      width: 16.67vw;
      height: 2px;
      background-color: red;
      transition: all .5s;
    }
  }
  li {
    flex: 1;
    padding: 10px;
    // border-bottom: 2px solid red;
    list-style: none;
  }
}
</style>
