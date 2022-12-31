<template>
  <div class="Vip">
    <!-- 顶部分类 -->
    <div class="top">
      <ul>
        <li
          @click="changeRed($event)"
          v-for="item in topList"
          :key="item.id"
          ref="item.id"
        >
          {{ item.title }}
        </li>
        <li ref="bar" id="bar"></li>
      </ul>
    </div>
    <!-- 商品 -->
    <div class="bg" v-for="good in goodsList" :key="good.id">
      <div class="goods">
        <!-- 商品图片 -->
        <img :src="url + good.url" alt="" />
        <!-- 商品信息 -->
        <div class="info">
          <span class="name">{{ good.name }}</span>
          <span class="tags">{{ good.tags }}</span>
          <span class="price">￥{{ good.price }}</span>
        </div>
        <!-- 商品购买数量 -->
        <div class="number" v-if="good.buy">
          <span @click="jia(good)">＋</span>
          <span class="mid">{{ good.buy }}</span>
          <span @click="jian(good)">-</span>
        </div>
        <div class="car" v-else>
          <span @click="toCar(good)">加入购物车</span>
        </div>
      </div>
    </div>
    <!-- 底部支付 -->
    <div class="bottom"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Vip",
  data() {
    return {
      url: "http://192.168.0.105:8080", // 基本请求地址
      topList: [],
      goodsList: [], // 商品
      num: 0
    };
  },
  methods: {
    changeRed(e) {
      // 红色长条移动到鼠标点击的那一栏
      this.$refs.bar.style.left = e.target.offsetLeft + "px";
    },
    query() {
      axios.post(this.url + "/v1/goods/query", {}).then((res) => {
        this.goodsList = res.data.data.list;
        this.goodsList.forEach(good => {
          this.$set(good, 'buy', 0)
        })
      });
    },
    jia(good) {  // 增加商品
      good.buy++
    },
    jian(good) {  // 减少商品
      good.buy--
    },
    toCar(good) {  // 加入购物车
      good.buy = 1
      // this.$set(good, 'buy', 1)
      console.log(this);
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

    // 请求商品列表
    this.query();
  },
  mounted() {},
};
</script>

<style scoped lang="less">
html {
  font-size: 4.26667vw;
}
* {
  margin: 0;
  padding: 0;
}
/* body {
  background-color: blue;
} */
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
      height: 0.125rem;
      background-color: red;
      transition: all 0.5s;
    }
  }
  li {
    flex: 1;
    padding: 0.625rem;
    list-style: none;
  }
}
// 商品
.bg {
  padding: 0.9375rem;
  background-color: #f6f5f5;
  .goods {
    display: flex;
    // margin: 0.9375rem;
    background-color: #fff;
    border-radius: 0.3125rem;
    img {
      width: 5.625rem;
      height: 5.625rem;
    }
    .info {
      position: relative;
      margin-left: 0.9375rem;
      width: 9.375rem;
      // background-color: pink;
      .name {
        position: absolute;
        padding: 0.1875rem;
        left: 0;
      }
      .tags {
        position: absolute;
        left: 0;
        top: 1.875rem;
        padding: 0.1875rem;
        font-size: 0.75rem;
        line-height: 100%;
        color: #fff;
        background-color: red;
        border-radius: 0.625rem;
      }
      .price {
        position: absolute;
        left: 0;
        color: red;
        font-size: 1rem;
        bottom: 0.3125rem;
      }
    }
  }
  .number {
    position: relative;
    width: 5.625rem;
    span {
      position: absolute;
      right: 0;
      bottom: .625rem;
      display: inline-block;
      width: 1.25rem;
      height: 1.25rem;
      font-size: 1.25rem;
      line-height: 1.25rem;
      background-color: #fff;
    }
    :first-child {
      left: 0;
      border-radius: .3125rem;
      border: red .0625rem solid;
      background-color: #fff;
    }
    :last-child {
      border-radius: .3125rem;
      border: red .0625rem solid;
    }
    .mid {
      width: 3rem;
      left: 1.375rem;
      font-size: 1.0625rem;
    }
  }
  .car {
    position: relative;
    width: 5.625rem;
    span {
      position: absolute;
      left: 0;
      width: 100%;
      padding: .3125rem 0;
      bottom: .625rem;
      color: #fff;
      line-height: 100%;
      background: red;
      border-radius: .625rem;
    }
  }
}
</style>
